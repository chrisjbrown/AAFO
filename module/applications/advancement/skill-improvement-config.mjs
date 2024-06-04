import AdvancementConfig from "./advancement-config.mjs";

/**
 * Configuration application for skill score improvements.
 */
export default class SkillImprovementConfig extends AdvancementConfig {

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      template: "systems/aafo/templates/advancement/skill-improvement-config.hbs"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  getData() {
    const skills = Object.entries(CONFIG.AAFO.skills).reduce((obj, [key, data]) => {
      obj[key] = {
        key,
        label: data.label,
      };
      return obj;
    }, {});

    return foundry.utils.mergeObject(super.getData(), {
      skills,
      points: {
        key: "points",
        name: "configuration.points",
        label: game.i18n.localize("AAFO.AdvancementSkillImprovementPoints"),
        min: 0,
        value: this.advancement.configuration.points,
        canIncrease: true,
        canDecrease: this.advancement.configuration.points > 0
      }
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".adjustment-button").click(this._onClickButton.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle clicking the plus and minus buttons.
   * @param {Event} event  Triggering click event.
   */
  _onClickButton(event) {
    event.preventDefault();
    const action = event.currentTarget.dataset.action;
    const input = event.currentTarget.closest("li").querySelector("input");

    if ( action === "decrease" ) input.valueAsNumber -= 1;
    else if ( action === "increase" ) input.valueAsNumber += 1;

    this.submit();
  }
}
