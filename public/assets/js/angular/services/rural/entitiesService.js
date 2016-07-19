(function() {
    angular.module('okeefeRuralSite.services',[])
        .service('entitiesService', function ($timeout) {
            /**
             * wowSlider initialization
             */
            this.wowSlider = function () {
                $("#wowslider-container1").wowSlider({effect:"basic",prev:"",next:"",duration:20*100,delay:49*100,width:960,height:543,autoPlay:true,autoPlayVideo:false,playPause:false,stopOnHover:true,loop:false,bullets:0,caption:true,captionEffect:"none",controls:true,controlsThumb:false,responsive:1,fullScreen:false,gestures:2,onBeforeStep:0,images:0});
            };
            /**
             * Flex images initialization
             * @param target -> class, id or nested (class,id)
             * @param param -> options
             */
            this.flexImages = function (target,param) {
                $(target).flexImages(param);
            };
            /**
             * Toggle divs initialization
             * @param target -> class, id or nested (class,id)
             * @param item to apply efect
             * @param time -> duration of effect
             */
            this.toggle = function (target,item,time) {
                $(target).toggle();
                $(item).hover(function(){
                    $(this).find(target).fadeToggle(time);
                });
            };
            /**
             * Go to specific div
             * @param id of the target
             */
            this.goToDiv = function (id) {
                $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
            };
            /**
             * Carousel One by one initialization
             * @param target
             */
            this.carouselByOne = function (target) {
                $(target).each(function(){
                    var itemToClone = $(this);
                    for (var i=1;i<3;i++) {
                        itemToClone = itemToClone.next();
                        // wrap around if at end of item collection
                        if (!itemToClone.length) {
                            itemToClone = $(this).siblings(':first');
                        }
                        // grab item, clone, add marker class, add to collection
                        itemToClone.children(':first-child').clone().addClass("cloneditem-"+(i)).appendTo($(this));
                    }
                });
            };
            /**
             * Checkboxes "switch" style
             */
            this.switchBox = function () {
                if ($('[data-toggle="switch"]').length) {
                    $('[data-toggle="switch"]').bootstrapSwitch({
                        onColor: 'normal',
                        offColor: 'default'
                    });
                }
            };
            /**
             * Change tabs color
             */
            this.tabs = function () {
                $('a[data-toggle="tab"]').on('click', function (e) {
                    $('.menu .active').removeClass('active');
                    $(this).parent().addClass('active');
                });
            };
            this.mapsSlider = function ($scope) {
                $('#slider-mapas').on('slid.bs.carousel', function () {
                    var index = $('#slider-mapas .active').index('#slider-mapas .item');
                    $scope.maps[index].control.refresh();
                });
            };
            this.popover = function () {
                $('a[data-toggle="popover"]').popover();
            };
            this.moveArrow = function (view,key) {
                if(view == 'property'){
                    switch(key){
                        case 'f':
                            $('.tab-content .flecha').css('left','5%');
                            break;
                        case 'v':
                            $('.tab-content .flecha').css('left','17%');
                            break;
                        case 'm':
                            $('.tab-content .flecha').css('left','26%');
                            break;
                        case 's':
                            $('.tab-content .flecha').css('left','37%');
                            break;
                        case 'p':
                            $('.tab-content .flecha').css('left','49%');
                            break;
                        case 't':
                            $('.tab-content .flecha').css('left','62%');
                            break;
                        default:
                            $('.tab-content .flecha').css('left','5%');
                            break;
                    }
                }else if (view == 'venture'){
                    switch(key){
                        case 'f':
                            $('.flecha').css('left','5%');
                            break;
                        case 'v':
                            $('.flecha').css('left','17%');
                            break;
                        case 'm':
                            $('.flecha').css('left','29%');
                            break;
                        case 's':
                            $('.flecha').css('left','40.5%');
                            break;
                        case 'p':
                            $('.flecha').css('left','53%');
                            break;
                        case 't':
                            $('.flecha').css('left','72%');
                            break;
                        default:
                            $('.flecha').css('left','5%');
                            break;
                    }
                }
            };
            this.refreshMap = function ($scope) {
                $timeout(function() {
                    $scope.control.refresh();
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
            }
        });
})();