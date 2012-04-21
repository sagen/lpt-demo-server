$(document).ready(function(){
	var agreementPage = $('#agreement-list-page');
	var agreementForm = $("#register-agreement-form");

	agreementPage.bind('pagebeforeshow',function(event, ui){
		$('#agreement-list').empty();
	});
	agreementPage.bind('pageshow',function(event, ui){
		populateAgreements($('#agreement-list')); 
	});

	
	// We want to handle the register-POST ourselves to change to the correct
	// page after the POST
	$("#register-agreement-submit-button").click(function(e) {
	    e.preventDefault();
	    $.ajax({
			url: '/rest/agreements',
			type: 'POST',
			data: agreementForm.serialize(),
			success : function(data){
				//Resets form
				agreementForm[0].reset();
				
				//Changes page and removes the form from history
				$.mobile.changePage("#agreement-page?agreementid="+data.id, 
						{ 
						reverse: false,
						changeHash: false
						});
			}
		});
	  });



	function populateAgreements(list){
		$.mobile.showPageLoadingMsg();
		$.ajax({
			url: '/rest/agreements',
			dataType: "json",
			success : function(data){
				for(var i=0 ; i<data.length; i++){
					list.append('<li data-swipeurl="/rest/agreements/'+data[i].id+'"><a href="#agreement-page?agreementid='+data[i].id+'">'+data[i].navn+'</a></li>');
				}

				list.listview('refresh'); //Might need to restyle list after init
			
				$.mobile.hidePageLoadingMsg();
				// attach the plugin to an element
				$('#agreement-list li').swipeDelete({
					btnLabel: 'Slett',
					btnClass: 'aSwipeButton',
					click: function(e){
						e.preventDefault();
						e.stopPropagation();
						var url = $(e.target).closest('a.aSwipeButton').attr('href');
						console.log($(e.target));
						$(this).parents('li').slideUp();
						$.ajax({
							url: url, 
							type: 'POST',
							success:function(data) {
								return false;
						}});
					}
				});
				
			}
		});
	}



});

