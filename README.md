# Phoenix App Promo

Phoenix App Promo is a library allowing to show an application promo banner with the look & feel
similar to iOS Smart App Banner. The library can be used on any webkit-based browser on both iOS
and Android platforms.

## Development Dependencies

  * [node](http://nodejs.org)
    [Installation instructions](https://github.com/joyent/node/wiki/Installation)

  * [bower](http://bower.io)

        npm install -g bower

## Installation

From zero to install:

    git clone git@github.com:walmartlabs/phoenix-app-promo.git
    cd phoenix-app-promo
    npm install

## Usage

Phoenix App Promo requires [jQuery](http://jquery.com) or [Zepto](http://zeptojs.com) to run. It
can be used as a standalone component or with the Phoenix stack.

```
AppPromo.show({
  $parentNode: $('header'),
  playStoreMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.walmart.android',
  appStoreId: '338137227',
  appStoreUrl: 'http://itunes.apple.com/us/app/walmart/id338137227?mt=8',
  appStoreCountry: 'us'
});

```

The method `show` should take the options hash with the following attributes:

  * `$parentNode` *(mandatory)* - an element (i.e. a jQuery/Zepto collection with element) to a
    content of which the promo banner will be prepended;

  * `playStoreUrl` - an url to the app page in the Google Play Store. If omitted, the app promo
    banner will not be shown on Android;

  * `playStoreMessage` - message to show on banner for the Android app;

  * `appStoreId` - an app ID in the iTunes App Store. If omitted, the app promo banner will not be
    shown on iOS;

  * `appStoreUrl` - an url to the app page in the iTunes App Store. Optional, use to override the
    default app store url.

  * `appStoreCountry` - a country where an app is available in iTunes App Store. Optional. Default
    value - `us`.

### To use with Phoenix app

  1. Add Phoenix App Promo dependency to app's `bower.json` file
     `"phoenix-app-promo": "walmartlabs/phoenix-app-promo#~0.1.0"`

  2. Add references to `src/app-promo.js` and `src/app-promo.styl` into `lumbar.json`

  3. Put the above-mentioned code into Phoenix's `init-complete` event handler.

### To use as a standalone component

To be continued...

# Release Notes

To be continued...
