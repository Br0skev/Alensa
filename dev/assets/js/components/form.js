$(document).ready(function(){
	//input label

	$('.form input').on('input', function(){
		if($(this).val() != ''){
			$(this).parent().find('label').addClass('filled')
		}
		else{
			$(this).parent().find('label').removeClass('filled')
		}
	});

	//form submit

	$('.form .submit-button').on('click', function(e){

		e.preventDefault();

		if(validateEmail($(this).parents('.form').find('input[type="email"]').val()) && $(this).parents('.form').find('input[type="email"]').val() != ""){
			$(this).parents('.form').find('.form__input-wrapper').removeClass('has-error');
			$(this).parents('.form')[0].reset();
			$(this).parents('.form').addClass('succes');
			$(this).parents('.form').find('label').removeClass('filled');

			setTimeout(function(){
				$('.form').removeClass('succes');
			},5000);			
		}
		else{
			$(this).parents('.form').find('.form__input-wrapper').addClass('has-error');			
		}

		
	});

	//email validation
	function validateEmail($email) {
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		return emailReg.test( $email );
	}

	
});