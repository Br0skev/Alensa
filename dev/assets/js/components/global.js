$(document).ready(function(){
	//Slick slider 
	$('.slider').slick({
		arrows:false,		
		slidesToShow: 3,
		infinite: true,
		dots:false,
		centerMode:true,		
  		variableWidth: true,
		responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 1,  
	        dots:true,
	        centerMode:false,
	        infinite: true,
	        variableWidth: false
	      }
	    },
	    {
	      breakpoint: 768,
	      settings: {
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        variableWidth: false,  
	        centerMode:false,  
	        dots:true, 
	        infinite: true
	      }
	    }]
	});	
});