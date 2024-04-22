# react-native-server-component

Server Component allow react-native (Host) applications to render remote (Server) components. Remote components are loaded through URI at runtime. Remotely loaded components behaves similar to the locally imported components.

Server Component are babel transpiled source code of tsx or jsx, which is executed at runtime. This gives capability to update/change UI without app release. Server Components can use react lifecycle events like `useEffect` or state.

## Installation

```sh
npm install react-native-server-component
```

## Usage

### Server Component

```tsx
// Host Application Component using ServerComponent

import * as React from 'react';
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

```tsx
// Server Component hosted on server

export const HomeComponent = () => {
  return (
    <View>
      <Text> Server Component </Text>
    </View>
  );
};
```

### Pre Load Component

```tsx
import * as React from 'react';
import { View } from 'react-native';
import {
  ServerComponent,
  preloadServerComponent,
} from 'react-native-server-component';

export default function App() {
  // make sure to preload before actual usage
  const preloadComponent = async () => {
    try {
      const { preload } = preloadServerComponent({});
      await preload('http://10.0.2.2:8080/detail-component');
    } catch (e) {
      console.error('Failed to preload. ', e);
    }
  };

  React.useEffect(() => {
    preloadComponent();
  }, []);

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

## How does it work?

![Alt text](./docs/working.png)

Server Component requires transpiled \*.tsx (jsx) code to be executed at runtime in host application. Babel is used to transpile the .tsx or .jsx file in format Server Component can understand.

Babel command to transpile tsx or jsx

```sh
npx babel --presets=@babel/preset-env,@babel/preset-react ExampleServerComponent.tsx -o TranspiledExample.js
```

Transpiled source code must be served from URL to Server Component. Since server component executes transpiled source code at runtime, right now only vanilla react native components can be used in Server Component. For any third party library usage, import must be resolved at runtime. Resolving imports for third party dependencies can be done by providing `global` prop. For successful import resolution at runtime, the third party dependency must be part of original bundle shipped with host application.

```tsx
// Server Component hosted on server

import * as React from 'react';
// Buttton component used from react-native-elements
import { Button } from '@rneui/base';
import { View } from 'react-native';

const ServerComponent = () => {
  return (
    <View>
      <Button title="Hello World!" />;
    </View>
  );
};
```

To resolve import of `Button` at runtime in host application, `global` prop must be provided to Server Component

```tsx
// Host application component using server component

const App = () => {
  return (
    <View>
      <ServerComponent
        global={{
          require: (moduleId: string) => {
            if (moduleId === '@rneui/base') {
              return '@rneui/base';
            }
            return null;
          },
        }}
      />
    </View>
  );
};
```

## Props

- `source`
  - URI to fetch component source
- `fallbackComponent`
  - Fallback component provided to React Suspense
- `errorComponent`
  - Component to be used in case of error in ServerComponent
- `loadingComponent`
- `onAction`
  - Callback with `action` and `payload`. Current supported actions are `NAVIGATE`, `IO`.
- `global`
  - Custom import resolution, used by Server Component at runtime

## Handling Actions on Server Component

Server Component is capable of handling all the user interactions. They can emit event to let host application know about actions, host application needs to implement `onAction` callback provided by Server Component. `onAction` callback has two parameters action type and payload

```tsx
// Host application

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

<ServerComponent
  source={{ uri: 'http://10.0.2.2:8080' }}
  fallbackComponent={<FallbackComponent />}
  onAction={handleAction}
/>;
```

Action emitted contains action type and payload.

```tsx
// Example Server Component

const ExampleServerComponent = ({
  onAction,
}: {
  onAction: (action: any, payload: Record<string, any>) => void;
}) => {
  const onPress = useCallback(() => {
    if (onAction) {
      onAction('NAVIGATE', { route: 'DetailsScreen' });
    }
  }, [onAction]);

  return (
    <View>
      <Pressable onPress={onPress}>
        <View>
          <Text> {`Navigation`} </Text>
        </View>
      </Pressable>
    </View>
  );
};
```

## Component Caching

Server Components are cached in-memory for URI. Internally axios is used to fetch source from URI. `Cache-Control` header in response is used to burst cache session. `Cache-Control` should follow standard format e.g. `max-age=$value` where `value` is in milliseconds.

## Running example app

Example has `server` folder which contains express server and mocks for Server Component.

```sh
cd example

# transpile component
yarn transpile:mock

# start server
# This will start serving transpiled mock
yarn start:server

# start metro
yarn start
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
