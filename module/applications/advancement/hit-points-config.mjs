import AdvancementConfig from "./advancement-config.mjs";

/**
 * Configuration application for hit points.
 */
export default class HitPointsConfig extends AdvancementConfig {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/aafo/templates/advancement/hit-points-config.hbs"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    return foundry.utils.mergeObject(super.getData(), {
      value: this.advancement.value
    });
  }
  /** @inheritdoc */
  async _updateObject(event, formData) {
    let updates = foundry.utils.expandObject(formData);
    if ( updates.configuration ) updates.configuration = await this.prepareConfigurationUpdate(updates.configuration);
    await this.advancement.update(updates);
  }
}
