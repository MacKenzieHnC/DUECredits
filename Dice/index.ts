type PositiveFace = {
  successes: number;
  advantages: number;
  triumphs: number;
};

type PositiveDie = {
  faces: PositiveFace[];
};

type NegativeFace = {
  failures: number;
  threats: number;
  despairs: number;
};

type NegativeDie = {
  faces: NegativeFace[];
};

const AbilityDie: PositiveDie = {
  faces: [
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
    {successes: 2, advantages: 0, triumphs: 0},

    {successes: 0, advantages: 1, triumphs: 0},
    {successes: 0, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 1, triumphs: 0},
    {successes: 0, advantages: 2, triumphs: 0},
  ],
};

const ProficiencyDie: PositiveDie = {
  faces: [
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
    {successes: 2, advantages: 0, triumphs: 0},

    {successes: 2, advantages: 0, triumphs: 0},
    {successes: 0, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 1, triumphs: 0},

    {successes: 1, advantages: 1, triumphs: 0},
    {successes: 0, advantages: 2, triumphs: 0},
    {successes: 0, advantages: 2, triumphs: 0},
    {successes: 0, advantages: 0, triumphs: 1},
  ],
};

const BoostDie: PositiveDie = {
  faces: [
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 0, advantages: 2, triumphs: 0},

    {successes: 0, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
  ],
};

const DifficultyDie: NegativeDie = {
  faces: [
    {failures: 0, threats: 0, despairs: 0},
    {failures: 1, threats: 0, despairs: 0},
    {failures: 2, threats: 0, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},

    {failures: 0, threats: 1, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},
    {failures: 0, threats: 2, despairs: 0},
    {failures: 1, threats: 1, despairs: 0},
  ],
};

const ChallengeDie: NegativeDie = {
  faces: [
    {failures: 0, threats: 0, despairs: 0},
    {failures: 1, threats: 0, despairs: 0},
    {failures: 1, threats: 0, despairs: 0},
    {failures: 2, threats: 0, despairs: 0},

    {failures: 2, threats: 0, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},
    {failures: 1, threats: 1, despairs: 0},

    {failures: 1, threats: 1, despairs: 0},
    {failures: 0, threats: 2, despairs: 0},
    {failures: 0, threats: 2, despairs: 0},
    {failures: 0, threats: 0, despairs: 1},
  ],
};

const SetbackDie: NegativeDie = {
  faces: [
    {failures: 0, threats: 0, despairs: 0},
    {failures: 0, threats: 0, despairs: 0},
    {failures: 1, threats: 0, despairs: 0},

    {failures: 1, threats: 0, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},
    {failures: 0, threats: 1, despairs: 0},
  ],
};

export type DicePool = {
  boosts: number;
  abilities: number;
  proficiencies: number;
  setbacks: number;
  difficulties: number;
  challenges: number;
};

export type DiceRoll = {
  successes: number;
  advantages: number;
  triumphs: number;
  failures: number;
  threats: number;
  despairs: number;
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
  var max = AbilityDie.faces.length;
  for (let i = 0; i < pool.abilities; i++) {
    const face = AbilityDie.faces[Math.floor(Math.random() * max)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Proficiency
  var max = ProficiencyDie.faces.length;
  for (let i = 0; i < pool.proficiencies; i++) {
    const face = ProficiencyDie.faces[Math.floor(Math.random() * max)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Boost
  var max = BoostDie.faces.length;
  for (let i = 0; i < pool.boosts; i++) {
    const face = BoostDie.faces[Math.floor(Math.random() * max)];
    roll.successes += face.successes;
    roll.advantages += face.advantages;
    roll.triumphs += face.triumphs;
  }

  // Roll Difficulty
  var max = DifficultyDie.faces.length;
  for (let i = 0; i < pool.difficulties; i++) {
    const face = DifficultyDie.faces[Math.floor(Math.random() * max)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }

  // Roll Challenge
  var max = ChallengeDie.faces.length;
  for (let i = 0; i < pool.challenges; i++) {
    const face = ChallengeDie.faces[Math.floor(Math.random() * max)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }

  // Roll Setback
  var max = SetbackDie.faces.length;
  for (let i = 0; i < pool.setbacks; i++) {
    const face = SetbackDie.faces[Math.floor(Math.random() * max)];
    roll.failures += face.failures;
    roll.threats += face.threats;
    roll.despairs += face.despairs;
  }
  return roll;
};
