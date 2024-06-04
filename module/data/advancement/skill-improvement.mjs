import { SparseDataModel } from "../abstract.mjs";
import { MappingField } from "../fields.mjs";

/**
 * Data model for the Ability Score Improvement advancement configuration.
 *
 * @property {number} points                 Number of points that can be assigned to any score.
 * @property {Object<string, number>} fixed  Number of points automatically assigned to a certain score.
 */
export class SkillImprovementConfigurationData extends foundry.abstract.DataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      points: new foundry.data.fields.NumberField({
        integer: true, min: 0, initial: 4,
        label: "AAFO.AdvancementSkillImprovementPoints",
        hint: "AAFO.AdvancementSkillImprovementPointsHint"
      })
    };
  }
}

/**
 * Data model for the Ability Score Improvement advancement value.
 *
 * @property {string} type  When on a class, whether the player chose ASI or a Feat.
 * @property {Object<string, number>}  Points assigned to individual scores.
 * @property {Object<string, string>}  Feat that was selected.
 */
export class SkillImprovementValueData extends SparseDataModel {
  /** @inheritdoc */
  static defineSchema() {
    return {
      type: new foundry.data.fields.StringField({
        required: true, initial: "asi", choices: ["asi", "feat"]
      }),
      assignments: new MappingField(new foundry.data.fields.NumberField({
        nullable: false, integer: true
      }), {required: false, initial: undefined})
    };
  }
}
