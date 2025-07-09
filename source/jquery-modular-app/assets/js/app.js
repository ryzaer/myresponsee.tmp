var App = (function () {
  var initializedModules = {};
  function loadExternalScript(src, callback) {
    src = src || 'https://code.jquery.com/jquery-3.6.0.min.js';
    const el = document.createElement('script');
    // CDN JQuery
    el.src = src;
    el.async = true;
    el.onload = function () {
      init()
    };
    el.onerror = function () {
      console.error('Failed to load script:', src);
    };

    const firstScript = document.body.querySelector('script');
    if (firstScript) {
      document.body.insertBefore(el, firstScript);
    } else {
      document.head.appendChild(el);
    }
  }

  function loadScript(url) {
    return $.ajax({
      url: url,
      dataType: "script",
      cache: true
    });
  }

  function loadCSS(url) {
    return $('<link>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: url
    }).appendTo('head');
  }

  function checkCSSExistsAndLoad(url) {
    fetch(url, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          loadCSS(url);
        }
      })
      .catch(() => {});
  }

  function loadPlugins(plugins) {
    const promises = plugins.map(function (plugin) {
      const jsPromise = loadScript('assets/js/plugins/jquery.' + plugin + '.min.js');
      checkCSSExistsAndLoad('assets/css/plugins/' + plugin + '.min.css');
      return jsPromise;
    });

    return Promise.all(promises);
  }

  function init() {
    var path = $('body').data('path');
    if (path && !initializedModules[path]) {
      var modulePath = 'assets/js/pages/' + path + '.js';

      loadScript(modulePath).then(function () {
        var page = App.pages[path];
        if (page) {
          if (page.title) {
            document.title = page.title;
          }

          if (Array.isArray(page.plugins)) {
            loadPlugins(page.plugins).then(() => {
              if (typeof page.init === 'function') {
                page.init();
                initializedModules[path] = true;
              }
            });
          } else {
            if (typeof page.init === 'function') {
              page.init();
              initializedModules[path] = true;
            }
          }
        }
      });
    }
  }

  return {
    dispatch:loadExternalScript,
    init:init,
    pages: {}
  };
})();
App.dispatch()