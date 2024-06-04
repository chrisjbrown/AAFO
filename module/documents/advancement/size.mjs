import Advancement from "./advancement.mjs";
import SizeConfig from "../../applications/advancement/size-config.mjs";
import SizeFlow from "../../applications/advancement/size-flow.mjs";
import { SizeConfigurationData, SizeValueData } from "../../data/advancement/size.mjs";

/**
 * Advancement that handles player size.
 */
export default class SizeAdvancement extends Advancement {

  /** @inheritdoc */
  static get metadata() {
    return foundry.utils.mergeObject(super.metadata, {
      dataModels: {
        configuration: SizeConfigurationData,
        value: SizeValueData
      },
      order: 25,
      icon: "systems/aafo/icons/svg/size.svg",
      title: game.i18n.localize("AAFO.AdvancementSizeTitle"),
      hint: game.i18n.localize("AAFO.AdvancementSizeHint"),
      apps: {
        config: SizeConfig,
        flow: SizeFlow
      }
    });
  }

  /* -------------------------------------------- */
  /*  Instance Properties                         */
  /* -------------------------------------------- */

  /**
   * Hint that will be displayed to players if none is entered.
   * @type {string}
   */
  get automaticHint() {
    if ( !this.configuration.sizes.size ) return "";
    if ( this.configuration.sizes.size === 1 ) return game.i18n.format("AAFO.AdvancementSizeFlowHintSingle", {
      size: CONFIG.AAFO.actorSizes[this.configuration.sizes.first()].label
    });

    const listFormatter = new Intl.ListFormat(game.i18n.lang, { type: "disjunction" });
    return game.i18n.format("AAFO.AdvancementSizeflowHintMultiple", {
      sizes: listFormatter.format(this.configuration.sizes.map(s => CONFIG.AAFO.actorSizes[s].label))
    });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get levels() {
    return [0];
  }

  /* -------------------------------------------- */
  /*  Display Methods                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  summaryForLevel(level, { configMode=false }={}) {
    const sizes = configMode ? Array.from(this.configuration.sizes) : this.value.size ? [this.value.size] : [];
    return sizes.map(s => `<span class="tag">${CONFIG.AAFO.actorSizes[s].label}</span>`).join("");
  }

  /* -------------------------------------------- */
  /*  Editing Methods                             */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static availableForItem(item) {
    return !item.advancement.byType.Size?.length;
  }

  /* -------------------------------------------- */
  /*  Application Methods                         */
  /* -------------------------------------------- */

  /** @inheritdoc */
  async apply(level, data) {
    this.actor.updateSource({"system.traits.size": data.size ?? "med"});
    this.updateSource({ value: data });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async restore(level, data) {
    this.apply(level, data);
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  async reverse(level) {
    this.actor.updateSource({"system.traits.size": "med"});
    this.updateSource({ "value.size": null });
  }
}
