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
      var why_us = {
        a: {
          image: 'img/cp.svg',
          title: 'CONTACTOS PERSONALES',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        b: {
          image: 'img/op.svg',
          title: 'OFICINAS AL PÚBLICO',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        c: {
          image: 'img/ip.svg',
          title: 'NFORMES DE PRESENTACIÓN',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        d: {
          image: 'img/vp.svg',
          title: 'VÍA PÚBLICA Y CARTELERÍA',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        e: {
          image: 'img/pg.svg',
          title: 'PUBLICIDAD GRÁFICA',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        f: {
          image: 'img/rp.svg',
          title: 'REVISTAS PROPIAS',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        g: {
          image: 'img/p.svg',
          title: 'PRENSA',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        },
        h: {
          image: 'img/m.svg',
          title: 'INTERNET MAILING',
          subtitle : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
        }
      };
      return{
        investments_timing : investments_timing,
        why_us : why_us
      }
    })
})();
