import AdvancementFlow from "./advancement-flow.mjs";
import Advancement from "../../documents/advancement/advancement.mjs";

/**
 * Inline application that presents hit points selection upon level up.
 */
export default class HitPointsFlow extends AdvancementFlow {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/aafo/templates/advancement/hit-points-flow.hbs"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    return foundry.utils.mergeObject(super.getData(), {
      hp: this.advancement.configuration.hp,
      sp: this.advancement.configuration.sp,
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _updateObject() {
    const hp = parseInt(this.advancement.configuration.hp);
    const sp = parseInt(this.advancement.configuration.sp);
    if ( hp !== undefined && sp !== undefined ) return this.advancement.apply(this.level, { [this.level]: { hp, sp } });
    throw new Advancement.ERROR(game.i18n.localize(`AAFO.AdvancementHitPoints${errorType}Error`));
  }

}
