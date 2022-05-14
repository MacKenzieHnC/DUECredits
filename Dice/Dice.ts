import {floor, max, min} from 'lodash';
import {
  DicePool,
  DiceRoll,
  AbilityDie,
  ProficiencyDie,
  BoostDie,
  DifficultyDie,
  ChallengeDie,
  SetbackDie,
} from '.';

export const getDicePool = (
  stat: number,
  characteristic: number,
  rarity: number,
  numBoosts: number,
  numSetbacks: number,
): DicePool => {
  rarity = max([rarity, 0]) as number;

  const betterNum = max([stat, characteristic]) as number;
  const worseNum = min([stat, characteristic]) as number;
  const abilities = betterNum - worseNum;

  return {
    boosts: numBoosts,
    abilities: abilities,
    proficiencies: betterNum - abilities,
    setbacks: numSetbacks,
    difficulties: floor(rarity / 2),
    challenges: 0,
  };
};

export const getDiceRoll = (pool: DicePool) => {
  const roll: DiceRoll = {
    successes: 0,
    advantages: 0,
    triumphs: 0,
    failures: 0,
    threats: 0,
    despairs: 0,
  };

  // Roll Ability
  var arrayLength = AbilityDie.faces.length;
  for (let i = 0; i < pool.abilities; i++) {
    const face = AbilityDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Proficiency
  var arrayLength = ProficiencyDie.faces.length;
  for (let i = 0; i < pool.proficiencies; i++) {
    const face = ProficiencyDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Boost
  var arrayLength = BoostDie.faces.length;
  for (let i = 0; i < pool.boosts; i++) {
    const face = BoostDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Difficulty
  var arrayLength = DifficultyDie.faces.length;
  for (let i = 0; i < pool.difficulties; i++) {
    const face = DifficultyDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }

  // Roll Challenge
  var arrayLength = ChallengeDie.faces.length;
  for (let i = 0; i < pool.challenges; i++) {
    const face = ChallengeDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }

  // Roll Setback
  var arrayLength = SetbackDie.faces.length;
  for (let i = 0; i < pool.setbacks; i++) {
    const face = SetbackDie.faces[Math.floor(Math.random() * arrayLength)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }
  return roll;
};
