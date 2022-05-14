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

export const AbilityDie: PositiveDie = {
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

export const ProficiencyDie: PositiveDie = {
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

export const BoostDie: PositiveDie = {
  faces: [
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 0, advantages: 0, triumphs: 0},
    {successes: 0, advantages: 2, triumphs: 0},

    {successes: 0, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 1, triumphs: 0},
    {successes: 1, advantages: 0, triumphs: 0},
  ],
};

export const DifficultyDie: NegativeDie = {
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

export const ChallengeDie: NegativeDie = {
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

export const SetbackDie: NegativeDie = {
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
