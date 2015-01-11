(function (angular) {
  'use strict';

  angular.module('portlandcafes')
    .value('Regions', [{
      name: 'Downtown Portland',
      bounds: [
        { latitude: 45.522691, longitude: -122.685923 },
        { latitude: 45.521819, longitude: -122.685537 },
        { latitude: 45.521293, longitude: -122.685494 },
        { latitude: 45.514031, longitude: -122.689496 },
        { latitude: 45.512836, longitude: -122.689539 },
        { latitude: 45.510355, longitude: -122.688048 },
        { latitude: 45.508851, longitude: -122.686084 },
        { latitude: 45.507821, longitude: -122.684218 },
        { latitude: 45.506738, longitude: -122.683027 },
        { latitude: 45.505687, longitude: -122.680024 },
        { latitude: 45.505342, longitude: -122.673415 },
        { latitude: 45.505334, longitude: -122.673404 },
        { latitude: 45.508124, longitude: -122.668801 },
        { latitude: 45.511101, longitude: -122.670293 },
        { latitude: 45.514003, longitude: -122.670776 },
        { latitude: 45.523039, longitude: -122.667525 },
        { latitude: 45.526046, longitude: -122.668008 },
        { latitude: 45.530270, longitude: -122.672278 },
        { latitude: 45.531833, longitude: -122.674123 },
        { latitude: 45.529879, longitude: -122.677717 },
        { latitude: 45.523047, longitude: -122.677406 }
      ]
    }, {
      name: 'North',
      bounds: [
        { latitude: 45.617843, longitude: -122.791335 },
        { latitude: 45.585175, longitude: -122.765242 },
        { latitude: 45.550084, longitude: -122.697951 },
        { latitude: 45.534454, longitude: -122.677352 },
        { latitude: 45.527480, longitude: -122.669284 },
        { latitude: 45.528201, longitude: -122.667395 },
        { latitude: 45.530125, longitude: -122.666709 },
        { latitude: 45.548221, longitude: -122.666537 },
        { latitude: 45.561924, longitude: -122.666880 },
        { latitude: 45.580129, longitude: -122.666794 },
        { latitude: 45.580489, longitude: -122.668082 },
        { latitude: 45.589740, longitude: -122.665936 },
        { latitude: 45.594845, longitude: -122.669026 },
        { latitude: 45.598509, longitude: -122.664134 },
        { latitude: 45.600430, longitude: -122.663533 },
        { latitude: 45.601211, longitude: -122.665936 },
        { latitude: 45.603433, longitude: -122.665164 },
        { latitude: 45.601691, longitude: -122.645079 },
        { latitude: 45.609738, longitude: -122.643792 },
        { latitude: 45.624806, longitude: -122.691256 },
        { latitude: 45.615081, longitude: -122.701556 },
        { latitude: 45.636390, longitude: -122.741210 },
        { latitude: 45.654391, longitude: -122.763783 },
        { latitude: 45.637350, longitude: -122.784554 },
        { latitude: 45.632669, longitude: -122.790047 },
        { latitude: 45.618023, longitude: -122.791592 }
      ]
    }, {
      name: 'Northwest',
      // @todo This overlaps the Downtown area
      bounds: [
        { latitude: 45.523041, longitude: -122.667390 },
        { latitude: 45.527542, longitude: -122.669337 },
        { latitude: 45.549966, longitude: -122.697318 },
        { latitude: 45.576467, longitude: -122.747787 },
        { latitude: 45.585237, longitude: -122.764695 },
        { latitude: 45.619406, longitude: -122.793363 },
        { latitude: 45.619466, longitude: -122.802804 },
        { latitude: 45.602414, longitude: -122.836879 },
        { latitude: 45.609590, longitude: -122.837222 },
        { latitude: 45.591574, longitude: -122.836536 },
        { latitude: 45.571390, longitude: -122.791217 },
        { latitude: 45.534006, longitude: -122.785552 },
        { latitude: 45.529797, longitude: -122.775596 },
        { latitude: 45.526670, longitude: -122.759803 },
        { latitude: 45.516688, longitude: -122.744010 },
        { latitude: 45.518612, longitude: -122.730792 },
        { latitude: 45.518973, longitude: -122.723067 },
        { latitude: 45.524145, longitude: -122.703155 },
        { latitude: 45.523062, longitude: -122.685817 }
      ]
    }, {
      name: 'Northeast',
      bounds: [
        { latitude: 45.609707, longitude: -122.643606 },
        { latitude: 45.601840, longitude: -122.645322 },
        { latitude: 45.603102, longitude: -122.664978 },
        { latitude: 45.601300, longitude: -122.665579 },
        { latitude: 45.600699, longitude: -122.663433 },
        { latitude: 45.598538, longitude: -122.663862 },
        { latitude: 45.594994, longitude: -122.668840 },
        { latitude: 45.589889, longitude: -122.665836 },
        { latitude: 45.580699, longitude: -122.667896 },
        { latitude: 45.580098, longitude: -122.666608 },
        { latitude: 45.567902, longitude: -122.666780 },
        { latitude: 45.554501, longitude: -122.666523 },
        { latitude: 45.542239, longitude: -122.666523 },
        { latitude: 45.530395, longitude: -122.666523 },
        { latitude: 45.528230, longitude: -122.667381 },
        { latitude: 45.527328, longitude: -122.669183 },
        { latitude: 45.522999, longitude: -122.667488 },
        { latitude: 45.522818, longitude: -122.627062 },
        { latitude: 45.523360, longitude: -122.623972 },
        { latitude: 45.522698, longitude: -122.618822 },
        { latitude: 45.523059, longitude: -122.615647 },
        { latitude: 45.522879, longitude: -122.598137 },
        { latitude: 45.523059, longitude: -122.587752 },
        { latitude: 45.522518, longitude: -122.563719 },
        { latitude: 45.522397, longitude: -122.525696 },
        { latitude: 45.522337, longitude: -122.497887 },
        { latitude: 45.542299, longitude: -122.495655 },
        { latitude: 45.542299, longitude: -122.490591 },
        { latitude: 45.549332, longitude: -122.489905 },
        { latitude: 45.548250, longitude: -122.476000 },
        { latitude: 45.548671, longitude: -122.472567 },
        { latitude: 45.558888, longitude: -122.472910 },
        { latitude: 45.568863, longitude: -122.525782 },
        { latitude: 45.597517, longitude: -122.586722 },
        { latitude: 45.609647, longitude: -122.643284 }
      ]
    }, {
      name: 'Southeast',
      bounds: [
        { latitude: 45.523041, longitude: -122.667390 },
        { latitude: 45.523523, longitude: -122.623101 },
        { latitude: 45.522621, longitude: -122.566367 },
        { latitude: 45.522200, longitude: -122.497617 },
        { latitude: 45.518351, longitude: -122.483798 },
        { latitude: 45.475695, longitude: -122.485257 },
        { latitude: 45.461369, longitude: -122.510835 },
        { latitude: 45.457516, longitude: -122.566024 },
        { latitude: 45.461129, longitude: -122.641212 },
        { latitude: 45.455409, longitude: -122.646619 },
        { latitude: 45.457516, longitude: -122.660781 },
        { latitude: 45.477140, longitude: -122.665759 },
        { latitude: 45.501208, longitude: -122.664557 }
      ]
    }, {
      name: 'Southwest',
      bounds: [
        // Todo: These overlap downtown a bit
        { latitude: 45.523041, longitude: -122.667390 },
        { latitude: 45.501208, longitude: -122.664557 },
        { latitude: 45.477041, longitude: -122.665654 },
        { latitude: 45.452841, longitude: -122.658273 },
        { latitude: 45.444080, longitude: -122.669689 },
        { latitude: 45.432818, longitude: -122.666513 },
        { latitude: 45.433541, longitude: -122.744190 },
        { latitude: 45.433541, longitude: -122.744190 },
        { latitude: 45.519725, longitude: -122.727023 },
        { latitude: 45.523874, longitude: -122.707025 },
        { latitude: 45.522852, longitude: -122.686082 }
      ]
    }]);
})(window.angular);
