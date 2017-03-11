$(document).ready(function(){

	function fix_height(){

        var heightWithoutNavbar = $("body .content-wrapper").height() - 53;

        var navbarHeigh = $('div.navbar-fixed-top').height();

        var wrapperHeigh = $('.content-wrapper').height();

        //$('aside').css('min-height', $(window).height() - navbarHeigh);
        if(navbarHeigh > wrapperHeigh){
            $('.content-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('.content-wrapper').css("min-height", $(window).height() - 155  + "px");
        }
	}

	setTimeout(function(){
        fix_height();
    }, 500);

    setInterval(function(){ fix_height(); }, 3000);
});