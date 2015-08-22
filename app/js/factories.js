var scalesFactories = angular.module('scalesFactories', []);

scalesFactories.factory("DataModel", function () {
   var data = {
      grossWeight: 0,
      tareWeight: 0,
      netWeight: 0,
      
      deductions: {
         humidity: { pct: 13, kg: 0 },
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
      product: ""
   };
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
      data.plate = data.supplier = data.product = "";

      var now = new Date();

      data.date = now;
      data.inTime = new Date(0, 0, 0, now.getHours(), now.getMinutes());
      data.outTime = null;
   };

   var now = new Date();
   data.date = new Date();
   data.inTime = new Date(1990, 1, 1, now.getHours(), now.getMinutes());



   // delete me
   data.grossWeight = 20000;
   data.tareWeight = 7400;
   data.supplier = "Emerson Westrup";
   data.product = "Arroz em Casca";
   data.plate = "MFX-3247";

   data.deductions.humidity.pct = 18;
   data.deductions.impurities.pct = 6.5;
   data.deductions.badGrain.pct = 3.2;
   data.deductions.misc.pct = 0.5;
   // /delete me


   return dataService;
});