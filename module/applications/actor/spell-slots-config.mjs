import DialogMixin from "../dialog-mixin.mjs";

export default class ActorSpellSlotsConfig extends DialogMixin(DocumentSheet) {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["aafo2", "dialog"],
      template: "systems/aafo/templates/apps/spell-slots-config.hbs",
      width: 450,
      height: "auto",
      sheetConfig: false,
      submitOnClose: true,
      submitOnChange: true,
      closeOnSubmit: false
    });
  }

  /* -------------------------------------------- */

  /** @inheritDoc */
  get title() {
    return `${game.i18n.localize("AAFO.SpellSlotsConfig")}: ${this.document.name}`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData(options={}) {
    const source = this.document._source.system.spells;
    const { spells } = this.document.system;
    const overrides = Array.fromRange(Object.keys(CONFIG.AAFO.spellLevels).length - 1, 1).map(level => ({
      value: source[`spell${level}`]?.override,
      label: CONFIG.AAFO.spellLevels[level],
      name: `system.spells.spell${level}.override`,
      placeholder: spells[`spell${level}`]?.max ?? 0
    }));

    for ( const k of Object.keys(CONFIG.AAFO.spellcastingTypes) ) {
      const hasSpell = this.document.items.some(i => i.type === "spell" && i.system.preparation.mode === k);
      if ( parseInt(spells[k]?.level) || hasSpell ) overrides.push({
        label: CONFIG.AAFO.spellPreparationModes[k].label,
        value: source[k]?.override,
        name: `system.spells.${k}.override`,
        placeholder: spells[k]?.max ?? 0
      });
    }

    return { overrides };
  }
}
