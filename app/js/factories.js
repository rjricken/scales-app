var scalesFactories = angular.module('scalesFactories', []);

scalesFactories.factory("DataModel", function () {
   var data = {
      grossWeight: 0,
      tareWeight: 0,
      netWeight: 0,
      
      deductions: {
         humidity: {
            pct: 13,
            kg: 0,
            getRealPct: function () {
               return (data.deductions.humidity.pct - 13) * 1.3;
            }
         },
         impurities: { pct: 0, kg: 0 },
         badGrain: { pct: 0, kg: 0 },
         misc: { pct: 0, kg: 0 },
         drying: { pct: 0, kg: 0 }
      },

      netWeightFinal: { kg: 0, sacks: 0 },

      inTime: new Date(),
      outTime: null,

      date: new Date(),
      plate: "",
      supplier: "",
      buyer: "",
      product: ""
   };

   data.deductions.humidity.getPct = function () {
      return (this.pct - 13) * 1.3;
   }

   var dataService = {};

   dataService.get = function () {
      return data;
   };

   // Resets the data to default values
   dataService.reset = function () {
      data.grossWeight = data.tareWeight = data.netWeight = 0;

      for (item in data.deductions)
         data.deductions[item].pct = data.deductions[item].kg = 0;

      data.deductions.humidity.pct = 13;

      data.netWeightFinal.kg = data.netWeightFinal.sacks = 0;
      data.plate = data.supplier = data.buyer = data.product = "";

      var now = new Date();

      data.date = now;
      data.inTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
      data.outTime = null;
   };

   var now = new Date();
   data.date = new Date();
   data.inTime = new Date(1990, 1, 1, now.getHours(), now.getMinutes());

   return dataService;
});