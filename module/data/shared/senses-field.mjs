/**
 * Field for storing senses data.
 */
export default class SensesField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    const numberConfig = { required: true, nullable: true, integer: true, min: 0, initial: null };
    fields = {
      darkvision: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.SenseDarkvision" }),
      blindsight: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.SenseBlindsight" }),
      tremorsense: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.SenseTremorsense" }),
      truesight: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.SenseTruesight" }),
      units: new foundry.data.fields.StringField({
        required: true, nullable: true, blank: false, initial: null, label: "AAFO.SenseUnits"
      }),
      special: new foundry.data.fields.StringField({required: true, label: "AAFO.SenseSpecial"}),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "AAFO.Senses", ...options });
  }
}
