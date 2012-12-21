//
//  RootViewController.m
//  PhonegapiOSAnimated
//
//  Created by Tom Spencer on 21/12/2012.
//
//

#import "RootViewController.h"

@interface RootViewController ()

@end

@implementation RootViewController

@synthesize webViewHash;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (id)initWithTitle:(NSString *)title {
    self = [super init];
    if (self) {
        self.title = title;
        self.view.backgroundColor = [UIColor whiteColor];
    }
    return self;
}

- (id)initWithTitle:(NSString *)title hash:(NSString *)hash {
    self = [self initWithTitle:title];
    if (self) {
        self.webViewHash = hash;
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
