import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ExampleServerComponent = () => {
  const [catFact, setCatFact] = useState<string>('');

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then((resp) => resp.json())
      .then((json) => json.fact)
      .then((fact) => setCatFact(fact));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.hello}> Hello Server Component</Text>
      <Text style={styles.catFactsTitle}> Cat Facts </Text>
      <Text style={styles.facts}> {catFact} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  hello: {
    color: 'red',
    fontWeight: 'bold',
  },
  catFactsTitle: {
    marginTop: 16,
    color: 'blue',
    fontWeight: 'bold',
  },
  facts: {
    marginTop: 10,
    color: 'black',
    fontWeight: '400',
  },
});

export default ExampleServerComponent;
