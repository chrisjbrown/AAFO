/**
 * Data definition for Subclass Summary journal entry pages.
 *
 * @property {string} item               UUID of the subclass item included.
 * @property {object} description
 * @property {string} description.value  Introductory description for the subclass.
 */
export default class SubclassJournalPageData extends foundry.abstract.DataModel {
  /** @inheritDoc */
  static defineSchema() {
    return {
      item: new foundry.data.fields.StringField({required: true, label: "JOURNALENTRYPAGE.AAFO.Subclass.Item"}),
      description: new foundry.data.fields.SchemaField({
        value: new foundry.data.fields.HTMLField({
          label: "JOURNALENTRYPAGE.AAFO.Class.Description",
          hint: "JOURNALENTRYPAGE.AAFO.Class.DescriptionHint"
        })
      })
    };
  }
}
