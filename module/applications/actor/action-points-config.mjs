import BaseConfigSheet from "./base-config.mjs";

/**
 * A form for configuring actor action points and bonuses.
 */
export default class ActorActionPointsConfig extends BaseConfigSheet {
  constructor(...args) {
    super(...args);

    /**
     * Cloned copy of the actor for previewing changes.
     * @type {Actor5e}
     */
    this.clone = this.object.clone();
  }

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo", "actor-action-points-config"],
      template: "systems/aafo/templates/apps/action-points-config.hbs",
      width: 320,
      height: "auto"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get title() {
    return `${game.i18n.localize("AAFO.ActionPointsConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData(options) {
    return {
      ap: this.clone.system.attributes.ap,
      source: this.clone.toObject().system.attributes.ap,
      isCharacter: this.document.type === "character"
    };
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _getActorOverrides() {
    return Object.keys(foundry.utils.flattenObject(this.object.overrides?.system?.attributes || {}));
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    const ap = foundry.utils.expandObject(formData).ap;
    this.clone.updateSource({"system.attributes.ap": ap});
    const maxDelta = this.clone.system.attributes.ap.max - this.document.system.attributes.ap.max;
    ap.value = Math.max(this.document.system.attributes.ap.value + maxDelta, 0);
    return this.document.update({"system.attributes.ap": ap});
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /** @inheritDoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".roll-action-points").click(this._onRollSPFormula.bind(this));
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onChangeInput(event) {
    await super._onChangeInput(event);
    const t = event.currentTarget;

    // Update clone with new data & re-render
    this.clone.updateSource({ [`system.attributes.${t.name}`]: t.value || null });
    if ( t.name !== "ap.formula" ) this.render();
  }

  /* -------------------------------------------- */

  /**
   * Handle rolling NPC health values using the provided formula.
   * @param {Event} event  The original click event.
   * @protected
   */
  async _onRollSPFormula(event) {
    event.preventDefault();
    try {
      const roll = await this.clone.rollNPCActionPoints();
      this.clone.updateSource({"system.attributes.ap.max": roll.total});
      this.render();
    } catch(error) {
      ui.notifications.error("AAFO.SPFormulaError", {localize: true});
      throw error;
    }
  }
}
