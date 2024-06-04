import BaseConfigSheet from "./base-config.mjs";

/**
 * A simple form to set actor movement speeds.
 */
export default class ActorMovementConfig extends BaseConfigSheet {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo"],
      template: "systems/aafo/templates/apps/movement-config.hbs",
      width: 300,
      height: "auto",
      keyPath: "system.attributes.movement"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `${game.i18n.localize("AAFO.MovementConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options={}) {
    const source = this.document.toObject();
    const movement = foundry.utils.getProperty(source, this.options.keyPath) ?? {};
    const raceData = this.document.system.details?.race?.system?.movement ?? {};

    // Allowed speeds
    const speeds = source.type === "group" ? {
      land: "AAFO.MovementLand",
      water: "AAFO.MovementWater",
      air: "AAFO.MovementAir"
    } : {
      walk: "AAFO.MovementWalk",
      burrow: "AAFO.MovementBurrow",
      climb: "AAFO.MovementClimb",
      fly: "AAFO.MovementFly",
      swim: "AAFO.MovementSwim"
    };

    return {
      movement,
      movements: Object.entries(speeds).reduce((obj, [k, label]) => {
        obj[k] = { label, value: movement[k], placeholder: raceData[k] ?? 0 };
        return obj;
      }, {}),
      selectUnits: Object.hasOwn(movement, "units"),
      canHover: Object.hasOwn(movement, "hover"),
      units: CONFIG.AAFO.movementUnits,
      unitsPlaceholder: game.i18n.format("AAFO.AutomaticValue", {
        value: CONFIG.AAFO.movementUnits[raceData.units ?? Object.keys(CONFIG.AAFO.movementUnits)[0]]?.toLowerCase()
      }),
      keyPath: this.options.keyPath
    };
  }
}
