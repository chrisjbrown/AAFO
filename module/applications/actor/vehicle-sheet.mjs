import ActorSheet5e from "./base-sheet.mjs";

/**
 * An Actor sheet for Vehicle type actors.
 */
export default class ActorSheet5eVehicle extends ActorSheet5e {

  /** @inheritDoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo", "sheet", "actor", "vehicle"]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  static unsupportedItemTypes = new Set(["background", "class", "race", "subclass"]);

  /* -------------------------------------------- */

  /**
   * Creates a new cargo entry for a vehicle Actor.
   * @type {object}
   */
  static get newCargo() {
    return {name: "", quantity: 1};
  }

  /* -------------------------------------------- */
  /*  Context Preparation                         */
  /* -------------------------------------------- */

  /**
   * Compute the total weight of the vehicle's cargo.
   * @param {number} totalWeight    The cumulative item weight from inventory items
   * @param {object} actorData      The data object for the Actor being rendered
   * @returns {{max: number, value: number, pct: number}}
   * @private
   */
  _computeEncumbrance(totalWeight, actorData) {

    // Compute currency weight
    const totalCoins = Object.values(actorData.system.currency).reduce((acc, denom) => acc + denom, 0);

    const currencyPerWeight = game.settings.get("aafo", "metricWeightUnits")
      ? CONFIG.AAFO.encumbrance.currencyPerWeight.metric
      : CONFIG.AAFO.encumbrance.currencyPerWeight.imperial;
    totalWeight += totalCoins / currencyPerWeight;

    // Compute overall encumbrance
    const max = actorData.system.attributes.capacity.cargo;
    const pct = Math.clamp((totalWeight * 100) / max, 0, 100);
    return {value: totalWeight.toNearest(0.1), max, pct};
  }

  /* -------------------------------------------- */

  /** @override */
  _getMovementSpeed(actorData, largestPrimary=true) {
    return super._getMovementSpeed(actorData, largestPrimary);
  }

  /* -------------------------------------------- */

  /**
   * Prepare items that are mounted to a vehicle and require one or more crew to operate.
   * @param {object} item     Copy of the item data being prepared for display.
   * @param {object} context  Display context for the item.
   * @protected
   */
  _prepareCrewedItem(item, context) {

    // Determine crewed status
    const isCrewed = item.system.crewed;
    context.toggleClass = isCrewed ? "active" : "";
    context.toggleTitle = game.i18n.localize(`AAFO.${isCrewed ? "Crewed" : "Uncrewed"}`);

    // Handle crew actions
    if ( item.type === "feat" && item.system.activation.type === "crew" ) {
      context.cover = game.i18n.localize(`AAFO.${item.system.cover ? "CoverTotal" : "None"}`);
      if ( item.system.cover === .5 ) context.cover = "½";
      else if ( item.system.cover === .75 ) context.cover = "¾";
      else if ( item.system.cover === null ) context.cover = "—";
    }

    // Prepare vehicle weapons
    if ( (item.type === "equipment") || (item.type === "weapon") ) {
      context.threshold = item.system.hp.dt ? item.system.hp.dt : "—";
    }
  }

  /* -------------------------------------------- */

  /** @override */
  _prepareItems(context) {
    const cargoColumns = [{
      label: game.i18n.localize("AAFO.Quantity"),
      css: "item-qty",
      property: "quantity",
      editable: "Number"
    }];

    const equipmentColumns = [{
      label: game.i18n.localize("AAFO.Quantity"),
      css: "item-qty",
      property: "system.quantity",
      editable: "Number"
    }, {
      label: game.i18n.localize("AAFO.AC"),
      css: "item-ac",
      property: "system.armor.value"
    }, {
      label: game.i18n.localize("AAFO.HP"),
      css: "item-hp",
      property: "system.hp.value",
      maxProperty: "system.hp.max",
      editable: "Number"
    }, {
      label: game.i18n.localize("AAFO.Threshold"),
      css: "item-threshold",
      property: "threshold"
    }];

    const features = {
      actions: {
        label: game.i18n.localize("AAFO.ActionPl"),
        items: [],
        hasActions: true,
        crewable: true,
        dataset: {type: "feat", "activation.type": "crew"},
        columns: [{
          label: game.i18n.localize("AAFO.Cover"),
          css: "item-cover",
          property: "cover"
        }]
      },
      equipment: {
        label: game.i18n.localize(CONFIG.Item.typeLabels.equipment),
        items: [],
        crewable: true,
        dataset: {type: "equipment", "type.value": "vehicle"},
        columns: equipmentColumns
      },
      passive: {
        label: game.i18n.localize("AAFO.Features"),
        items: [],
        dataset: {type: "feat"}
      },
      reactions: {
        label: game.i18n.localize("AAFO.ReactionPl"),
        items: [],
        dataset: {type: "feat", "activation.type": "reaction"}
      },
      weapons: {
        label: game.i18n.localize(`${CONFIG.Item.typeLabels.weapon}Pl`),
        items: [],
        crewable: true,
        dataset: {type: "weapon", "weapon-type": "siege"},
        columns: equipmentColumns
      }
    };

    context.items.forEach(item => {
      const {uses, recharge} = item.system;
      const ctx = context.itemContext[item.id] ??= {};
      ctx.canToggle = false;
      ctx.isExpanded = this._expanded.has(item.id);
      ctx.hasUses = uses && (uses.max > 0);
      ctx.isOnCooldown = recharge && !!recharge.value && (recharge.charged === false);
      ctx.isDepleted = item.isOnCooldown && (uses.per && (uses.value > 0));
    });

    const cargo = {
      crew: {
        label: game.i18n.localize("AAFO.VehicleCrew"),
        items: context.actor.system.cargo.crew,
        css: "cargo-row crew",
        editableName: true,
        dataset: {type: "crew"},
        columns: cargoColumns
      },
      passengers: {
        label: game.i18n.localize("AAFO.VehiclePassengers"),
        items: context.actor.system.cargo.passengers,
        css: "cargo-row passengers",
        editableName: true,
        dataset: {type: "passengers"},
        columns: cargoColumns
      },
      cargo: {
        label: game.i18n.localize("AAFO.VehicleCargo"),
        items: [],
        dataset: {type: "loot"},
        columns: [{
          label: game.i18n.localize("AAFO.Quantity"),
          css: "item-qty",
          property: "system.quantity",
          editable: "Number"
        }, {
          label: game.i18n.localize("AAFO.Price"),
          css: "item-price",
          property: "system.price.value",
          editable: "Number"
        }, {
          label: game.i18n.localize("AAFO.Weight"),
          css: "item-weight",
          property: "system.weight.value",
          editable: "Number"
        }]
      }
    };

    const baseUnits = CONFIG.AAFO.encumbrance.baseUnits[this.actor.type] ?? CONFIG.AAFO.encumbrance.baseUnits.default;
    const units = game.settings.get("aafo", "metricWeightUnits") ? baseUnits.metric : baseUnits.imperial;

    // Classify items owned by the vehicle and compute total cargo weight
    let totalWeight = 0;
    for ( const item of context.items ) {
      const ctx = context.itemContext[item.id] ??= {};
      this._prepareCrewedItem(item, ctx);

      // Handle cargo explicitly
      const isCargo = item.flags.aafo?.vehicleCargo === true;
      if ( isCargo ) {
        totalWeight += item.system.totalWeight ?? 0;
        cargo.cargo.items.push(item);
        continue;
      }

      // Handle non-cargo item types
      switch ( item.type ) {
        case "weapon":
          features.weapons.items.push(item);
          break;
        case "equipment":
          features.equipment.items.push(item);
          break;
        case "feat":
          const act = item.system.activation;
          if ( !act.type || (act.type === "none") ) features.passive.items.push(item);
          else if (act.type === "reaction") features.reactions.items.push(item);
          else features.actions.items.push(item);
          break;
        default:
          totalWeight += item.system.totalWeight;
          cargo.cargo.items.push(item);
      }
    }

    // Update the rendering context data
    context.inventoryFilters = false;
    context.features = Object.values(features);
    context.cargo = Object.values(cargo);
    context.encumbrance = this._computeEncumbrance(totalWeight, context);
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if ( !this.isEditable ) return;

    html[0].querySelector('[data-tab="cargo"] aafo-inventory')
      .addEventListener("inventory", this._onInventoryEvent.bind(this));

    html.find(".cargo-row input")
      .click(evt => evt.target.select())
      .change(this._onCargoRowChange.bind(this));

    if (this.actor.system.attributes.actions.stations) {
      html.find(".counter.actions, .counter.action-thresholds").hide();
    }
  }

  /* -------------------------------------------- */

  /**
   * Handle saving a cargo row (i.e. crew or passenger) in-sheet.
   * @param {Event} event              Triggering event.
   * @returns {Promise<Actor5e>|null}  Actor after update if any changes were made.
   * @private
   */
  _onCargoRowChange(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const row = target.closest(".item");
    const idx = Number(row.dataset.itemIndex);
    const property = row.classList.contains("crew") ? "crew" : "passengers";

    // Get the cargo entry
    const cargo = foundry.utils.deepClone(this.actor.system.cargo[property]);
    const entry = cargo[idx];
    if ( !entry ) return null;

    // Update the cargo value
    const key = target.dataset.name ?? "name";
    const type = target.dataset.dtype;
    let value = target.value;
    if (type === "Number") value = Number(value);
    entry[key] = value;

    // Perform the Actor update
    return this.actor.update({[`system.cargo.${property}`]: cargo});
  }

  /* -------------------------------------------- */

  /**
   * Handle creating and deleting crew and passenger rows.
   * @param {CustomEvent} event   Triggering inventory event.
   * @returns {Promise}
   */
  async _onInventoryEvent(event) {
    if ( event.detail === "create" ) {
      const type = event.target.dataset.type;
      if ( !["crew", "passengers"].includes(type) ) return;
      event.preventDefault();
      const cargoCollection = foundry.utils.deepClone(this.actor.system.cargo[type]);
      cargoCollection.push(this.constructor.newCargo);
      return this.actor.update({[`system.cargo.${type}`]: cargoCollection});
    }

    else if ( event.detail === "delete" ) {
      const row = event.target.closest(".item");
      if ( !row.classList.contains("cargo-row") ) return;
      event.preventDefault();
      const idx = Number(row.dataset.itemIndex);
      const type = row.classList.contains("crew") ? "crew" : "passengers";
      const cargoCollection = foundry.utils.deepClone(this.actor.system.cargo[type]).filter((_, i) => i !== idx);
      return this.actor.update({[`system.cargo.${type}`]: cargoCollection});
    }
  }

  /* -------------------------------------------- */

  /** @override */
  async _onDropSingleItem(itemData) {
    const cargoTypes = ["weapon", "equipment", "consumable", "tool", "loot", "container"];
    const isCargo = cargoTypes.includes(itemData.type) && (this._tabs[0].active === "cargo");
    foundry.utils.setProperty(itemData, "flags.aafo.vehicleCargo", isCargo);
    return super._onDropSingleItem(itemData);
  }
}
