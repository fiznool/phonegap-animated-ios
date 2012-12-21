//
//  NativeBridge.m
//  PhonegapiOSAnimated
//
//  Created by Tom Spencer on 21/12/2012.
//
//

#import "NativeBridge.h"

@implementation NativeBridge

- (void)pushRoute:(CDVInvokedUrlCommand *)command {
    CDVPluginResult* pluginResult = nil;
    NSDictionary* params = [command.arguments objectAtIndex:0];
    if (params != nil) {
        NSLog(@"pushRoute: %@", params);
        
        // Post the title through the notification center.
        // We should listen for this elsewhere to update the navbar.
        [[NSNotificationCenter defaultCenter] postNotificationName:@"pushRoute" object:self userInfo:params];
        
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"title was null"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
