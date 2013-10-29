# Phoenix App Promo

Phoenix App Promo is a library allowing to show an application promo banner with the look & feel
similar to iOS Smart App Banner. The library can be used on any webkit-based browser on both iOS
and Android platforms.

## Development Dependencies

  * [node](http://nodejs.org)
    [Installation instructions](https://github.com/joyent/node/wiki/Installation)

  * [bower](http://bower.io)

        npm install -g bower

To build the Phoenix App Promo as a standalone component [Grunt](http://gruntjs.com) is required:

    npm install -g grunt-cli

## Installation

From zero to install:

    git clone git@github.com:walmartlabs/phoenix-app-promo.git
    cd phoenix-app-promo
    npm install

## Usage

Phoenix App Promo requires [jQuery](http://jquery.com) or [Zepto](http://zeptojs.com) to run. It
can be used as a standalone component or included into a project via [phoenix-build](https://github.com/walmartlabs/phoenix-build).

The code below shows how to use the Phoenix App Promo banner:

```
AppPromo.show({
  $parentNode: $('header'),
  playStoreMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.walmart.android',
  appStoreId: '338137227',
  appStoreUrl: 'http://itunes.apple.com/us/app/walmart/id338137227?mt=8',
  appStoreCountry: 'us',
  onUserAction: function(action) {
    alert(action)
  }
});

```

The method `show` should take the options hash with the following attributes:

  * `$parentNode` *(mandatory)* - an element (i.e. a jQuery/Zepto collection with element) to a
    content of which the promo banner will be prepended;

  * `loadingIndicator` - a flag specifying whether or not to show the loading indicator on an "Open"
    button. Optional. When truthy, the loading indicator will be shown.

  * `playStoreUrl` - an url to the app page in the Google Play Store. If omitted, the app promo
    banner will not be shown on Android;

  * `playStoreMessage` - message to show on banner for the Android app;

  * `appStoreId` - an app ID in the iTunes App Store. If omitted, the app promo banner will not be
    shown on iOS;

  * `appStoreUrl` - an url to the app page in the iTunes App Store. Optional, use to override the
    default app store url;

  * `appStoreCountry` - a country where an app is available in iTunes App Store. Optional. Default
    value - `us`;

  * `onUserAction` - a callback function being called on the following user actions and passing the
    action name as an argument. The action name can be one of the following:

    * `app-promo-closed` - when user closes the banner;
    * `app-go-to-store` - when user is navigated to the app store

### In a project using phoenix-build

  1. Add Phoenix App Promo dependency to app's `bower.json` file
     `"phoenix-app-promo": "walmartlabs/phoenix-app-promo#~0.1.0"`

  2. Add references to `src/app-promo.js` and `src/app-promo.styl` into `lumbar.json`

  3. Put the above-mentioned code into Phoenix's `init-complete` event handler.

### As a standalone component

Build the app with Grunt from `phoenix-app-promo` directory:

    grunt

Note that the default Grunt configuration embeds only a high resolution images for HDPI screens.

Check out the `example` directory to see how to use Phoenix App Promo banner as a standalone
component.

# Release Notes

## 0.2.0 / 2013-10-30

  * Do not try to open an app on iOS, instead navigate an user directly to the App Store.

  * Remove an `app-try-open` user action (see [Usage][], info about `onUserAction`)

  * Add optional inline loading indicator on "Open" button

## 0.1.1 / 2013-10-22

  * Initial release.
