/* jshint devel:true */
(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .directive('pcToggle', ['$document', function ($document) {
      var MENU_CLASS = 'is-menu';
      var SEARCH_CLASS = 'is-search';
      var LOCATION_CLASS = 'is-location';
      var $site = $document.find('.site');
      var $searchField = $('.search-form input');

      return {
        link: function (scope, element, attrs) {
          var toggle = attrs.pcToggle;

          element.on('click', function (e) {
            switch (toggle) {
              case 'menu':
                $site.toggleClass(MENU_CLASS);
                break;
              case 'search':
                if ($site.hasClass(SEARCH_CLASS)) {
                  $site.removeClass(SEARCH_CLASS);
                } else {
                  $site.addClass(SEARCH_CLASS);
                  $searchField.focus();
                }
                break;
              case 'location':
                $site.toggleClass(LOCATION_CLASS);
                break;
              default:
                $site.removeClass([MENU_CLASS, SEARCH_CLASS, LOCATION_CLASS].join(' '));
            }
          });
        },
        restrict: 'A'
      };
    }]);
})(window.angular);
