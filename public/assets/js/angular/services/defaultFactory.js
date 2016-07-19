(function() {
    angular.module('okeefeSite.services')
        .factory("defaultFactory", function(){
            //API default parameters
            var OkeefeApi = {
                URL: '/api/v1/propiedad'
            };
            //MAPS default data
            var options = {scrollwheel: false, icon:'assets/img/marcador_1.png'};
            var about_maps = {
               map_quilmes : {
                   center: {latitude: -34.7156697, longitude: -58.2854728 },
                   zoom: 16,
                   name : 'CASA CENTRAL QUILMES',
                   phone : '4253 - 3961',
                   address : 'Mitre 491 - Quilmes Centro',
                   markers : {
                       a : {
                           id : 1 ,
                           coords : {latitude: -34.7156697, longitude: -58.2854728}
                       }
                   }
               },
               map_hudson : {
                   center: {latitude: -34.812566, longitude: -58.177723 },
                   zoom: 16,
                   name : 'HUDSON',
                   phone : '022 - 2945 - 5003',
                   address : 'Mitre 491 - Quilmes Centro',
                   markers : {
                       a : {
                           id : 1 ,
                           coords : {latitude: -34.812566, longitude:  -58.177723}
                       }
                   }
               },
               map_nuevo_quilmes : {
                   center: {latitude: -34.77891426062949, longitude: -58.16106375896312 },
                   zoom: 16,
                   name : 'LAS GOLONDRINAS',
                   phone : '022 - 2945 - 5003',
                   address : 'Mitre 491 - Quilmes Centro',
                   markers : {
                       a : {
                           id : 1 ,
                           coords : {latitude: -34.77891426062949, longitude: -58.16106375896312 }
                       }
                   }
               },
               map_golondrinas : {
                   center: {latitude: -34.77891426062949, longitude: -58.16106375896312 },
                   zoom: 16,
                   name : 'NUEVO QUILMES',
                   phone : '4253 - 3961',
                   address : 'Mitre 491 - Quilmes Centro',
                   markers : {
                       a : {
                           id : 1 ,
                           coords : {latitude: -34.77891426062949, longitude: -58.16106375896312 }
                       }
                   }
               }
           };
            var footer_maps = [
                {
                    center: {latitude: -34.7156697, longitude: -58.2854728 },
                    zoom: 16,
                    control : {},
                    name : 'CASA CENTRAL QUILMES',
                    phone : '4253 - 3961',
                    address : 'Mitre 491 - Quilmes Centro',
                    markers : {
                        a : {
                            id : 1 ,
                            coords : {latitude: -34.7156697, longitude: -58.2854728}
                        }
                    }
                },
                {
                    center: {latitude: -34.812566, longitude: -58.177723 },
                    zoom: 16,
                    control : {},
                    name : 'HUDSON',
                    phone : '022 - 2945 - 5003',
                    address : 'Mitre 491 - Quilmes Centro',
                    markers : {
                        a : {
                            id : 1 ,
                            coords : {latitude: -34.812566, longitude:  -58.177723}
                        }
                    }
                },
                {
                    center: {latitude: -34.77891426062949, longitude: -58.16106375896312 },
                    zoom: 16,
                    control : {},
                    name : 'LAS GOLONDRINAS',
                    phone : '022 - 2945 - 5003',
                    address : 'Mitre 491 - Quilmes Centro',
                    markers : {
                        a : {
                            id : 1 ,
                            coords : {latitude: -34.77891426062949, longitude: -58.16106375896312 }
                        }
                    }
                },
               {
                    center: {latitude: -34.77891426062949, longitude: -58.16106375896312 },
                    zoom: 16,
                   control : {},
                    name : 'NUEVO QUILMES',
                    phone : '4253 - 3961',
                    address : 'Mitre 491 - Quilmes Centro',
                    markers : {
                        a : {
                            id : 1 ,
                            coords : {latitude: -34.77891426062949, longitude: -58.16106375896312 }
                        }
                    }
                }
            ];
            var property_map = {
                center: {latitude: -34.7156697, longitude: -58.2854728 },
                zoom: 16,
                control : {},
                name : 'CASA CENTRAL QUILMES',
                phone : '4253 - 3961',
                address : 'Mitre 491 - Quilmes Centro',
                markers : {
                    a : {
                        id : 1 ,
                        coords : {latitude: -34.7156697, longitude: -58.2854728}
                    }
                }
            };
            return{
                OkeefeApi : OkeefeApi,
                options : options,
                about_maps : about_maps,
                footer_maps : footer_maps,
                property_map : property_map
            }
        })
})();