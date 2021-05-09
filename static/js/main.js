const hamburgerButton = document.querySelector('#map')

// For nav hamburger functionality
$(document).ready(function () {
    $('.nav-hamburger').click(function () {
        if ($('.menu-content').css('display') == 'none') {
            $('.menu-content').css('display', 'block');
            $('div.blur').css('display', 'block');
            $('.line1').css('transform', 'translate(0px, 11px) rotate(45deg)');
            $('.line2').css('display', 'none');
            $('.line3').css('transform', 'translate(0px, -4px) rotate(-45deg)');
        } else {
            $('.menu-content').css('display', 'none');
            $('div.blur').css('display', 'none');
            $('.line1').css('transform', 'rotate(0deg) translate(0px, 0px)');
            $('.line2').css('display', 'block');
            $('.line3').css('transform', 'translate(0px, 0px) rotate(0deg)');
        };
    });

    $('.location').click(function () {
        if ($('#map').css('display') == 'none') {
            $('#map').css('display', 'block');
        } else {
            $('#map').css('display', 'none')
        }
    })

    // contact me tab opening
    $('#h2Contact').click(function () {
        if ($('#emailForm').css('display') == 'none') {
            $('#emailForm').css('display', 'block');
        }
        else {
            $('#emailForm').css('display', 'none');
        }
    })

    if ($('.error').length) {
        $('#emailForm').css('display', 'block');
    }
});

// Changes colors for separate pages in nav menu.
if ($('div#index').length) {
    $('li.index').addClass('current')
}
else if ($('div#projects').length) {
    $('li.projects').addClass('current')
}
else if ($('div#aboutme').length) {
    $('li.aboutme').addClass('current')
}
else if ($('div#contactme').length) {
    $('li.contactme').addClass('current')
}
