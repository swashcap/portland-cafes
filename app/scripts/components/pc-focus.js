(function (angular, $) {
  'use strict'

  /**
   * A directive to focus an input.
   *
   * @{@link  http://stackoverflow.com/a/14837021}
   */
  angular.module('portlandcafes')
    .directive('pcFocus', ['$timeout', '$parse', function ($timeout, $parse) {
      return {
        link: function (scope, element, attrs) {
          var maybeFocus = $parse(attrs.pcFocus);

          scope.$watch(maybeFocus, function (value) {
            if (value) {
              $timeout(function () {
                element[0].focus();
              });
            }
          });
        },
        restrict: 'A'
      }
    }]);
})(window.angular);
