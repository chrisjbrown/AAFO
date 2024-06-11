import SystemDataModel from "../../abstract.mjs";

/**
 * Data model template with information on physical items.
 *
 * @property {string} container           Container within which this item is located.
 * @property {number} quantity            Number of items in a stack.
 * @property {object} load                Items load
 * @property {object} price
 * @property {number} price               Item's cost.
 * @property {string} rarity              Item rarity as defined in `AAFO.itemRarity`.
 * @mixin
 */
export default class PhysicalItemTemplate extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      container: new foundry.data.fields.ForeignDocumentField(foundry.documents.BaseItem, {
        idOnly: true, label: "AAFO.Container"
      }),
      quantity: new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, initial: 1, min: 0, label: "AAFO.Quantity"
      }),
      load: new foundry.data.fields.NumberField({
        required: true, nullable: false, initial: 0, min: 0, label: "AAFO.Load"
      }),
      // weight: new foundry.data.fields.SchemaField({
      //   value: new foundry.data.fields.NumberField({
      //     required: true, nullable: false, initial: 0, min: 0, label: "AAFO.Weight"
      //   }),
      //   units: new foundry.data.fields.StringField({
      //     required: true, label: "AAFO.WeightUnit.Label",
      //     initial: () => game.settings.get("aafo", "metricWeightUnits") ? "kg" : "lb"
      //   })
      // }, {label: "AAFO.Weight"}),
      price: new foundry.data.fields.NumberField({
        required: true, nullable: false, initial: 0, min: 0, label: "AAFO.Price"
      }, {label: "AAFO.Price"}),

      rarity: new foundry.data.fields.StringField({required: true, blank: true, label: "AAFO.Rarity"})
    };
  }

  /* -------------------------------------------- */

  /**
   * Maximum depth items can be nested in containers.
   * @type {number}
   */
  static MAX_DEPTH = 5;

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get a human-readable label for the price
   * @type {string}
   */
  get priceLabel() {
    const { value } = this.price;
    const hasPrice = value;
    return hasPrice ? `${value}` : null;
  }

  /* -------------------------------------------- */

  /**
   * The weight of all of the items in an item stack.
   * @type {number}
   */
  get totalWeight() {
    return this.quantity * this.load;
  }

  /* -------------------------------------------- */
  /*  Socket Event Handlers                       */
  /* -------------------------------------------- */

  /**
   * Trigger a render on all sheets for items within which this item is contained.
   * @param {object} [options={}]
   * @param {object} [options.rendering]        Additional rendering options.
   * @param {string} [options.formerContainer]  UUID of the former container if this item was moved.
   * @protected
   */
  async _renderContainers({ formerContainer, ...rendering }={}) {
    // Render this item's container & any containers it is within
    const parentContainers = await this.allContainers();
    parentContainers.forEach(c => c.sheet?.render(false, rendering));

    // Render the actor sheet, compendium, or sidebar
    if ( this.parent.isEmbedded ) this.parent.actor.sheet?.render(false, rendering);
    else if ( this.parent.pack ) game.packs.get(this.parent.pack).apps.forEach(a => a.render(false, rendering));
    else ui.sidebar.tabs.items.render(false, rendering);

    // Render former container if it was moved between containers
    if ( formerContainer ) {
      const former = await fromUuid(formerContainer);
      former.render(false, rendering);
      former.system._renderContainers(rendering);
    }
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onCreate(data, options, userId) {
    this._renderContainers();
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onUpdate(changed, options, userId) {
    this._renderContainers({ formerContainer: options.formerContainer });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onDelete(options, userId) {
    this._renderContainers();
  }

  /* -------------------------------------------- */
  /*  Helper Methods                              */
  /* -------------------------------------------- */

  /**
   * All of the containers this item is within up to the parent actor or collection.
   * @returns {Promise<Item5e[]>}
   */
  async allContainers() {
    let item = this.parent;
    let container;
    let depth = 0;
    const containers = [];
    while ( (container = await item.container) && (depth < PhysicalItemTemplate.MAX_DEPTH) ) {
      containers.push(container);
      item = container;
      depth++;
    }
    return containers;
  }
}
