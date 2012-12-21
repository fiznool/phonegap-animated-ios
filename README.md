# Phonegap Animated

iOS Phonegap-based project which supports animations between different pages in a single-page web app.

## How does it work?

The project includes a native iOS headerbar (via a UINavigationController) to handle animations between pages. This also provides the native back button.

The Phonegap WebView and enclosing WebViewController is instantiated as normal.

When a link is tapped in the WebView, the web app intercepts the link and instead sends a command to the native layer via a Phonegap plugin. The native layer creates a new RootViewController and pushes this onto the NavigationController stack, which animates as usual. Once the push is completed, a command is sent to the WebView to navigate to the next page, and the WebView is attached to the RootViewController. This provides the illusion of a page-page transition in the WebView, but it is actually all handled natively.

The Back button acts in a similar fashion - when it is tapped, the animation occurs and afterwards a command is sent to the WebView to go back (mimicing the tap of a browser Back button);

## Work in progress!

Its a little messy but it works, however this is really just a proof of concept, and needs some work!