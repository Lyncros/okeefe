(function () {
    angular.module('okeefeSite.services', [])
        .service('entitiesService', function ($timeout, $sce, SITE_URL) {
            //Jquery Calls
            /**
             * wowSlider initialization
             */
            this.wowSlider = function () {
                $("#wowslider-container1").wowSlider({
                    effect: "basic",
                    prev: "",
                    next: "",
                    duration: 20 * 100,
                    delay: 49 * 100,
                    width: 960,
                    height: 543,
                    autoPlay: true,
                    autoPlayVideo: false,
                    playPause: false,
                    stopOnHover: true,
                    loop: false,
                    bullets: 0,
                    caption: true,
                    captionEffect: "none",
                    controls: true,
                    controlsThumb: false,
                    responsive: 1,
                    fullScreen: false,
                    gestures: 2,
                    onBeforeStep: 0,
                    images: 0
                });
            };
            /**
             * Flex images initialization
             * @param target -> class, id or nested (class,id)
             * @param param -> options
             */
            this.flexImages = function (target, param) {
                $(target).flexImages(param);
            };
            /**
             * Toggle divs initialization
             * @param target -> class, id or nested (class,id)
             * @param item to apply efect
             * @param time -> duration of effect
             */
            this.toggle = function (target, item, time) {
                $(target).toggle();
                $(item).hover(function () {
                    $(this).find(target).fadeToggle(time);
                });
            };
            /**
             * Go to specific div
             * @param id of the target
             */
            this.goToDiv = function (id) {
                $('html,body').animate({scrollTop: $("#" + id).offset().top}, 'slow');
            };
            /**
             * Carousel One by one initialization
             * @param target
             */
            this.carouselByOne = function (target, id) {
                $(id).carousel({ interval: 2000 });
                $(target).each(function () {
                    var itemToClone = $(this);
                    for (var i = 1; i < 3; i++) {
                        itemToClone = itemToClone.next();
                        // wrap around if at end of item collection
                        if (!itemToClone.length) {
                            itemToClone = $(this).siblings(':first');
                        }
                        // grab item, clone, add marker class, add to collection
                        itemToClone.children(':first-child').clone().addClass("cloneditem-" + (i)).appendTo($(this));
                    }
                });
            };
            this.mapsSlider = function ($scope) {
                $('#slider-mapas').on('slid.bs.carousel', function () {
                    var index = $('#slider-mapas .active').index('#slider-mapas .item');
                    //console.log($scope.maps[index]);
                    $scope.maps[index].control.refresh({latitude: $scope.maps[index].center.latitude, longitude: $scope.maps[index].center.longitude});
                });
            };
            this.popover = function () {
                $('a[data-toggle="popover"]').popover();
            };
            this.moveArrow = function (view, key) {
                if (view == 'property') {
                    switch (key) {
                        case 1:
                            $('.tab-content .flecha').css('left', '5%');
                            break;
                        case 2:
                            $('.tab-content .flecha').css('left', '17%');
                            break;
                        case 3:
                            $('.tab-content .flecha').css('left', '26%');
                            break;
                        case 's':
                            $('.tab-content .flecha').css('left', '37%');
                            break;
                        case 4:
                            $('.tab-content .flecha').css('left', '49%');
                            break;
                        case 5:
                            $('.tab-content .flecha').css('left', '62%');
                            break;
                        default:
                            $('.tab-content .flecha').css('left', '5%');
                            break;
                    }
                } else if (view == 'venture') {
                    switch (key) {
                        case 'f':
                            $('.flecha').css('left', '5%');
                            break;
                        case 'v':
                            $('.flecha').css('left', '17%');
                            break;
                        case 'm':
                            $('.flecha').css('left', '29%');
                            break;
                        case 's':
                            $('.flecha').css('left', '40.5%');
                            break;
                        case 'p':
                            $('.flecha').css('left', '53%');
                            break;
                        case 't':
                            $('.flecha').css('left', '72%');
                            break;
                        default:
                            $('.flecha').css('left', '5%');
                            break;
                    }
                }
            };
            this.refreshMap = function ($scope) {
                $timeout(function () {
                    $scope.control.refresh({latitude: $scope.map.center.latitude, longitude: $scope.map.center.longitude});
                }, 400);
            };
            this.view_animation = function (target) {
                var $animation_elements = $(target);
                var $window = $(window);
                $window.on('scroll resize', check_if_in_view);
                //$window.trigger('scroll');
                function check_if_in_view() {
                    var window_height = $window.height();
                    var window_top_position = $window.scrollTop();
                    var window_bottom_position = (window_top_position + window_height);
                    $.each($animation_elements, function () {
                        var $element = $(this);
                        var element_height = $element.outerHeight();
                        var element_top_position = $element.offset().top;
                        var element_bottom_position = (element_top_position + element_height);
                        //check to see if this current container is within viewport
                        if ((element_bottom_position >= window_top_position) &&
                            (element_top_position <= window_bottom_position)) {
                            $element.addClass('in-view');
                        }
                        /*else {
                         $element.removeClass('in-view');
                         }*/
                    });
                }
            };
            this.project_filter = function () {
                var $proyectos;
                $('.galeria').imagesLoaded(function () {
                    $proyectos = $('.galeria').isotope({
                        // options
                        itemSelector: '.item',
                        layoutMode: 'fitRows'
                    });
                });

                $('.filtrar-casa').click(function () {
                    $proyectos.isotope({filter: '.casa'})
                });
                $('.filtrar-apto').click(function () {
                    $proyectos.isotope({filter: '.apto'})
                });
                $('.filtrar-all').click(function () {
                    $proyectos.isotope({filter: '*'})
                });
            };
            this.banner = function () {
                $('.btn-banner').on('click', function () {
                    $('.overlay-premium').fadeToggle(200);
                    $('body').css('overflow', 'hidden');
                    jQuery('html,body').animate({
                        scrollTop: jQuery('.banner').offset().top - 50
                    }, 600);
                })

                $('.banner .close').on('click', function () {
                    $('.overlay-premium').fadeToggle(200);
                    $('body').css('overflow', 'auto');
                })

                $('.overlay-premium').on('click', function () {
                    $('.overlay-premium').fadeToggle(200);
                    $('body').css('overflow', 'auto');
                    $('.banner .collapse').collapse('toggle');
                })
            };
            this.trustSrc = function (src) {
                return $sce.trustAsResourceUrl(src);
            };
            this.trustHtml = function (html) {
                return $sce.trustAsHtml(html);
            };
            this.objectSize = function (obj) {
                var size = 0;
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };
            var inmuebles = [
                {id: '9', value: 'Casas'},
                {id: '1', value: 'Departamentos'},
                {id: '7', value: 'Lotes'},
                {id: '17', value: 'Quintas'},
                {id: '19', value: 'Industrial'},
                {id: '2', value: 'Locales'},
                {id: '11', value: 'Oficinas'},
                {id: '15', value: 'Galpones'},
                {id: '22', value: 'Estancias'},
                {id: '16', value: 'Chacras'},
                {id: '6', value: 'Campos'},
                {id: '18', value: 'Cocheras'},
                {id: '9,1,7,17', value: 'Residencial'},
                {id: '7,19,2,11,15,18', value: 'Comercial'},
                {id: '7,17,22,16,15,6', value: 'Rural'},
                {id: '7,17,22,16,15,6', value: 'Todos'},
            ];
            this.getTipoInmueble = function (id, value) {
                for (var item of inmuebles) {
                    if (id && item.id == id) {
                        return item.value;
                    } else if (value && item.value == value) {
                        return item.id;
                    }
                }
                return null;
            };
            var operaciones = [
                {id: '2', value: 'Alquiler'},
                {id: '1', value: 'Inversión'},
                {id: '4', value: 'Alquiler temporario'},
                {id: '12', value: 'Compra'},
                {id: '19', value: 'Industrial'},
            ];
            this.getTipoOperacion = function (id, value) {
                for (var item of operaciones) {
                    if (id && item.id == id) {
                        return item.value;
                    } else if (value && item.value == value) {
                        return item.id;
                    }
                }
                return null;
            };
            var tipo_emprendimiento = [
                {id: '14', value: 'Condominios'},
                {id: '16', value: 'Barrio Cerrado'},
                {id: '17', value: 'Loteo Abierto'},
                {id: '18', value: 'Edificio'},
                {id: '20', value: 'Club de Campo'},
                {id: '21', value: 'Cocheras'},
                {id: '22', value: 'Real Estate Productivo'},
                {id: '23', value: 'Parque Industrial'},
            ];
            this.getTipoEmprendimiento = function (id, value) {
                for (var item of tipo_emprendimiento) {
                    if (id && item.id == id) {
                        return item.value;
                    } else if (value && item.value == value) {
                        return item.id;
                    }
                }
                return null;
            };
            this.filters = function (filter) {
                var filters = {
                    'amb': 'Ambientes',
                    'supMin': 'Superficie Mínima',
                    'supMax': 'Superficie Máxima',
                    'valMin': 'Precio Mínimo',
                    'valMax': 'Precio Máximo',
                    'coch': 'Cocheras',
                    'ant': 'Antiguedad',
                    'banos': 'Baños',
                    'filtroMon': 'Moneda',
                };
                return filters[filter];
            };
            var hasDoubleEqual = function (key) {
                var keys = ["banos","amb","coch","ant"];
                return (keys.indexOf(key));
            };
            this.hasDoubleEqual = function (key) {
                return hasDoubleEqual(key);
            };
            this.applyFilter = function (filter, value, tipo, operacion, ubicacion, filters, minVal, maxVal, cur) {
                //console.log("filters",filters);
                var url = SITE_URL + 'propiedades/' + tipo + '/' + operacion + '/' + ubicacion + '?';
                if (cur) {
                    filters['filtroMon'] = cur;
                }
                if (value && filter) {
                    filters[filter] = value;
                } else if (minVal || maxVal) {
                    filters[filter] = {
                        min: (minVal || 0),
                        max: (maxVal || 0)
                    };
                }
                angular.forEach(filters, function (value, key) {
                    if (key != 'tipo' && key != 'oper' && key != 'ubicacion' && value && typeof value != 'object') {
                        url += '&' + key + '=' + value;
                    } else if (typeof value == 'object') {
                        url += (value.min) ? '&' + key + 'Min=' + value.min : '';
                        url += (value.max) ? '&' + key + 'Max=' + value.max : '';
                    }
                });
               //console.log(url);
                return url;
            };
            this.showAlert = function ($scope, msg, type, time) {
                $scope.alert = {
                    type: type,
                    'msg': msg
                };
                if (time) {
                    $timeout(function () {
                        $scope.alert = null;
                    }, time);
                }
            };
        });
})();