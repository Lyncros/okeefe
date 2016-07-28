(function () {
    angular.module('starter.services')
        .factory("defaultFactory", function () {
            var investments_timing = {
                a: {
                    image: 'img/inv-a.png',
                    title: 'EN POZO',
                    subtitle: '- NO SE COMENZÓ OBRA -',
                    text: {
                        a: 'Inversión de capital',
                        b: 'Mayor rentabilidad'
                    }
                },
                b: {
                    image: 'img/inv-b.png',
                    title: 'EN OBRA',
                    subtitle: '- SE COMENZÓ LA OBRA -',
                    text: {
                        a: 'Inversión de capital, renta y/o usuarios de compra planificada',
                        b: 'Alta rentabilidad'
                    }
                },
                c: {
                    image: 'img/inv-c.png',
                    title: 'TERMINADOS',
                    subtitle: '- SE COMPRA LO QUE SE VE -',
                    text: {
                        a: 'Inversores de renta y usuarios finales',
                        b: 'Rentabilidad sujeta al valor del alquiler y/o venta'
                    }
                }
            };
            var why_us = {
                a: {
                    image: 'img/cp.svg',
                    title: 'CONTACTOS PERSONALES',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                b: {
                    image: 'img/op.svg',
                    title: 'OFICINAS AL PÚBLICO',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                c: {
                    image: 'img/ip.svg',
                    title: 'NFORMES DE PRESENTACIÓN',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                d: {
                    image: 'img/vp.svg',
                    title: 'VÍA PÚBLICA Y CARTELERÍA',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                e: {
                    image: 'img/pg.svg',
                    title: 'PUBLICIDAD GRÁFICA',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                f: {
                    image: 'img/rp.svg',
                    title: 'REVISTAS PROPIAS',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                g: {
                    image: 'img/p.svg',
                    title: 'PRENSA',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                },
                h: {
                    image: 'img/m.svg',
                    title: 'INTERNET MAILING',
                    subtitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
                }
            };
            var property_map = {
                center: {latitude: -34.7156697, longitude: -58.2854728},
                zoom: 16,
                control: {},
                name: 'CASA CENTRAL QUILMES',
                phone: '4253 - 3961',
                address: 'Mitre 491 - Quilmes Centro',
                markers: {
                    a: {
                        id: 1,
                        coords: {latitude: -34.7156697, longitude: -58.2854728}
                    }
                }
            };
            var property_info = [
                {
                    name: 'Ficha técnica',
                    id: 1,
                    data: "<h3>Dirección</h3>" +
                    "<p>Alvarez Thomas 1234</p>" +
                    "<h3>Ubicación</h3>" +
                    "<p>Berazategui, Buenos Aires, G.B.A. Zona Sur</p>" +
                    "<h3>Tipo</h3>" +
                    "<p>Barrio Cerado</p>" +
                    "<h3>Estado</h3>" +
                    "<p>En obra</p>" +
                    "<h3>Descripción</h3>" +
                    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
                    padding: true
                },
                {
                    name: 'Video',
                    id: 2,
                    src: 'http://www.youtube.com/embed/dFVxGRekRSg',
                    width: 560,
                    height: 315,
                    padding: false
                },
                {
                    name: 'Mapa',
                    id: 3,
                    map: {
                        center: {latitude: -34.7156697, longitude: -58.2854728},
                        zoom: 16,
                        control: {},
                        name: 'CASA CENTRAL QUILMES',
                        phone: '4253 - 3961',
                        address: 'Mitre 491 - Quilmes Centro',
                        markers: {
                            a: {
                                id: 1,
                                coords: {latitude: -34.7156697, longitude: -58.2854728}
                            }
                        }
                    },
                    padding: false
                },
                {
                    name: 'Planos',
                    id: 4,
                    padding: false
                },
                {
                    name: 'Terminaciones',
                    id: 1,
                    data: "<h4>Conformado por un predio de 37,5 hectáreas y dividido en 296 lotes de entre 600 y 1.200 mts cuadrados. Solo habrá lotes unifamiliares con la finalidad de mantener la densidad habitacional baja y así maximizar la posibilidad de los propietarios del uso de los sectores comunes.</h4>",
                    padding: true
                },
                {
                    name: 'Ambientes',
                    id: 1,
                    data: "<p>Superficie <strong>60 M2</strong></p>" +
                    "<p>Superficie Cubierta <strong>40 M2</strong></p>" +
                    "<p>Ambientes <strong>5</strong></p>" +
                    "<p>Living <strong>SI</strong></p>" +
                    "<p>Comedor <strong>SI</strong></p>" +
                    "<p>Dormitorios <strong>SI</strong></p>" +
                    "<p>Cocina <strong>SI</strong></p>" +
                    "<p>Lavadero <strong>SI</strong></p>",
                    padding: true
                },
            ];
            var venture_info = [
                {
                    name: 'Ficha técnica',
                    id: 1,
                    data: "<h3>Dirección</h3>" +
                    "<p>Alvarez Thomas 1234</p>" +
                    "<h3>Ubicación</h3>" +
                    "<p>Berazategui, Buenos Aires, G.B.A. Zona Sur</p>" +
                    "<h3>Tipo</h3>" +
                    "<p>Barrio Cerado</p>" +
                    "<h3>Estado</h3>" +
                    "<p>En obra</p>" +
                    "<h3>Descripción</h3>" +
                    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
                    padding: true
                },
                {
                    name: 'Video',
                    id: 2,
                    src: 'http://www.youtube.com/embed/dFVxGRekRSg',
                    width: 560,
                    height: 315,
                    padding: false
                },
                {
                    name: 'Masterplan',
                    id: 4,
                    padding: false
                },
                {
                    name: 'Mapa',
                    id: 3,
                    map: {
                        center: {latitude: -34.7156697, longitude: -58.2854728},
                        zoom: 16,
                        control: {},
                        name: 'CASA CENTRAL QUILMES',
                        phone: '4253 - 3961',
                        address: 'Mitre 491 - Quilmes Centro',
                        markers: {
                            a: {
                                id: 1,
                                coords: {latitude: -34.7156697, longitude: -58.2854728}
                            }
                        }
                    },
                    padding: false
                },
                {
                    name: 'Características',
                    id: 1,
                    data: "<h4>Conformado por un predio de 37,5 hectáreas y dividido en 296 lotes de entre 600 y 1.200 mts cuadrados. Solo habrá lotes unifamiliares con la finalidad de mantener la densidad habitacional baja y así maximizar la posibilidad de los propietarios del uso de los sectores comunes.</h4>",
                    padding: true
                },
                {
                    name: 'Ambientes',
                    id: 1,
                    data: "<p>Superficie <strong>60 M2</strong></p>" +
                    "<p>Superficie Cubierta <strong>40 M2</strong></p>" +
                    "<p>Ambientes <strong>5</strong></p>" +
                    "<p>Living <strong>SI</strong></p>" +
                    "<p>Comedor <strong>SI</strong></p>" +
                    "<p>Dormitorios <strong>SI</strong></p>" +
                    "<p>Cocina <strong>SI</strong></p>" +
                    "<p>Lavadero <strong>SI</strong></p>",
                    padding: true
                },
            ];
            return {
                investments_timing: investments_timing,
                why_us: why_us,
                property_map: property_map,
                property_info: property_info,
                venture_info : venture_info
            }
        })
})();
