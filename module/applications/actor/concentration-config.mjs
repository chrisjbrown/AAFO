import BaseConfigSheet from "./base-config.mjs";

/**
 * A sub-application of the ActorSheet used to configure concentration saving throws.
 * @extends {BaseConfigSheet}
 */
export default class ActorConcentrationConfig extends BaseConfigSheet {
  /** @inheritDoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo"],
      template: "systems/aafo/templates/apps/concentration-config.hbs",
      width: 500,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get title() {
    return `${game.i18n.format("AAFO.AbilityConfigure", {
      ability: game.i18n.localize("AAFO.Concentration") })
    }: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const src = this.document.toObject();
    const { ability, bonuses, limit, roll } = src.system.attributes.concentration;
    return {
      ability, limit,
      abilities: CONFIG.AAFO.abilities,
      bonus: bonuses.save,
      mode: roll.mode,
      modes: {
        "-1": "AAFO.Disadvantage",
        0: "AAFO.Normal",
        1: "AAFO.Advantage"
      },
      bonusGlobalSave: src.system.bonuses?.abilities?.save
    };
  }
}
