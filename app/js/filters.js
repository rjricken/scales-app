angular.module('scalesFilters', [])
   .filter('numeral', function () {
      return function (input, format) {
         format = format || '0,0';

         return input ? numeral(input).format(format) : '0';
      }
   });
