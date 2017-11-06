$(document).ready(function() {
    addScroleed();
});


$(window).scroll(function() {
    addScroleed();
});

function addScroleed() {
    var height = $('#main-nav').height();
    var scroll = $(window).scrollTop();
        
        if(scroll > height) {
            $('#main-nav').addClass('transparent_back');
        } else {
            $('#main-nav').removeClass('transparent_back');
        }
    }