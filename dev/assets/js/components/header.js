$(document).ready(function(){
	hamburger();
});

function hamburger(){
	$('.hamburger, .overlay').on('click', function(){
		toogleActive();
	});
}

function toogleActive(){
	$('.hamburger').toggleClass('hamburger--active');
	$('header').find('.header__nav').toggleClass('header__nav--active');
	$('.overlay').toggleClass('overlay--active');
	$('body').toggleClass('menu-open');
}