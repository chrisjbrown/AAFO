import Advancement from "./advancement.mjs";
import SkillImprovementConfig from "../../applications/advancement/skill-improvement-config.mjs";
import SkillImprovementFlow from "../../applications/advancement/skill-improvement-flow.mjs";
import {
  SkillImprovementConfigurationData,
  SkillImprovementValueData
} from "../../data/advancement/skill-improvement.mjs";

/**
 * Advancement that presents the player with the option of improving their skills scores or selecting a feat.
 */
export default class SkillImprovementAdvancement extends Advancement {

  /** @inheritdoc */
  static get metadata() {
    return foundry.utils.mergeObject(super.metadata, {
      dataModels: {
        configuration: SkillImprovementConfigurationData,
        value: SkillImprovementValueData
      },
      order: 20,
      icon: "systems/aafo/icons/svg/skill-improvement.svg",
      title: game.i18n.localize("AAFO.AdvancementSkillImprovementTitle"),
      hint: game.i18n.localize("AAFO.AdvancementSkillImprovementHint"),
      apps: {
        config: SkillImprovementConfig,
        flow: SkillImprovementFlow
      }
    });
  }

  /**
   * Information on the ASI points available.
   * @type {{ assigned: number, total: number }}
   */
  get points() {
    return {
      assigned: Object.entries(this.value.assignments ?? {}).reduce((n, [abl, c]) => {
        n += c;
        return n;
      }, 0),
      total: this.configuration.points.reduce((t, [abl, v]) => {
        t += v;
        return t;
      }, 0)
    };
  }

  /* -------------------------------------------- */
  /*  Display Methods                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  titleForLevel(level, { configMode=false }={}) {
    if ( this.value.selected !== "feat" ) return this.title;
    return game.i18n.localize("AAFO.Feature.Feat");
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  summaryForLevel(level, { configMode=false }={}) {
    const formatter = new Intl.NumberFormat(game.i18n.lang, { signDisplay: "always" });
    if ( configMode ) {
      const entries = [];
      if ( this.configuration.points ) entries.push(`<span class="tag">${
        game.i18n.localize("AAFO.AdvancementSkillImprovementPoints")}: <strong>${
        this.configuration.points}</strong></span>`
      );
      return entries.filterJoin("\n");
    }

    else if ( (this.value.type === "asi") && this.value.assignments ) {
      return Object.entries(this.value.assignments).reduce((html, [key, value]) => {
        const name = CONFIG.AAFO.skills[key]?.label ?? key;
        html += `<span class="tag">${name} <strong>${formatter.format(value)}</strong></span>\n`;
        return html;
      }, "");
    }

    return "";
  }

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async apply(level, data) {
    if ( data.type === "asi" ) {
      const assignments = foundry.utils.mergeObject(data.assignments, {inplace: false});
      const updates = {};
      for ( const key of Object.keys(assignments) ) {
        const skill = this.actor.system.skills[key];
        const source = this.actor.system.toObject().skills[key] ?? {};
        if ( !skill ) continue;
        if ( assignments[key] ) updates[`system.skills.${key}.value`] = source.value + assignments[key];
        else delete assignments[key];
      }
      data.assignments = assignments;
      data.feat = null;
      this.actor.updateSource(updates);
    }

    else {
      let itemData = data.retainedItems?.[data.featUuid];
      if ( !itemData ) itemData = await this.createItemData(data.featUuid);
      data.assignments = null;
      if ( itemData ) {
        data.feat = { [itemData._id]: data.featUuid };
        this.actor.updateSource({items: [itemData]});
      }
    }

    delete data.featUuid;
    delete data.retainedItems;
    this.updateSource({value: data});
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  restore(level, data) {
    data.featUuid = Object.values(data.feat ?? {})[0];
    this.apply(level, data);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  reverse(level) {
    const source = this.value.toObject();

    if ( this.value.type === "asi" ) {
      const updates = {};
      for ( const [key, change] of Object.entries(this.value.assignments ?? {}) ) {
        const skill = this.actor.system.toObject().skills[key];
        if ( !skill ) continue;
        updates[`system.skills.${key}.value`] = skill.value - change;
      }
      this.actor.updateSource(updates);
    }

    else {
      const [id, uuid] = Object.entries(this.value.feat ?? {})[0] ?? [];
      const item = this.actor.items.get(id);
      if ( item ) source.retainedItems = {[uuid]: item.toObject()};
      this.actor.items.delete(id);
    }

    this.updateSource({ "value.assignments": null, "value.feat": null });
    return source;
  }
}
