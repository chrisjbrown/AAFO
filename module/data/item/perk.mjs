import { ItemDataModel } from "../abstract.mjs";
import ActionTemplate from "./templates/action.mjs";
import ActivatedEffectTemplate from "./templates/activated-effect.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import ItemTypeTemplate from "./templates/item-type.mjs";
import { EnchantmentData } from "./fields/enchantment-field.mjs";
import { AdvancementField } from "../fields.mjs";

const { BooleanField, NumberField, SchemaField, SetField, StringField, ArrayField } = foundry.data.fields;

/**
 * Data definition for Perk items.
 * @mixes ItemDescriptionTemplate
 * @mixes ItemTypeTemplate
 * @mixes ActivatedEffectTemplate
 * @mixes ActionTemplate
 *
 * @property {object} prerequisites
 * @property {number} prerequisites.level           Character or class level required to choose this perk.
 * @property {Set<string>} properties               General properties of a perk item.
 * @property {string} requirements                  Actor details required to use this perk.
 * @property {object} recharge                      Details on how a perk can roll for recharges.
 * @property {object[]} advancement                 Advancement objects for this item.
 * @property {number} recharge.value                Minimum number needed to roll on a d6 to recharge this perk.
 * @property {boolean} recharge.charged             Does this perk have a charge remaining?
 */
export default class PerkData extends ItemDataModel.mixin(
  ItemDescriptionTemplate, ItemTypeTemplate, ActivatedEffectTemplate, ActionTemplate
) {

  /** @override */
  static LOCALIZATION_PREFIXES = ["AAFO.Enchantment", "AAFO.Prerequisites"];

  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      prerequisites: new SchemaField({
        level: new NumberField({integer: true, min: 0})
      }),
      properties: new SetField(new StringField(), {
        label: "AAFO.ItemPerkProperties"
      }),
      advancement: new ArrayField(new AdvancementField(), {label: "AAFO.AdvancementTitle"}),
      requirements: new StringField({required: true, nullable: true, label: "AAFO.Requirements"}),
      recharge: new SchemaField({
        value: new NumberField({
          required: true, integer: true, min: 1, label: "AAFO.PerkRechargeOn"
        }),
        charged: new BooleanField({required: true, label: "AAFO.Charged"})
      }, {label: "AAFO.PerkActionRecharge"})
    });
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareDerivedData() {
    super.prepareDerivedData();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  prepareFinalData() {
    this.prepareFinalActivatedEffectData();
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  async getFavoriteData() {
    return foundry.utils.mergeObject(await super.getFavoriteData(), {
      subtitle: [this.parent.labels.activation, this.parent.labels.recovery],
      uses: this.hasLimitedUses ? this.getUsesData() : null
    });
  }

  /* -------------------------------------------- */
  /*  Migrations                                  */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static _migrateData(source) {
    super._migrateData(source);
  }


  /* -------------------------------------------- */
  /*  Getters                                     */
  /* -------------------------------------------- */

  /**
   * Properties displayed in chat.
   * @type {string[]}
   */
  get chatProperties() {
    return [this.requirements];
  }

  /* -------------------------------------------- */

  /**
   * Properties displayed on the item card.
   * @type {string[]}
   */
  get cardProperties() {
    return [this.requirements];
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  get hasLimitedUses() {
    return this.isActive && (!!this.recharge.value || super.hasLimitedUses);
  }

  /* -------------------------------------------- */

  /**
   * Does this perk represent a group of individual enchantments (e.g. the "Infuse Item" perk stores data about
   * all of the character's infusions).
   * @type {boolean}
   */
  get isEnchantmentSource() {
    return EnchantmentData.isEnchantmentSource(this);
  }

  /* -------------------------------------------- */

  /**
   * The proficiency multiplier for this item.
   * @returns {number}
   */
  get proficiencyMultiplier() {
    return 1;
  }
}
