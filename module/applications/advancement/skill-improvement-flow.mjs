import AdvancementFlow from "./advancement-flow.mjs";

/**
 * Inline application that presents the player with a choice between skill score improvement and taking a feat.
 */
export default class SkillImprovementFlow extends AdvancementFlow {

  /**
   * Player assignments to skills.
   * @type {Object<string, number>}
   */
  assignments = {};

  /* -------------------------------------------- */

  /** @inheritdoc */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      dragDrop: [{ dropSelector: "form" }],
      template: "systems/aafo/templates/advancement/skill-improvement-flow.hbs"
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async retainData(data) {
    await super.retainData(data);
    this.assignments = this.retainedData.assignments ?? {};
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async getData() {
    let intMod = 0;
    if (this.advancement.actor.system.abilities["int"].value > 5) {
      intMod = 1;
    } else if (this.advancement.actor.system.abilities["int"].value < 5) {
      intMod = -1;
    }
    const points = {
      assigned: Object.keys(CONFIG.AAFO.skills).reduce((assigned, key) => {
        return assigned + (this.assignments[key] ?? 0);
      }, 0),
      total: this.advancement.configuration.points + intMod
    };
    points.available = points.total - points.assigned;

    const formatter = new Intl.NumberFormat(game.i18n.lang, { signDisplay: "always" });

    const skills = Object.entries(CONFIG.AAFO.skills).reduce((obj, [key, data]) => {
      const skill = this.advancement.actor.system.skills[key];
      const assignment = this.assignments[key] ?? 0;
      const fixed = this.advancement.configuration.fixed[key] ?? 0;
      const value = skill.value + ((fixed || assignment) ?? 0);
      obj[key] = {
        key, value,
        name: `skills.${key}`,
        label: data.label,
        initial: skill.value,
        min: fixed || 0,
        delta: (value - skill.value) ? formatter.format(value - skill.value) : null,
        showDelta: true,
        isFixed: !!fixed,
        canIncrease: !fixed && points.available > 0,
        canDecrease: assignment > 0,
      };
      return obj;
    }, {});

    const pluralRules = new Intl.PluralRules(game.i18n.lang);
    return foundry.utils.mergeObject(super.getData(), {
      skills, points,
      staticIncrease: !this.advancement.configuration.points,
      pointsRemaining: game.i18n.format(
        `AAFO.AdvancementSkillImprovementPointsRemaining.${pluralRules.select(points.available)}`,
        {points: points.available}
      )
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".adjustment-button").click(this._onClickButton.bind(this));
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  _onChangeInput(event) {
    super._onChangeInput(event);
    const input = event.currentTarget;
    const key = input.closest("[data-score]").dataset.score;
    if ( isNaN(input.valueAsNumber) ) this.assignments[key] = 0;
    else {
      this.assignments[key] = Math.min(
        Math.clamp(input.valueAsNumber, Number(input.min), Number(input.max)) - Number(input.dataset.initial),
        this.advancement.configuration.cap ?? Infinity
      );
    }
    this.render();
  }

  /* -------------------------------------------- */

  /**
   * Handle clicking the plus and minus buttons.
   * @param {Event} event  Triggering click event.
   */
  _onClickButton(event) {
    event.preventDefault();
    const action = event.currentTarget.dataset.action;
    const key = event.currentTarget.closest("li").dataset.score;

    this.assignments[key] ??= 0;
    if ( action === "decrease" ) this.assignments[key] -= 1;
    else if ( action === "increase" ) this.assignments[key] += 1;
    else return;

    this.render();
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    await this.advancement.apply(this.level, {
      type: "asi",
      assignments: this.assignments,
      retainedItems: this.retainedData?.retainedItems
    });
  }
}
