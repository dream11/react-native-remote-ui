import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { RemoteComponent } from 'react-native-remote-ui';
import { exampleTranspiledJSXCode } from './mocks/ExampleTranspiledJSXCode';

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
        {
          'Component inside the red box is rendered from the server using a URI to fetch its source dynamically'
        }
      </Text>
      <View style={styles.redBox}>
        <RemoteComponent
          source={{
            uri:
              Platform.OS === 'ios'
                ? 'http://127.0.0.1:8080'
                : 'http://10.0.2.2:8080',
          }}
          fallbackComponent={<FallbackComponent />}
          onAction={handleAction}
        />
      </View>
      <Text style={styles.text}>
        {
          'Component inside the green box is rendered directly from a transpiled JSX code string provided to the component'
        }
      </Text>
      <View style={styles.greenBox}>
        <RemoteComponent
          source={{
            code: exampleTranspiledJSXCode,
          }}
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
  greenBox: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'green',
    margin: 16,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
    marginLeft: 16,
    marginTop: 16,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
