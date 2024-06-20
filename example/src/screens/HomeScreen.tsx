import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ServerComponent } from 'react-native-remote-component';

const FallbackComponent = () => {
  return (
    <View>
      <Text> Fallback Component </Text>
    </View>
  );
};
export default function HomeScreen({ navigation }) {
  const handleAction = useCallback(
    (action: string, payload: Record<string, any>) => {
      switch (action) {
        case 'NAVIGATE':
          navigation.navigate(payload.route);
          break;
      }
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {'Component inside red box is rendered from server'}
      </Text>
      <View style={styles.redBox}>
        <ServerComponent
          source={{ uri: 'http://10.0.2.2:8080' }}
          fallbackComponent={<FallbackComponent />}
          onAction={handleAction}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  redBox: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'red',
    margin: 16,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 32,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
