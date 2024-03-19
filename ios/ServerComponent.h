
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNServerComponentSpec.h"

@interface ServerComponent : NSObject <NativeServerComponentSpec>
#else
#import <React/RCTBridgeModule.h>

@interface ServerComponent : NSObject <RCTBridgeModule>
#endif

@end
