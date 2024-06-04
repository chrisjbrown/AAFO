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

  /**
   * The dropped feat item.
   * @type {Item5e}
   */
  feat;

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
    const featUuid = Object.values(this.retainedData.feat ?? {})[0];
    if ( featUuid ) this.feat = await fromUuid(featUuid);
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
      const value = skill.value + (assignment ?? 0);
      obj[key] = {
        key, value,
        name: `skills.${key}`,
        label: data.label,
        initial: skill.value,
        min: 0,
        delta: (value - skill.value) ? formatter.format(value - skill.value) : null,
        showDelta: true,
        canIncrease: points.available > 0,
        canDecrease: (value > 0),
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
    html.find("a[data-uuid]").click(this._onClickFeature.bind(this));
    html.find("[data-action='delete']").click(this._onItemDelete.bind(this));
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

  /**
   * Handle clicking on a feature during item grant to preview the feature.
   * @param {MouseEvent} event  The triggering event.
   * @protected
   */
  async _onClickFeature(event) {
    event.preventDefault();
    const uuid = event.currentTarget.dataset.uuid;
    const item = await fromUuid(uuid);
    item?.sheet.render(true);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _updateObject(event, formData) {
    // TODO: Pass through retained feat data
    await this.advancement.apply(this.level, {
      type: this.feat ? "feat" : "asi",
      assignments: this.assignments,
      featUuid: this.feat?.uuid,
      retainedItems: this.retainedData?.retainedItems
    });
  }

  /* -------------------------------------------- */
  /*  Drag & Drop                                 */
  /* -------------------------------------------- */

  /**
   * Handle deleting a dropped feat.
   * @param {Event} event  The originating click event.
   * @protected
   */
  async _onItemDelete(event) {
    event.preventDefault();
    this.feat = null;
    this.render();
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async _onDrop(event) {
    if ( !this.advancement.allowFeat ) return false;

    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch(err) {
      return false;
    }

    if ( data.type !== "Item" ) return false;
    const item = await Item.implementation.fromDropData(data);

    if ( (item.type !== "feat") || (item.system.type.value !== "feat") ) {
      ui.notifications.error("AAFO.AdvancementSkillImprovementFeatWarning", {localize: true});
      return null;
    }

    // If a feat has a level pre-requisite, make sure it is less than or equal to current character level
    if ( (item.system.prerequisites?.level ?? -Infinity) > this.advancement.actor.system.details.level ) {
      ui.notifications.error(game.i18n.format("AAFO.AdvancementSkillImprovementFeatLevelWarning", {
        level: item.system.prerequisites.level
      }));
      return null;
    }

    this.feat = item;
    this.render();
  }
}
