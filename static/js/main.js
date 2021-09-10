const hamburgerButton = document.querySelector('#map')

// For nav hamburger functionality
$(document).ready(function () {
    $('.nav-hamburger').click(function () {
        function hideMenu(e){
            $('.menu-content').css('display', 'none');
            $('div.blur').css('display', 'none');
            $('.line1').css('transform', 'rotate(0deg) translate(0px, 0px)');
            $('.line2').css('display', 'block');
            $('.line3').css('transform', 'translate(0px, 0px) rotate(0deg)');
            document.removeEventListener('click', hideMenu)
            document.querySelector('div.menu-content').removeEventListener('click', e => {
                e.stopPropagation()
            })
        }

        if ($('.menu-content').css('display') == 'none') {
            $('.menu-content').css('display', 'block');
            $('div.blur').css('display', 'block');
            $('.line1').css('transform', 'translate(0px, 11px) rotate(45deg)');
            $('.line2').css('display', 'none');
            $('.line3').css('transform', 'translate(0px, -4px) rotate(-45deg)');
            setTimeout(() => {
                document.addEventListener('click', hideMenu)
                document.querySelector('div.menu-content').addEventListener('click', e => {
                    e.stopPropagation()
                })
            }, 0)
        } 
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
    navLinkAddColor()
});

document.addEventListener("DOMContentLoaded", function () {
    const mainFooter = document.getElementById('mainfooter');
    const footerReact = mainFooter.getBoundingClientRect()
    const windowHeight = window
    if (windowHeight.innerHeight > footerReact.y) {
        mainFooter.className = 'fixed';
    }


    updateFooterPositioning('resize');
    updateFooterPositioning('click');
});

function updateFooterPositioning(action) {
    window.addEventListener(action, function (e) {
        const mainFooter = document.getElementById('mainfooter');
        const footerReact = mainFooter.getBoundingClientRect()
        const mainTagReact = document.querySelector('main').getBoundingClientRect()

        if (footerReact.y + window.pageYOffset > window.innerHeight) {
            mainFooter.className = '';
        } else if (mainTagReact.bottom > footerReact.y + window.pageYOffset) {
            mainFooter.className = '';
        } else {
            mainFooter.className = 'fixed';
        }
    });
}

function navLinkAddColor(){
    let pathname = window.location.pathname
    switch(pathname){
        case '/':
            document.querySelector('li.index').classList.add('current')
            break
        case '/portfolio/':
            document.querySelector('li.projects').classList.add('current')
            break
        case '/aboutme/':
            document.querySelector('li.aboutme').classList.add('current')
            break
        case '/contact/':
            document.querySelector('li.contactme').classList.add('current')
            break
    }
}