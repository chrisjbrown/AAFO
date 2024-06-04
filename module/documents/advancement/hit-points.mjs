import Advancement from "./advancement.mjs";
import HitPointsConfig from "../../applications/advancement/hit-points-config.mjs";
import HitPointsFlow from "../../applications/advancement/hit-points-flow.mjs";
import { simplifyBonus } from "../../utils.mjs";
import { HitPointsConfigurationData } from "../../data/advancement/hit-points.mjs";

/**
 * Advancement that presents the player with the option to roll hit points at each level or select the average value.
 * Keeps track of player hit point rolls or selection for each class level. **Can only be added to classes and each
 * class can only have one.**
 */
export default class HitPointsAdvancement extends Advancement {

  /** @inheritdoc */
  static get metadata() {
    return foundry.utils.mergeObject(super.metadata, {
      dataModels: {
        configuration: HitPointsConfigurationData,
      },
      order: 10,
      icon: "systems/aafo/icons/svg/hit-points.svg",
      title: game.i18n.localize("AAFO.AdvancementHitPointsTitle"),
      hint: game.i18n.localize("AAFO.AdvancementHitPointsHint"),
      multiLevel: false,
      apps: {
        config: HitPointsConfig,
        flow: HitPointsFlow
      }
    });
  }

  /* -------------------------------------------- */
  /*  Display Methods                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  configuredForLevel(level) {
    return this.valueForLevel(level) !== null;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  titleForLevel(level, { configMode=false }={}) {
    const hp = this.valueForLevel(level);
    if ( !hp || configMode ) return this.title;
    return `${this.title}: <strong>${hp}</strong>`;
  }

  /* -------------------------------------------- */

  /**
   * Hit points given at the provided level.
   * @param {number} level   Level for which to get hit points.
   * @returns {number|null}  Hit points for level or null if none have been taken.
   */
  valueForLevel(level) {
    return this.constructor.valueForLevel(this.value, level);
  }

  /* -------------------------------------------- */

  /**
   * Hit points given at the provided level.
   * @param {object} data         Contents of `value` used to determine this value.
   * @param {number} level        Level for which to get hit points.
   * @returns {number|null}       Hit points for level or null if none have been taken.
   */
  static valueForLevel(data, level) {
    const value = data[level];
    return value;
  }

  /* -------------------------------------------- */

  /**
   * Total hit points provided by this advancement.
   * @returns {number}  Hit points currently selected.
   */
  total() {
    return Object.keys(this.value).reduce((total, level) => total + this.valueForLevel(parseInt(level)), 0);
  }

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /**
   * Add the ability modifier and any bonuses to the provided hit points value to get the number to apply.
   * @param {number} value  Hit points taken at a given level.
   * @returns {number}      Hit points adjusted with ability modifier and per-level bonuses.
   */
  #getHPApplicableValue(value) {
    const abilityId = CONFIG.AAFO.defaultAbilities.hitPoints || "end";
    value = Math.max(value + (this.actor.system.abilities[abilityId]?.mod ?? 0), 1);
    value += simplifyBonus(this.actor.system.attributes.hp.bonuses?.level, this.actor.getRollData());
    return value;
  }
  /**
   * Add the ability modifier and any bonuses to the provided hit points value to get the number to apply.
   * @param {number} value  Hit points taken at a given level.
   * @returns {number}      Hit points adjusted with ability modifier and per-level bonuses.
   */
  #getSPApplicableValue(value) {
    const abilityId = CONFIG.AAFO.defaultAbilities.staminaPoints || "end";
    value = Math.max(value + (this.actor.system.abilities[abilityId]?.mod ?? 0), 1);
    value += simplifyBonus(this.actor.system.attributes.sp.bonuses?.level, this.actor.getRollData());
    return value;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  apply(level, data) {
    let value = this.constructor.valueForLevel(data, level);
    if ( value === undefined ) return;
    this.actor.updateSource({
      "system.attributes.hp.value": this.actor.system.attributes.hp.value + this.#getHPApplicableValue(value.hp),
      "system.attributes.sp.value": this.actor.system.attributes.sp.value + this.#getSPApplicableValue(value.sp)
    });
    this.updateSource({ value: data });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  restore(level, data) {
    this.apply(level, data);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  reverse(level) {
    let value = this.valueForLevel(level);
    if ( value === undefined ) return;
    this.actor.updateSource({
      "system.attributes.hp.value": this.actor.system.attributes.hp.value - this.#getHPApplicableValue(value.hp),
      "system.attributes.sp.value": this.actor.system.attributes.sp.value - this.#getSPApplicableValue(value.sp)
    });
    const source = { [level]: this.value[level] };
    this.updateSource({ [`value.-=${level}`]: null });
    return source;
  }
}
