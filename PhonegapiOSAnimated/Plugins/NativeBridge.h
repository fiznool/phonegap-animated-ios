//
//  NativeBridge.h
//  PhonegapiOSAnimated
//
//  Created by Tom Spencer on 21/12/2012.
//
//

#import <Cordova/CDVPlugin.h>

@interface NativeBridge : CDVPlugin

- (void)pushRoute:(CDVInvokedUrlCommand *)command;

@end
