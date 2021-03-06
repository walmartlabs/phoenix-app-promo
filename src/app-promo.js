var AppPromo = (function() {
  var isiOS = $.os ? $.os.ios : navigator.userAgent.match(/(iPhone|iPod|iPad)/i),
      isAndroid = $.os ? $.os.android : navigator.userAgent.toLowerCase().indexOf("android") > -1,
      STORAGE_KEY = 'PROMO_HIDE_TIMESTAMP',
      STORAGE_TTL = 14 * 24 * 3600 * 1000,    // 2 weeks
      exports = {},
      config;

  function isPromoClosed() {
    // Prevent security error when accessing localStorage on iOS 7 with disabled cookies
    try {
      if (localStorage) {
        var timestamp = parseInt(localStorage.getItem(STORAGE_KEY), 10);
        if (timestamp) {
          if (Date.now() - timestamp < STORAGE_TTL) { return true; }

          // Banner was hidden a while ago so show it again
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch(err) { /* NOP */ }
    return false;
  }

  function closePromo() {
    $('.app-promo').remove();
    config.onUserAction('app-promo-closed');
    try {
      localStorage && localStorage.setItem(STORAGE_KEY, Date.now());
    } catch(err) { /* NOP */ }
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

  function createBanner($details, storeUrl) {
    function onOpen() {
      if (config.openAnimationDuration) {
        var $open = $('.app-open'),
            text = $open.html();

        // Show spinner on the button for 2 seconds as navigation to the store through any Ad-X like
        // proxy can take a considerable time
        $open.html(div('app-open-spinner'));
        setTimeout(function() { $open.html(text); }, config.openAnimationDuration);
      }
      config.onUserAction('app-promo-open');
      window.location = storeUrl;
    }

    return div('app-promo',
      tag('button', 'app-promo-close', String.fromCharCode(0x2573)).on('click', closePromo),
      div('app-icon'),
      $details,
      div('app-open-container', tag('button', 'app-open', 'OPEN').on('click', onOpen)));
  }

  function showAndroidBanner() {
    if (config.playStoreUrl) {
      var appDetails =
          div('app-details',
            tag('p', '', config.playStoreMessage),
            tag('p', 'app-store-info', 'Free - on the Google Play'));
      createBanner(appDetails, config.playStoreUrl).prependTo(config.$parentNode);
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

        createBanner(appDetails, config.appStoreUrl).prependTo(config.$parentNode);
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
