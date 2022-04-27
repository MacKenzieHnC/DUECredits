import {NegativeDie, PositiveDie} from '.';

export const AbilityDie: PositiveDie = {
  faces: [
    {success: 0, advantage: 0, triumph: 0},
    {success: 1, advantage: 0, triumph: 0},
    {success: 1, advantage: 0, triumph: 0},
    {success: 2, advantage: 0, triumph: 0},

    {success: 0, advantage: 1, triumph: 0},
    {success: 0, advantage: 1, triumph: 0},
    {success: 1, advantage: 1, triumph: 0},
    {success: 0, advantage: 2, triumph: 0},
  ],
};

export const ProficiencyDie: PositiveDie = {
  faces: [
    {success: 0, advantage: 0, triumph: 0},
    {success: 1, advantage: 0, triumph: 0},
    {success: 1, advantage: 0, triumph: 0},
    {success: 2, advantage: 0, triumph: 0},

    {success: 2, advantage: 0, triumph: 0},
    {success: 0, advantage: 1, triumph: 0},
    {success: 1, advantage: 1, triumph: 0},
    {success: 1, advantage: 1, triumph: 0},

    {success: 1, advantage: 1, triumph: 0},
    {success: 0, advantage: 2, triumph: 0},
    {success: 0, advantage: 2, triumph: 0},
    {success: 0, advantage: 0, triumph: 1},
  ],
};

export const BoostDie: PositiveDie = {
  faces: [
    {success: 0, advantage: 0, triumph: 0},
    {success: 0, advantage: 0, triumph: 0},
    {success: 0, advantage: 2, triumph: 0},

    {success: 0, advantage: 1, triumph: 0},
    {success: 1, advantage: 1, triumph: 0},
    {success: 1, advantage: 0, triumph: 0},
  ],
};

export const DifficultyDie: NegativeDie = {
  faces: [
    {failure: 0, threat: 0, despair: 0},
    {failure: 1, threat: 0, despair: 0},
    {failure: 2, threat: 0, despair: 0},
    {failure: 0, threat: 1, despair: 0},

    {failure: 0, threat: 1, despair: 0},
    {failure: 0, threat: 1, despair: 0},
    {failure: 0, threat: 2, despair: 0},
    {failure: 1, threat: 1, despair: 0},
  ],
};

export const ChallengeDie: NegativeDie = {
  faces: [
    {failure: 0, threat: 0, despair: 0},
    {failure: 1, threat: 0, despair: 0},
    {failure: 1, threat: 0, despair: 0},
    {failure: 2, threat: 0, despair: 0},

    {failure: 2, threat: 0, despair: 0},
    {failure: 0, threat: 1, despair: 0},
    {failure: 0, threat: 1, despair: 0},
    {failure: 1, threat: 1, despair: 0},

    {failure: 1, threat: 1, despair: 0},
    {failure: 0, threat: 2, despair: 0},
    {failure: 0, threat: 2, despair: 0},
    {failure: 0, threat: 0, despair: 1},
  ],
};

export const SetbackDie: NegativeDie = {
  faces: [
    {failure: 0, threat: 0, despair: 0},
    {failure: 0, threat: 0, despair: 0},
    {failure: 1, threat: 0, despair: 0},

    {failure: 1, threat: 0, despair: 0},
    {failure: 0, threat: 1, despair: 0},
    {failure: 0, threat: 1, despair: 0},
  ],
};
