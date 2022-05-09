/*
    Algorithm to convert shop options into constraints on a database query.

    Currently, the values for each prop on a given item type can only
    have values of 'any' or an array of type <number | <something with a name prop>

    Therefore, all we have to do is handle all of the shared props
        from inventoryOptions.general and inventoryOptions.<itemType>.general
        as well as <itemType>.limit (which simply determines whether
        a constraint is even necessary)
    and then we can just loop through all of the other props and apply the
    rules based on the 3 possible types.
*/
import {ShopOptions} from '../models/InventoryOptionsIndex';

const getBooleanConstraint = (name: string, value: boolean) => {
  var constraint = '';
  constraint += value ? name : 'NOT ' + name;
  return constraint;
};

const getNumericConstraint = (name: string, value: number[]) => {
  return name + ' >= ' + value[0] + ' AND ' + name + ' <= ' + value[1];
};

const getNamedConstraint = (name: string, values: any) => {
  var constraint = '(';
  for (let k = 0; k < values.length; k++) {
    k > 0 ? (constraint += '\n\t\tOR ') : null;
    constraint += name + ' = ' + values[k].name;
  }
  constraint += ')';
  return constraint;
};

const getConstraint = (constraint: string, prop: any, category: any) => {
  // If value is 'any' we don't have to do anything
  if (category !== 'any') {
    constraint !== '' ? (constraint += '\n\tAND ') : null;

    if (typeof category === 'boolean') {
      constraint += getBooleanConstraint(prop, category);
    }
    // If option is an array of numbers
    else if (typeof category[0] === 'number') {
      constraint += getNumericConstraint(prop, category);
    }
    // If option is an array of named somethings
    else if (category[0].name !== undefined) {
      constraint += getNamedConstraint(prop, category);
    } else {
      throw Error('Unrecognized item category "' + prop + '"');
    }
  }
  return constraint;
};

export const getConstraints = (rules: ShopOptions) => {
  const inventoryOptions = rules.inventoryOptions;
  const itemTypes = Object.keys(inventoryOptions).slice(1, Infinity);
  const constraints = Array<string>(Object.keys(inventoryOptions).length).fill(
    '',
  );

  const genProps = Object.keys(inventoryOptions.general);
  for (let i = 0; i < itemTypes.length; i++) {
    const itemType = itemTypes[i]; // The name of the item type

    // TODO: Handle general props
    for (let j = 1; j < genProps.length; j++) {
      var category = inventoryOptions.general[genProps[j]];
      if (inventoryOptions[itemType].general[genProps[j]] !== 'any') {
        category = inventoryOptions[itemType].general[genProps[j]];
      }
      constraints[i] = getConstraint(constraints[i], genProps[j], category);
    }

    // Loop through every prop that isn't shared with other itemTypes
    const props = Object.keys(inventoryOptions[itemType]);
    for (let j = 2; j < props.length; j++) {
      constraints[i] = getConstraint(
        constraints[i],
        props[j],
        inventoryOptions[itemType][props[j]],
      );
    }
  }
  return constraints;
};
