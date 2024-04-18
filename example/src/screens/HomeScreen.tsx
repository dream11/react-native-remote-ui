import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ServerComponent } from 'react-native-server-component';

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
      <ServerComponent
        source={{ uri: 'http://10.0.2.2:8080' }}
        fallbackComponent={<FallbackComponent />}
        onAction={handleAction}
      />
      {/* <Pressable onPress={onPress}>
        <Text style={styles.text}> {`Navigation`} </Text>
      </Pressable> */}
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
    color: 'red',
    fontWeight: '400',
    borderWidth: 2,
    borderColor: '#a1a1a1',
  },
});
