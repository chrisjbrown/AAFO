/**
 * Field for storing movement data.
 */
export default class MovementField extends foundry.data.fields.SchemaField {
  constructor(fields={}, options={}) {
    const numberConfig = { required: true, nullable: true, min: 0, step: 0.1, initial: null };
    fields = {
      burrow: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.MovementBurrow" }),
      climb: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.MovementClimb" }),
      fly: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.MovementFly" }),
      swim: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.MovementSwim" }),
      walk: new foundry.data.fields.NumberField({ ...numberConfig, label: "AAFO.MovementWalk" }),
      units: new foundry.data.fields.StringField({
        required: true, nullable: true, blank: false, initial: null, label: "AAFO.MovementUnits"
      }),
      hover: new foundry.data.fields.BooleanField({required: true, label: "AAFO.MovementHover"}),
      ...fields
    };
    Object.entries(fields).forEach(([k, v]) => !v ? delete fields[k] : null);
    super(fields, { label: "AAFO.Movement", ...options });
  }
}
