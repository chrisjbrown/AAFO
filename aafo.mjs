/**
 * The D&D fifth edition game system for Foundry Virtual Tabletop
 * A system for playing the fifth edition of the world's most popular role-playing game.
 * Author: Atropos
 * Software License: MIT
 * Content License: https://www.dndbeyond.com/attachments/39j2li89/SRD5.1-CCBY4.0License.pdf
 * Repository: https://github.com/foundryvtt/aafo
 * Issue Tracker: https://github.com/foundryvtt/aafo/issues
 */

// Import Configuration
import AAFO from "./module/config.mjs";
import { registerSystemSettings, registerDeferredSettings } from "./module/settings.mjs";

// Import Submodules
import * as applications from "./module/applications/_module.mjs";
import * as canvas from "./module/canvas/_module.mjs";
import * as dataModels from "./module/data/_module.mjs";
import * as dice from "./module/dice/_module.mjs";
import * as documents from "./module/documents/_module.mjs";
import * as enrichers from "./module/enrichers.mjs";
// import * as migrations from "./module/migration.mjs";
import * as utils from "./module/utils.mjs";
import {ModuleArt} from "./module/module-art.mjs";
import Tooltips5e from "./module/tooltips.mjs";

/* -------------------------------------------- */
/*  Define Module Structure                     */
/* -------------------------------------------- */

globalThis.aafo = {
  applications,
  canvas,
  config: AAFO,
  dataModels,
  dice,
  documents,
  enrichers,
  // migrations,
  utils
};

/* -------------------------------------------- */
/*  Foundry VTT Initialization                  */
/* -------------------------------------------- */

Hooks.once("init", function() {
  globalThis.aafo = game.aafo = Object.assign(game.system, globalThis.aafo);
  console.log(`D&D 5e | Initializing the D&D Fifth Game System - Version ${aafo.version}\n${AAFO.ASCII}`);

  // TODO: Remove when v11 support is dropped.
  CONFIG.compatibility.excludePatterns.push(/\{\{filePicker}}/);
  CONFIG.compatibility.excludePatterns.push(/foundry\.dice\.terms/);
  CONFIG.compatibility.excludePatterns.push(/core\.sourceId/);
  if ( game.release.generation < 12 ) Math.clamp = Math.clamped;

  // Record Configuration Values
  CONFIG.AAFO = AAFO;
  CONFIG.ActiveEffect.documentClass = documents.ActiveEffect5e;
  CONFIG.ActiveEffect.legacyTransferral = false;
  CONFIG.Actor.documentClass = documents.Actor5e;
  CONFIG.ChatMessage.documentClass = documents.ChatMessage5e;
  CONFIG.Combat.documentClass = documents.Combat5e;
  CONFIG.Combatant.documentClass = documents.Combatant5e;
  CONFIG.Item.collection = dataModels.collection.Items5e;
  CONFIG.Item.compendiumIndexFields.push("system.container");
  CONFIG.Item.documentClass = documents.Item5e;
  CONFIG.Token.documentClass = documents.TokenDocument5e;
  CONFIG.Token.objectClass = canvas.Token5e;
  CONFIG.Token.ringClass = canvas.TokenRing;
  CONFIG.User.documentClass = documents.User5e;
  CONFIG.time.roundTime = 6;
  Roll.TOOLTIP_TEMPLATE = "systems/aafo/templates/chat/roll-breakdown.hbs";
  CONFIG.Dice.DamageRoll = dice.DamageRoll;
  CONFIG.Dice.D20Roll = dice.D20Roll;
  CONFIG.MeasuredTemplate.defaults.angle = 53.13; // 5e cone RAW should be 53.13 degrees
  CONFIG.Note.objectClass = canvas.Note5e;
  CONFIG.ui.combat = applications.combat.CombatTracker5e;
  CONFIG.ui.items = aafo.applications.item.ItemDirectory5e;

  // Register System Settings
  registerSystemSettings();

  // Configure module art
  game.aafo.moduleArt = new ModuleArt();

  // Configure tooltips
  game.aafo.tooltips = new Tooltips5e();

  // Set up status effects
  _configureStatusEffects();

  // Remove honor & sanity from configuration if they aren't enabled
  if ( !game.settings.get("aafo", "honorScore") ) delete AAFO.abilities.hon;
  if ( !game.settings.get("aafo", "sanityScore") ) delete AAFO.abilities.san;

  // Register Roll Extensions
  CONFIG.Dice.rolls.push(dice.D20Roll);
  CONFIG.Dice.rolls.push(dice.DamageRoll);

  // Hook up system data types
  CONFIG.Actor.dataModels = dataModels.actor.config;
  CONFIG.Item.dataModels = dataModels.item.config;
  CONFIG.JournalEntryPage.dataModels = dataModels.journal.config;

  // Add fonts
  _configureFonts();

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("aafo", applications.actor.ActorSheet5eCharacter, {
    types: ["character"],
    label: "AAFO.SheetClassCharacterLegacy"
  });
  DocumentSheetConfig.registerSheet(Actor, "aafo", applications.actor.ActorSheet5eCharacter2, {
    types: ["character"],
    makeDefault: true,
    label: "AAFO.SheetClassCharacter"
  });
  Actors.registerSheet("aafo", applications.actor.ActorSheet5eNPC, {
    types: ["npc"],
    makeDefault: true,
    label: "AAFO.SheetClassNPC"
  });
  Actors.registerSheet("aafo", applications.actor.ActorSheet5eVehicle, {
    types: ["vehicle"],
    makeDefault: true,
    label: "AAFO.SheetClassVehicle"
  });
  Actors.registerSheet("aafo", applications.actor.GroupActorSheet, {
    types: ["group"],
    makeDefault: true,
    label: "AAFO.SheetClassGroup"
  });

  DocumentSheetConfig.unregisterSheet(Item, "core", ItemSheet);
  DocumentSheetConfig.registerSheet(Item, "aafo", applications.item.ItemSheet5e, {
    makeDefault: true,
    label: "AAFO.SheetClassItem"
  });
  DocumentSheetConfig.unregisterSheet(Item, "aafo", applications.item.ItemSheet5e, { types: ["container"] });
  DocumentSheetConfig.registerSheet(Item, "aafo", applications.item.ContainerSheet, {
    makeDefault: true,
    types: ["container"],
    label: "AAFO.SheetClassContainer"
  });

  DocumentSheetConfig.registerSheet(JournalEntry, "aafo", applications.journal.JournalSheet5e, {
    makeDefault: true,
    label: "AAFO.SheetClassJournalEntry"
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "aafo", applications.journal.JournalClassPageSheet, {
    label: "AAFO.SheetClassClassSummary",
    types: ["class", "subclass"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "aafo", applications.journal.JournalMapLocationPageSheet, {
    label: "AAFO.SheetClassMapLocation",
    types: ["map"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "aafo", applications.journal.JournalRulePageSheet, {
    label: "AAFO.SheetClassRule",
    types: ["rule"]
  });
  DocumentSheetConfig.registerSheet(JournalEntryPage, "aafo", applications.journal.JournalSpellListPageSheet, {
    label: "AAFO.SheetClassSpellList",
    types: ["spells"]
  });

  CONFIG.Token.prototypeSheetClass = applications.TokenConfig5e;
  DocumentSheetConfig.unregisterSheet(TokenDocument, "core", TokenConfig);
  DocumentSheetConfig.registerSheet(TokenDocument, "aafo", applications.TokenConfig5e, {
    label: "AAFO.SheetClassToken"
  });

  // Preload Handlebars helpers & partials
  utils.registerHandlebarsHelpers();
  utils.preloadHandlebarsTemplates();

  // Enrichers
  enrichers.registerCustomEnrichers();

  // Exhaustion handling
  documents.ActiveEffect5e.registerHUDListeners();
});

/* -------------------------------------------- */

/**
 * Configure explicit lists of attributes that are trackable on the token HUD and in the combat tracker.
 * @internal
 */
function _configureTrackableAttributes() {
  const common = {
    bar: [],
    value: [
      ...Object.keys(AAFO.abilities).map(ability => `abilities.${ability}.value`),
      ...Object.keys(AAFO.movementTypes).map(movement => `attributes.movement.${movement}`),
      "attributes.ac.value", "attributes.init.total"
    ]
  };

  const altSpells = Object.entries(AAFO.spellPreparationModes).reduce((acc, [k, v]) => {
    if ( !["prepared", "always"].includes(k) && v.upcast ) acc.push(`spells.${k}`);
    return acc;
  }, []);

  const creature = {
    bar: [
      ...common.bar,
      "attributes.hp",
      ...altSpells,
      ...Array.fromRange(Object.keys(AAFO.spellLevels).length - 1, 1).map(l => `spells.spell${l}`)
    ],
    value: [
      ...common.value,
      ...Object.keys(AAFO.skills).map(skill => `skills.${skill}.value`),
      ...Object.keys(AAFO.senses).map(sense => `attributes.senses.${sense}`),
      "attributes.spelldc"
    ]
  };

  CONFIG.Actor.trackableAttributes = {
    character: {
      bar: [...creature.bar, "resources.primary", "resources.secondary", "resources.tertiary", "details.xp"],
      value: [...creature.value]
    },
    npc: {
      bar: [...creature.bar, "resources.legact", "resources.legres"],
      value: [...creature.value, "details.cr", "details.spellLevel", "details.xp.value"]
    },
    vehicle: {
      bar: [...common.bar, "attributes.hp"],
      value: [...common.value]
    },
    group: {
      bar: [],
      value: []
    }
  };
}

/* -------------------------------------------- */

/**
 * Configure which attributes are available for item consumption.
 * @internal
 */
function _configureConsumableAttributes() {
  const altSpells = Object.entries(AAFO.spellPreparationModes).reduce((acc, [k, v]) => {
    if ( !["prepared", "always"].includes(k) && v.upcast ) acc.push(`spells.${k}.value`);
    return acc;
  }, []);

  CONFIG.AAFO.consumableResources = [
    ...Object.keys(AAFO.abilities).map(ability => `abilities.${ability}.value`),
    "attributes.ac.flat",
    "attributes.hp.value",
    ...Object.keys(AAFO.senses).map(sense => `attributes.senses.${sense}`),
    ...Object.keys(AAFO.movementTypes).map(type => `attributes.movement.${type}`),
    ...Object.keys(AAFO.currencies).map(denom => `currency.${denom}`),
    "details.xp.value",
    "resources.primary.value", "resources.secondary.value", "resources.tertiary.value",
    "resources.legact.value", "resources.legres.value",
    ...altSpells,
    ...Array.fromRange(Object.keys(AAFO.spellLevels).length - 1, 1).map(level => `spells.spell${level}.value`)
  ];
}

/* -------------------------------------------- */

/**
 * Configure additional system fonts.
 */
function _configureFonts() {
  Object.assign(CONFIG.fontDefinitions, {
    Roboto: {
      editor: true,
      fonts: [
        { urls: ["systems/aafo/fonts/roboto/Roboto-Regular.woff2"] },
        { urls: ["systems/aafo/fonts/roboto/Roboto-Bold.woff2"], weight: "bold" },
        { urls: ["systems/aafo/fonts/roboto/Roboto-Italic.woff2"], style: "italic" },
        { urls: ["systems/aafo/fonts/roboto/Roboto-BoldItalic.woff2"], weight: "bold", style: "italic" }
      ]
    },
    "Roboto Condensed": {
      editor: true,
      fonts: [
        { urls: ["systems/aafo/fonts/roboto-condensed/RobotoCondensed-Regular.woff2"] },
        { urls: ["systems/aafo/fonts/roboto-condensed/RobotoCondensed-Bold.woff2"], weight: "bold" },
        { urls: ["systems/aafo/fonts/roboto-condensed/RobotoCondensed-Italic.woff2"], style: "italic" },
        {
          urls: ["systems/aafo/fonts/roboto-condensed/RobotoCondensed-BoldItalic.woff2"], weight: "bold",
          style: "italic"
        }
      ]
    },
    "Roboto Slab": {
      editor: true,
      fonts: [
        { urls: ["systems/aafo/fonts/roboto-slab/RobotoSlab-Regular.ttf"] },
        { urls: ["systems/aafo/fonts/roboto-slab/RobotoSlab-Bold.ttf"], weight: "bold" }
      ]
    }
  });
}

/* -------------------------------------------- */

/**
 * Configure system status effects.
 */
function _configureStatusEffects() {
  const addEffect = (effects, {special, ...data}) => {
    data = foundry.utils.deepClone(data);
    data._id = utils.staticID(`aafo${data.id}`);
    if ( foundry.utils.isNewerVersion(game.version, 12) ) {
      data.img = data.icon ?? data.img;
      delete data.icon;
    }
    effects.push(data);
    if ( special ) CONFIG.specialStatusEffects[special] = data.id;
  };
  CONFIG.statusEffects = Object.entries(CONFIG.AAFO.statusEffects).reduce((arr, [id, data]) => {
    const original = CONFIG.statusEffects.find(s => s.id === id);
    addEffect(arr, foundry.utils.mergeObject(original ?? {}, { id, ...data }, { inplace: false }));
    return arr;
  }, []);
  for ( const [id, {label: name, ...data}] of Object.entries(CONFIG.AAFO.conditionTypes) ) {
    addEffect(CONFIG.statusEffects, { id, name, ...data });
  }
}

/* -------------------------------------------- */
/*  Foundry VTT Setup                           */
/* -------------------------------------------- */

/**
 * Prepare attribute lists.
 */
Hooks.once("setup", function() {
  // Configure trackable & consumable attributes.
  _configureTrackableAttributes();
  _configureConsumableAttributes();

  CONFIG.AAFO.trackableAttributes = expandAttributeList(CONFIG.AAFO.trackableAttributes);
  game.aafo.moduleArt.registerModuleArt();
  Tooltips5e.activateListeners();
  game.aafo.tooltips.observe();

  // Register settings after modules have had a chance to initialize
  registerDeferredSettings();

  // Apply table of contents compendium style if specified in flags
  // game.packs
  //   .filter(p => p.metadata.flags?.display === "table-of-contents")
  //   .forEach(p => p.applicationClass = applications.journal.TableOfContentsCompendium);

  // Apply custom item compendium
  game.packs.filter(p => p.metadata.type === "Item")
    .forEach(p => p.applicationClass = applications.item.ItemCompendium5e);

  // Configure token rings
  CONFIG.AAFO.tokenRings.shaderClass ??= canvas.TokenRingSamplerShaderV11;
  CONFIG.Token.ringClass.initialize();
});

/* --------------------------------------------- */

/**
 * Expand a list of attribute paths into an object that can be traversed.
 * @param {string[]} attributes  The initial attributes configuration.
 * @returns {object}  The expanded object structure.
 */
function expandAttributeList(attributes) {
  return attributes.reduce((obj, attr) => {
    foundry.utils.setProperty(obj, attr, true);
    return obj;
  }, {});
}

/* --------------------------------------------- */

/**
 * Perform one-time pre-localization and sorting of some configuration objects
 */
Hooks.once("i18nInit", () => utils.performPreLocalization(CONFIG.AAFO));

/* -------------------------------------------- */
/*  Foundry VTT Ready                           */
/* -------------------------------------------- */

/**
 * Once the entire VTT framework is initialized, check to see if we should perform a data migration
 */
Hooks.once("ready", function() {
  // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
  Hooks.on("hotbarDrop", (bar, data, slot) => {
    if ( ["Item", "ActiveEffect"].includes(data.type) ) {
      documents.macro.create5eMacro(data, slot);
      return false;
    }
  });

  // Determine whether a system migration is required and feasible
  if ( !game.user.isGM ) return;
  const cv = game.settings.get("aafo", "systemMigrationVersion") || game.world.flags.aafo?.version;
  const totalDocuments = game.actors.size + game.scenes.size + game.items.size;
  if ( !cv && totalDocuments === 0 ) return game.settings.set("aafo", "systemMigrationVersion", game.system.version);
  if ( cv && !foundry.utils.isNewerVersion(game.system.flags.needsMigrationVersion, cv) ) return;

  // Compendium pack folder migration.
  if ( foundry.utils.isNewerVersion("3.0.0", cv) ) {
    migrations.reparentCompendiums("aafo SRD Content", "D&D SRD Content");
  }

  // Perform the migration
  if ( cv && foundry.utils.isNewerVersion(game.system.flags.compatibleMigrationVersion, cv) ) {
    ui.notifications.error("MIGRATION.5eVersionTooOldWarning", {localize: true, permanent: true});
  }
  migrations.migrateWorld();
});

/* -------------------------------------------- */
/*  Canvas Initialization                       */
/* -------------------------------------------- */

Hooks.on("canvasInit", gameCanvas => {
  if ( game.release.generation < 12 ) {
    gameCanvas.grid.diagonalRule = game.settings.get("aafo", "diagonalMovement");
    SquareGrid.prototype.measureDistances = canvas.measureDistances;
  }
  CONFIG.Token.ringClass.pushToLoad(gameCanvas.loadTexturesOptions.additionalSources);
});

/* -------------------------------------------- */
/*  Canvas Draw                                 */
/* -------------------------------------------- */

Hooks.on("canvasDraw", gameCanvas => {
  // The sprite sheet has been loaded now, we can create the uvs for each texture
  CONFIG.Token.ringClass.createAssetsUVs();
});

/* -------------------------------------------- */
/*  System Styling                              */
/* -------------------------------------------- */

Hooks.on("renderPause", (app, [html]) => {
  html.classList.add("aafo2");
  const img = html.querySelector("img");
  img.src = "systems/aafo/ui/official/ampersand.svg";
  img.className = "";
});

Hooks.on("renderSettings", (app, [html]) => {
  const details = html.querySelector("#game-details");
  const pip = details.querySelector(".system-info .update");
  details.querySelector(".system").remove();

  const heading = document.createElement("div");
  heading.classList.add("aafo2", "sidebar-heading");
  heading.innerHTML = `
    <h2>${game.i18n.localize("WORLD.GameSystem")}</h2>
    <ul class="links">
      <li>
        <a href="https://github.com/foundryvtt/aafo/releases/latest" target="_blank">
          ${game.i18n.localize("AAFO.Notes")}
        </a>
      </li>
      <li>
        <a href="https://github.com/foundryvtt/aafo/issues" target="_blank">${game.i18n.localize("AAFO.Issues")}</a>
      </li>
      <li>
        <a href="https://github.com/foundryvtt/aafo/wiki" target="_blank">${game.i18n.localize("AAFO.Wiki")}</a>
      </li>
      <li>
        <a href="https://discord.com/channels/170995199584108546/670336046164213761" target="_blank">
          ${game.i18n.localize("AAFO.Discord")}
        </a>
      </li>
    </ul>
  `;
  details.insertAdjacentElement("afterend", heading);

  const badge = document.createElement("div");
  badge.classList.add("aafo2", "system-badge");
  badge.innerHTML = `
    <img src="systems/aafo/ui/official/dnd-badge-32.webp" data-tooltip="${aafo.title}" alt="${aafo.title}">
    <span class="system-info">${aafo.version}</span>
  `;
  if ( pip ) badge.querySelector(".system-info").insertAdjacentElement("beforeend", pip);
  heading.insertAdjacentElement("afterend", badge);
});

/* -------------------------------------------- */
/*  Other Hooks                                 */
/* -------------------------------------------- */

Hooks.on("renderChatPopout", documents.ChatMessage5e.onRenderChatPopout);
Hooks.on("getChatLogEntryContext", documents.ChatMessage5e.addChatMessageContextOptions);

Hooks.on("renderChatLog", (app, html, data) => {
  documents.Item5e.chatListeners(html);
  documents.ChatMessage5e.onRenderChatLog(html);
});
Hooks.on("renderChatPopout", (app, html, data) => documents.Item5e.chatListeners(html));

Hooks.on("chatMessage", (app, message, data) => applications.Award.chatMessage(message));

Hooks.on("renderActorDirectory", (app, html, data) => documents.Actor5e.onRenderActorDirectory(html));
Hooks.on("getActorDirectoryEntryContext", documents.Actor5e.addDirectoryContextOptions);

Hooks.on("getCompendiumEntryContext", documents.Item5e.addCompendiumContextOptions);
Hooks.on("getItemDirectoryEntryContext", documents.Item5e.addDirectoryContextOptions);

Hooks.on("renderJournalPageSheet", applications.journal.JournalSheet5e.onRenderJournalPageSheet);

Hooks.on("targetToken", canvas.Token5e.onTargetToken);

/* -------------------------------------------- */
/*  Bundled Module Exports                      */
/* -------------------------------------------- */

export {
  applications,
  canvas,
  dataModels,
  dice,
  documents,
  enrichers,
  // migrations,
  utils,
  AAFO
};
