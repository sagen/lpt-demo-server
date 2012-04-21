$(document).ready(function(){
	var agreementPage = $('#agreement-list-page');
	var agreementForm = $("#register-agreement-form");


	$('#company-list').delegate("li","click", function(){
		// change to a page, and pass along parameters to the callback function
		MyChangePage("#agreement-list-page", { companyid: $(this).data("companyid"), 
											companyname: $(this).data("companyname") });
	});


	$('#agreement-list').delegate("li","click", function(){
		// change to a page, and pass along parameters to the callback function
		MyChangePage("#agreement-page", { companyid: $(this).data("companyid"), 
										agreementid: $(this).data("agreementid"), 
										agreementname: $(this).data("agreementname")  });
	});


	// bind callback that will be triggered after a pageshow event
	$("#agreement-list-page").bind("callback", function(e, args) {
		populateAgreements($('#agreement-list') , args);
	});
	
	// bind callback that will be triggered after a pageshow event
	$("#agreement-page").bind("callback", function(e, args) {
		populateAgreementPage($(this), args);
	});
	
	
	function MyChangePage(page, args) 
	{
		$.mobile.showPageLoadingMsg();
		$.mobile.changePage(page);
		$(page).trigger("callback", args);
	}



	function populateAgreements(list, args){
		list.empty();
		$('#company-name-for-agreements').text(args.companyname);
		$.ajax({
			url: '/rest/companies/'+args.companyid+'/agreements',
			dataType: "json",
			success : function(data){
				for(var i = 0; i<data.length; i++)
				{
					list.append('<li data-agreementid="'+data[i].id+'"'+
							'data-agreementname="'+data[i].name+'"'+
							'data-companyid="'+args.companyid+'"'+
							'data-swipeurl="rest/companies/'+args.companyid+'/agreements/'+data[i].id+'">'+
							'<a href="#">'+data[i].name+'</a></li>');
				}  

				list.listview('refresh'); //Might need to restyle list after init

				// attach the plugin to an element
				attachSwipeDeleteListener();

				$.mobile.hidePageLoadingMsg();
			}
		});
	}


	
	function populateAgreementPage(page, args){
		$content = page.children( ":jqmData(role=content)" ),

		// The markup we are going to inject into the content
		// area of the page.
		markup = "<p>Medlemsoversikt for " + args.agreementname + 
		"</p><ul data-role='listview' data-inset='true'>",

		// The array of items for this agreement.
//		members = agreement.medlemmer,

//		// The number of items in the category.
//		numMembers = members.length;

//		// Generate a list item for each item in the category
//		// and add it to our markup.
//		for ( var i = 0; i < numMembers; i++ ) {
//		markup += '<li><a href="#">' + members[i].navn + '</a></li>';
//		}

		markup += "</ul>";


		// Inject the company markup into the content element.
		$content.html( markup );

		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced before we
		// attempt to enhance the markup we just injected.
		// Subsequent calls to page() are ignored since a page/widget
		// can only be enhanced once.
		page.page();

		// Enhance the listview we just injected.
		$content.find( ":jqmData(role=listview)" ).listview();

		$.mobile.hidePageLoadingMsg();
	}


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



	function attachSwipeDeleteListener(){
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

