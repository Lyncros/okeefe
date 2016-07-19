(function() {
  angular.module('starter.services',[])
    .factory("defaultFactory", function(){
      var investments_timing = {
        a: {
          image: 'img/inv-a.png',
          title: 'EN POZO',
          subtitle : '- NO SE COMENZÓ OBRA -',
          text : {
            a : 'Inversión de capital' ,
            b : 'Mayor rentabilidad'
          }
        },
        b: {
          image: 'img/inv-b.png',
          title: 'EN OBRA',
          subtitle : '- SE COMENZÓ LA OBRA -',
          text : {
            a : 'Inversión de capital, renta y/o usuarios de compra planificada' ,
            b : 'Alta rentabilidad'
          }
        },
        c: {
          image: 'img/inv-c.png',
          title: 'TERMINADOS',
          subtitle : '- SE COMPRA LO QUE SE VE -',
          text : {
            a : 'Inversores de renta y usuarios finales' ,
            b : 'Rentabilidad sujeta al valor del alquiler y/o venta'
          }
        }
      };
      return{
        investments_timing : investments_timing,
      }
    })
})();
