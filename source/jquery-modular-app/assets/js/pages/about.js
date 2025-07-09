App.pages.about = (function () {
  function init() {
    console.log('[About] Page loaded');
    $('#about-section').fadeIn();
    if ($.fn.select2) {
      $('.select2').select2();
    }
  }

  return {
    init: init,
    plugins: ['select2'],
    title: 'About ~ Modular App'
  };
})();