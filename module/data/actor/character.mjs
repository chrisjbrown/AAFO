import HitDice from "../../documents/actor/hit-dice.mjs";
import Proficiency from "../../documents/actor/proficiency.mjs";
import { simplifyBonus } from "../../utils.mjs";
import { FormulaField, LocalDocumentField } from "../fields.mjs";
import CreatureTypeField from "../shared/creature-type-field.mjs";
import RollConfigField from "../shared/roll-config-field.mjs";
import AttributesFields from "./templates/attributes.mjs";
import CreatureTemplate from "./templates/creature.mjs";
import DetailsFields from "./templates/details.mjs";
import TraitsFields from "./templates/traits.mjs";

const { SchemaField, NumberField, StringField, BooleanField, ArrayField, IntegerSortField } = foundry.data.fields;

/**
 * @typedef {object} ActorFavorites5e
 * @property {"effect"|"item"|"skill"|"slots"|"tool"} type  The favorite type.
 * @property {string} id                                    The Document UUID, skill or tool identifier, or spell slot
 *                                                          level identifier.
 * @property {number} sort                                  The sort value.
 */

/**
 * System data definition for Characters.
 *
 * @property {object} attributes
 * @property {object} attributes.ac
 * @property {number} attributes.ac.flat                  Flat value used for flat or natural armor calculation.
 * @property {string} attributes.ac.calc                  Name of one of the built-in formulas to use.
 * @property {string} attributes.ac.formula               Custom formula to use.
 * @property {object} attributes.hp
 * @property {number} attributes.hp.value                 Current hit points.
 * @property {number} attributes.hp.max                   Override for maximum HP.
 * @property {number} attributes.hp.temp                  Temporary HP applied on top of value.
 * @property {number} attributes.hp.tempmax               Temporary change to the maximum HP.
 * @property {object} attributes.hp.bonuses
 * @property {string} attributes.hp.bonuses.level         Bonus formula applied for each class level.
 * @property {string} attributes.hp.bonuses.overall       Bonus formula applied to total HP.
 * @property {object} attributes.sp
 * @property {number} attributes.sp.value                 Current hit points.
 * @property {number} attributes.sp.max                   Override for maximum HP.
 * @property {number} attributes.sp.temp                  Temporary HP applied on top of value.
 * @property {number} attributes.sp.tempmax               Temporary change to the maximum HP.
 * @property {object} attributes.sp.bonuses
 * @property {string} attributes.sp.bonuses.level         Bonus formula applied for each class level.
 * @property {string} attributes.sp.bonuses.overall       Bonus formula applied to total HP.
 * @property {object} attributes.death
 * @property {number} attributes.death.success            Number of successful death saves.
 * @property {number} attributes.death.failure            Number of failed death saves.
 * @property {number} attributes.exhaustion               Number of levels of exhaustion.
 * @property {number} attributes.inspiration              Does this character have inspiration?
 * @property {object} attributes.penalties
 * @property {number} attributes.penalties.hunger
 * @property {number} attributes.penalties.dehydration
 * @property {number} attributes.penalties.radiation
 * @property {number} attributes.penalties.exhaustion
 * @property {object} details
 * @property {Item5e|string} details.background           Character's background item or name.
 * @property {string} details.originalClass               ID of first class taken by character.
 * @property {XPData} details.xp                          Experience points gained.
 * @property {number} details.xp.value                    Total experience points earned.
 * @property {string} details.appearance                  Description of character's appearance.
 * @property {string} details.trait                       Character's personality traits.
 * @property {string} details.ideal                       Character's ideals.
 * @property {string} details.bond                        Character's bonds.
 * @property {string} details.flaw                        Character's flaws.
 * @property {object} traits
 * @property {SimpleTraitData} traits.weaponProf          Character's weapon proficiencies.
 * @property {SimpleTraitData} traits.armorProf           Character's armor proficiencies.
 * @property {object} resources
 * @property {CharacterResourceData} resources.primary    Resource number one.
 * @property {CharacterResourceData} resources.secondary  Resource number two.
 * @property {CharacterResourceData} resources.tertiary   Resource number three.
 * @property {ActorFavorites5e[]} favorites               The character's favorites.
 */
export default class CharacterData extends CreatureTemplate {

  /** @inheritdoc */
  static metadata = Object.freeze(foundry.utils.mergeObject(super.metadata, {
    supportsAdvancement: true
  }, {inplace: false}));

  /* -------------------------------------------- */

  /** @inheritdoc */
  static _systemType = "character";

  /* -------------------------------------------- */

  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      attributes: new foundry.data.fields.SchemaField({
        ...AttributesFields.common,
        ...AttributesFields.creature,
        ac: new SchemaField({
          flat: new NumberField({integer: true, min: 0, label: "AAFO.ArmorClassFlat"}),
          calc: new StringField({initial: "default", label: "AAFO.ArmorClassCalculation"}),
          formula: new FormulaField({deterministic: true, label: "AAFO.ArmorClassFormula"})
        }, {label: "AAFO.ArmorClass"}),
        hp: new SchemaField({
          value: new NumberField({
            nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.HitPointsCurrent"
          }),
          max: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "AAFO.HitPointsOverride"
          }),
          temp: new NumberField({integer: true, initial: 0, min: 0, label: "AAFO.HitPointsTemp"}),
          tempmax: new NumberField({integer: true, initial: 0, label: "AAFO.HitPointsTempMax"}),
          bonuses: new SchemaField({
            level: new FormulaField({deterministic: true, label: "AAFO.HitPointsBonusLevel"}),
            overall: new FormulaField({deterministic: true, label: "AAFO.HitPointsBonusOverall"})
          })
        }, {label: "AAFO.HitPoints"}),
        ap: new SchemaField({
          value: new NumberField({
            nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.ActionPointsCurrent"
          }),
          max: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "AAFO.ActionPointsOverride"
          }),
          temp: new NumberField({integer: true, initial: 0, min: 0, label: "AAFO.HitPointsTemp"}),
          tempmax: new NumberField({integer: true, initial: 0, label: "AAFO.HitPointsTempMax"}),
          bonuses: new SchemaField({
            level: new FormulaField({deterministic: true, label: "AAFO.ActionPointsBonusLevel"}),
            overall: new FormulaField({deterministic: true, label: "AAFO.ActionPointsBonusOverall"})
          })
        }, {label: "AAFO.ActionPoints"}),
        sp: new SchemaField({
          value: new NumberField({
            nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.StaminaPointsCurrent"
          }),
          max: new NumberField({
            nullable: true, integer: true, min: 0, initial: null, label: "AAFO.StaminaPointsOverride"
          }),
          bonuses: new SchemaField({
            level: new FormulaField({deterministic: true, label: "AAFO.StaminaPointsBonusLevel"}),
            overall: new FormulaField({deterministic: true, label: "AAFO.StaminaPointsBonusOverall"})
          })
        }, {label: "AAFO.StaminaPoints"}),
        death: new RollConfigField({
          success: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.DeathSaveSuccesses"
          }),
          failure: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.DeathSaveFailures"
          })
        }, {label: "AAFO.DeathSave"}),
        inspiration: new BooleanField({required: true, label: "AAFO.Inspiration"}),
        penalties: new foundry.data.fields.SchemaField({
          fatigue: new SchemaField({
            value: new NumberField({
              nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.FatiguePointsCurrent"
            }),
            max: new NumberField({
              nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.FatiguePointsMax"
            })
          }, {label: "AAFO.Fatigue"}),
          hunger: new SchemaField({
            value: new NumberField({
              nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.HungerPointsCurrent"
            }),
            max: new NumberField({
              nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.HungerPointsMax"
            })
          }, {label: "AAFO.Hunger"}),
          dehydration: new SchemaField({
            value: new NumberField({
              nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.DehydrationPointsCurrent"
            }),
            max: new NumberField({
              nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.DehydrationPointsMax"
            })
          }, {label: "AAFO.Dehydration"}),
          radiation: new SchemaField({
            value: new NumberField({
              nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.RadiationPointsCurrent"
            }),
            max: new NumberField({
              nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.RadiationPointsMax"
            })
          }, {label: "AAFO.Radiation"}),
          exhaustion: new SchemaField({
            value: new NumberField({
              nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.ExhaustionPointsCurrent"
            }),
            max: new NumberField({
              nullable: true, integer: true, min: 0, initial: 10, label: "AAFO.ExhaustionPointsMax"
            })
          }, {label: "AAFO.Exhaustion"})
        }, {label: "AAFO.Penalties"})
      }, {label: "AAFO.Attributes"}),
      details: new SchemaField({
        ...DetailsFields.common,
        ...DetailsFields.creature,
        background: new LocalDocumentField(foundry.documents.BaseItem, {
          required: true, fallback: true, label: "AAFO.Background"
        }),
        originalClass: new StringField({required: true, label: "AAFO.ClassOriginal"}),
        xp: new SchemaField({
          value: new NumberField({
            required: true, nullable: false, integer: true, min: 0, initial: 0, label: "AAFO.ExperiencePointsCurrent"
          })
        }, {label: "AAFO.ExperiencePoints"}),
        appearance: new StringField({required: true, label: "AAFO.Appearance"}),
        trait: new StringField({required: true, label: "AAFO.PersonalityTraits"}),
        ideal: new StringField({required: true, label: "AAFO.Ideals"}),
        bond: new StringField({required: true, label: "AAFO.Bonds"}),
        flaw: new StringField({required: true, label: "AAFO.Flaws"}),
        gender: new StringField({ label: "AAFO.Gender" }),
        eyes: new StringField({ label: "AAFO.Eyes" }),
        height: new StringField({ label: "AAFO.Height" }),
        faith: new StringField({ label: "AAFO.Faith" }),
        hair: new StringField({ label: "AAFO.Hair" }),
        skin: new StringField({ label: "AAFO.Skin" }),
        age: new StringField({ label: "AAFO.Age" }),
        weight: new StringField({ label: "AAFO.Weight" })
      }, {label: "AAFO.Details"}),
      traits: new SchemaField({
        ...TraitsFields.common,
        ...TraitsFields.creature,
        weaponProf: TraitsFields.makeSimpleTrait({label: "AAFO.TraitWeaponProf"}),
        armorProf: TraitsFields.makeSimpleTrait({label: "AAFO.TraitArmorProf"})
      }, {label: "AAFO.Traits"}),
      resources: new SchemaField({
        primary: makeResourceField({label: "AAFO.ResourcePrimary"}),
        secondary: makeResourceField({label: "AAFO.ResourceSecondary"}),
        tertiary: makeResourceField({label: "AAFO.ResourceTertiary"})
      }, {label: "AAFO.Resources"}),
      favorites: new ArrayField(new SchemaField({
        type: new StringField({ required: true, blank: false }),
        id: new StringField({ required: true, blank: false }),
        sort: new IntegerSortField()
      }), { label: "AAFO.Favorites" }),
      caps: new NumberField({integer: true, min: 0, initial: 0, label: "AAFO.Caps"}),
    });
  }

  /* -------------------------------------------- */
  /*  Data Migration                              */
  /* -------------------------------------------- */

  /** @inheritdoc */
  static _migrateData(source) {
    super._migrateData(source);
    AttributesFields._migrateInitiative(source.attributes);
  }

  /* -------------------------------------------- */
  /*  Data Preparation                            */
  /* -------------------------------------------- */

  /** @inheritdoc */
  prepareBaseData() {
    this.attributes.hd = new HitDice(this.parent);
    this.details.level = this.attributes.hd.max;
    this.attributes.attunement.value = 0;

    for ( const item of this.parent.items ) {
      if ( item.system.attuned ) this.attributes.attunement.value += 1;
    }

    // Character proficiency bonus
    this.attributes.prof = 0;

    // Character damage threshold
    this.attributes.damageThreshold = 0;

    // Experience required for next level
    const { xp, level } = this.details;
    xp.max = this.parent.getLevelExp(level || 1);
    xp.min = level ? this.parent.getLevelExp(level - 1) : 0;
    if ( level >= CONFIG.AAFO.CHARACTER_EXP_LEVELS.length ) xp.pct = 100;
    else {
      const required = xp.max - xp.min;
      const pct = Math.round((xp.value - xp.min) * 100 / required);
      xp.pct = Math.clamp(pct, 0, 100);
    }

    AttributesFields.prepareBaseArmorClass.call(this);
    AttributesFields.prepareBaseEncumbrance.call(this);
  }

  /* -------------------------------------------- */

  /**
   * Prepare movement & senses values derived from race item.
   */
  prepareEmbeddedData() {
    if ( this.details.race instanceof Item ) {
      AttributesFields.prepareRace.call(this, this.details.race);
      this.details.type = this.details.race.system.type;
    } else {
      this.details.type = new CreatureTypeField({ swarm: false }).initialize({ value: "humanoid" }, this);
    }
    for ( const key of Object.keys(CONFIG.AAFO.movementTypes) ) this.attributes.movement[key] ??= 0;
    for ( const key of Object.keys(CONFIG.AAFO.senses) ) this.attributes.senses[key] ??= 0;
    this.attributes.movement.units ??= Object.keys(CONFIG.AAFO.movementUnits)[0];
    this.attributes.senses.units ??= Object.keys(CONFIG.AAFO.movementUnits)[0];
  }

  /* -------------------------------------------- */

  /**
   * Prepare remaining character data.
   */
  prepareDerivedData() {
    const rollData = this.getRollData({ deterministic: true });
    const { originalSaves } = this.parent.getOriginalStats();

    this.prepareAbilities({ rollData, originalSaves });
    AttributesFields.prepareEncumbrance.call(this, rollData);
    // AttributesFields.prepareExhaustionLevel.call(this);
    AttributesFields.prepareMovement.call(this);
    AttributesFields.prepareConcentration.call(this, rollData);
    TraitsFields.prepareResistImmune.call(this);

    // Hit Points
    const hpOptions = {};
    if ( this.attributes.hp.max === null ) {
      hpOptions.advancement = Object.values(this.parent.classes)
        .map(c => c.advancement.byType.HitPoints)?.[0]
      hpOptions.bonus = (simplifyBonus(this.attributes.hp.bonuses.level, rollData) * this.details.level)
        + simplifyBonus(this.attributes.hp.bonuses.overall, rollData);
      hpOptions.mod = this.abilities[CONFIG.AAFO.defaultAbilities.hitPoints ?? "end"]?.mod ?? 0;
    }
    AttributesFields.prepareHitPoints.call(this, this.attributes.hp, hpOptions);

    // Stamina Points
    const spOptions = {};
    if ( this.attributes.sp.max === null ) {
      spOptions.advancement = Object.values(this.parent.classes)
        .map(c => c.advancement.byType.HitPoints)?.[0]
      spOptions.bonus = (simplifyBonus(this.attributes.sp.bonuses.level, rollData) * this.details.level)
        + simplifyBonus(this.attributes.sp.bonuses.overall, rollData);
      spOptions.mod = this.abilities[CONFIG.AAFO.defaultAbilities.staminaPoints ?? "end"]?.mod ?? 0;
    }
    AttributesFields.prepareStaminaPoints.call(this, this.attributes.sp, spOptions);

    // Action Points
    const apOptions = {};
    if ( this.attributes.ap.max === null ) {
      apOptions.advancement = Object.values(this.parent.classes)
        .map(c => c.advancement.byType.HitPoints)?.[0]
      apOptions.bonus = (simplifyBonus(this.attributes.ap.bonuses.level, rollData) * this.details.level)
        + simplifyBonus(this.attributes.ap.bonuses.overall, rollData);
      apOptions.mod = this.abilities[CONFIG.AAFO.defaultAbilities.actionPoints ?? "agi"]?.mod ?? 0;
    }
    AttributesFields.prepareActionPoints.call(this, this.attributes.ap, apOptions);

    // Character healing rate
    this.attributes.healingRate = Math.floor((this.abilities.end.value + this.details.level) / 2);
    
    // Character radiation DC
    this.attributes.radiationDC = 12 - this.abilities.end.mod;

    // Character passive sense
    this.attributes.passiveSense = 12 + this.abilities.per.mod;
  }

  /* -------------------------------------------- */
  /*  Helpers                                     */
  /* -------------------------------------------- */

  /**
   * Checks whether the item with the given relative UUID has been favorited
   * @param {string} favoriteId  The relative UUID of the item to check.
   * @returns {boolean}
   */
  hasFavorite(favoriteId) {
    return !!this.favorites.find(f => f.id === favoriteId);
  }

  /* -------------------------------------------- */

  /**
   * Add a favorite item to this actor.
   * If the given item is already favorite, this method has no effect.
   * @param {ActorFavorites5e} favorite  The favorite to add.
   * @returns {Promise<Actor5e>}
   * @throws If the item intended to be favorited does not belong to this actor.
   */
  addFavorite(favorite) {
    if ( this.hasFavorite(favorite.id) ) return Promise.resolve(this.parent);

    if ( favorite.id.startsWith(".") && fromUuidSync(favorite.id, { relative: this.parent }) === null ) {
      // Assume that an ID starting with a "." is a relative ID.
      throw new Error(`The item with id ${favorite.id} is not owned by actor ${this.parent.id}`);
    }

    let maxSort = 0;
    const favorites = this.favorites.map(f => {
      if ( f.sort > maxSort ) maxSort = f.sort;
      return { ...f };
    });
    favorites.push({ ...favorite, sort: maxSort + CONST.SORT_INTEGER_DENSITY });
    return this.parent.update({ "system.favorites": favorites });
  }

  /* -------------------------------------------- */

  /**
   * Removes the favorite with the given relative UUID or resource ID
   * @param {string} favoriteId  The relative UUID or resource ID of the favorite to remove.
   * @returns {Promise<Actor5e>}
   */
  removeFavorite(favoriteId) {
    if ( favoriteId.startsWith("resources.") ) return this.parent.update({ [`system.${favoriteId}.max`]: 0 });
    const favorites = this.favorites.filter(f => f.id !== favoriteId);
    return this.parent.update({ "system.favorites": favorites });
  }
}

/* -------------------------------------------- */

/**
 * Data structure for character's resources.
 *
 * @typedef {object} ResourceData
 * @property {number} value  Available uses of this resource.
 * @property {number} max    Maximum allowed uses of this resource.
 * @property {boolean} sr    Does this resource recover on a short rest?
 * @property {boolean} lr    Does this resource recover on a long rest?
 * @property {string} label  Displayed name.
 */

/**
 * Produce the schema field for a simple trait.
 * @param {object} schemaOptions  Options passed to the outer schema.
 * @returns {ResourceData}
 */
function makeResourceField(schemaOptions={}) {
  return new SchemaField({
    value: new NumberField({required: true, integer: true, initial: 0, labels: "AAFO.ResourceValue"}),
    max: new NumberField({required: true, integer: true, initial: 0, labels: "AAFO.ResourceMax"}),
    sr: new BooleanField({required: true, labels: "AAFO.ShortRestRecovery"}),
    lr: new BooleanField({required: true, labels: "AAFO.LongRestRecovery"}),
    label: new StringField({required: true, labels: "AAFO.ResourceLabel"})
  }, schemaOptions);
}
