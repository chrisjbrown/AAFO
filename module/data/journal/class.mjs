/**
 * Data definition for Class Summary journal entry pages.
 *
 * @property {string} item                             UUID of the class item included.
 * @property {object} description
 * @property {string} description.value                Introductory description for the class.
 * @property {string} description.additionalHitPoints  Additional text displayed beneath the hit points section.
 * @property {string} description.additionalTraits     Additional text displayed beneath the traits section.
 * @property {string} description.additionalEquipment  Additional text displayed beneath the equipment section.
 * @property {string} description.subclass             Introduction to the subclass section.
 * @property {string} subclassHeader                   Subclass header to replace the default.
 * @property {Set<string>} subclassItems               UUIDs of all subclasses to display.
 */
export default class ClassJournalPageData extends foundry.abstract.DataModel {
  /** @inheritDoc */
  static defineSchema() {
    return {
      item: new foundry.data.fields.StringField({required: true, label: "JOURNALENTRYPAGE.AAFO.Class.Item"}),
      description: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.Description",
          hint: "JOURNALENTRYPAGE.AAFO.Class.DescriptionHint"
        }),
        additionalHitPoints: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.AdditionalHitPoints",
          hint: "JOURNALENTRYPAGE.AAFO.Class.AdditionalHitPointsHint"
        }),
        additionalTraits: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.AdditionalTraits",
          hint: "JOURNALENTRYPAGE.AAFO.Class.AdditionalTraitsHint"
        }),
        additionalEquipment: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.AdditionalEquipment",
          hint: "JOURNALENTRYPAGE.AAFO.Class.AdditionalEquipmentHint"
        }),
        subclass: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.SubclassDescription",
          hint: "JOURNALENTRYPAGE.AAFO.Class.SubclassDescriptionHint"
        })
      }),
      subclassHeader: new foundry.data.fields.StringField({
        label: "JOURNALENTRYPAGE.AAFO.Class.SubclassHeader"
      }),
      subclassItems: new foundry.data.fields.SetField(new foundry.data.fields.StringField(), {
        label: "JOURNALENTRYPAGE.AAFO.Class.SubclassItems"
      })
    };
  }
}
