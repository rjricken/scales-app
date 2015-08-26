var scalesControllers = angular.module('scalesControllers', []);

/* ScalesFromCtrl - Controller for the data input view
 ================================================== */
scalesControllers.controller('ScalesFormCtrl', ['$scope', '$location', 'DataModel',
   function ($scope, $location, DataModel) {
      $scope.allProducts = [
          "Arroz em casca",
          "Milho"
      ];

      $scope.data = DataModel.get();

      // <-- Watchers ------------------------------------------>

      $scope.$watch('data.deductions.humidity.pct', function () {
         $scope.updateDeductions({ humidity: true });
      });

      $scope.$watch('data.deductions.impurities.pct', function () {
         $scope.updateDeductions({ impurities: true });
      });

      $scope.$watch('data.deductions.badGrain.pct', function () {
         $scope.updateDeductions({}, { badGrain: true });
      });

      $scope.$watch('data.deductions.drying.pct', function () {
         $scope.updateDeductions({}, { drying: true });
      });

      $scope.$watch('data.deductions.misc.pct', function () {
         $scope.updateDeductions({}, { misc: true });
      });

      $scope.$watchGroup(['data.grossWeight', 'data.tareWeight'], function (newValues) {
         $scope.data.netWeight = newValues[0] - newValues[1];
         $scope.updateDeductions();
      });


      // <-- Functions ------------------------------------------>

      // Feed the selected product from the dropdown menu into the respective input field
      // @param index The index of selected product
      $scope.chooseProduct = function (index) {
         $scope.data.product = $scope.allProducts[index];
      };

      // Resets the form data with default values for a new report
      $scope.resetForm = function () {
         DataModel.reset();
      };

      // Changes the current view by changing the app route
      // @param path The path of the view to change to
      $scope.changeView = function (path) {
         var now = new Date();
         $scope.data.outTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());

         $location.path(path);
      };

      // Updates the values in Kg for each deduction type.
      // @param preDeductions A list containing which deductions to update (over the balance)
      // @param postDeductions A list containing which deductions to update (over the partial net weight)
      $scope.updateDeductions = function (preDeductions, postDeductions) {
         preDeductions = preDeductions || { humidity: true, impurities: true };
         postDeductions = postDeductions || { drying: true, badGrain: true, misc: true };

         // updates humidity
         if (preDeductions.humidity) {
            //var pct = ($scope.data.deductions.humidity.pct - 13) * 1.3;
            var pct = $scope.data.deductions.humidity.getPct();
            $scope.data.deductions.humidity.kg = ($scope.data.netWeight * (pct / 100)).toFixed();
         }

         // updates impurities
         if (preDeductions.impurities) {
            var pct = ($scope.data.deductions.impurities.pct / 100);
            $scope.data.deductions.impurities.kg = ($scope.data.netWeight * pct).toFixed();
         }

         // prepares a partial value for the net weight with the pre deductions computed in
         var preDeductionPct = $scope.data.deductions.humidity.getPct() + $scope.data.deductions.impurities.pct;
         var partialNetWeight = $scope.data.netWeight * (1 - (preDeductionPct / 100));

         // compute the post deductions from the partial net weight
         for (var item in postDeductions)
            if (postDeductions[item]) {
               var pct = ($scope.data.deductions[item].pct / 100);
               $scope.data.deductions[item].kg = (partialNetWeight * pct).toFixed();
            }

         // any changes to deductions affect the final net weight
         $scope.updateNetWeightFinal();
      };

      // Updates the final values of net weight (Kg and Sacks), after all deductions
      $scope.updateNetWeightFinal = function () {
         // calculates the final net weight after deductions
         $scope.data.netWeightFinal.kg = $scope.data.netWeight;

         for (var item in $scope.data.deductions)
            $scope.data.netWeightFinal.kg -= $scope.data.deductions[item].kg;

         $scope.data.netWeightFinal.sacks = ($scope.data.netWeightFinal.kg / 50).toFixed(1);
         $scope.data.netWeightFinal.kg = $scope.data.netWeightFinal.kg.toFixed();
      };
   }]);

/* ScalesPreviewCtrl - Controller for the report preview view
 ================================================== */
scalesControllers.controller('ScalesPreviewCtrl', ['$scope', '$location', 'DataModel',
   function ($scope, $location, DataModel) {
      $scope.data = DataModel.get();

      // Fixes how the license plate is displayed
      if (!$scope.data.plate.match(/[A-Za-z]{3}-\d{4}/))
         $scope.data.plate = $scope.data.plate.replace(/([A-Za-z]{3})(\d{4})/, "$1-$2");

      numeral.language('pt-br');

      $scope.changeView = function (path) {
         $location.path(path);
      };
   }]);