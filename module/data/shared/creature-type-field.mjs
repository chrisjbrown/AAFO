/**
 * Field for storing creature type data.
 */
export default class CreatureTypeField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    fields = {
      value: new foundry.data.fields.StringField({blank: true, label: "AAFO.CreatureType"}),
      subtype: new foundry.data.fields.StringField({label: "AAFO.CreatureTypeSelectorSubtype"}),
      swarm: new foundry.data.fields.StringField({blank: true, label: "AAFO.CreatureSwarmSize"}),
      custom: new foundry.data.fields.StringField({label: "AAFO.CreatureTypeSelectorCustom"}),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "AAFO.CreatureType", ...options });
  }

  /* -------------------------------------------- */

  /** @inheritdoc */
  initialize(value, model, options={}) {
    const obj = super.initialize(value, model, options);

    Object.defineProperty(obj, "label", {
      get() {
        return aafo.documents.Actor5e.formatCreatureType(this);
      },
      enumerable: false
    });
    Object.defineProperty(obj, "config", {
      get() {
        return CONFIG.AAFO.creatureTypes[this.value];
      },
      enumerable: false
    });

    return obj;
  }
}
