$(document).ready(function() {
    'use strict'

    $('.toggle_icon').on('click', function() {
        $('body').toggleClass('open')
    })

    // Search Toggle
    var search = $('#search_area'),
        searchInput = $('#search_input'),
        result = $('.search-resulrs')
    $('#search').on('click', function() {
        search.slideToggle('slow')
        searchInput.focus().val('')
        result.hide()
    })
    searchInput.keyup(function(){
        result.show() 
    })
    $('#close_search').on('click', function() {
        search.slideUp('slow')
        searchInput.val('')
        result.hide()
    })

    $('#horizontalTab').jqTabs({
        direction: 'horizontal',
        duration: 200,
    })

    if (document.getElementById('default-select')) {
        $('select').niceSelect()
    }

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show',
        },
        speed: 400,
    })

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container')
            .clone()
            .prop({
                id: 'mobile-nav',
            })
        $mobile_nav.find('> ul').attr({
            class: '',
            id: '',
        })
        $('body').append($mobile_nav)
        $('.search-trigger').append(
            '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
        )
        $('body').append('<div id="mobile-body-overly"></div>')
        $('#mobile-nav')
            .find('.menu-has-children')
            .prepend('<i class="lnr lnr-chevron-down"></i>')

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this)
                .next()
                .toggleClass('menu-item-active')
            $(this)
                .nextAll('ul')
                .eq(0)
                .slideToggle()
            $(this).toggleClass('lnr-chevron-up lnr-chevron-down')
        })

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active')
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu')
            $('#mobile-body-overly').toggle()
        })

        $(document).click(function(e) {
            var container = $('#mobile-nav, #mobile-nav-toggle')
            if (
                !container.is(e.target) &&
                container.has(e.target).length === 0
            ) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active')
                    $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu')
                    $('#mobile-body-overly').fadeOut()
                }
            }
        })
    } else if ($('#mobile-nav, #mobile-nav-toggle').length) {
        $('#mobile-nav, #mobile-nav-toggle').hide()
    }

    // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (
            location.pathname.replace(/^\//, '') ==
                this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash)
            if (target.length) {
                var top_space = 0

                if ($('#header').length) {
                    top_space = $('#header').outerHeight()

                    if (!$('#header').hasClass('header-fixed')) {
                        top_space = top_space
                    }
                }

                $('html, body').animate(
                    {
                        scrollTop: target.offset().top - top_space,
                    },
                    1500,
                    'easeInOutExpo'
                )

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active')
                    $(this)
                        .closest('li')
                        .addClass('menu-active')
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active')
                    $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars')
                    $('#mobile-body-overly').fadeOut()
                }
                return false
            }
        }
    })

    $(document).ready(function() {
        $('html, body').hide()
        if (window.location.hash) {
            setTimeout(function() {
                $('html, body')
                    .scrollTop(0)
                    .show()
                $('html, body').animate(
                    {
                        scrollTop: $(window.location.hash).offset().top - 108,
                    },
                    1000
                )
            }, 0)
        } else {
            $('html, body').show()
        }
    })

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('#header').addClass('header-scrolled')
            $('.header-top').addClass('sticky-header')
            
        } else {
            $('#header').removeClass('header-scrolled')
            $('.header-top').removeClass('sticky-header')
        }
    })

    // fitVids js
    $('body').fitVids()

    // Gallery scripts here
    var galleryImages = document.querySelectorAll('.kg-gallery-image img');
    galleryImages.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    });

    // zoom popup
    const images = [
        ...document.querySelectorAll('.kg-image-card img:not(.kg-width-full), .kg-gallery-image img'),
    ]
    mediumZoom(images)


    // post carousel js //
    $('.active-post-carusel').owlCarousel({
        items: 3,
        loop: true,
        margin: 0,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 1,
            },
            768: {
                items: 1,
            },
            800: {
                items: 2,
            },
            1200: {
                items: 2,
            },
            1380: {
                items: 3,
            },
        },
    })

    
})


// Ghost finder
new GhostFinder({
    input: '#search_input',
    showResult: '.search-resulrs',
    time_format: 'DD MMM YYYY',
    resultTemplate: `<div class="container ">
    <div class="row">
        <div class="col-md-12">
            <ul class="ul">
                ##results
            </ul>
        </div>
    </div>
</div>`,
    singleResultTemplate: `<li><a href="##url">##title</a></li>`,
    contentApiKey: window.contentApiKey
})