/**
 * Configuration data for the size advancement type.
 */
export class HitPointsConfigurationData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      hp: new foundry.data.fields.NumberField({ required: true, initial: 5, label: "AAFO.HitPoints"}),
      sp: new foundry.data.fields.NumberField({ required: true, initial: 5, label: "AAFO.StaminaPoints"}),
    };
  }
}
