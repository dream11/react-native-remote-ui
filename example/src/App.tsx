import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { ServerComponent } from 'react-native-server-component';

// const { preload } = preloadServerComponent({});
// (async () => {
//   try {
//     await preload('http://10.0.2.2:8080');
//   } catch (e) {
//     console.error('Failed to preload. ', e);
//   }
// })();

export default function App() {
  return (
    <View style={styles.container}>
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
});
