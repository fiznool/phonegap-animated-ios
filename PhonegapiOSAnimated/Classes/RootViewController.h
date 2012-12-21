//
//  RootViewController.h
//  PhonegapiOSAnimated
//
//  Created by Tom Spencer on 21/12/2012.
//
//

#import <UIKit/UIKit.h>

@interface RootViewController : UIViewController

@property (strong, nonatomic) NSString *webViewHash;

- (id)initWithTitle:(NSString *)title;
- (id)initWithTitle:(NSString *)title hash:(NSString *)hash;

@end
