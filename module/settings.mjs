import { ModuleArtConfig } from "./module-art.mjs";

/**
 * Register all of the system's settings.
 */
export function registerSystemSettings() {
  // Internal System Migration Version
  game.settings.register("aafo", "systemMigrationVersion", {
    name: "System Migration Version",
    scope: "world",
    config: false,
    type: String,
    default: ""
  });

  // Challenge visibility
  game.settings.register("aafo", "challengeVisibility", {
    name: "SETTINGS.5eChallengeVisibility.Name",
    hint: "SETTINGS.5eChallengeVisibility.Hint",
    scope: "world",
    config: true,
    default: "player",
    type: String,
    choices: {
      all: "SETTINGS.5eChallengeVisibility.All",
      player: "SETTINGS.5eChallengeVisibility.Player",
      none: "SETTINGS.5eChallengeVisibility.None"
    }
  });

  // Encumbrance tracking
  game.settings.register("aafo", "encumbrance", {
    name: "SETTINGS.5eEncumbrance.Name",
    hint: "SETTINGS.5eEncumbrance.Hint",
    scope: "world",
    config: true,
    default: "none",
    type: String,
    choices: {
      none: "SETTINGS.5eEncumbrance.None",
      normal: "SETTINGS.5eEncumbrance.Normal",
      variant: "SETTINGS.5eEncumbrance.Variant"
    }
  });

  // Rest Recovery Rules
  game.settings.register("aafo", "restVariant", {
    name: "SETTINGS.5eRestN",
    hint: "SETTINGS.5eRestL",
    scope: "world",
    config: true,
    default: "normal",
    type: String,
    choices: {
      normal: "SETTINGS.5eRestPHB",
      gritty: "SETTINGS.5eRestGritty",
      epic: "SETTINGS.5eRestEpic"
    }
  });

  // Diagonal Movement Rule
  game.settings.register("aafo", "diagonalMovement", {
    name: "SETTINGS.5eDiagN",
    hint: "SETTINGS.5eDiagL",
    scope: "world",
    config: true,
    default: "555",
    type: String,
    choices: {
      555: "SETTINGS.5eDiagPHB",
      5105: "SETTINGS.5eDiagDMG",
      EUCL: "SETTINGS.5eDiagEuclidean"
    },
    onChange: rule => canvas.grid.diagonalRule = rule
  });

  // Allow rotating square templates
  game.settings.register("aafo", "gridAlignedSquareTemplates", {
    name: "SETTINGS.5eGridAlignedSquareTemplatesN",
    hint: "SETTINGS.5eGridAlignedSquareTemplatesL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Proficiency modifier type
  game.settings.register("aafo", "proficiencyModifier", {
    name: "SETTINGS.5eProfN",
    hint: "SETTINGS.5eProfL",
    scope: "world",
    config: true,
    default: "bonus",
    type: String,
    choices: {
      bonus: "SETTINGS.5eProfBonus",
      dice: "SETTINGS.5eProfDice"
    }
  });

  // Allow feats during Ability Score Improvements
  game.settings.register("aafo", "allowFeats", {
    name: "SETTINGS.5eFeatsN",
    hint: "SETTINGS.5eFeatsL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Use Honor ability score
  game.settings.register("aafo", "honorScore", {
    name: "SETTINGS.5eHonorN",
    hint: "SETTINGS.5eHonorL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Use Sanity ability score
  game.settings.register("aafo", "sanityScore", {
    name: "SETTINGS.5eSanityN",
    hint: "SETTINGS.5eSanityL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true
  });

  // Apply Dexterity as Initiative Tiebreaker
  game.settings.register("aafo", "initiativeDexTiebreaker", {
    name: "SETTINGS.5eInitTBN",
    hint: "SETTINGS.5eInitTBL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Record Currency Weight
  game.settings.register("aafo", "currencyWeight", {
    name: "SETTINGS.5eCurWtN",
    hint: "SETTINGS.5eCurWtL",
    scope: "world",
    config: true,
    default: true,
    type: Boolean
  });

  // Disable Experience Tracking
  game.settings.register("aafo", "disableExperienceTracking", {
    name: "SETTINGS.5eNoExpN",
    hint: "SETTINGS.5eNoExpL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Advancements
  game.settings.register("aafo", "disableAdvancements", {
    name: "SETTINGS.5eNoAdvancementsN",
    hint: "SETTINGS.5eNoAdvancementsL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Disable Concentration Tracking
  game.settings.register("aafo", "disableConcentration", {
    name: "SETTINGS.5eNoConcentrationN",
    hint: "SETTINGS.5eNoConcentrationL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Collapse Item Cards (by default)
  game.settings.register("aafo", "autoCollapseItemCards", {
    name: "SETTINGS.5eAutoCollapseCardN",
    hint: "SETTINGS.5eAutoCollapseCardL",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: s => {
      ui.chat.render();
    }
  });

  // Collapse Chat Card Trays
  game.settings.register("aafo", "autoCollapseChatTrays", {
    name: "SETTINGS.AAFO.COLLAPSETRAYS.Name",
    hint: "SETTINGS.AAFO.COLLAPSETRAYS.Hint",
    scope: "client",
    config: true,
    default: "older",
    type: String,
    choices: {
      never: "SETTINGS.AAFO.COLLAPSETRAYS.Never",
      older: "SETTINGS.AAFO.COLLAPSETRAYS.Older",
      always: "SETTINGS.AAFO.COLLAPSETRAYS.Always"
    }
  });

  // Allow Polymorphing
  game.settings.register("aafo", "allowPolymorphing", {
    name: "SETTINGS.5eAllowPolymorphingN",
    hint: "SETTINGS.5eAllowPolymorphingL",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Polymorph Settings
  game.settings.register("aafo", "polymorphSettings", {
    scope: "client",
    default: {
      keepPhysical: false,
      keepMental: false,
      keepSaves: false,
      keepSkills: false,
      mergeSaves: false,
      mergeSkills: false,
      keepClass: false,
      keepFeats: false,
      keepSpells: false,
      keepItems: false,
      keepBio: false,
      keepVision: true,
      keepSelf: false,
      keepAE: false,
      keepOriginAE: true,
      keepOtherOriginAE: true,
      keepFeatAE: true,
      keepSpellAE: true,
      keepEquipmentAE: true,
      keepClassAE: true,
      keepBackgroundAE: true,
      transformTokens: true
    }
  });

  // Allow Summoning
  game.settings.register("aafo", "allowSummoning", {
    name: "SETTINGS.AAFO.ALLOWSUMMONING.Name",
    hint: "SETTINGS.AAFO.ALLOWSUMMONING.Hint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean
  });

  // Metric Unit Weights
  game.settings.register("aafo", "metricWeightUnits", {
    name: "SETTINGS.5eMetricN",
    hint: "SETTINGS.5eMetricL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Modifiers
  game.settings.register("aafo", "criticalDamageModifiers", {
    name: "SETTINGS.5eCriticalModifiersN",
    hint: "SETTINGS.5eCriticalModifiersL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Critical Damage Maximize
  game.settings.register("aafo", "criticalDamageMaxDice", {
    name: "SETTINGS.5eCriticalMaxDiceN",
    hint: "SETTINGS.5eCriticalMaxDiceL",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  // Strict validation
  game.settings.register("aafo", "strictValidation", {
    scope: "world",
    config: false,
    type: Boolean,
    default: true
  });

  // Dynamic art.
  game.settings.registerMenu("aafo", "moduleArtConfiguration", {
    name: "AAFO.ModuleArtConfigN",
    label: "AAFO.ModuleArtConfigL",
    hint: "AAFO.ModuleArtConfigH",
    icon: "fa-solid fa-palette",
    type: ModuleArtConfig,
    restricted: true
  });

  game.settings.register("aafo", "moduleArtConfiguration", {
    name: "Module Art Configuration",
    scope: "world",
    config: false,
    type: Object,
    default: {
      aafo: {
        portraits: true,
        tokens: true
      }
    }
  });

  // Primary Group
  game.settings.register("aafo", "primaryParty", {
    name: "Primary Party",
    scope: "world",
    config: false,
    default: null,
    type: PrimaryPartyData,
    onChange: s => ui.actors.render()
  });

  // Control hints
  game.settings.register("aafo", "controlHints", {
    name: "AAFO.Controls.Name",
    hint: "AAFO.Controls.Hint",
    scope: "client",
    config: true,
    type: Boolean,
    default: true
  });
}

/**
 * Data model for tracking information on the primary party.
 *
 * @property {Actor5e} actor  Group actor representing the primary party.
 */
class PrimaryPartyData extends foundry.abstract.DataModel {
  static defineSchema() {
    return { actor: new foundry.data.fields.ForeignDocumentField(foundry.documents.BaseActor) };
  }
}

/* -------------------------------------------- */

/**
 * Register additional settings after modules have had a chance to initialize to give them a chance to modify choices.
 */
export function registerDeferredSettings() {
  game.settings.register("aafo", "theme", {
    name: "SETTINGS.AAFO.THEME.Name",
    hint: "SETTINGS.AAFO.THEME.Hint",
    scope: "client",
    config: game.release.generation < 12,
    default: "",
    type: String,
    choices: {
      "": "SHEETS.AAFO.THEME.Automatic",
      ...CONFIG.AAFO.themes
    },
    onChange: s => setTheme(document.body, s)
  });

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("aafo", "theme"));
  });
  matchMedia("(prefers-contrast: more)").addEventListener("change", () => {
    setTheme(document.body, game.settings.get("aafo", "theme"));
  });

  // Hook into core color scheme setting.
  if ( game.release.generation > 11 ) {
    const setting = game.settings.settings.get("core.colorScheme");
    const { onChange } = setting ?? {};
    if ( onChange ) setting.onChange = s => {
      onChange();
      setTheme(document.body, s);
    };
    setTheme(document.body, game.settings.get("core", "colorScheme"));
  }
  else setTheme(document.body, game.settings.get("aafo", "theme"));
}

/* -------------------------------------------- */

/**
 * Set the theme on an element, removing the previous theme class in the process.
 * @param {HTMLElement} element  Body or sheet element on which to set the theme data.
 * @param {string} [theme=""]    Theme key to set.
 * @param {string[]} [flags=[]]  Additional theming flags to set.
 */
export function setTheme(element, theme="", flags=new Set()) {
  element.className = element.className.replace(/\baafo-(theme|flag)-[\w-]+\b/g, "");

  // Primary Theme
  if ( !theme && (element === document.body) ) {
    if ( matchMedia("(prefers-color-scheme: dark)").matches ) theme = "dark";
    if ( matchMedia("(prefers-color-scheme: light)").matches ) theme = "light";
  }
  if ( theme ) {
    element.classList.add(`aafo-theme-${theme.slugify()}`);
    element.dataset.theme = theme;
  }
  else delete element.dataset.theme;

  // Additional Flags
  if ( (element === document.body) && matchMedia("(prefers-contrast: more)").matches ) flags.add("high-contrast");
  for ( const flag of flags ) element.classList.add(`aafo-flag-${flag.slugify()}`);
  element.dataset.themeFlags = Array.from(flags).join(" ");
}
