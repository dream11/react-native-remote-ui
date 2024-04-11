import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ServerComponent } from 'react-native-server-component';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Details Screen </Text>
      <ServerComponent source={{ uri: 'http://10.0.2.2:8080' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  text: {
    color: 'black',
    fontWeight: '400',
  },
});
