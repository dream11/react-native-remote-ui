# react-native-server-component

This component allows react-native applications to render remote components. Remote components are loaded through URL at runtime. Remotely loaded components behaves similar to the locally imported components.

## Installation

```sh
npm install react-native-server-component
```

## Usage

### Server Component

```tsx
import React from 'react';
import { View } from 'react-native';
import { ServerComponent } from 'react-native-server-component';

const FallbackComponent = () => {
  return (
    <View>
      <Text> Fallback Component </Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ServerComponent
        source={{ uri: 'http://10.0.2.2:8080/home-component' }}
        fallbackComponent={<FallbackComponent />}
      />
    </View>
  );
}
```

### Pre Load Component

```tsx
import React from 'react';
import { View } from 'react-native';
import { ServerComponent } from 'react-native-server-component';

const { preload } = preloadServerComponent({});
(async () => {
  try {
    await preload('http://10.0.2.2:8080/detail-component');
  } catch (e) {
    console.error('Failed to preload. ', e);
  }
})();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ServerComponent
        source={{ uri: 'http://10.0.2.2:8080/detail-component' }}
        fallbackComponent={<FallbackComponent />}
      />
    </View>
  );
}
```

## Props

- `source`
  - URI to fetch component source
- `fallbackComponent`
- `errorComponent`
  - Component to be used in case of error in ServerComponent
- `loadingComponent`
- `onAction`
  - Callback with `action` and `payload`. Current supported actions are `NAVIGATE`, `IO`.

## Handling Actions

TODO:: Add actions documentation

## TTL based component caching

TODO:: Add caching documentation

## Running example app

TODO:: Add documentation

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
