
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNRemoteComponentSpec.h"

@interface RemoteComponent : NSObject <NativeRemoteComponentSpec>
#else
#import <React/RCTBridgeModule.h>

@interface RemoteComponent : NSObject <RCTBridgeModule>
#endif

@end
