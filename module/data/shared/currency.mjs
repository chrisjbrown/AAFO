import SystemDataModel from "../abstract.mjs";
import { MappingField } from "../fields.mjs";

/**
 * A template for currently held currencies.
 *
 * @property {object} currency  Object containing currencies as numbers.
 * @mixin
 */
export default class CurrencyTemplate extends SystemDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      currency: new MappingField(new foundry.data.fields.NumberField({
        required: true, nullable: false, integer: true, min: 0, initial: 0
      }), {initialKeys: CONFIG.AAFO.currencies, initialKeysOnly: true, label: "AAFO.Currency"})
    };
  }

  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Get the weight of all of the currency. Always returns 0 if currency weight is disabled in settings.
   * @returns {number}
   */
  get currencyWeight() {
    if ( !game.settings.get("aafo", "currencyWeight") ) return 0;
    const count = Object.values(this.currency).reduce((count, value) => count + value, 0);
    const currencyPerWeight = game.settings.get("aafo", "metricWeightUnits")
      ? CONFIG.AAFO.encumbrance.currencyPerWeight.metric
      : CONFIG.AAFO.encumbrance.currencyPerWeight.imperial;
    return count / currencyPerWeight;
  }
}
