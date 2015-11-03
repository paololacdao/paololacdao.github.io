$(document).ready(function (){
	$('#login-form').on('submit',function (event){
		var validationError = false,
				usernameError = false,
				passwordError = false;
		
		if ($('#username').val() === 'User Name' || $('#username').val().length === 0) {
			validationError = true;
			usernameError = true;
		}
		if ($('#password').val() === 'Password' || $('#password').val().length === 0) {
			validationError = true;
			passwordError = true;
		}
		
		if (validationError) {
			if (usernameError) {
				$('#username').addClass("form-has-error");
				$('#username').popover('show');
			}
			if (passwordError) {
				$('#password').addClass("form-has-error");
				if (!usernameError) {
					$('#password').popover('show');
				}
			}
			$('#forgotPasswordLink > a').addClass("form-has-error");
			
			event.preventDefault();
		}
	});
	
	$('#username').on('change', function () {
		$('#username').popover('hide');
	});
	
	$('#password').on('change', function () {
		$('#username').popover('hide');
	});
	
	$('#pullout-handle').click(
		function () {
			if ($('#pullout-content').hasClass('hidden')){
				$('#pullout-content').removeClass('hidden')
			} else {
				$('#pullout-content').addClass('hidden')
			}
	});
});