import * as advancement from "./documents/advancement/_module.mjs";
import { preLocalize } from "./utils.mjs";

// Namespace Configuration Values
const AAFO = {};

// ASCII Artwork
AAFO.ASCII = `_______________________________
______      ______ _____ _____`;

/**
 * Configuration data for abilities.
 *
 * @typedef {object} AbilityConfiguration
 * @property {string} label                               Localized label.
 * @property {string} abbreviation                        Localized abbreviation.
 * @property {string} fullKey                             Fully written key used as alternate for enrichers.
 * @property {string} [reference]                         Reference to a rule page describing this ability.
 * @property {string} [type]                              Whether this is a "physical" or "mental" ability.
 * @property {Object<string, number|string>}  [defaults]  Default values for this ability based on actor type.
 *                                                        If a string is used, the system will attempt to fetch.
 *                                                        the value of the specified ability.
 */

/**
 * The set of Ability Scores used within the system.
 * @enum {AbilityConfiguration}
 */
AAFO.abilities = {
  str: {
    label: "AAFO.AbilityStr",
    abbreviation: "AAFO.AbilityStrAbbr",
    type: "physical",
    fullKey: "strength",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.0q7rEvWoNqqd5U1z"
  },
  per: {
    label: "AAFO.AbilityPer",
    abbreviation: "AAFO.AbilityPerAbbr",
    type: "mental",
    fullKey: "perception",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.uPxl9uOeWO8xT8TT"
  },
  end: {
    label: "AAFO.AbilityEnd",
    abbreviation: "AAFO.AbilityEndAbbr",
    type: "physical",
    fullKey: "endurance",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.NJzZnHjYTMfvx0UR"
  },
  cha: {
    label: "AAFO.AbilityCha",
    abbreviation: "AAFO.AbilityChaAbbr",
    type: "mental",
    fullKey: "charisma",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.4rWlS9gfiGrkr9KD"
  },
  int: {
    label: "AAFO.AbilityInt",
    abbreviation: "AAFO.AbilityIntAbbr",
    type: "mental",
    fullKey: "intelligence",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.x2BBRe7oeGHB9CWI"
  },
  agi: {
    label: "AAFO.AbilityAgi",
    abbreviation: "AAFO.AbilityAgiAbbr",
    type: "physical",
    fullKey: "agility",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.IF1Wi7XLSSVVe3oP"
  },
  luc: {
    label: "AAFO.AbilityLuc",
    abbreviation: "AAFO.AbilityLucAbbr",
    type: "mental",
    fullKey: "luck",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.zeSPClOtaMa6ssoT.JournalEntryPage.WKAbq1o67ZKGvgYT"
  }
};
preLocalize("abilities", { keys: ["label", "abbreviation"] });

/**
 * Configure which ability score is used as the default modifier for initiative rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
AAFO.defaultAbilities = {
  actionPoints: "agi",
  staminaPoints: "agi",
  initiative: "per",
  hitPoints: "end",
  concentration: "con"
};

Object.defineProperties(AAFO, {
  hitPointsAbility: {
    get: function() {
      foundry.utils.logCompatibilityWarning(
        "AAFO.hitPointsAbility has been deprecated and is now accessible through AAFO.defaultAbilities.hitPoints.",
        { since: "aafo 3.1", until: "aafo 3.3" }
      );
      return AAFO.defaultAbilities.hitPoints;
    },
    set: function(value) {
      foundry.utils.logCompatibilityWarning(
        "AAFO.hitPointsAbility has been deprecated and is now accessible through AAFO.defaultAbilities.hitPoints.",
        { since: "aafo 3.1", until: "aafo 3.3" }
      );
      AAFO.defaultAbilities.hitPoints = value;
    }
  },
  initiativeAbility: {
    get: function() {
      foundry.utils.logCompatibilityWarning(
        "AAFO.initiativeAbility has been deprecated and is now accessible through AAFO.defaultAbilities.initiative.",
        { since: "aafo 3.1", until: "aafo 3.3" }
      );
      return AAFO.defaultAbilities.initiative;
    },
    set: function(value) {
      foundry.utils.logCompatibilityWarning(
        "AAFO.initiativeAbility has been deprecated and is now accessible through AAFO.defaultAbilities.initiative.",
        { since: "aafo 3.1", until: "aafo 3.3" }
      );
      AAFO.defaultAbilities.initiative = value;
    }
  }
});

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label        Localized label.
 * @property {string} ability      Key for the default ability used by this skill.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this skill.
 */

/**
 * The set of skill which can be trained with their default ability scores.
 * @enum {SkillConfiguration}
 */
AAFO.skills = {
  bar: {
    label: "AAFO.SkillBar",
    ability: "cha",
    fullKey: "barter",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.WUjTPH6uJReguW5K",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  bre: {
    label: "AAFO.SkillBre",
    ability: "per",
    fullKey: "breach",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.HqwTYG5OJ2eCi9Bs",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  cra: {
    label: "AAFO.SkillCra",
    ability: "int",
    fullKey: "crafting",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.FP7yNc6675eqYWrL",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  ene: {
    label: "AAFO.SkillEne",
    ability: "per",
    fullKey: "energyWeapons",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.OoEa5aDLtZ6NsJhF",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  exp: {
    label: "AAFO.SkillExp",
    ability: "per",
    fullKey: "explosives",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.il8jHJozMFLXPOVN",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  gun: {
    label: "AAFO.SkillGun",
    ability: "agi",
    fullKey: "guns",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.K5D0X5X405JuTjEy",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  int: {
    label: "AAFO.SkillInt",
    ability: "str",
    fullKey: "intimidation",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.I6TuaBBAEVeONEDH",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  med: {
    label: "AAFO.SkillMed",
    ability: "per",
    fullKey: "medicine",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.QW6wjA6eqiDmuGbe",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  mel: {
    label: "AAFO.SkillMel",
    ability: "str",
    fullKey: "meleeWeapons",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.kQBJ1MNQ2c7daseF",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  sci: {
    label: "AAFO.SkillSci",
    ability: "int",
    fullKey: "Science",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.87LMuY3vnITlrgsv",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  sne: {
    label: "AAFO.SkillSne",
    ability: "agi",
    fullKey: "sneak",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.Lx12n8hGxid6O4jA",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  spe: {
    label: "AAFO.SkillSpe",
    ability: "cha",
    fullKey: "speech",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.54ZXrOgZ5opJjsEh",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  sur: {
    label: "AAFO.SkillSur",
    ability: "end",
    fullKey: "survival",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.KZ0w2OnGfFduAjqy",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  },
  una: {
    label: "AAFO.SkillUna",
    ability: "str",
    fullKey: "unarmed",
    reference: "Compendium.aafo.rulesaafo.JournalEntry.uKV8DckbM3zk56Rv.JournalEntryPage.r4Q23YDQbFTReQg5",
    icon: "icons/equipment/feet/shoes-simple-leaf-green.webp"
  }
};
preLocalize("skills", { key: "label", sort: true });
/* -------------------------------------------- */

/**
 * Configuration data for penalties.
 *
 * @typedef {object} PenaltyConfiguration
 * @property {string} label        Localized label.
 * @property {string} [reference]  Reference to a rule page describing this skill.
 */

/**
 * The set of penalties
 * @enum {PenaltyConfiguration}
 */
AAFO.penalties = {
  hunger: {
    label: "AAFO.Hunger",
    reference: "",
    icon: ""
  },
  fatigue: {
    label: "AAFO.Fatigue",
    reference: "",
    icon: ""
  },
  dehydration: {
    label: "AAFO.Dehydration",
    reference: "",
    icon: ""
  },
  radiation: {
    label: "AAFO.Radiation",
    reference: "",
    icon: ""
  },
  exhaustion: {
    label: "AAFO.Exhaustion",
    reference: "",
    icon: ""
  }
};
preLocalize("penalties", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Character alignment options.
 * @enum {string}
 */
AAFO.alignments = {
  lg: "AAFO.AlignmentLG",
  ng: "AAFO.AlignmentNG",
  cg: "AAFO.AlignmentCG",
  ln: "AAFO.AlignmentLN",
  tn: "AAFO.AlignmentTN",
  cn: "AAFO.AlignmentCN",
  le: "AAFO.AlignmentLE",
  ne: "AAFO.AlignmentNE",
  ce: "AAFO.AlignmentCE"
};
preLocalize("alignments");

/* -------------------------------------------- */

/**
 * An enumeration of item attunement types.
 * @enum {string}
 */
AAFO.attunementTypes = {
  required: "AAFO.AttunementRequired",
  optional: "AAFO.AttunementOptional"
};
preLocalize("attunementTypes");

/**
 * An enumeration of item attunement states.
 * @type {{"0": string, "1": string, "2": string}}
 * @deprecated since 3.2, available until 3.4
 */
AAFO.attunements = {
  0: "AAFO.AttunementNone",
  1: "AAFO.AttunementRequired",
  2: "AAFO.AttunementAttuned"
};
preLocalize("attunements");

/* -------------------------------------------- */

/**
 * General weapon categories.
 * @enum {string}
 */
AAFO.weaponProficiencies = {
  sim: "AAFO.WeaponSimpleProficiency",
  mar: "AAFO.WeaponMartialProficiency"
};
preLocalize("weaponProficiencies");

/**
 * A mapping between `AAFO.weaponTypes` and `AAFO.weaponProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
AAFO.weaponProficienciesMap = {
  simpleM: "sim",
  simpleR: "sim",
  martialM: "mar",
  martialR: "mar"
};

/**
 * The basic weapon types in 5e. This enables specific weapon proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
AAFO.weaponIds = {
  battleaxe: "I0WocDSuNpGJayPb",
  blowgun: "wNWK6yJMHG9ANqQV",
  club: "nfIRTECQIG81CvM4",
  dagger: "0E565kQUBmndJ1a2",
  dart: "3rCO8MTIdPGSW6IJ",
  flail: "UrH3sMdnUDckIHJ6",
  glaive: "rOG1OM2ihgPjOvFW",
  greataxe: "1Lxk6kmoRhG8qQ0u",
  greatclub: "QRCsxkCwWNwswL9o",
  greatsword: "xMkP8BmFzElcsMaR",
  halberd: "DMejWAc8r8YvDPP1",
  handaxe: "eO7Fbv5WBk5zvGOc",
  handcrossbow: "qaSro7kFhxD6INbZ",
  heavycrossbow: "RmP0mYRn2J7K26rX",
  javelin: "DWLMnODrnHn8IbAG",
  lance: "RnuxdHUAIgxccVwj",
  lightcrossbow: "ddWvQRLmnnIS0eLF",
  lighthammer: "XVK6TOL4sGItssAE",
  longbow: "3cymOVja8jXbzrdT",
  longsword: "10ZP2Bu3vnCuYMIB",
  mace: "Ajyq6nGwF7FtLhDQ",
  maul: "DizirD7eqjh8n95A",
  morningstar: "dX8AxCh9o0A9CkT3",
  net: "aEiM49V8vWpWw7rU",
  pike: "tC0kcqZT9HHAO0PD",
  quarterstaff: "g2dWN7PQiMRYWzyk",
  rapier: "Tobce1hexTnDk4sV",
  scimitar: "fbC0Mg1a73wdFbqO",
  shortsword: "osLzOwQdPtrK3rQH",
  sickle: "i4NeNZ30ycwPDHMx",
  spear: "OG4nBBydvmfWYXIk",
  shortbow: "GJv6WkD7D2J6rP6M",
  sling: "3gynWO9sN4OLGMWD",
  trident: "F65ANO66ckP8FDMa",
  warpick: "2YdfjN1PIIrSHZii",
  warhammer: "F0Df164Xv1gWcYt0",
  whip: "QKTyxoO0YDnAsbYe"
};

/* -------------------------------------------- */

/**
 * The basic ammunition types.
 * @enum {string}
 */
AAFO.ammoIds = {
  arrow: "3c7JXOzsv55gqJS5",
  blowgunNeedle: "gBQ8xqTA5f8wP5iu",
  crossbowBolt: "SItCnYBqhzqBoaWG",
  slingBullet: "z9SbsMIBZzuhZOqT"
};

/* -------------------------------------------- */

/**
 * The categories into which Tool items can be grouped.
 *
 * @enum {string}
 */
AAFO.toolTypes = {
  art: "AAFO.ToolArtisans",
  game: "AAFO.ToolGamingSet",
  music: "AAFO.ToolMusicalInstrument"
};
preLocalize("toolTypes", { sort: true });

/**
 * The categories of tool proficiencies that a character can gain.
 *
 * @enum {string}
 */
AAFO.toolProficiencies = {
  ...AAFO.toolTypes,
  vehicle: "AAFO.ToolVehicle"
};
preLocalize("toolProficiencies", { sort: true });

/**
 * The basic tool types in 5e. This enables specific tool proficiencies or
 * starting equipment provided by classes and backgrounds.
 * @enum {string}
 */
AAFO.toolIds = {
  alchemist: "SztwZhbhZeCqyAes",
  bagpipes: "yxHi57T5mmVt0oDr",
  brewer: "Y9S75go1hLMXUD48",
  calligrapher: "jhjo20QoiD5exf09",
  card: "YwlHI3BVJapz4a3E",
  carpenter: "8NS6MSOdXtUqD7Ib",
  cartographer: "fC0lFK8P4RuhpfaU",
  chess: "23y8FvWKf9YLcnBL",
  cobbler: "hM84pZnpCqKfi8XH",
  cook: "Gflnp29aEv5Lc1ZM",
  dice: "iBuTM09KD9IoM5L8",
  disg: "IBhDAr7WkhWPYLVn",
  drum: "69Dpr25pf4BjkHKb",
  dulcimer: "NtdDkjmpdIMiX7I2",
  flute: "eJOrPcAz9EcquyRQ",
  forg: "cG3m4YlHfbQlLEOx",
  glassblower: "rTbVrNcwApnuTz5E",
  herb: "i89okN7GFTWHsvPy",
  horn: "aa9KuBy4dst7WIW9",
  jeweler: "YfBwELTgPFHmQdHh",
  leatherworker: "PUMfwyVUbtyxgYbD",
  lute: "qBydtUUIkv520DT7",
  lyre: "EwG1EtmbgR3bM68U",
  mason: "skUih6tBvcBbORzA",
  navg: "YHCmjsiXxZ9UdUhU",
  painter: "ccm5xlWhx74d6lsK",
  panflute: "G5m5gYIx9VAUWC3J",
  pois: "il2GNi8C0DvGLL9P",
  potter: "hJS8yEVkqgJjwfWa",
  shawm: "G3cqbejJpfB91VhP",
  smith: "KndVe2insuctjIaj",
  thief: "woWZ1sO5IUVGzo58",
  tinker: "0d08g1i5WXnNrCNA",
  viol: "baoe3U5BfMMMxhCU",
  weaver: "ap9prThUB2y9lDyj",
  woodcarver: "xKErqkLo4ASYr5EP"
};

/* -------------------------------------------- */

/**
 * Time periods that accept a numeric value.
 * @enum {string}
 */
AAFO.scalarTimePeriods = {
  turn: "AAFO.TimeTurn",
  round: "AAFO.TimeRound",
  minute: "AAFO.TimeMinute",
  hour: "AAFO.TimeHour",
  day: "AAFO.TimeDay",
  month: "AAFO.TimeMonth",
  year: "AAFO.TimeYear"
};
preLocalize("scalarTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods for spells that don't have a defined ending.
 * @enum {string}
 */
AAFO.permanentTimePeriods = {
  disp: "AAFO.TimeDisp",
  dstr: "AAFO.TimeDispTrig",
  perm: "AAFO.TimePerm"
};
preLocalize("permanentTimePeriods");

/* -------------------------------------------- */

/**
 * Time periods that don't accept a numeric value.
 * @enum {string}
 */
AAFO.specialTimePeriods = {
  inst: "AAFO.TimeInst",
  spec: "AAFO.Special"
};
preLocalize("specialTimePeriods");

/* -------------------------------------------- */

/**
 * The various lengths of time over which effects can occur.
 * @enum {string}
 */
AAFO.timePeriods = {
  ...AAFO.specialTimePeriods,
  ...AAFO.permanentTimePeriods,
  ...AAFO.scalarTimePeriods
};
preLocalize("timePeriods");

/* -------------------------------------------- */

/**
 * Ways in which to activate an item that cannot be labeled with a cost.
 * @enum {string}
 */
AAFO.staticAbilityActivationTypes = {
  none: "AAFO.NoneActionLabel",
  special: AAFO.timePeriods.spec
};

/**
 * Various ways in which an item or ability can be activated.
 * @enum {string}
 */
AAFO.abilityActivationTypes = {
  ...AAFO.staticAbilityActivationTypes,
  action: "AAFO.Action",
  bonus: "AAFO.BonusAction",
  reaction: "AAFO.Reaction",
  minute: AAFO.timePeriods.minute,
  hour: AAFO.timePeriods.hour,
  day: AAFO.timePeriods.day,
  legendary: "AAFO.LegendaryActionLabel",
  mythic: "AAFO.MythicActionLabel",
  lair: "AAFO.LairActionLabel",
  crew: "AAFO.VehicleCrewAction"
};
preLocalize("abilityActivationTypes");

/* -------------------------------------------- */

/**
 * Different things that an ability can consume upon use.
 * @enum {string}
 */
AAFO.abilityConsumptionTypes = {
  ammo: "AAFO.ConsumeAmmunition",
  attribute: "AAFO.ConsumeAttribute",
  hitDice: "AAFO.ConsumeHitDice",
  material: "AAFO.ConsumeMaterial",
  charges: "AAFO.ConsumeCharges"
};
preLocalize("abilityConsumptionTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for actor sizes.
 *
 * @typedef {object} ActorSizeConfiguration
 * @property {string} label                   Localized label.
 * @property {string} abbreviation            Localized abbreviation.
 * @property {number} hitDie                  Default hit die denomination for NPCs of this size.
 * @property {number} [token=1]               Default token size.
 * @property {number} [capacityMultiplier=1]  Multiplier used to calculate carrying capacities.
 */

/**
 * Creature sizes ordered from smallest to largest.
 * @enum {ActorSizeConfiguration}
 */
AAFO.actorSizes = {
  tiny: {
    label: "AAFO.SizeTiny",
    abbreviation: "AAFO.SizeTinyAbbr",
    hitDie: 4,
    token: 0.5,
    capacityMultiplier: 0.5
  },
  sm: {
    label: "AAFO.SizeSmall",
    abbreviation: "AAFO.SizeSmallAbbr",
    hitDie: 6,
    dynamicTokenScale: 0.8
  },
  med: {
    label: "AAFO.SizeMedium",
    abbreviation: "AAFO.SizeMediumAbbr",
    hitDie: 8
  },
  lg: {
    label: "AAFO.SizeLarge",
    abbreviation: "AAFO.SizeLargeAbbr",
    hitDie: 10,
    token: 2,
    capacityMultiplier: 2
  },
  huge: {
    label: "AAFO.SizeHuge",
    abbreviation: "AAFO.SizeHugeAbbr",
    hitDie: 12,
    token: 3,
    capacityMultiplier: 4
  },
  grg: {
    label: "AAFO.SizeGargantuan",
    abbreviation: "AAFO.SizeGargantuanAbbr",
    hitDie: 20,
    token: 4,
    capacityMultiplier: 8
  }
};
preLocalize("actorSizes", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Canvas                                      */
/* -------------------------------------------- */

/**
 * Colors used to visualize temporary and temporary maximum HP in token health bars.
 * @enum {number}
 */
AAFO.tokenHPColors = {
  damage: 0xFF0000,
  healing: 0x00FF00,
  temp: 0x66CCFF,
  tempmax: 0x440066,
  negmax: 0x550000
};

/* -------------------------------------------- */

/**
 * Colors used when a dynamic token ring effects.
 * @enum {number}
 */
AAFO.tokenRingColors = {
  damage: 0xFF0000,
  defeated: 0x000000,
  healing: 0x00FF00,
  temp: 0x33AAFF
};

/* -------------------------------------------- */

/**
 * Settings used to render map location markers on the canvas.
 * @type {object}
 */
AAFO.mapLocationMarker = {
  default: {
    backgroundColor: 0xFBF8F5,
    borderColor: 0x000000,
    borderHoverColor: 0xFF5500,
    font: null,
    textColor: 0x000000
  }
};

/* -------------------------------------------- */

/**
 * Configuration data for creature types.
 *
 * @typedef {object} CreatureTypeConfiguration
 * @property {string} label               Localized label.
 * @property {string} plural              Localized plural form used in swarm name.
 * @property {string} [reference]         Reference to a rule page describing this type.
 * @property {boolean} [detectAlignment]  Is this type detectable by spells such as "Detect Evil and Good"?
 */

/**
 * Default types of creatures.
 * @enum {CreatureTypeConfiguration}
 */
AAFO.creatureTypes = {
  aberration: {
    label: "AAFO.CreatureAberration",
    plural: "AAFO.CreatureAberrationPl",
    icon: "icons/creatures/tentacles/tentacle-eyes-yellow-pink.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.yy50qVC1JhPHt4LC",
    detectAlignment: true
  },
  beast: {
    label: "AAFO.CreatureBeast",
    plural: "AAFO.CreatureBeastPl",
    icon: "icons/creatures/claws/claw-bear-paw-swipe-red.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6bTHn7pZek9YX2tv"
  },
  celestial: {
    label: "AAFO.CreatureCelestial",
    plural: "AAFO.CreatureCelestialPl",
    icon: "icons/creatures/abilities/wings-birdlike-blue.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.T5CJwxjhBbi6oqaM",
    detectAlignment: true
  },
  construct: {
    label: "AAFO.CreatureConstruct",
    plural: "AAFO.CreatureConstructPl",
    icon: "icons/creatures/magical/construct-stone-earth-gray.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jQGAJZBZTqDFod8d"
  },
  dragon: {
    label: "AAFO.CreatureDragon",
    plural: "AAFO.CreatureDragonPl",
    icon: "icons/creatures/abilities/dragon-fire-breath-orange.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k2IRXZwGk9W0PM2S"
  },
  elemental: {
    label: "AAFO.CreatureElemental",
    plural: "AAFO.CreatureElementalPl",
    icon: "icons/creatures/magical/spirit-fire-orange.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.7z1LXGGkXpHuzkFh",
    detectAlignment: true
  },
  fey: {
    label: "AAFO.CreatureFey",
    plural: "AAFO.CreatureFeyPl",
    icon: "icons/creatures/magical/fae-fairy-winged-glowing-green.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.OFsRUt3pWljgm8VC",
    detectAlignment: true
  },
  fiend: {
    label: "AAFO.CreatureFiend",
    plural: "AAFO.CreatureFiendPl",
    icon: "icons/magic/death/skull-horned-goat-pentagram-red.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ElHKBJeiJPC7gj6k",
    detectAlignment: true
  },
  giant: {
    label: "AAFO.CreatureGiant",
    plural: "AAFO.CreatureGiantPl",
    icon: "icons/creatures/magical/humanoid-giant-forest-blue.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AOXn3Mv5vPZwo0Uf"
  },
  humanoid: {
    label: "AAFO.CreatureHumanoid",
    plural: "AAFO.CreatureHumanoidPl",
    icon: "icons/magic/unholy/strike-body-explode-disintegrate.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iFzQs4AenN8ALRvw"
  },
  monstrosity: {
    label: "AAFO.CreatureMonstrosity",
    plural: "AAFO.CreatureMonstrosityPl",
    icon: "icons/creatures/abilities/mouth-teeth-rows-red.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TX0yPEFTn79AMZ8P"
  },
  ooze: {
    label: "AAFO.CreatureOoze",
    plural: "AAFO.CreatureOozePl",
    icon: "icons/creatures/slimes/slime-movement-pseudopods-green.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.cgzIC1ecG03D97Fg"
  },
  plant: {
    label: "AAFO.CreaturePlant",
    plural: "AAFO.CreaturePlantPl",
    icon: "icons/magic/nature/tree-animated-strike.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1oT7t6tHE4kZuSN1"
  },
  undead: {
    label: "AAFO.CreatureUndead",
    plural: "AAFO.CreatureUndeadPl",
    icon: "icons/magic/death/skull-horned-worn-fire-blue.webp",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.D2BdqS1GeD5rcZ6q",
    detectAlignment: true
  }
};
preLocalize("creatureTypes", { keys: ["label", "plural"], sort: true });

/* -------------------------------------------- */

/**
 * Classification types for item action types.
 * @enum {string}
 */
AAFO.itemActionTypes = {
  mwak: "AAFO.ActionMWAK",
  rwak: "AAFO.ActionRWAK",
  msak: "AAFO.ActionMSAK",
  rsak: "AAFO.ActionRSAK",
  abil: "AAFO.ActionAbil",
  save: "AAFO.ActionSave",
  ench: "AAFO.ActionEnch",
  summ: "AAFO.ActionSumm",
  heal: "AAFO.ActionHeal",
  util: "AAFO.ActionUtil",
  other: "AAFO.ActionOther"
};
preLocalize("itemActionTypes");

/* -------------------------------------------- */

/**
 * Different ways in which item capacity can be limited.
 * @enum {string}
 */
AAFO.itemCapacityTypes = {
  items: "AAFO.ItemContainerCapacityItems",
  weight: "AAFO.ItemContainerCapacityWeight"
};
preLocalize("itemCapacityTypes", { sort: true });

/* -------------------------------------------- */

/**
 * List of various item rarities.
 * @enum {string}
 */
AAFO.itemRarity = {
  common: "AAFO.ItemRarityCommon",
  uncommon: "AAFO.ItemRarityUncommon",
  rare: "AAFO.ItemRarityRare",
  veryRare: "AAFO.ItemRarityVeryRare",
  legendary: "AAFO.ItemRarityLegendary",
  artifact: "AAFO.ItemRarityArtifact"
};
preLocalize("itemRarity");

/* -------------------------------------------- */

/**
 * The limited use periods that support a recovery formula.
 * @deprecated since aafo 3.1, available until aafo 3.3
 * @enum {string}
 */
AAFO.limitedUseFormulaPeriods = {
  charges: "AAFO.Charges",
  dawn: "AAFO.Dawn",
  dusk: "AAFO.Dusk"
};

/* -------------------------------------------- */

/**
 * Configuration data for limited use periods.
 *
 * @typedef {object} LimitedUsePeriodConfiguration
 * @property {string} label           Localized label.
 * @property {string} abbreviation    Shorthand form of the label.
 * @property {boolean} [formula]      Whether this limited use period restores charges via formula.
 */

/**
 * Enumerate the lengths of time over which an item can have limited use ability.
 * @enum {LimitedUsePeriodConfiguration}
 */
AAFO.limitedUsePeriods = {
  sr: {
    label: "AAFO.UsesPeriods.Sr",
    abbreviation: "AAFO.UsesPeriods.SrAbbreviation"
  },
  lr: {
    label: "AAFO.UsesPeriods.Lr",
    abbreviation: "AAFO.UsesPeriods.LrAbbreviation"
  },
  day: {
    label: "AAFO.UsesPeriods.Day",
    abbreviation: "AAFO.UsesPeriods.DayAbbreviation"
  },
  charges: {
    label: "AAFO.UsesPeriods.Charges",
    abbreviation: "AAFO.UsesPeriods.ChargesAbbreviation",
    formula: true
  },
  dawn: {
    label: "AAFO.UsesPeriods.Dawn",
    abbreviation: "AAFO.UsesPeriods.DawnAbbreviation",
    formula: true
  },
  dusk: {
    label: "AAFO.UsesPeriods.Dusk",
    abbreviation: "AAFO.UsesPeriods.DuskAbbreviation",
    formula: true
  }
};
preLocalize("limitedUsePeriods", { keys: ["label", "abbreviation"] });
patchConfig("limitedUsePeriods", "label", { since: "aafo 3.1", until: "aafo 3.3" });

/* -------------------------------------------- */

/**
 * Periods at which enchantments can be re-bound to new items.
 * @enum {{ label: string }}
 */
AAFO.enchantmentPeriods = {
  sr: {
    label: "AAFO.UsesPeriods.Sr"
  },
  lr: {
    label: "AAFO.UsesPeriods.Lr"
  },
  atwill: {
    label: "AAFO.UsesPeriods.AtWill"
  }
};
preLocalize("enchantmentPeriods", { key: "label" });

/* -------------------------------------------- */

/**
 * Specific equipment types that modify base AC.
 * @enum {string}
 */
AAFO.armorTypes = {
  light: "AAFO.EquipmentLight",
  medium: "AAFO.EquipmentMedium",
  heavy: "AAFO.EquipmentHeavy",
  natural: "AAFO.EquipmentNatural",
  shield: "AAFO.EquipmentShield"
};
preLocalize("armorTypes");

/* -------------------------------------------- */

/**
 * Equipment types that aren't armor.
 * @enum {string}
 */
AAFO.miscEquipmentTypes = {
  clothing: "AAFO.EquipmentClothing",
  trinket: "AAFO.EquipmentTrinket",
  vehicle: "AAFO.EquipmentVehicle"
};
preLocalize("miscEquipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of equipment types for armor, clothing, and other objects which can be worn by the character.
 * @enum {string}
 */
AAFO.equipmentTypes = {
  ...AAFO.miscEquipmentTypes,
  ...AAFO.armorTypes
};
preLocalize("equipmentTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The various types of vehicles in which characters can be proficient.
 * @enum {string}
 */
AAFO.vehicleTypes = {
  air: "AAFO.VehicleTypeAir",
  land: "AAFO.VehicleTypeLand",
  space: "AAFO.VehicleTypeSpace",
  water: "AAFO.VehicleTypeWater"
};
preLocalize("vehicleTypes", { sort: true });

/* -------------------------------------------- */

/**
 * The set of Armor Proficiencies which a character may have.
 * @type {object}
 */
AAFO.armorProficiencies = {
  lgt: "AAFO.ArmorLightProficiency",
  med: "AAFO.ArmorMediumProficiency",
  hvy: "AAFO.ArmorHeavyProficiency",
  shl: "AAFO.EquipmentShieldProficiency"
};
preLocalize("armorProficiencies");

/**
 * A mapping between `AAFO.equipmentTypes` and `AAFO.armorProficiencies` that
 * is used to determine if character has proficiency when adding an item.
 * @enum {(boolean|string)}
 */
AAFO.armorProficienciesMap = {
  natural: true,
  clothing: true,
  light: "lgt",
  medium: "med",
  heavy: "hvy",
  shield: "shl"
};

/**
 * The basic armor types in 5e. This enables specific armor proficiencies,
 * automated AC calculation in NPCs, and starting equipment.
 * @enum {string}
 */
AAFO.armorIds = {
  breastplate: "SK2HATQ4abKUlV8i",
  chainmail: "rLMflzmxpe8JGTOA",
  chainshirt: "p2zChy24ZJdVqMSH",
  halfplate: "vsgmACFYINloIdPm",
  hide: "n1V07puo0RQxPGuF",
  leather: "WwdpHLXGX5r8uZu5",
  padded: "GtKV1b5uqFQqpEni",
  plate: "OjkIqlW2UpgFcjZa",
  ringmail: "nsXZejlmgalj4he9",
  scalemail: "XmnlF5fgIO3tg6TG",
  splint: "cKpJmsJmU8YaiuqG",
  studded: "TIV3B1vbrVHIhQAm"
};

/**
 * The basic shield in 5e.
 * @enum {string}
 */
AAFO.shieldIds = {
  shield: "sSs3hSzkKBMNBgTs"
};

/**
 * Common armor class calculations.
 * @enum {{ label: string, [formula]: string }}
 */
AAFO.armorClasses = {
  flat: {
    label: "AAFO.ArmorClassFlat",
    formula: "@attributes.ac.flat"
  },
  natural: {
    label: "AAFO.ArmorClassNatural",
    formula: "@attributes.ac.flat"
  },
  default: {
    label: "AAFO.ArmorClassEquipment",
    formula: "@attributes.ac.armor"
  },
  custom: {
    label: "AAFO.ArmorClassCustom"
  }
};
preLocalize("armorClasses", { key: "label" });

/* -------------------------------------------- */

/**
 * Configuration data for an items that have sub-types.
 *
 * @typedef {object} SubtypeTypeConfiguration
 * @property {string} label                       Localized label for this type.
 * @property {Record<string, string>} [subtypes]  Enum containing localized labels for subtypes.
 */

/**
 * Enumerate the valid consumable types which are recognized by the system.
 * @enum {SubtypeTypeConfiguration}
 */
AAFO.consumableTypes = {
  ammo: {
    label: "AAFO.ConsumableAmmo",
    subtypes: {
      arrow: "AAFO.ConsumableAmmoArrow",
      blowgunNeedle: "AAFO.ConsumableAmmoBlowgunNeedle",
      crossbowBolt: "AAFO.ConsumableAmmoCrossbowBolt",
      slingBullet: "AAFO.ConsumableAmmoSlingBullet"
    }
  },
  potion: {
    label: "AAFO.ConsumablePotion"
  },
  poison: {
    label: "AAFO.ConsumablePoison",
    subtypes: {
      contact: "AAFO.ConsumablePoisonContact",
      ingested: "AAFO.ConsumablePoisonIngested",
      inhaled: "AAFO.ConsumablePoisonInhaled",
      injury: "AAFO.ConsumablePoisonInjury"
    }
  },
  food: {
    label: "AAFO.ConsumableFood"
  },
  scroll: {
    label: "AAFO.ConsumableScroll"
  },
  wand: {
    label: "AAFO.ConsumableWand"
  },
  rod: {
    label: "AAFO.ConsumableRod"
  },
  trinket: {
    label: "AAFO.ConsumableTrinket"
  }
};
preLocalize("consumableTypes", { key: "label", sort: true });
preLocalize("consumableTypes.ammo.subtypes", { sort: true });
preLocalize("consumableTypes.poison.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Types of containers.
 * @enum {string}
 */
AAFO.containerTypes = {
  backpack: "H8YCd689ezlD26aT",
  barrel: "7Yqbqg5EtVW16wfT",
  basket: "Wv7HzD6dv1P0q78N",
  boltcase: "eJtPBiZtr2pp6ynt",
  bottle: "HZp69hhyNZUUCipF",
  bucket: "mQVYcHmMSoCUnBnM",
  case: "5mIeX824uMklU3xq",
  chest: "2YbuclKfhDL0bU4u",
  flask: "lHS63sC6bypENNlR",
  jug: "0ZBWwjFz3nIAXMLW",
  pot: "M8xM8BLK4tpUayEE",
  pitcher: "nXWdGtzi8DXDLLsL",
  pouch: "9bWTRRDym06PzSAf",
  quiver: "4MtQKPn9qMWCFjDA",
  sack: "CNdDj8dsXVpRVpXt",
  saddlebags: "TmfaFUSZJAotndn9",
  tankard: "uw6fINSmZ2j2o57A",
  vial: "meJEfX3gZgtMX4x2"
};

/* -------------------------------------------- */

/**
 * Configuration data for spellcasting foci.
 *
 * @typedef {object} SpellcastingFocusConfiguration
 * @property {string} label                    Localized label for this category.
 * @property {Object<string, string>} itemIds  Item IDs or UUIDs.
 */

/**
 * Type of spellcasting foci.
 * @enum {SpellcastingFocusConfiguration}
 */
AAFO.focusTypes = {
  arcane: {
    label: "AAFO.Focus.Arcane",
    itemIds: {
      crystal: "uXOT4fYbgPY8DGdd",
      orb: "tH5Rn0JVRG1zdmPa",
      rod: "OojyyGfh91iViuMF",
      staff: "BeKIrNIvNHRPQ4t5",
      wand: "KA2P6I48iOWlnboO"
    }
  },
  druidic: {
    label: "AAFO.Focus.Druidic",
    itemIds: {
      mistletoe: "xDK9GQd2iqOGH8Sd",
      totem: "PGL6aaM0wE5h0VN5",
      woodenstaff: "FF1ktpb2YSiyv896",
      yewwand: "t5yP0d7YaKwuKKiH"
    }
  },
  holy: {
    label: "AAFO.Focus.Holy",
    itemIds: {
      amulet: "paqlMjggWkBIAeCe",
      emblem: "laVqttkGMW4B9654",
      reliquary: "gP1URGq3kVIIFHJ7"
    }
  }
};
preLocalize("focusTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * Types of "features" items.
 * @enum {SubtypeTypeConfiguration}
 */
AAFO.featureTypes = {
  background: {
    label: "AAFO.Feature.Background"
  },
  class: {
    label: "AAFO.Feature.Class.Label",
    subtypes: {
      arcaneShot: "AAFO.Feature.Class.ArcaneShot",
      artificerInfusion: "AAFO.Feature.Class.ArtificerInfusion",
      channelDivinity: "AAFO.Feature.Class.ChannelDivinity",
      defensiveTactic: "AAFO.Feature.Class.DefensiveTactic",
      eldritchInvocation: "AAFO.Feature.Class.EldritchInvocation",
      elementalDiscipline: "AAFO.Feature.Class.ElementalDiscipline",
      fightingStyle: "AAFO.Feature.Class.FightingStyle",
      huntersPrey: "AAFO.Feature.Class.HuntersPrey",
      ki: "AAFO.Feature.Class.Ki",
      maneuver: "AAFO.Feature.Class.Maneuver",
      metamagic: "AAFO.Feature.Class.Metamagic",
      multiattack: "AAFO.Feature.Class.Multiattack",
      pact: "AAFO.Feature.Class.PactBoon",
      psionicPower: "AAFO.Feature.Class.PsionicPower",
      rune: "AAFO.Feature.Class.Rune",
      superiorHuntersDefense: "AAFO.Feature.Class.SuperiorHuntersDefense"
    }
  },
  monster: {
    label: "AAFO.Feature.Monster"
  },
  race: {
    label: "AAFO.Feature.Race"
  },
  enchantment: {
    label: "AAFO.Enchantment.Label",
    subtypes: {
      artificerInfusion: "AAFO.Feature.Class.ArtificerInfusion",
      rune: "AAFO.Feature.Class.Rune"
    }
  },
  feat: {
    label: "AAFO.Feature.Feat"
  },
  supernaturalGift: {
    label: "AAFO.Feature.SupernaturalGift.Label",
    subtypes: {
      blessing: "AAFO.Feature.SupernaturalGift.Blessing",
      charm: "AAFO.Feature.SupernaturalGift.Charm",
      epicBoon: "AAFO.Feature.SupernaturalGift.EpicBoon"
    }
  }
};
preLocalize("featureTypes", { key: "label" });
preLocalize("featureTypes.class.subtypes", { sort: true });
preLocalize("featureTypes.enchantment.subtypes", { sort: true });
preLocalize("featureTypes.supernaturalGift.subtypes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for item properties.
 *
 * @typedef {object} ItemPropertyConfiguration
 * @property {string} label           Localized label.
 * @property {string} [abbreviation]  Localized abbreviation.
 * @property {string} [icon]          Icon that can be used in certain places to represent this property.
 * @property {string} [reference]     Reference to a rule page describing this property.
 * @property {boolean} [isPhysical]   Is this property one that can cause damage resistance bypasses?
 * @property {boolean} [isTag]        Is this spell property a tag, rather than a component?
 */

/**
 * The various properties of all item types.
 * @enum {ItemPropertyConfiguration}
 */
AAFO.itemProperties = {
  ada: {
    label: "AAFO.Item.Property.Adamantine",
    isPhysical: true
  },
  amm: {
    label: "AAFO.Item.Property.Ammunition"
  },
  concentration: {
    label: "AAFO.Item.Property.Concentration",
    abbreviation: "AAFO.ConcentrationAbbr",
    icon: "systems/aafo/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
    isTag: true
  },
  fin: {
    label: "AAFO.Item.Property.Finesse"
  },
  fir: {
    label: "AAFO.Item.Property.Firearm"
  },
  foc: {
    label: "AAFO.Item.Property.Focus"
  },
  hvy: {
    label: "AAFO.Item.Property.Heavy"
  },
  lgt: {
    label: "AAFO.Item.Property.Light"
  },
  lod: {
    label: "AAFO.Item.Property.Loading"
  },
  material: {
    label: "AAFO.Item.Property.Material",
    abbreviation: "AAFO.ComponentMaterialAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  },
  mgc: {
    label: "AAFO.Item.Property.Magical",
    icon: "systems/aafo/icons/svg/properties/magical.svg",
    isPhysical: true
  },
  rch: {
    label: "AAFO.Item.Property.Reach"
  },
  rel: {
    label: "AAFO.Item.Property.Reload"
  },
  ret: {
    label: "AAFO.Item.Property.Returning"
  },
  ritual: {
    label: "AAFO.Item.Property.Ritual",
    abbreviation: "AAFO.RitualAbbr",
    icon: "systems/aafo/icons/svg/items/spell.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
    isTag: true
  },
  sil: {
    label: "AAFO.Item.Property.Silvered",
    isPhysical: true
  },
  somatic: {
    label: "AAFO.Item.Property.Somatic",
    abbreviation: "AAFO.ComponentSomaticAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  spc: {
    label: "AAFO.Item.Property.Special"
  },
  stealthDisadvantage: {
    label: "AAFO.Item.Property.StealthDisadvantage"
  },
  thr: {
    label: "AAFO.Item.Property.Thrown"
  },
  two: {
    label: "AAFO.Item.Property.TwoHanded"
  },
  ver: {
    label: "AAFO.Item.Property.Versatile"
  },
  vocal: {
    label: "AAFO.Item.Property.Verbal",
    abbreviation: "AAFO.ComponentVerbalAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  weightlessContents: {
    label: "AAFO.Item.Property.WeightlessContents"
  }
};
preLocalize("itemProperties", { keys: ["label", "abbreviation"], sort: true });

/* -------------------------------------------- */

/**
 * The various properties of an item per item type.
 * @enum {object}
 */
AAFO.validProperties = {
  consumable: new Set([
    "mgc"
  ]),
  container: new Set([
    "mgc",
    "weightlessContents"
  ]),
  equipment: new Set([
    "concentration",
    "mgc",
    "stealthDisadvantage"
  ]),
  feat: new Set([
    "concentration",
    "mgc"
  ]),
  loot: new Set([
    "mgc"
  ]),
  weapon: new Set([
    "ada",
    "amm",
    "fin",
    "fir",
    "foc",
    "hvy",
    "lgt",
    "lod",
    "mgc",
    "rch",
    "rel",
    "ret",
    "sil",
    "spc",
    "thr",
    "two",
    "ver"
  ]),
  spell: new Set([
    "vocal",
    "somatic",
    "material",
    "concentration",
    "ritual"
  ]),
  tool: new Set([
    "concentration",
    "mgc"
  ])
};

/* -------------------------------------------- */

/**
 * Configuration data for an item with the "loot" type.
 *
 * @typedef {object} LootTypeConfiguration
 * @property {string} label                       Localized label for this type.
 */

/**
 * Types of "loot" items.
 * @enum {LootTypeConfiguration}
 */
AAFO.lootTypes = {
  art: {
    label: "AAFO.Loot.Art"
  },
  gear: {
    label: "AAFO.Loot.Gear"
  },
  gem: {
    label: "AAFO.Loot.Gem"
  },
  junk: {
    label: "AAFO.Loot.Junk"
  },
  material: {
    label: "AAFO.Loot.Material"
  },
  resource: {
    label: "AAFO.Loot.Resource"
  },
  treasure: {
    label: "AAFO.Loot.Treasure"
  }
};
preLocalize("lootTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * @typedef {object} CurrencyConfiguration
 * @property {string} label         Localized label for the currency.
 * @property {string} abbreviation  Localized abbreviation for the currency.
 * @property {number} conversion    Number by which this currency should be multiplied to arrive at a standard value.
 */

/**
 * The valid currency denominations with localized labels, abbreviations, and conversions.
 * The conversion number defines how many of that currency are equal to one GP.
 * @enum {CurrencyConfiguration}
 */
AAFO.currencies = {
  pp: {
    label: "AAFO.CurrencyPP",
    abbreviation: "AAFO.CurrencyAbbrPP",
    conversion: 0.1
  },
  gp: {
    label: "AAFO.CurrencyGP",
    abbreviation: "AAFO.CurrencyAbbrGP",
    conversion: 1
  },
  ep: {
    label: "AAFO.CurrencyEP",
    abbreviation: "AAFO.CurrencyAbbrEP",
    conversion: 2
  },
  sp: {
    label: "AAFO.CurrencySP",
    abbreviation: "AAFO.CurrencyAbbrSP",
    conversion: 10
  },
  cp: {
    label: "AAFO.CurrencyCP",
    abbreviation: "AAFO.CurrencyAbbrCP",
    conversion: 100
  }
};
preLocalize("currencies", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */
/*  Damage Types                                */
/* -------------------------------------------- */

/**
 * Configuration data for damage types.
 *
 * @typedef {object} DamageTypeConfiguration
 * @property {string} label          Localized label.
 * @property {string} icon           Icon representing this type.
 * @property {boolean} [isPhysical]  Is this a type that can be bypassed by magical or silvered weapons?
 * @property {string} [reference]    Reference to a rule page describing this damage type.
 * @property {Color} Color           Visual color of the damage type.
 */

/**
 * Types of damage the can be caused by abilities.
 * @enum {DamageTypeConfiguration}
 */
AAFO.damageTypes = {
  acid: {
    label: "AAFO.DamageAcid",
    icon: "systems/aafo/icons/svg/damage/acid.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IQhbKRPe1vCPdh8v",
    color: new Color(0x839D50)
  },
  bludgeoning: {
    label: "AAFO.DamageBludgeoning",
    icon: "systems/aafo/icons/svg/damage/bludgeoning.svg",
    isPhysical: true,
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.39LFrlef94JIYO8m",
    color: new Color(0x0000A0)
  },
  cold: {
    label: "AAFO.DamageCold",
    icon: "systems/aafo/icons/svg/damage/cold.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4xsFUooHDEdfhw6g",
    color: new Color(0xADD8E6)
  },
  fire: {
    label: "AAFO.DamageFire",
    icon: "systems/aafo/icons/svg/damage/fire.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.f1S66aQJi4PmOng6",
    color: new Color(0xFF4500)
  },
  force: {
    label: "AAFO.DamageForce",
    icon: "systems/aafo/icons/svg/damage/force.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFTWzngD8dKWQuUR",
    color: new Color(0x800080)
  },
  lightning: {
    label: "AAFO.DamageLightning",
    icon: "systems/aafo/icons/svg/damage/lightning.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9SaxFJ9bM3SutaMC",
    color: new Color(0x1E90FF)
  },
  necrotic: {
    label: "AAFO.DamageNecrotic",
    icon: "systems/aafo/icons/svg/damage/necrotic.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.klOVUV5G1U7iaKoG",
    color: new Color(0x006400)
  },
  piercing: {
    label: "AAFO.DamagePiercing",
    icon: "systems/aafo/icons/svg/damage/piercing.svg",
    isPhysical: true,
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.95agSnEGTdAmKhyC",
    color: new Color(0xC0C0C0)
  },
  poison: {
    label: "AAFO.DamagePoison",
    icon: "systems/aafo/icons/svg/damage/poison.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.k5wOYXdWPzcWwds1",
    color: new Color(0x8A2BE2)
  },
  psychic: {
    label: "AAFO.DamagePsychic",
    icon: "systems/aafo/icons/svg/damage/psychic.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YIKbDv4zYqbE5teJ",
    color: new Color(0xFF1493)
  },
  radiant: {
    label: "AAFO.DamageRadiant",
    icon: "systems/aafo/icons/svg/damage/radiant.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5tcK9buXWDOw8yHH",
    color: new Color(0xFFD700)
  },
  slashing: {
    label: "AAFO.DamageSlashing",
    icon: "systems/aafo/icons/svg/damage/slashing.svg",
    isPhysical: true,
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sz2XKQ5lgsdPEJOa",
    color: new Color(0x8B0000)
  },
  thunder: {
    label: "AAFO.DamageThunder",
    icon: "systems/aafo/icons/svg/damage/thunder.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iqsmMHk7FSpiNkQy",
    color: new Color(0x708090)
  }
};
preLocalize("damageTypes", { keys: ["label"], sort: true });

/* -------------------------------------------- */
/*  Movement                                    */
/* -------------------------------------------- */

/**
 * Different types of healing that can be applied using abilities.
 * @enum {string}
 */
AAFO.healingTypes = {
  healing: {
    label: "AAFO.Healing",
    icon: "systems/aafo/icons/svg/damage/healing.svg",
    color: new Color(0x46C252)
  },
  temphp: {
    label: "AAFO.HealingTemp",
    icon: "systems/aafo/icons/svg/damage/temphp.svg",
    color: new Color(0x4B66DE)
  }
};
preLocalize("healingTypes", { keys: ["label"] });

/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
AAFO.movementTypes = {
  burrow: "AAFO.MovementBurrow",
  climb: "AAFO.MovementClimb",
  fly: "AAFO.MovementFly",
  swim: "AAFO.MovementSwim",
  walk: "AAFO.MovementWalk"
};
preLocalize("movementTypes", { sort: true });

/* -------------------------------------------- */
/*  Measurement                                 */
/* -------------------------------------------- */

/**
 * The valid units of measure for movement distances in the game system.
 * By default this uses the imperial units of feet and miles.
 * @enum {string}
 */
AAFO.movementUnits = {
  ft: "AAFO.DistFt",
  mi: "AAFO.DistMi",
  m: "AAFO.DistM",
  km: "AAFO.DistKm"
};
preLocalize("movementUnits");

/* -------------------------------------------- */

/**
 * The types of range that are used for measuring actions and effects.
 * @enum {string}
 */
AAFO.rangeTypes = {
  self: "AAFO.DistSelf",
  touch: "AAFO.DistTouch",
  spec: "AAFO.Special",
  any: "AAFO.DistAny"
};
preLocalize("rangeTypes");

/* -------------------------------------------- */

/**
 * The valid units of measure for the range of an action or effect. A combination of `AAFO.movementUnits` and
 * `AAFO.rangeUnits`.
 * @enum {string}
 */
AAFO.distanceUnits = {
  ...AAFO.movementUnits,
  ...AAFO.rangeTypes
};
preLocalize("distanceUnits");

/* -------------------------------------------- */

/**
 * Configuration data for a weight unit.
 *
 * @typedef {object} WeightUnitConfiguration
 * @property {string} label         Localized label for the unit.
 * @property {string} abbreviation  Localized abbreviation for the unit.
 * @property {number} conversion    Number that by which this unit should be multiplied to arrive at a standard value.
 * @property {string} type          Whether this is an "imperial" or "metric" unit.
 */

/**
 * The valid units for measurement of weight.
 * @enum {WeightUnitConfiguration}
 */
AAFO.weightUnits = {
  lb: {
    label: "AAFO.WeightUnit.Pounds.Label",
    abbreviation: "AAFO.WeightUnit.Pounds.Abbreviation",
    conversion: 1,
    type: "imperial"
  },
  tn: {
    label: "AAFO.WeightUnit.Tons.Label",
    abbreviation: "AAFO.WeightUnit.Tons.Abbreviation",
    conversion: 2000,
    type: "imperial"
  },
  kg: {
    label: "AAFO.WeightUnit.Kilograms.Label",
    abbreviation: "AAFO.WeightUnit.Kilograms.Abbreviation",
    conversion: 2.5,
    type: "metric"
  },
  Mg: {
    label: "AAFO.WeightUnit.Megagrams.Label",
    abbreviation: "AAFO.WeightUnit.Megagrams.Abbreviation",
    conversion: 2500,
    type: "metric"
  }
};
preLocalize("weightUnits", { keys: ["label", "abbreviation"] });

/* -------------------------------------------- */

/**
 * Encumbrance configuration data.
 *
 * @typedef {object} EncumbranceConfiguration
 * @property {Record<string, number>} currencyPerWeight  Pieces of currency that equal a base weight (lbs or kgs).
 * @property {Record<string, object>} effects            Data used to create encumbrance-related Active Effects.
 * @property {object} threshold                          Amount to multiply strength to get given capacity threshold.
 * @property {Record<string, number>} threshold.encumbered
 * @property {Record<string, number>} threshold.heavilyEncumbered
 * @property {Record<string, number>} threshold.maximum
 * @property {Record<string, {ft: number, m: number}>} speedReduction  Speed reduction caused by encumbered status.
 * @property {Record<string, number>} vehicleWeightMultiplier  Multiplier used to determine vehicle carrying capacity.
 * @property {Record<string, Record<string, string>>} baseUnits  Base units used to calculate carrying weight.
 */

/**
 * Configure aspects of encumbrance calculation so that it could be configured by modules.
 * @type {EncumbranceConfiguration}
 */
AAFO.encumbrance = {
  currencyPerWeight: {
    imperial: 50,
    metric: 110
  },
  effects: {
    encumbered: {
      name: "EFFECT.AAFO.StatusEncumbered",
      icon: "systems/aafo/icons/svg/statuses/encumbered.svg"
    },
    heavilyEncumbered: {
      name: "EFFECT.AAFO.StatusHeavilyEncumbered",
      icon: "systems/aafo/icons/svg/statuses/heavily-encumbered.svg"
    },
    exceedingCarryingCapacity: {
      name: "EFFECT.AAFO.StatusExceedingCarryingCapacity",
      icon: "systems/aafo/icons/svg/statuses/exceeding-carrying-capacity.svg"
    }
  },
  threshold: {
    encumbered: {
      imperial: 5,
      metric: 2.5
    },
    heavilyEncumbered: {
      imperial: 10,
      metric: 5
    },
    maximum: {
      imperial: 15,
      metric: 7.5
    }
  },
  speedReduction: {
    encumbered: {
      ft: 10,
      m: 3
    },
    heavilyEncumbered: {
      ft: 20,
      m: 6
    },
    exceedingCarryingCapacity: {
      ft: 5,
      m: 1.5
    }
  },
  baseUnits: {
    default: {
      imperial: "lb",
      metric: "kg"
    },
    vehicle: {
      imperial: "tn",
      metric: "Mg"
    }
  }
};
preLocalize("encumbrance.effects", { key: "name" });

/* -------------------------------------------- */
/*  Targeting                                   */
/* -------------------------------------------- */

/**
 * Targeting types that apply to one or more distinct targets.
 * @enum {string}
 */
AAFO.individualTargetTypes = {
  self: "AAFO.TargetSelf",
  ally: "AAFO.TargetAlly",
  enemy: "AAFO.TargetEnemy",
  creature: "AAFO.TargetCreature",
  object: "AAFO.TargetObject",
  space: "AAFO.TargetSpace",
  creatureOrObject: "AAFO.TargetCreatureOrObject",
  any: "AAFO.TargetAny",
  willing: "AAFO.TargetWilling"
};
preLocalize("individualTargetTypes");

/* -------------------------------------------- */

/**
 * Information needed to represent different area of effect target types.
 *
 * @typedef {object} AreaTargetDefinition
 * @property {string} label        Localized label for this type.
 * @property {string} template     Type of `MeasuredTemplate` create for this target type.
 * @property {string} [reference]  Reference to a rule page describing this area of effect.
 */

/**
 * Targeting types that cover an area.
 * @enum {AreaTargetDefinition}
 */
AAFO.areaTargetTypes = {
  radius: {
    label: "AAFO.TargetRadius",
    template: "circle"
  },
  sphere: {
    label: "AAFO.TargetSphere",
    template: "circle",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.npdEWb2egUPnB5Fa"
  },
  cylinder: {
    label: "AAFO.TargetCylinder",
    template: "circle",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZFp4R7tXsIqkiG3"
  },
  cone: {
    label: "AAFO.TargetCone",
    template: "cone",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DqqAOr5JnX71OCOw"
  },
  square: {
    label: "AAFO.TargetSquare",
    template: "rect"
  },
  cube: {
    label: "AAFO.TargetCube",
    template: "rect",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dRfDIwuaHmUQ06uA"
  },
  line: {
    label: "AAFO.TargetLine",
    template: "ray",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6DOoBgg7okm9gBc6"
  },
  wall: {
    label: "AAFO.TargetWall",
    template: "ray"
  }
};
preLocalize("areaTargetTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * The types of single or area targets which can be applied to abilities.
 * @enum {string}
 */
AAFO.targetTypes = {
  ...AAFO.individualTargetTypes,
  ...Object.fromEntries(Object.entries(AAFO.areaTargetTypes).map(([k, v]) => [k, v.label]))
};
preLocalize("targetTypes", { sort: true });

/* -------------------------------------------- */

/**
 * Denominations of hit dice which can apply to classes.
 * @type {string[]}
 */
AAFO.hitDieTypes = ["d4", "d6", "d8", "d10", "d12"];

/* -------------------------------------------- */

/**
 * Configuration data for rest types.
 *
 * @typedef {object} RestConfiguration
 * @property {Record<string, number>} duration  Duration of different rest variants in minutes.
 */

/**
 * Types of rests.
 * @enum {RestConfiguration}
 */
AAFO.restTypes = {
  short: {
    duration: {
      normal: 60,
      gritty: 480,
      epic: 1
    }
  },
  long: {
    duration: {
      normal: 480,
      gritty: 10080,
      epic: 60
    }
  }
};

/* -------------------------------------------- */

/**
 * The set of possible sensory perception types which an Actor may have.
 * @enum {string}
 */
AAFO.senses = {
  blindsight: "AAFO.SenseBlindsight",
  darkvision: "AAFO.SenseDarkvision",
  tremorsense: "AAFO.SenseTremorsense",
  truesight: "AAFO.SenseTruesight"
};
preLocalize("senses", { sort: true });

/* -------------------------------------------- */
/*  Spellcasting                                */
/* -------------------------------------------- */

/**
 * Define the standard slot progression by character level.
 * The entries of this array represent the spell slot progression for a full spell-caster.
 * @type {number[][]}
 */
AAFO.SPELL_SLOT_TABLE = [
  [2],
  [3],
  [4, 2],
  [4, 3],
  [4, 3, 2],
  [4, 3, 3],
  [4, 3, 3, 1],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 1],
  [4, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 2, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 1, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 1, 1, 1],
  [4, 3, 3, 3, 3, 2, 2, 1, 1]
];

/* -------------------------------------------- */

/**
 * Configuration data for pact casting progression.
 *
 * @typedef {object} PactProgressionConfig
 * @property {number} slots  Number of spell slots granted.
 * @property {number} level  Level of spells that can be cast.
 */

/**
 * Define the pact slot & level progression by pact caster level.
 * @enum {PactProgressionConfig}
 */
AAFO.pactCastingProgression = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 }
};

/* -------------------------------------------- */

/**
 * Configuration data for spell preparation modes.
 *
 * @typedef {object} SpellPreparationModeConfiguration
 * @property {string} label           Localized name of this spell preparation type.
 * @property {boolean} [upcast]       Whether this preparation mode allows for upcasting.
 * @property {boolean} [cantrips]     Whether this mode allows for cantrips in a spellbook.
 * @property {number} [order]         The sort order of this mode in a spellbook.
 * @property {boolean} [prepares]     Whether this preparation mode prepares spells.
 */

/**
 * Various different ways a spell can be prepared.
 * @enum {SpellPreparationModeConfiguration}
 */
AAFO.spellPreparationModes = {
  prepared: {
    label: "AAFO.SpellPrepPrepared",
    upcast: true,
    prepares: true
  },
  pact: {
    label: "AAFO.PactMagic",
    upcast: true,
    cantrips: true,
    order: 0.5
  },
  always: {
    label: "AAFO.SpellPrepAlways",
    upcast: true,
    prepares: true
  },
  atwill: {
    label: "AAFO.SpellPrepAtWill",
    order: -30
  },
  innate: {
    label: "AAFO.SpellPrepInnate",
    order: -20
  },
  ritual: {
    label: "AAFO.SpellPrepRitual",
    order: -10
  }
};
preLocalize("spellPreparationModes", { key: "label" });
patchConfig("spellPreparationModes", "label", { since: "aafo 3.1", until: "aafo 3.3" });

/* -------------------------------------------- */

/**
 * Subset of `AAFO.spellPreparationModes` that consume spell slots.
 * @deprecated since aafo 3.1, available until aafo 3.3
 * @type {string[]}
 */
AAFO.spellUpcastModes = ["always", "pact", "prepared"];

/* -------------------------------------------- */

/**
 * Configuration data for different types of spellcasting supported.
 *
 * @typedef {object} SpellcastingTypeConfiguration
 * @property {string} label                               Localized label.
 * @property {string} img                                 Image used when rendered as a favorite on the sheet.
 * @property {boolean} [shortRest]                        Are these spell slots additionally restored on a short rest?
 * @property {Object<string, SpellcastingProgressionConfiguration>} [progression]  Any progression modes for this type.
 */

/**
 * Configuration data for a spellcasting progression mode.
 *
 * @typedef {object} SpellcastingProgressionConfiguration
 * @property {string} label             Localized label.
 * @property {number} [divisor=1]       Value by which the class levels are divided to determine spellcasting level.
 * @property {boolean} [roundUp=false]  Should fractional values should be rounded up by default?
 */

/**
 * Different spellcasting types and their progression.
 * @type {SpellcastingTypeConfiguration}
 */
AAFO.spellcastingTypes = {
  leveled: {
    label: "AAFO.SpellProgLeveled",
    img: "systems/aafo/icons/spell-tiers/{id}.webp",
    progression: {
      full: {
        label: "AAFO.SpellProgFull",
        divisor: 1
      },
      half: {
        label: "AAFO.SpellProgHalf",
        divisor: 2
      },
      third: {
        label: "AAFO.SpellProgThird",
        divisor: 3
      },
      artificer: {
        label: "AAFO.SpellProgArt",
        divisor: 2,
        roundUp: true
      }
    }
  },
  pact: {
    label: "AAFO.SpellProgPact",
    img: "icons/magic/unholy/silhouette-robe-evil-power.webp",
    shortRest: true
  }
};
preLocalize("spellcastingTypes", { key: "label", sort: true });
preLocalize("spellcastingTypes.leveled.progression", { key: "label" });

/* -------------------------------------------- */

/**
 * Ways in which a class can contribute to spellcasting levels.
 * @enum {string}
 */
AAFO.spellProgression = {
  none: "AAFO.SpellNone",
  full: "AAFO.SpellProgFull",
  half: "AAFO.SpellProgHalf",
  third: "AAFO.SpellProgThird",
  pact: "AAFO.SpellProgPact",
  artificer: "AAFO.SpellProgArt"
};
preLocalize("spellProgression", { key: "label" });

/* -------------------------------------------- */

/**
 * Valid spell levels.
 * @enum {string}
 */
AAFO.spellLevels = {
  0: "AAFO.SpellLevel0",
  1: "AAFO.SpellLevel1",
  2: "AAFO.SpellLevel2",
  3: "AAFO.SpellLevel3",
  4: "AAFO.SpellLevel4",
  5: "AAFO.SpellLevel5",
  6: "AAFO.SpellLevel6",
  7: "AAFO.SpellLevel7",
  8: "AAFO.SpellLevel8",
  9: "AAFO.SpellLevel9"
};
preLocalize("spellLevels");

/* -------------------------------------------- */

/**
 * The available choices for how spell damage scaling may be computed.
 * @enum {string}
 */
AAFO.spellScalingModes = {
  none: "AAFO.SpellNone",
  cantrip: "AAFO.SpellCantrip",
  level: "AAFO.SpellLevel"
};
preLocalize("spellScalingModes", { sort: true });

/* -------------------------------------------- */

/**
 * Configuration data for spell components.
 *
 * @typedef {object} SpellComponentConfiguration
 * @property {string} label         Localized label.
 * @property {string} abbr          Localized abbreviation.
 * @property {string} [reference]   Reference to a rule page describing this component.
 */

/**
 * Types of components that can be required when casting a spell.
 * @deprecated since aafo 3.0, available until aafo 3.3
 * @enum {SpellComponentConfiguration}
 */
AAFO.spellComponents = {
  vocal: {
    label: "AAFO.ComponentVerbal",
    abbr: "AAFO.ComponentVerbalAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx"
  },
  somatic: {
    label: "AAFO.ComponentSomatic",
    abbr: "AAFO.ComponentSomaticAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qwUNgUNilEmZkSC9"
  },
  material: {
    label: "AAFO.ComponentMaterial",
    abbr: "AAFO.ComponentMaterialAbbr",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AeH5eDS4YeM9RETC"
  }
};
preLocalize("spellComponents", { keys: ["label", "abbr"] });

/* -------------------------------------------- */

/**
 * Configuration data for spell tags.
 *
 * @typedef {object} SpellTagConfiguration
 * @property {string} label         Localized label.
 * @property {string} abbr          Localized abbreviation.
 * @property {string} icon          Icon representing this tag.
 * @property {string} [reference]   Reference to a rule page describing this tag.
 */

/**
 * Supplementary rules keywords that inform a spell's use.
 * @deprecated since aafo 3.0, available until aafo 3.3
 * @enum {SpellTagConfiguration}
 */
AAFO.spellTags = {
  concentration: {
    label: "AAFO.Concentration",
    abbr: "AAFO.ConcentrationAbbr",
    icon: "systems/aafo/icons/svg/statuses/concentrating.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH"
  },
  ritual: {
    label: "AAFO.Ritual",
    abbr: "AAFO.RitualAbbr",
    icon: "systems/aafo/icons/svg/items/spell.svg",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA"
  }
};
preLocalize("spellTags", { keys: ["label", "abbr"] });

/* -------------------------------------------- */

/**
 * Configuration data for spell schools.
 *
 * @typedef {object} SpellSchoolConfiguration
 * @property {string} label        Localized label.
 * @property {string} icon         Spell school icon.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {string} [reference]  Reference to a rule page describing this school.
 */

/**
 * Schools to which a spell can belong.
 * @enum {SpellSchoolConfiguration}
 */
AAFO.spellSchools = {
  abj: {
    label: "AAFO.SchoolAbj",
    icon: "systems/aafo/icons/svg/schools/abjuration.svg",
    fullKey: "abjuration",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.849AYEWw9FHD6JNz"
  },
  con: {
    label: "AAFO.SchoolCon",
    icon: "systems/aafo/icons/svg/schools/conjuration.svg",
    fullKey: "conjuration",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TWyKMhZJZGqQ6uls"
  },
  div: {
    label: "AAFO.SchoolDiv",
    icon: "systems/aafo/icons/svg/schools/divination.svg",
    fullKey: "divination",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HoD2MwzmVbMqj9se"
  },
  enc: {
    label: "AAFO.SchoolEnc",
    icon: "systems/aafo/icons/svg/schools/enchantment.svg",
    fullKey: "enchantment",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.SehPXk24ySBVOwCZ"
  },
  evo: {
    label: "AAFO.SchoolEvo",
    icon: "systems/aafo/icons/svg/schools/evocation.svg",
    fullKey: "evocation",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kGp1RNuxL2SELLRC"
  },
  ill: {
    label: "AAFO.SchoolIll",
    icon: "systems/aafo/icons/svg/schools/illusion.svg",
    fullKey: "illusion",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.smEk7kvVyslFozrB"
  },
  nec: {
    label: "AAFO.SchoolNec",
    icon: "systems/aafo/icons/svg/schools/necromancy.svg",
    fullKey: "necromancy",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W0eyiV1FBmngb6Qh"
  },
  trs: {
    label: "AAFO.SchoolTrs",
    icon: "systems/aafo/icons/svg/schools/transmutation.svg",
    fullKey: "transmutation",
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.IYWewSailtmv6qEb"
  }
};
preLocalize("spellSchools", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Types of spell lists.
 * @enum {string}
 */
AAFO.spellListTypes = {
  class: "ITEM.TypeClass",
  subclass: "ITEM.TypeSubclass",
  background: "ITEM.TypeBackground",
  race: "ITEM.TypeRace",
  other: "JOURNALENTRYPAGE.AAFO.SpellList.Type.Other"
};
preLocalize("spellListTypes");

/* -------------------------------------------- */

/**
 * Spell scroll item ID within the `AAFO.sourcePacks` compendium or a full UUID for each spell level.
 * @enum {string}
 */
AAFO.spellScrollIds = {
  0: "rQ6sO7HDWzqMhSI3",
  1: "9GSfMg0VOA2b4uFN",
  2: "XdDp6CKh9qEvPTuS",
  3: "hqVKZie7x9w3Kqds",
  4: "DM7hzgL836ZyUFB1",
  5: "wa1VF8TXHmkrrR35",
  6: "tI3rWx4bxefNCexS",
  7: "mtyw4NS1s7j2EJaD",
  8: "aOrinPg7yuDZEuWr",
  9: "O4YbkJkLlnsgUszZ"
};

/* -------------------------------------------- */
/*  Weapon Details                              */
/* -------------------------------------------- */

/**
 * The set of types which a weapon item can take.
 * @enum {string}
 */
AAFO.weaponTypes = {
  simpleM: "AAFO.WeaponSimpleM",
  simpleR: "AAFO.WeaponSimpleR",
  martialM: "AAFO.WeaponMartialM",
  martialR: "AAFO.WeaponMartialR",
  natural: "AAFO.WeaponNatural",
  improv: "AAFO.WeaponImprov",
  siege: "AAFO.WeaponSiege"
};
preLocalize("weaponTypes");

/* -------------------------------------------- */

/**
 * Compendium packs used for localized items.
 * @enum {string}
 */
AAFO.sourcePacks = {
  BACKGROUNDS: "aafo.backgrounds",
  CLASSES: "aafo.classes",
  ITEMS: "aafo.items",
  RACES: "aafo.races"
};

/* -------------------------------------------- */

/**
 * Settings to configure how actors are merged when polymorphing is applied.
 * @enum {string}
 */
AAFO.polymorphSettings = {
  keepPhysical: "AAFO.PolymorphKeepPhysical",
  keepMental: "AAFO.PolymorphKeepMental",
  keepSaves: "AAFO.PolymorphKeepSaves",
  keepSkills: "AAFO.PolymorphKeepSkills",
  mergeSaves: "AAFO.PolymorphMergeSaves",
  mergeSkills: "AAFO.PolymorphMergeSkills",
  keepClass: "AAFO.PolymorphKeepClass",
  keepFeats: "AAFO.PolymorphKeepFeats",
  keepSpells: "AAFO.PolymorphKeepSpells",
  keepItems: "AAFO.PolymorphKeepItems",
  keepBio: "AAFO.PolymorphKeepBio",
  keepVision: "AAFO.PolymorphKeepVision",
  keepSelf: "AAFO.PolymorphKeepSelf"
};
preLocalize("polymorphSettings", { sort: true });

/**
 * Settings to configure how actors are effects are merged when polymorphing is applied.
 * @enum {string}
 */
AAFO.polymorphEffectSettings = {
  keepAE: "AAFO.PolymorphKeepAE",
  keepOtherOriginAE: "AAFO.PolymorphKeepOtherOriginAE",
  keepOriginAE: "AAFO.PolymorphKeepOriginAE",
  keepEquipmentAE: "AAFO.PolymorphKeepEquipmentAE",
  keepFeatAE: "AAFO.PolymorphKeepFeatureAE",
  keepSpellAE: "AAFO.PolymorphKeepSpellAE",
  keepClassAE: "AAFO.PolymorphKeepClassAE",
  keepBackgroundAE: "AAFO.PolymorphKeepBackgroundAE"
};
preLocalize("polymorphEffectSettings", { sort: true });

/**
 * Settings to configure how actors are merged when preset polymorphing is applied.
 * @enum {object}
 */
AAFO.transformationPresets = {
  wildshape: {
    icon: '<i class="fas fa-paw"></i>',
    label: "AAFO.PolymorphWildShape",
    options: {
      keepBio: true,
      keepClass: true,
      keepMental: true,
      mergeSaves: true,
      mergeSkills: true,
      keepEquipmentAE: false
    }
  },
  polymorph: {
    icon: '<i class="fas fa-pastafarianism"></i>',
    label: "AAFO.Polymorph",
    options: {
      keepEquipmentAE: false,
      keepClassAE: false,
      keepFeatAE: false,
      keepBackgroundAE: false
    }
  },
  polymorphSelf: {
    icon: '<i class="fas fa-eye"></i>',
    label: "AAFO.PolymorphSelf",
    options: {
      keepSelf: true
    }
  }
};
preLocalize("transformationPresets", { sort: true, keys: ["label"] });

/* -------------------------------------------- */

/**
 * Skill, ability, and tool proficiency levels.
 * The key for each level represents its proficiency multiplier.
 * @enum {string}
 */
AAFO.proficiencyLevels = {
  0: "AAFO.NotProficient",
  1: "AAFO.Proficient",
  0.5: "AAFO.HalfProficient",
  2: "AAFO.Expertise"
};
preLocalize("proficiencyLevels");

/* -------------------------------------------- */

/**
 * Weapon and armor item proficiency levels.
 * @enum {string}
 */
AAFO.weaponAndArmorProficiencyLevels = {
  0: "AAFO.NotProficient",
  1: "AAFO.Proficient"
};
preLocalize("weaponAndArmorProficiencyLevels");

/* -------------------------------------------- */

/**
 * The amount of cover provided by an object. In cases where multiple pieces
 * of cover are in play, we take the highest value.
 * @enum {string}
 */
AAFO.cover = {
  0: "AAFO.None",
  .5: "AAFO.CoverHalf",
  .75: "AAFO.CoverThreeQuarters",
  1: "AAFO.CoverTotal"
};
preLocalize("cover");

/* -------------------------------------------- */

/**
 * A selection of actor attributes that can be tracked on token resource bars.
 * @type {string[]}
 * @deprecated since v10
 */
AAFO.trackableAttributes = [
  "attributes.ac.value", "attributes.init.bonus", "attributes.movement", "attributes.senses", "attributes.spelldc",
  "attributes.spellLevel", "details.cr", "details.spellLevel", "details.xp.value", "skills.*.passive",
  "abilities.*.value"
];

/* -------------------------------------------- */

/**
 * A selection of actor and item attributes that are valid targets for item resource consumption.
 * @type {string[]}
 */
AAFO.consumableResources = [
  // Configured during init.
];

/* -------------------------------------------- */

/**
 * @typedef {object} _StatusEffectConfig5e
 * @property {string} icon            Icon used to represent the condition on the token.
 * @property {string} [reference]     UUID of a journal entry with details on this condition.
 * @property {string} [special]       Set this condition as a special status effect under this name.
 * @property {string[]} [riders]      Additional conditions, by id, to apply as part of this condition.
 */

/**
 * Configuration data for system status effects.
 * @typedef {Omit<StatusEffectConfig, "img"> & _StatusEffectConfig5e} StatusEffectConfig5e
 */

/**
 * @typedef {object} _ConditionConfiguration
 * @property {string} label        Localized label for the condition.
 * @property {boolean} [pseudo]    Is this a pseudo-condition, i.e. one that does not appear in the conditions appendix
 *                                 but acts as a status effect?
 * @property {number} [levels]     The number of levels of exhaustion an actor can obtain.
 */

/**
 * Configuration data for system conditions.
 * @typedef {Omit<StatusEffectConfig5e, "name"> & _ConditionConfiguration} ConditionConfiguration
 */

/**
 * Conditions that can affect an actor.
 * @enum {ConditionConfiguration}
 */
AAFO.conditionTypes = {
  bleeding: {
    label: "EFFECT.AAFO.StatusBleeding",
    icon: "systems/aafo/icons/svg/statuses/bleeding.svg",
    pseudo: true
  },
  blinded: {
    label: "AAFO.ConBlinded",
    icon: "systems/aafo/icons/svg/statuses/blinded.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.0b8N4FymGGfbZGpJ",
    special: "BLIND"
  },
  charmed: {
    label: "AAFO.ConCharmed",
    icon: "systems/aafo/icons/svg/statuses/charmed.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.zZaEBrKkr66OWJvD"
  },
  cursed: {
    label: "EFFECT.AAFO.StatusCursed",
    icon: "systems/aafo/icons/svg/statuses/cursed.svg",
    pseudo: true
  },
  deafened: {
    label: "AAFO.ConDeafened",
    icon: "systems/aafo/icons/svg/statuses/deafened.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.6G8JSjhn701cBITY"
  },
  diseased: {
    label: "AAFO.ConDiseased",
    icon: "systems/aafo/icons/svg/statuses/diseased.svg",
    pseudo: true,
    reference: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
  },
  // exhaustion: {
  //   label: "AAFO.ConExhaustion",
  //   icon: "systems/aafo/icons/svg/statuses/exhaustion.svg",
  //   reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cspWveykstnu3Zcv",
  //   levels: 6
  // },
  frightened: {
    label: "AAFO.ConFrightened",
    icon: "systems/aafo/icons/svg/statuses/frightened.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.oreoyaFKnvZCrgij"
  },
  grappled: {
    label: "AAFO.ConGrappled",
    icon: "systems/aafo/icons/svg/statuses/grappled.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.gYDAhd02ryUmtwZn"
  },
  incapacitated: {
    label: "AAFO.ConIncapacitated",
    icon: "systems/aafo/icons/svg/statuses/incapacitated.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.TpkZgLfxCmSndmpb"
  },
  invisible: {
    label: "AAFO.ConInvisible",
    icon: "systems/aafo/icons/svg/statuses/invisible.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.3UU5GCTVeRDbZy9u"
  },
  paralyzed: {
    label: "AAFO.ConParalyzed",
    icon: "systems/aafo/icons/svg/statuses/paralyzed.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xnSV5hLJIMaTABXP",
    statuses: ["incapacitated"]
  },
  petrified: {
    label: "AAFO.ConPetrified",
    icon: "systems/aafo/icons/svg/statuses/petrified.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.xaNDaW6NwQTgHSmi",
    statuses: ["incapacitated"]
  },
  poisoned: {
    label: "AAFO.ConPoisoned",
    icon: "systems/aafo/icons/svg/statuses/poisoned.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.lq3TRI6ZlED8ABMx"
  },
  prone: {
    label: "AAFO.ConProne",
    icon: "systems/aafo/icons/svg/statuses/prone.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.y0TkcdyoZlOTmAFT"
  },
  restrained: {
    label: "AAFO.ConRestrained",
    icon: "systems/aafo/icons/svg/statuses/restrained.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.cSVcyZyNe2iG1fIc"
  },
  silenced: {
    label: "EFFECT.AAFO.StatusSilenced",
    icon: "systems/aafo/icons/svg/statuses/silenced.svg",
    pseudo: true
  },
  stunned: {
    label: "AAFO.ConStunned",
    icon: "systems/aafo/icons/svg/statuses/stunned.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.ZyZMUwA2rboh4ObS",
    statuses: ["incapacitated"]
  },
  surprised: {
    label: "EFFECT.AAFO.StatusSurprised",
    icon: "systems/aafo/icons/svg/statuses/surprised.svg",
    pseudo: true
  },
  transformed: {
    label: "EFFECT.AAFO.StatusTransformed",
    icon: "systems/aafo/icons/svg/statuses/transformed.svg",
    pseudo: true
  },
  unconscious: {
    label: "AAFO.ConUnconscious",
    icon: "systems/aafo/icons/svg/statuses/unconscious.svg",
    reference: "Compendium.aafo.rules.JournalEntry.w7eitkpD7QQTB6j0.JournalEntryPage.UWw13ISmMxDzmwbd",
    statuses: ["incapacitated"],
    riders: ["prone"]
  }
};
preLocalize("conditionTypes", { key: "label", sort: true });

/* -------------------------------------------- */

/**
 * Various effects of conditions and which conditions apply it. Either keys for the conditions,
 * and with a number appended for a level of exhaustion.
 * @enum {object}
 */
AAFO.conditionEffects = {
  noMovement: new Set(["exhaustion-5", "grappled", "paralyzed", "petrified", "restrained", "stunned", "unconscious"]),
  halfMovement: new Set(["exhaustion-2"]),
  crawl: new Set(["prone", "exceedingCarryingCapacity"]),
  petrification: new Set(["petrified"]),
  halfHealth: new Set(["exhaustion-4"])
};

/* -------------------------------------------- */

/**
 * Extra status effects not specified in `conditionTypes`. If the ID matches a core-provided effect, then this
 * data will be merged into the core data.
 * @enum {Omit<StatusEffectConfig5e, "img"> & {icon: string}}
 */
AAFO.statusEffects = {
  burrowing: {
    name: "EFFECT.AAFO.StatusBurrowing",
    icon: "systems/aafo/icons/svg/statuses/burrowing.svg",
    special: "BURROW"
  },
  concentrating: {
    name: "EFFECT.AAFO.StatusConcentrating",
    icon: "systems/aafo/icons/svg/statuses/concentrating.svg",
    special: "CONCENTRATING"
  },
  dead: {
    name: "EFFECT.AAFO.StatusDead",
    icon: "systems/aafo/icons/svg/statuses/dead.svg",
    special: "DEFEATED"
  },
  dodging: {
    name: "EFFECT.AAFO.StatusDodging",
    icon: "systems/aafo/icons/svg/statuses/dodging.svg"
  },
  ethereal: {
    name: "EFFECT.AAFO.StatusEthereal",
    icon: "systems/aafo/icons/svg/statuses/ethereal.svg"
  },
  flying: {
    name: "EFFECT.AAFO.StatusFlying",
    icon: "systems/aafo/icons/svg/statuses/flying.svg",
    special: "FLY"
  },
  hiding: {
    name: "EFFECT.AAFO.StatusHiding",
    icon: "systems/aafo/icons/svg/statuses/hiding.svg"
  },
  hovering: {
    name: "EFFECT.AAFO.StatusHovering",
    icon: "systems/aafo/icons/svg/statuses/hovering.svg",
    special: "HOVER"
  },
  marked: {
    name: "EFFECT.AAFO.StatusMarked",
    icon: "systems/aafo/icons/svg/statuses/marked.svg"
  },
  sleeping: {
    name: "EFFECT.AAFO.StatusSleeping",
    icon: "systems/aafo/icons/svg/statuses/sleeping.svg",
    statuses: ["incapacitated", "unconscious"]
  },
  stable: {
    name: "EFFECT.AAFO.StatusStable",
    icon: "systems/aafo/icons/svg/statuses/stable.svg"
  }
};

/* -------------------------------------------- */
/*  Languages                                   */
/* -------------------------------------------- */

/**
 * Languages a character can learn.
 * @enum {string}
 */
AAFO.languages = {
  standard: {
    label: "AAFO.LanguagesStandard",
    children: {
      common: "AAFO.LanguagesCommon",
      dwarvish: "AAFO.LanguagesDwarvish",
      elvish: "AAFO.LanguagesElvish",
      giant: "AAFO.LanguagesGiant",
      gnomish: "AAFO.LanguagesGnomish",
      goblin: "AAFO.LanguagesGoblin",
      halfling: "AAFO.LanguagesHalfling",
      orc: "AAFO.LanguagesOrc"
    }
  },
  exotic: {
    label: "AAFO.LanguagesExotic",
    children: {
      aarakocra: "AAFO.LanguagesAarakocra",
      abyssal: "AAFO.LanguagesAbyssal",
      celestial: "AAFO.LanguagesCelestial",
      deep: "AAFO.LanguagesDeepSpeech",
      draconic: "AAFO.LanguagesDraconic",
      gith: "AAFO.LanguagesGith",
      gnoll: "AAFO.LanguagesGnoll",
      infernal: "AAFO.LanguagesInfernal",
      primordial: {
        label: "AAFO.LanguagesPrimordial",
        children: {
          aquan: "AAFO.LanguagesAquan",
          auran: "AAFO.LanguagesAuran",
          ignan: "AAFO.LanguagesIgnan",
          terran: "AAFO.LanguagesTerran"
        }
      },
      sylvan: "AAFO.LanguagesSylvan",
      undercommon: "AAFO.LanguagesUndercommon"
    }
  },
  druidic: "AAFO.LanguagesDruidic",
  cant: "AAFO.LanguagesThievesCant"
};
preLocalize("languages", { key: "label" });
preLocalize("languages.standard.children", { key: "label", sort: true });
preLocalize("languages.exotic.children", { key: "label", sort: true });
preLocalize("languages.exotic.children.primordial.children", { sort: true });
patchConfig("languages", "label", { since: "aafo 2.4", until: "aafo 3.1" });

/* -------------------------------------------- */

/**
 * Maximum allowed character level.
 * @type {number}
 */
AAFO.maxLevel = 30;

/**
 * Maximum ability score value allowed by default.
 * @type {number}
 */
AAFO.maxAbilityScore = 20;

/**
 * XP required to achieve each character level.
 * @type {number[]}
 */
AAFO.CHARACTER_EXP_LEVELS = [
  0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000,
  120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

/**
 * XP granted for each challenge rating.
 * @type {number[]}
 */
AAFO.CR_EXP_LEVELS = [
  10, 200, 450, 700, 1100, 1800, 2300, 2900, 3900, 5000, 5900, 7200, 8400, 10000, 11500, 13000, 15000, 18000,
  20000, 22000, 25000, 33000, 41000, 50000, 62000, 75000, 90000, 105000, 120000, 135000, 155000
];

AAFO.modMultiplierLevels = Array.fromRange(AAFO.maxLevel, 1).reduce((acc, level) => {
  if (level === 1) {
    acc[level] = 1
  } else {
    if (level % 2 === 1) {
      acc[level] = acc[level - 1] + 1 
    } else {
      acc[level] = acc[level - 1]
    }
  }
  return acc;
}, {})

/**
 * @typedef {object} CharacterFlagConfig
 * @property {string} name
 * @property {string} hint
 * @property {string} section
 * @property {typeof boolean|string|number} type
 * @property {string} placeholder
 * @property {string[]} [abilities]
 * @property {Object<string, string>} [choices]
 * @property {string[]} [skills]
 */

/* -------------------------------------------- */

/**
 * Trait configuration information.
 *
 * @typedef {object} TraitConfiguration
 * @property {object} labels
 * @property {string} labels.title         Localization key for the trait name.
 * @property {string} labels.localization  Prefix for a localization key that can be used to generate various
 *                                         plural variants of the trait type.
 * @property {string} icon                 Path to the icon used to represent this trait.
 * @property {string} [actorKeyPath]       If the trait doesn't directly map to an entry as `traits.[key]`, where is
 *                                         this trait's data stored on the actor?
 * @property {string} [configKey]          If the list of trait options doesn't match the name of the trait, where can
 *                                         the options be found within `CONFIG.AAFO`?
 * @property {string} [labelKeyPath]       If config is an enum of objects, where can the label be found?
 * @property {object} [subtypes]           Configuration for traits that take some sort of base item.
 * @property {string} [subtypes.keyPath]   Path to subtype value on base items, should match a category key.
 *                                         Deprecated in favor of the standardized `system.type.value`.
 * @property {string[]} [subtypes.ids]     Key for base item ID objects within `CONFIG.AAFO`.
 * @property {object} [children]           Mapping of category key to an object defining its children.
 * @property {boolean} [sortCategories]    Whether top-level categories should be sorted.
 * @property {boolean} [expertise]         Can an actor receive expertise in this trait?
 */

/**
 * Configurable traits on actors.
 * @enum {TraitConfiguration}
 */
AAFO.traits = {
  saves: {
    labels: {
      title: "AAFO.ClassSaves",
      localization: "AAFO.TraitSavesPlural"
    },
    icon: "systems/aafo/icons/svg/trait-saves.svg",
    actorKeyPath: "system.abilities",
    configKey: "abilities",
    labelKeyPath: "label"
  },
  skills: {
    labels: {
      title: "AAFO.Skills",
      localization: "AAFO.TraitSkillsPlural"
    },
    icon: "systems/aafo/icons/svg/trait-skills.svg",
    actorKeyPath: "system.skills",
    labelKeyPath: "label",
    expertise: true
  },
  languages: {
    labels: {
      title: "AAFO.Languages",
      localization: "AAFO.TraitLanguagesPlural"
    },
    icon: "systems/aafo/icons/svg/trait-languages.svg"
  },
  armor: {
    labels: {
      title: "AAFO.TraitArmorProf",
      localization: "AAFO.TraitArmorPlural"
    },
    icon: "systems/aafo/icons/svg/trait-armor-proficiencies.svg",
    actorKeyPath: "system.traits.armorProf",
    configKey: "armorProficiencies",
    subtypes: { keyPath: "armor.type", ids: ["armorIds", "shieldIds"] }
  },
  weapon: {
    labels: {
      title: "AAFO.TraitWeaponProf",
      localization: "AAFO.TraitWeaponPlural"
    },
    icon: "systems/aafo/icons/svg/trait-weapon-proficiencies.svg",
    actorKeyPath: "system.traits.weaponProf",
    configKey: "weaponProficiencies",
    subtypes: { keyPath: "weaponType", ids: ["weaponIds"] }
  },
  tool: {
    labels: {
      title: "AAFO.TraitToolProf",
      localization: "AAFO.TraitToolPlural"
    },
    icon: "systems/aafo/icons/svg/trait-tool-proficiencies.svg",
    actorKeyPath: "system.tools",
    configKey: "toolProficiencies",
    subtypes: { keyPath: "toolType", ids: ["toolIds"] },
    children: { vehicle: "vehicleTypes" },
    sortCategories: true,
    expertise: true
  },
  di: {
    labels: {
      title: "AAFO.DamImm",
      localization: "AAFO.TraitDIPlural"
    },
    icon: "systems/aafo/icons/svg/trait-damage-immunities.svg",
    configKey: "damageTypes"
  },
  dr: {
    labels: {
      title: "AAFO.DamRes",
      localization: "AAFO.TraitDRPlural"
    },
    icon: "systems/aafo/icons/svg/trait-damage-resistances.svg",
    configKey: "damageTypes"
  },
  dv: {
    labels: {
      title: "AAFO.DamVuln",
      localization: "AAFO.TraitDVPlural"
    },
    icon: "systems/aafo/icons/svg/trait-damage-vulnerabilities.svg",
    configKey: "damageTypes"
  },
  ci: {
    labels: {
      title: "AAFO.ConImm",
      localization: "AAFO.TraitCIPlural"
    },
    icon: "systems/aafo/icons/svg/trait-condition-immunities.svg",
    configKey: "conditionTypes"
  }
};
preLocalize("traits", { key: "labels.title" });

/* -------------------------------------------- */

/**
 * Modes used within a trait advancement.
 * @enum {object}
 */
AAFO.traitModes = {
  default: {
    label: "AAFO.AdvancementTraitModeDefaultLabel",
    hint: "AAFO.AdvancementTraitModeDefaultHint"
  },
  expertise: {
    label: "AAFO.AdvancementTraitModeExpertiseLabel",
    hint: "AAFO.AdvancementTraitModeExpertiseHint"
  },
  forcedExpertise: {
    label: "AAFO.AdvancementTraitModeForceLabel",
    hint: "AAFO.AdvancementTraitModeForceHint"
  },
  upgrade: {
    label: "AAFO.AdvancementTraitModeUpgradeLabel",
    hint: "AAFO.AdvancementTraitModeUpgradeHint"
  }
};
preLocalize("traitModes", { keys: ["label", "hint"] });

/* -------------------------------------------- */

/**
 * Special character flags.
 * @enum {CharacterFlagConfig}
 */
AAFO.characterFlags = {
  diamondSoul: {
    name: "AAFO.FlagsDiamondSoul",
    hint: "AAFO.FlagsDiamondSoulHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  elvenAccuracy: {
    name: "AAFO.FlagsElvenAccuracy",
    hint: "AAFO.FlagsElvenAccuracyHint",
    section: "AAFO.RacialTraits",
    abilities: ["dex", "int", "wis", "cha"],
    type: Boolean
  },
  halflingLucky: {
    name: "AAFO.FlagsHalflingLucky",
    hint: "AAFO.FlagsHalflingLuckyHint",
    section: "AAFO.RacialTraits",
    type: Boolean
  },
  initiativeAdv: {
    name: "AAFO.FlagsInitiativeAdv",
    hint: "AAFO.FlagsInitiativeAdvHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  initiativeAlert: {
    name: "AAFO.FlagsAlert",
    hint: "AAFO.FlagsAlertHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  jackOfAllTrades: {
    name: "AAFO.FlagsJOAT",
    hint: "AAFO.FlagsJOATHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  observantFeat: {
    name: "AAFO.FlagsObservant",
    hint: "AAFO.FlagsObservantHint",
    skills: ["prc", "inv"],
    section: "AAFO.Feats",
    type: Boolean
  },
  tavernBrawlerFeat: {
    name: "AAFO.FlagsTavernBrawler",
    hint: "AAFO.FlagsTavernBrawlerHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  powerfulBuild: {
    name: "AAFO.FlagsPowerfulBuild",
    hint: "AAFO.FlagsPowerfulBuildHint",
    section: "AAFO.RacialTraits",
    type: Boolean
  },
  reliableTalent: {
    name: "AAFO.FlagsReliableTalent",
    hint: "AAFO.FlagsReliableTalentHint",
    section: "AAFO.Feats",
    type: Boolean
  },
  remarkableAthlete: {
    name: "AAFO.FlagsRemarkableAthlete",
    hint: "AAFO.FlagsRemarkableAthleteHint",
    abilities: ["str", "dex", "con"],
    section: "AAFO.Feats",
    type: Boolean
  },
  weaponCriticalThreshold: {
    name: "AAFO.FlagsWeaponCritThreshold",
    hint: "AAFO.FlagsWeaponCritThresholdHint",
    section: "AAFO.Feats",
    type: Number,
    placeholder: 20
  },
  spellCriticalThreshold: {
    name: "AAFO.FlagsSpellCritThreshold",
    hint: "AAFO.FlagsSpellCritThresholdHint",
    section: "AAFO.Feats",
    type: Number,
    placeholder: 20
  },
  meleeCriticalDamageDice: {
    name: "AAFO.FlagsMeleeCriticalDice",
    hint: "AAFO.FlagsMeleeCriticalDiceHint",
    section: "AAFO.Feats",
    type: Number,
    placeholder: 0
  }
};
preLocalize("characterFlags", { keys: ["name", "hint", "section"] });

/**
 * Flags allowed on actors. Any flags not in the list may be deleted during a migration.
 * @type {string[]}
 */
AAFO.allowedActorFlags = ["isPolymorphed", "originalActor"].concat(Object.keys(AAFO.characterFlags));

/* -------------------------------------------- */

/**
 * Different types of actor structures that groups can represent.
 * @enum {object}
 */
AAFO.groupTypes = {
  party: "AAFO.Group.TypeParty",
  encounter: "AAFO.Group.TypeEncounter"
};
preLocalize("groupTypes");

/* -------------------------------------------- */

/**
 * Configuration information for advancement types.
 *
 * @typedef {object} AdvancementTypeConfiguration
 * @property {typeof Advancement} documentClass  The advancement's document class.
 * @property {Set<string>} validItemTypes        What item types this advancement can be used with.
 */

const _ALL_ITEM_TYPES = ["background", "class", "race", "subclass", "perk"];

/**
 * Advancement types that can be added to items.
 * @enum {AdvancementTypeConfiguration}
 */
AAFO.advancementTypes = {
  AbilityScoreImprovement: {
    documentClass: advancement.AbilityScoreImprovementAdvancement,
    validItemTypes: new Set(["background", "class", "race", "perk"])
  },
  SkillImprovement: {
    documentClass: advancement.SkillImprovementAdvancement,
    validItemTypes: new Set(["background", "class", "race", "perk"])
  },
  HitPoints: {
    documentClass: advancement.HitPointsAdvancement,
    validItemTypes: new Set(["class", "perk"])
  },
  ItemChoice: {
    documentClass: advancement.ItemChoiceAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ItemGrant: {
    documentClass: advancement.ItemGrantAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  ScaleValue: {
    documentClass: advancement.ScaleValueAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  },
  Size: {
    documentClass: advancement.SizeAdvancement,
    validItemTypes: new Set(["race"])
  },
  Trait: {
    documentClass: advancement.TraitAdvancement,
    validItemTypes: new Set(_ALL_ITEM_TYPES)
  }
};

/* -------------------------------------------- */

/**
 * Default artwork configuration for each Document type and sub-type.
 * @type {Record<string, Record<string, string>>}
 */
AAFO.defaultArtwork = {
  Item: {
    background: "systems/aafo/icons/svg/items/background.svg",
    class: "systems/aafo/icons/svg/items/class.svg",
    consumable: "systems/aafo/icons/svg/items/consumable.svg",
    container: "systems/aafo/icons/svg/items/container.svg",
    equipment: "systems/aafo/icons/svg/items/equipment.svg",
    feat: "systems/aafo/icons/svg/items/feature.svg",
    perk: "systems/aafo/icons/svg/items/feature.svg",
    loot: "systems/aafo/icons/svg/items/loot.svg",
    race: "systems/aafo/icons/svg/items/race.svg",
    spell: "systems/aafo/icons/svg/items/spell.svg",
    subclass: "systems/aafo/icons/svg/items/subclass.svg",
    tool: "systems/aafo/icons/svg/items/tool.svg",
    weapon: "systems/aafo/icons/svg/items/weapon.svg"
  }
};

/* -------------------------------------------- */
/*  Rules                                       */
/* -------------------------------------------- */

/**
 * Configuration information for rule types.
 *
 * @typedef {object} RuleTypeConfiguration
 * @property {string} label         Localized label for the rule type.
 * @property {string} [references]  Key path for a configuration object that contains reference data.
 */

/**
 * Types of rules that can be used in rule pages and the &Reference enricher.
 * @enum {RuleTypeConfiguration}
 */
AAFO.ruleTypes = {
  rule: {
    label: "AAFO.Rule.Type.Rule",
    references: "rules"
  },
  ability: {
    label: "AAFO.Ability",
    references: "enrichmentLookup.abilities"
  },
  areaOfEffect: {
    label: "AAFO.AreaOfEffect",
    references: "areaTargetTypes"
  },
  condition: {
    label: "AAFO.Rule.Type.Condition",
    references: "conditionTypes"
  },
  creatureType: {
    label: "AAFO.CreatureType",
    references: "creatureTypes"
  },
  damage: {
    label: "AAFO.DamageType",
    references: "damageTypes"
  },
  skill: {
    label: "AAFO.Skill",
    references: "enrichmentLookup.skills"
  },
  spellComponent: {
    label: "AAFO.SpellComponent",
    references: "itemProperties"
  },
  spellSchool: {
    label: "AAFO.SpellSchool",
    references: "enrichmentLookup.spellSchools"
  },
  spellTag: {
    label: "AAFO.SpellTag",
    references: "itemProperties"
  }
};
preLocalize("ruleTypes", { key: "label" });

/* -------------------------------------------- */

/**
 * List of rules that can be referenced from enrichers.
 * @enum {string}
 */
AAFO.rules = {
  inspiration: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.nkEPI89CiQnOaLYh",
  carryingcapacity: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1PnjDBKbQJIVyc2t",
  push: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  lift: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  drag: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Hni8DjqLzoqsVjb6",
  encumbrance: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JwqYf9qb6gJAWZKs",
  hiding: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.plHuoNdS0j3umPNS",
  passiveperception: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.988C2hQNyvqkdbND",
  time: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eihqNjwpZ3HM4IqY",
  speed: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HhqeIiSj8sE1v1qZ",
  travelpace: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.eFAISahBloR2X8MX",
  forcedmarch: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uQWQpRKQ1kWhuvjZ",
  difficultterrainpace: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hFW5BR2yHHwwgurD",
  climbing: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  swimming: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KxUXbMrUCIAhv4AF",
  longjump: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1U0myNrOvIVBUdJV",
  highjump: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.raPwIkqKSv60ELmy",
  falling: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kREHL5pgNUOhay9f",
  suffocating: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BIlnr0xYhqt4TGsi",
  vision: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  light: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.O6hamUbI9kVASN8b",
  lightlyobscured: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MAxtfJyvJV7EpzWN",
  heavilyobscured: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wPFjfRruboxhtL4b",
  brightlight: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RnMokVPyKGbbL8vi",
  dimlight: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.n1Ocpbyhr6HhgbCG",
  darkness: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4dfREIDjG5N4fvxd",
  blindsight: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.sacjsfm9ZXnw4Tqc",
  darkvision: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ldmA1PbnEGVkmE11",
  tremorsense: "Compendium.aafo.rules.JournalEntry.eVtpEGXjA2tamEIJ.JournalEntryPage.8AIlZ95v54mL531X",
  truesight: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kNa8rJFbtaTM3Rmk",
  food: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jayo7XVgGnRCpTW0",
  water: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iIEI87J7lr2sqtb5",
  resting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.dpHJXYLigIdEseIb",
  shortrest: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.1s2swI3UsjUUgbt2",
  longrest: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6cLtjbHn4KV2R7G9",
  surprise: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.YmOt8HderKveA19K",
  initiative: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RcwElV4GAcVXKWxo",
  bonusaction: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2fu2CXsDg8gQmGGw",
  reaction: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2VqLyxMyMxgXe2wC",
  difficultterrain: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6tqz947qO8vPyxvD",
  beingprone: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.bV8akkBdVUUG21CO",
  droppingprone: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  standingup: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hwTLpAtSS5OqQsI1",
  crawling: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.VWG9qe8PUNtS28Pw",
  movingaroundothercreatures: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9ZWCknaXCOdhyOrX",
  flying: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.0B1fxfmw0a48tPsc",
  size: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HWHRQVBVG7K0RVVW",
  space: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.WIA5bs3P45PmO3OS",
  squeezing: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wKtOwagDAiNfVoPS",
  attack: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.u4GQCzoBig20yRLj",
  castaspell: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GLwN36E4WXn3Cp4Z",
  dash: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Jqn0MEvq6fduYNo6",
  disengage: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ZOPRfI48NyjoloEF",
  dodge: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.V1BkwK2HQrtEfa4d",
  help: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KnrD3u2AnQfmtOWj",
  hide: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BXlHhE4ZoiFwiXLK",
  ready: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8xJzZVelP2AmQGfU",
  search: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5cn1ZTLgQq95vfZx",
  useanobject: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ljqhJx8Qxu2ivo69",
  attackrolls: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5wkqEqhbBD5kDeE7",
  unseenattackers: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  unseentargets: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.5ZJNwEPlsGurecg5",
  rangedattacks: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.S9aclVOCbusLE3kC",
  range: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HjKXuB8ndjcqOds7",
  rangedattacksinclosecombat: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qEZvxW0NM7ixSQP5",
  meleeattacks: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.GTk6emvzNxl8Oosl",
  reach: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hgZ5ZN4B3y7tmFlt",
  unarmedstrike: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xJjJ4lhymAYXAOvO",
  opportunityattacks: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zeU0NyCyP10lkLg3",
  twoweaponfighting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FQTS08uH74A6psL2",
  grappling: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Sl4bniSPSbyrakM2",
  escapingagrapple: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.2TZKy9YbMN3ZY3h8",
  movingagrappledcreature: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.x5bUdhAD7u5Bt2rg",
  shoving: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hrdqMF8hRXJdNzJx",
  cover: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.W7f7PcRubNUMIq2S",
  halfcover: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hv0J61IAfofuhy3Q",
  threequarterscover: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zAMStUjUrPV10dFm",
  totalcover: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.BKUAxXuPEzxiEOeL",
  hitpoints: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.PFbzoMBviI2DD9QP",
  damagerolls: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.hd26AqKrCqtcQBWy",
  criticalhits: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gFL1VhSEljL1zvje",
  damagetypes: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jVOgf7DNEhkzYNIe",
  damageresistance: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  damagevulnerability: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.v0WE18nT5SJO8Ft7",
  healing: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ICketFqbFslqKiX9",
  instantdeath: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8BG05mA0mEzwmrHU",
  deathsavingthrows: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  deathsaves: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.JL8LePEJQYFdNuLL",
  stabilizing: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.r1CgZXLcqFop6Dlx",
  knockingacreatureout: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uEwjgKGuCRTNADYv",
  temporaryhitpoints: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  temphp: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.AW6HpJZHqxfESXaq",
  mounting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  dismounting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.MFpyvUIdcBpC9kIE",
  controllingamount: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.khmR2xFk1NxoQUgZ",
  underwatercombat: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6zVOeLyq4iMnrQT4",
  spelllevel: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.A6k5fS0kFqPXTW3v",
  knownspells: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  preparedspells: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oezg742GlxmEwT85",
  spellslots: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Su6wbb0O9UN4ZDIH",
  castingatahigherlevel: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  upcasting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.4H9SLM95OCLfFizz",
  castinginarmor: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.z4A8vHSK2pb8YA9X",
  cantrips: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.jZD5mCTnMPJ9jW67",
  rituals: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.FjWqT5iyJ89kohdA",
  castingtime: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.zRVW8Tvyk6BECjZD",
  bonusactioncasting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RP1WL9FXI3aknlxZ",
  reactioncasting: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.t62lCfinwU9H7Lji",
  longercastingtimes: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gOAIRFCyPUx42axn",
  spellrange: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.RBYPyE5z5hAZSbH6",
  components: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.xeHthAF9lxfn2tII",
  verbal: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6UXTNWMCQ0nSlwwx",
  spellduration: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9mp0SRsptjvJcq1e",
  instantaneous: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kdlgZOpRMB6bGCod",
  concentrating: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.ow58p27ctAnr4VPH",
  spelltargets: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.G80AIQr04sxdVpw4",
  areaofeffect: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.wvtCeGHgnUmh0cuj",
  pointoforigin: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8HxbRceQQUAhyWRt",
  spellsavingthrows: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.8DajfNll90eeKcmB",
  spellattackrolls: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.qAFzmGZKhVvAEUF3",
  combiningmagicaleffects: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TMIN963hG773yZzO",
  schoolsofmagic: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.TeF6CKMDRpYpsLd4",
  detectingtraps: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  disablingtraps: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DZ7AhdQ94xggG4bj",
  curingmadness: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.6Icem7G3CICdNOkM",
  damagethreshold: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9LJZhqvCburpags3",
  poisontypes: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.I6OMMWUaYCWR9xip",
  contactpoison: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.kXnCEqqGUWRZeZDj",
  ingestedpoison: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.Y0vsJYSWeQcFpJ27",
  inhaledpoison: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.KUyN4eK1xTBzXsjP",
  injurypoison: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.LUL48OUq6SJeMGc7",
  attunement: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UQ65OwIyGK65eiOK",
  wearingitems: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  wieldingitems: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.iPB8mGKuQx3X0Z2J",
  multipleitemsofthesamekind: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rLJdvz4Mde8GkEYQ",
  paireditems: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.rd9pCH8yFraSGN34",
  commandword: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.HiXixxLYesv6Ff3t",
  consumables: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.UEPAcZFzQ5x196zE",
  itemspells: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.DABoaeeF6w31UCsj",
  charges: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.NLRXcgrpRCfsA5mO",
  spellscroll: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.gi8IKhtOlBVhMJrN",
  creaturetags: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.9jV1fFF163dr68vd",
  telepathy: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.geTidcFIYWuUvD2L",
  legendaryactions: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.C1awOyZh78pq1xmY",
  lairactions: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.07PtjpMxiRIhkBEp",
  regionaleffects: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.uj8W27NKFyzygPUd",
  disease: "Compendium.aafo.rules.JournalEntry.NizgRXLNUqtdlC1s.JournalEntryPage.oNQWvyRZkTOJ8PBq"
};

/* -------------------------------------------- */
/*  Token Rings Framework                       */
/* -------------------------------------------- */

/**
 * Token Rings configuration data
 *
 * @typedef {object} TokenRingsConfiguration
 * @property {Record<string, string>} effects        Localized names of the configurable ring effects.
 * @property {string} spriteSheet                    The sprite sheet json source.
 * @property {typeof BaseSamplerShader} shaderClass  The shader class definition associated with the token ring.
 */

/**
 * @type {TokenRingsConfiguration}
 */
AAFO.tokenRings = {
  effects: {
    RING_PULSE: "AAFO.TokenRings.Effects.RingPulse",
    RING_GRADIENT: "AAFO.TokenRings.Effects.RingGradient",
    BKG_WAVE: "AAFO.TokenRings.Effects.BackgroundWave"
  },
  spriteSheet: "systems/aafo/tokens/composite/token-rings.json",
  shaderClass: null
};
preLocalize("tokenRings.effects");

/* -------------------------------------------- */
/*  Sources                                     */
/* -------------------------------------------- */

/**
 * List of books available as sources.
 * @enum {string}
 */
AAFO.sourceBooks = {
  "SRD 5.1": "SOURCE.BOOK.SRD"
};
preLocalize("sourceBooks", { sort: true });

/* -------------------------------------------- */
/*  Themes                                      */
/* -------------------------------------------- */

/**
 * Themes that can be set for the system or on sheets.
 * @enum {string}
 */
AAFO.themes = {
  light: "SHEETS.AAFO.THEME.Light",
  dark: "SHEETS.AAFO.THEME.Dark"
};
preLocalize("themes");

/* -------------------------------------------- */
/*  Enrichment                                  */
/* -------------------------------------------- */

let _enrichmentLookup;
Object.defineProperty(AAFO, "enrichmentLookup", {
  get() {
    const slugify = value => value?.slugify().replaceAll("-", "");
    if ( !_enrichmentLookup ) {
      _enrichmentLookup = {
        abilities: foundry.utils.deepClone(AAFO.abilities),
        skills: foundry.utils.deepClone(AAFO.skills),
        spellSchools: foundry.utils.deepClone(AAFO.spellSchools),
        tools: foundry.utils.deepClone(AAFO.toolIds)
      };
      const addFullKeys = key => Object.entries(AAFO[key]).forEach(([k, v]) =>
        _enrichmentLookup[key][slugify(v.fullKey)] = { ...v, key: k }
      );
      addFullKeys("abilities");
      addFullKeys("skills");
      addFullKeys("spellSchools");
    }
    return _enrichmentLookup;
  },
  enumerable: true
});

/* -------------------------------------------- */

/**
 * Patch an existing config enum to allow conversion from string values to object values without
 * breaking existing modules that are expecting strings.
 * @param {string} key          Key within AAFO that has been replaced with an enum of objects.
 * @param {string} fallbackKey  Key within the new config object from which to get the fallback value.
 * @param {object} [options]    Additional options passed through to logCompatibilityWarning.
 */
function patchConfig(key, fallbackKey, options) {
  /** @override */
  function toString() {
    const message = `The value of CONFIG.AAFO.${key} has been changed to an object.`
      +` The former value can be acccessed from .${fallbackKey}.`;
    foundry.utils.logCompatibilityWarning(message, options);
    return this[fallbackKey];
  }

  Object.values(AAFO[key]).forEach(o => {
    if ( foundry.utils.getType(o) !== "Object" ) return;
    Object.defineProperty(o, "toString", {value: toString});
  });
}

/* -------------------------------------------- */

export default AAFO;
