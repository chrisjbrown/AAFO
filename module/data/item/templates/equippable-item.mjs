import SystemDataModel from "../../abstract.mjs";

const { BooleanField, StringField, SchemaField, NumberField } = foundry.data.fields;

/**
 * Data model template with information on items that can be attuned and equipped.
 *
 * @property {string} attunement  Attunement information as defined in `AAFO.attunementTypes`.
 * @property {boolean} attuned    Is this item attuned on its owning actor?
 * @property {boolean} equipped   Is this item equipped on its owning actor?
 * @mixin
 */
export default class EquippableItemTemplate extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      decay: new SchemaField({
        value: new NumberField({
          nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.DecayPointsCurrent"
        }),
        max: new NumberField({
          nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.DecayPointsMax"
        })
      }, {label: "AAFO.Decay"}),
      attunement: new StringField({required: true, label: "AAFO.Attunement"}),
      attuned: new BooleanField({label: "AAFO.Attuned"}),
      equipped: new BooleanField({required: true, label: "AAFO.Equipped"})
    };
  }

  /* -------------------------------------------- */
  /*  Data Migrations                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static _migrateData(source) {
    super._migrateData(source);
    EquippableItemTemplate.#migrateAttunement(source);
    EquippableItemTemplate.#migrateEquipped(source);
  }

  /* -------------------------------------------- */

  /**
   * Migrate the item's attuned boolean to attunement string.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateAttunement(source) {
    switch ( source.attunement ) {
      case 2: source.attuned = true;
      case 1: source.attunement = "required"; break;
      case 0: source.attunement = ""; break;
    }
  }

  /* -------------------------------------------- */

  /**
   * Migrate the equipped field.
   * @param {object} source  The candidate source data from which the model will be constructed.
   */
  static #migrateEquipped(source) {
    if ( !("equipped" in source) ) return;
    if ( (source.equipped === null) || (source.equipped === undefined) ) source.equipped = false;
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /**
   * Ensure items that cannot be attuned are not marked as attuned.
   */
  prepareDerivedEquippableData() {
    if ( !this.attunement ) this.attuned = false;
  }

  /* -------------------------------------------- */
  /*  Properties                                  */
  /* -------------------------------------------- */

  /**
   * Chat properties for equippable items.
   * @type {string[]}
   */
  get equippableItemCardProperties() {
    return [
      this.attunement === "required" ? CONFIG.AAFO.attunementTypes.required : null,
      game.i18n.localize(this.equipped ? "AAFO.Equipped" : "AAFO.Unequipped"),
      ("proficient" in this) ? CONFIG.AAFO.proficiencyLevels[this.prof?.multiplier || 0] : null
    ];
  }

  /* -------------------------------------------- */

  /**
   * Are the magical properties of this item, such as magical bonuses to armor & damage, available?
   * @type {boolean}
   */
  get magicAvailable() {
    const attunement = this.attuned || (this.attunement !== "required");
    return attunement && this.properties.has("mgc") && this.validProperties.has("mgc");
  }
}
