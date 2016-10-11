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
                center: {},
                control: {},
                markers: []
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
            var propertyRural_info = [
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
                    name: 'XXXXXXXXXXX',
                    id: 1,
                    data: "<p>xxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>",
                    padding: true
                },
                {
                    name: 'XXXXXXXXXXX',
                    id: 1,
                    data: "<p>xxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>",
                    padding: true
                },
                {
                    name: 'XXXXXXXXXX',
                    id: 1,
                    data: "<p>xxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>",
                    padding: true
                },
                {
                    name: 'XXXXXXXX',
                    id: 1,
                    data: "<p>xxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>",
                    padding: true
                },
                {
                    name: 'XXXXXXXXX',
                    id: 1,
                    data: "<p>xxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxx</p>" +
                    "<p>xxxxxxxxxxxxxxx</p>",
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
                    name: 'Unidades a la venta',
                    id: 5,
                    data: [
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                        {
                            name: 'Alvarez Thomas 2343',
                            amb: '3 ambientes',
                            size : 'Sup. Total  76.3 M2',
                            oper : 'Operación Venta'
                        },
                    ],

                    padding: true
                },
                {
                    name: 'Amenities',
                    id: 1,
                    data: "<p>Laundry</p>" +
                    "<p>Sauna</p>" +
                    "<p>Laundry</p>" +
                    "<p>Sauna</p>" +
                    "<p>Laundry</p>" +
                    "<p>Sauna</p>",
                    padding: true
                },
            ];
            var news = [
                {id: 1, src: '//e.issuu.com/embed.html#24100570/37639142'},
                {id: 1, src: '//e.issuu.com/embed.html#24100570/37639437'},
                {id: 1, src: '//e.issuu.com/embed.html#24100570/37639559'},
                {id: 1, src: '//e.issuu.com/embed.html#24100570/37639622'},
                {id: 1, src: '//e.issuu.com/embed.html#24100570/35209548'},
                {id: 1, src: '//e.issuu.com/embed.html#24100570/35213450'},
                {id: 2, src: 'img/prensa/__mbito Financiero - Real Estate - 28-3-12 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/01_diario_el_sol_02-04-10.jpg'},
                {id: 2, src: 'img/prensa/02_fortuna_09-04-10.jpg'},
                {id: 2, src: 'img/prensa/03_clarin_24-04-10.jpg'},
                {id: 2, src: 'img/prensa/04_la_nacion_24-04-10.jpg'},
                {id: 2, src: 'img/prensa/05_la_nacion_25-04-10.jpg'},
                {id: 2, src: 'img/prensa/06_diario_el_sol_28-04-10.jpg'},
                {id: 2, src: 'img/prensa/07_dbiz_28-04-10.jpg'},
                {id: 2, src: 'img/prensa/08_hypertada_media_28-04-10.jpg'},
                {id: 2, src: 'img/prensa/09_intercountries_mayo-2010.jpg'},
                {id: 2, src: 'img/prensa/10_clarin_01-05-10.jpg'},
                {id: 2, src: 'img/prensa/11_la_nacion_02-05-10.jpg'},
                {id: 2, src: 'img/prensa/12_clarin_08-05-10.jpg'},
                {id: 2, src: 'img/prensa/13_la_nacion_countries_08-05-10_01.jpg'},
                {id: 2, src: 'img/prensa/14_la_nacion_countries_08-05-10_02.jpg'},
                {id: 2, src: 'img/prensa/15_inmobidiario_13-05-10.jpg'},
                {id: 2, src: 'img/prensa/16_buenos_aires_economico_02-06-10.jpg'},
                {id: 2, src: 'img/prensa/1845231-TWBM5UQ.png'},
                {id: 2, src: 'img/prensa/Ambito Financiero - 29-1-14.jpg'},
                {id: 2, src: 'img/prensa/Anuario Inmobiliaria Mar_13.jpg'},
                {id: 2, src: 'img/prensa/Apertura - Noviembre - p.66.jpg'},
                {id: 2, src: 'img/prensa/Apertura - Noviembre - p.68.jpg'},
                {id: 2, src: 'img/prensa/Apertura - Noviembre - p.70.jpg'},
                {id: 2, src: 'img/prensa/BAE - 17-3-14 - p. 11.jpg'},
                {id: 2, src: 'img/prensa/BAE - Pg 18 - 13-03-12.jpg'},
                {id: 2, src: 'img/prensa/Cl Countries 16-11 p.14.jpg'},
                {id: 2, src: 'img/prensa/Clar__n - 24-5-14 -p.6.jpg'},
                {id: 2, src: 'img/prensa/Clar__n - Countries - 6-12-14 - p4.jpg'},
                {id: 2, src: 'img/prensa/Clar__n - Countries - 27-12-14 - p.11.jpg'},
                {id: 2, src: 'img/prensa/Clar__n ARQ - 18-3-14 - p.27.jpg'},
                {id: 2, src: 'img/prensa/Clar__n ARQ 17-07-12.jpg'},
                {id: 2, src: 'img/prensa/Clar__n ARQ 29-05-13.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Arq. - pg. 28 - 13-03-12.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 3-3-12.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 5-1-13 Pg 3.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 5-1-13 Pg 4 2__ parte - recorte.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 5-1-13 Pg 8.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 5-10-13.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 6-10-12 Pg 11.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 08-09-12 Pag 2 Achicado.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 10-8-13 Pg 11.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 10-11-12 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 11-2-12 Pg 4 2__ parte.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 14-4-12 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 15-12-12 Pg 9.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 15-12-12 Pg 15 Achicado.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 17-12-11 Pg 3.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 18-2-12 Pg 11.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 19-1-13 Pg 6.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 20-4-13 Pg 9.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 21-4-12 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 22-6-13 Pg 7.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 23-2-13 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 24-03-12.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 29-12-12 Pg 4 2__ parte.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 30-3-13 Pg 11.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Count 30-6-12 Pg 9.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Countries - 1-3-14 - p4.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Countries - 13-12-14 - p.19.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Countries - 14-6-14 - p.7.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Countries - 29-11-14 - p.8.jpg'},
                {id: 2, src: 'img/prensa/Clar__n Countries 7-2-15 - Pg2.jpg'},
                {id: 2, src: 'img/prensa/Clar__n El Pa__s 26-10-12 Pg 25.jpg'},
                {id: 2, src: 'img/prensa/Clar__nCountries - 8-06-13 Pag.3.jpg'},
                {id: 2, src: 'img/prensa/Clar__nCountries - 8-06-13 Pag.4 -Parte II-.jpg'},
                {id: 2, src: 'img/prensa/Clarin - Countries - 22-03-14 - p.3.jpg'},
                {id: 2, src: 'img/prensa/Clarin - Countries - 22-03-14 - p.4.jpg'},
                {id: 2, src: 'img/prensa/Clarin 25-1-14 p8.jpg'},
                {id: 2, src: 'img/prensa/Clarin 25-1-14 p10.jpg'},
                {id: 2, src: 'img/prensa/Clarin Arq - 15-5-12.jpg'},
                {id: 2, src: 'img/prensa/Clarin Countries - 1-3-14 - p.3.jpg'},
                {id: 2, src: 'img/prensa/Clarin Countries - 1-3-14 - tapa.jpg'},
                {id: 2, src: 'img/prensa/Clarin Countries - 4-1-14 - p11.jpg'},
                {id: 2, src: 'img/prensa/Clarin Countries - 7-2-15 Pg3.jpg'},
                {id: 2, src: 'img/prensa/Clarin Countries baja 7-2-15 - Pg4.jpg'},
                {id: 2, src: 'img/prensa/Clarin Las Golondrinas 15-5-10.jpg'},
                {id: 2, src: 'img/prensa/Clarin Las Golondrinas 29.1.11.jpg'},
                {id: 2, src: 'img/prensa/Construya Informe Agosto 2012.png'},
                {id: 2, src: 'img/prensa/El Cronista - 14-01 - p.19.jpg'},
                {id: 2, src: 'img/prensa/El Cronista  Anuario 22-12-11 junto.jpg'},
                {id: 2, src: 'img/prensa/El Cronista - Clase Ejecutiva - 25-7-14 - p.51.jpg'},
                {id: 2, src: 'img/prensa/El Cronista - Real Estate - 19-6-14 - Tapa.jpg'},
                {id: 2, src: 'img/prensa/El Cronista RE 20-12-12 Pg V (Achicada).jpg'},
                {id: 2, src: 'img/prensa/El Cronista RE 22-11-12.jpg'},
                {id: 2, src: 'img/prensa/El Cronista RE 23-5-13 Pg III.jpg'},
                {id: 2, src: 'img/prensa/El Cronista RE 28-6-12.jpg'},
                {id: 2, src: 'img/prensa/El Cronista Real Estate - 19-6-14 - p2.jpg'},
                {id: 2, src: 'img/prensa/El Cronista Real Estate - 19-6-14 - p2_1.jpg'},
                {id: 2, src: 'img/prensa/El Cronista Real Estate - 19-6-14 - p3.jpg'},
                {id: 2, src: 'img/prensa/El Cronista Real Estate - 19-12-13 p.4 copia.jpg'},
                {id: 2, src: 'img/prensa/El Sol de Quilmes (achicada)17-04-12.jpg'},
                {id: 2, src: 'img/prensa/El Sol de Quilmes 31-7-12 (Achicadas).jpg'},
                {id: 2, src: 'img/prensa/El Sol Las Golondrinas 2-04-10 (achicado).png'},
                {id: 2, src: 'img/prensa/El Sol Las Golondrinas 28-04-10.jpg'},
                {id: 2, src: 'img/prensa/Info Campo 8-2-12.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n Prop - 31-1-15 Pg2.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n Propiedades _ Countries - 6-9-14 - P__g. 10.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n Propiedades _ Countries - 9-8-14 - P__g.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n Propiedades-31-12-11.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC - 3-1-15 - p.10.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PYC - 5-4-14- P__g. 4.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC - 19-7-14 - p.10.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC - 22-11-14 - p.10.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC - 28-2-15 - p.6.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC- 21-6-14 - p.8.jpg'},
                {id: 2, src: 'img/prensa/La Naci__n PyC- 21-6-14 - p.10.jpg'},
                {id: 2, src: 'img/prensa/La Nacion - PyC - 11-1-14 - p.8.jpg'},
                {id: 2, src: 'img/prensa/La Nacion 22-12-12 PdeLaVega (Achicada).jpg'},
                {id: 2, src: 'img/prensa/La Nacion Count 29-12-12 Pg 8 (Achicada).jpg'},
                {id: 2, src: 'img/prensa/La Nacion Inmuebles Industriales 10-2-14 - p.6.jpg'},
                {id: 2, src: 'img/prensa/La Nacion Prop y Countries - 15-2-14 - pg.8.jpg'},
                {id: 2, src: 'img/prensa/La Nacion Prop y Countries - 15-2-14 - pg.10.jpg'},
                {id: 2, src: 'img/prensa/La Nacion PyC - 22-2-14 - pg.8.jpg'},
                {id: 2, src: 'img/prensa/La Nacion PyC 1-3-14 - p.8.jpg'},
                {id: 2, src: 'img/prensa/La Nacion PyC 8-2-14 - p.8.jpg'},
                {id: 2, src: 'img/prensa/La Ribera Las Golondrinas 8-10-11.jpg'},
                {id: 2, src: 'img/prensa/Las Golond La Nac Count 24-12-11 Pg 5.jpg'},
                {id: 2, src: 'img/prensa/Las Golondrinas Clar__n Count 24-12-11 Pg 14.jpg'},
                {id: 2, src: 'img/prensa/LN 8-6-13 (Achicado).jpg'},
                {id: 2, src: 'img/prensa/LN Count 10-9-11 pg 5 1__ parte.jpg'},
                {id: 2, src: 'img/prensa/LN Count 13-10-12 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN Count 16-2-13.jpg'},
                {id: 2, src: 'img/prensa/LN Count 21-5-11 Pg 6.jpg'},
                {id: 2, src: 'img/prensa/LN Count 29-12-12 Pg 10 (Achicada).jpg'},
                {id: 2, src: 'img/prensa/LN Count 31-3-2012 Pg 12.jpg'},
                {id: 2, src: 'img/prensa/LN Inm Comerc 2-7-12 Pg 2.jpg'},
                {id: 2, src: 'img/prensa/LN Inm Comerc 7-7-12 Pg 2.jpg'},
                {id: 2, src: 'img/prensa/LN Las Golondrinas - 7.12.11.jpg'},
                {id: 2, src: 'img/prensa/LN Las Golondrinas 31.7.10.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 3-8-13 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 6-7-13 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 13-7-13 Pg 6.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 14-9-13 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 16-2-13 Pg 12.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 18-5-13 Pg 12.jpg'},
                {id: 2, src: 'img/prensa/LN P_C 29-6-13 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 4-8-12 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 5-1-13 Pg 2.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 8-12-12 Pg 6.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 11-2-12 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 16-3-13.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 16-6-12 Pg 10.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 18-2-12 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/LN Prop _ Count 19-1-13 Pg 6.jpg'},
                {id: 2, src: 'img/prensa/LN Prop 20-10-12 Pg 2.jpg'},
                {id: 2, src: 'img/prensa/LN Prop 21-7-12.jpg'},
                {id: 2, src: 'img/prensa/LN PyC - 24-5-14 - p.12.jpg'},
                {id: 2, src: 'img/prensa/LN PyC 7-12 p12.jpg'},
                {id: 2, src: 'img/prensa/LN PyC 16-11 Pg.10.jpg'},
                {id: 2, src: 'img/prensa/Perfil - Home - 1-3-14 - p.2.jpg'},
                {id: 2, src: 'img/prensa/Perfil - Home - 1-3-14 - p.3.jpg'},
                {id: 2, src: 'img/prensa/Rev __reas Globales mayo  junio 2011 Pg 4.jpg'},
                {id: 2, src: 'img/prensa/Rev Apertura Ago-2012 Pg 105.jpg'},
                {id: 2, src: 'img/prensa/Rev Apertura feb 2013 Pg 66 (Achicada).jpg'},
                {id: 2, src: 'img/prensa/Rev Apetura feb 2013 Pg 68 (Achicada).jpg'},
                {id: 2, src: 'img/prensa/Rev Arq 4-6-13.jpg'},
            ];
            return {
                investments_timing: investments_timing,
                why_us: why_us,
                property_map: property_map,
                property_info: property_info,
                propertyRural_info: propertyRural_info,
                venture_info: venture_info,
                news: news
            }
        })
})();
