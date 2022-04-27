/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DiceRoll, DicePool, getDiceRoll} from './Dice';

const randomRoll = (pool: DicePool) => {
  const roll = getDiceRoll(pool);

  return roll;
};

const App = () => {
  const [roll, setRoll] = useState<DiceRoll>({
    successes: 1,
    advantages: 1,
    triumphs: 1,
    failures: 1,
    threats: 1,
    despairs: 1,
  });

  const pool: DicePool = {
    boosts: 1,
    abilities: 2,
    proficiencies: 3,
    setbacks: 4,
    difficulties: 5,
    challenges: 6,
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Successes: {roll.successes}</Text>
        <Text>Advantages: {roll.advantages}</Text>
        <Text>Triumphs: {roll.triumphs}</Text>

        <Text>Failures: {roll.failures}</Text>
        <Text>Threats: {roll.threats}</Text>
        <Text>Despairs: {roll.despairs}</Text>
      </View>
      <View>
        <Button title="Reroll" onPress={() => setRoll(randomRoll(pool))} />
      </View>
    </SafeAreaView>
  );
};

export default App;
