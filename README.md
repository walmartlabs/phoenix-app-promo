***
# NOTICE:

## This repository has been archived and is not supported.

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)
***
NOTICE: SUPPORT FOR THIS PROJECT HAS ENDED 

This projected was owned and maintained by Walmart. This project has reached its end of life and Walmart no longer supports this project.

We will no longer be monitoring the issues for this project or reviewing pull requests. You are free to continue using this project under the license terms or forks of this project at your own risk. This project is no longer subject to Walmart's bug bounty program or other security monitoring.


## Actions you can take

We recommend you take the following action:

  * Review any configuration files used for build automation and make appropriate updates to remove or replace this project
  * Notify other members of your team and/or organization of this change
  * Notify your security team to help you evaluate alternative options

## Forking and transition of ownership

For [security reasons](https://www.theregister.co.uk/2018/11/26/npm_repo_bitcoin_stealer/), Walmart does not transfer the ownership of our primary repos on Github or other platforms to other individuals/organizations. Further, we do not transfer ownership of packages for public package management systems.

If you would like to fork this package and continue development, you should choose a new name for the project and create your own packages, build automation, etc.

Please review the licensing terms of this project, which continue to be in effect even after decommission.

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
  openAnimationDuration: 2000,
  playStoreMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.mycompany.myapp.android',
  appStoreId: '123456789',
  appStoreUrl: 'http://itunes.apple.com/us/app/mycompany/id123456789?mt=8',
  appStoreCountry: 'us',
  onUserAction: function(action) {
    alert(action)
  }
});

```

The method `show` should take the options hash with the following attributes:

  * `$parentNode` *(mandatory)* - an element (i.e. a jQuery/Zepto collection with element) to a
    content of which the promo banner will be prepended;

  * `openAnimationDuration` - a duration (in milliseconds) of an animation on the "Open" button.
    Optional. If omitted, the animation will not be shown;

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
    * `app-promo-open` - when user is navigated to the app store

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

**Please note** that store IDs and urls in the example and in the code snippet above are used only
for the illustration purposes and do not belong to any real app.

