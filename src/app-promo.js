var AppPromo = (function() {
  var isiOS = $.os ? $.os.ios : navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
      isAndroid = $.os ? $.os.android : navigator.userAgent.toLowerCase().indexOf("android") > -1,
      STORAGE_KEY = 'PROMO_HIDE_TIMESTAMP',
      STORAGE_TTL = 14 * 24 * 3600 * 1000,    // 2 weeks
      exports = {},
      config;

  function isPromoClosed() {
    if (localStorage) {
      try {
        var timestamp = parseInt(localStorage.getItem(STORAGE_KEY), 10);
        if (timestamp) {
          if (Date.now() - timestamp < STORAGE_TTL) { return true; }

          // Banner was hidden a while ago so show it again
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch(err) { /* NOP */ }
    }
  }

  function closePromo() {
    $('.app-promo').remove();
    config.onUserAction('app-promo-closed');
    if (localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, Date.now());
      } catch(err) { /* NOP */ }
    }
  }

  function tag(name, cssClass, text) {
    return $('<' + name + ' />', {'class': cssClass, text: text});
  }

  function div(/* cssClass, nodes */) {
    var $el = $('<div />', {'class': arguments[0]});
    for (var i=1; i < arguments.length; i++) {
      $el.append(arguments[i]);
    }
    return $el;
  }

  function createBanner($details, onOpenClick) {
    return div('app-promo',
      tag('button', 'app-promo-close', String.fromCharCode(0x2573)).on('click', closePromo),
      div('app-icon'),
      $details,
      div('app-open-container', tag('button', 'app-open', 'OPEN').on('click', onOpenClick)));
  }

  function showAndroidBanner() {
    if (config.playStoreUrl) {
      var appDetails =
          div('app-details',
            tag('p', '', config.playStoreMessage),
            tag('p', 'app-store-info', 'Free - on the Google Play'));

      createBanner(appDetails, function() {
        config.onUserAction('app-go-to-store');
        window.location = config.playStoreUrl;
      }).prependTo(config.$parentNode);
    }
  }

  function showiOSBanner() {
    if (!config.appStoreId) { return; }

    var url = 'http://itunes.apple.com/'
        + (config.appStoreCountry || 'us')
        + '/lookup?id='
        + config.appStoreId + '&callback=?';

    $.getJSON(url, function(data) {
      if (data && data.results && data.results[0]) {
        var appInfo = data.results[0];

        var appDetails = div('app-details',
            tag('h4', 'app-title', appInfo.trackName),
            tag('p', 'app-company', appInfo.artistName),
            div('app-rating',
              div('app-stars rating-' + (appInfo.averageUserRating || 0).toString().replace('.', '')),
              div('app-count',
                tag('span', '', '(' + appInfo.userRatingCount + ')'))),
            tag('p', 'app-store-info', 'Free - on the App Store'));

        createBanner(appDetails, function(event) {
          // Navigate directly to an app if the app is installed and app url scheme starts with the
          // app name. Otherwise navigate to the app page in the App Store.
          // WARN: if the app is not installed the Safari will show "Invalid URL" popup for 0.1 sec
          // before opening an App Store
          setTimeout(function() {
            config.onUserAction('app-go-to-store');
            window.location = config.appStoreUrl || appInfo.trackViewUrl;
          }, 100);
          config.onUserAction('app-try-open');
          window.location = appInfo.trackName + '://';
        }).prependTo(config.$parentNode);
      }
    });
  }

  exports.show = function(options) {
    if (options && !isPromoClosed()) {
      config = options;
      config.onUserAction = config.onUserAction || function() { /* NOP */ };
      if (isAndroid) {
        showAndroidBanner();
      } else if (isiOS) {
        showiOSBanner();
      }
    }
  };

  return exports;
})();
