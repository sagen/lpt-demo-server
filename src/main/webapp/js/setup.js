$(document).bind("mobileinit", function(){
	$.extend($.mobile,{
		defaultPageTransition: 'slidefade', //or slide?
		defaultDialogTransition: 'pop',
	  });
	
	$.mobile.page.prototype.options.addBackBtn = true;
	$.mobile.page.prototype.options.backBtnText = "Tilbake";
	
    
    // Listviews
    $.mobile.listview.prototype.options.headerTheme = "b";  // Header for nested lists
    $.mobile.listview.prototype.options.theme           = "b";  // List items / content
    $.mobile.listview.prototype.options.dividerTheme    = "b";  // List divider

    $.mobile.listview.prototype.options.splitTheme   = "b";
    $.mobile.listview.prototype.options.countTheme   = "b";
    $.mobile.listview.prototype.options.filterTheme = "b";
    
    
	 // Listen for any attempts to call changePage().
     // This one checks if the requested page is a company page,
     // and fires a call to getCompany with the specified id in the URL
    $(document).bind( "pagebeforechange", function( e, data ) {
    	if($(data.toPage)[0]==$('#welcome-page')[0]){
    		populateCompanies($('#company-list'));
    	}

    });
    
	function populateCompanies(list){
		list.empty();
		$.mobile.showPageLoadingMsg();		
		$.ajax({
			url: '/rest/companies/',
			dataType: "json",
			success : function(data){
				for(var i = 0; i<data.length; i++)
				    {
					var id = data[i].id;
					var name = data[i].name;
					list.append('<li data-companyid="'+id+'" data-companyname="'+name+'" data-swipeurl="rest/companies/'+id+'">' +
							'<a href="#">'+name+'</a></li>');
				    }  

				list.listview('refresh'); //Might need to restyle list after init
				
				$.mobile.hidePageLoadingMsg();
			}
		});
	}

//    
//	// Load the data for a specific agreement, based on
//	// the URL passed in. 
//	function getAgreement( urlObj, options )
//	{
//		var agreementId = urlObj.hash.replace( /.*agreementid=/, "" );
//
//			// Get the object that represents the category we
//			// are interested in. Note, that at this point we could
//			// instead fire off an ajax request to fetch the data, but
//			// for the purposes of this sample, it's already in memory.
//		var agreement = {};
//		$.mobile.showPageLoadingMsg();
//		$.ajax({
//			url: '/rest/companies//agreements/'+agreementId,
//			dataType: "json",
//			success : function(data){
//				var pageSelector = urlObj.hash.replace( /\?.*$/, "" );
//				populateAgreementPage(data, pageSelector, options, urlObj);
//				$.mobile.hidePageLoadingMsg();
//			}
//		});
//	}
//	
//	// Generate markup for the agreement,
//	// inject it into an embedded page, and then make
//	// that page the current active page.
//	function populateAgreementPage(agreement, pageSelector, options, urlObj)
//	{
//			// The pages we use to display our content are already in
//			// the DOM. The id of the page we are going to write our
//			// content into is specified in the hash before the '?'.
//		if ( agreement ) {
//			// Get the page we are going to dump our content into.
//			var $page = $( pageSelector ),
//				// Get the content area element for the page.
//				$content = $page.children( ":jqmData(role=content)" ),
//
//				// The markup we are going to inject into the content
//				// area of the page.
//				markup = "<p>Medlemsoversikt for " + agreement.navn + 
//				"</p><ul data-role='listview' data-inset='true'>",
//
//				// The array of items for this category.
//				members = agreement.medlemmer,
//
//				// The number of items in the category.
//				numMembers = members.length;
//
//			// Generate a list item for each item in the category
//			// and add it to our markup.
//			for ( var i = 0; i < numMembers; i++ ) {
//				markup += '<li><a href="#">' + members[i].navn + '</a></li>';
//			}
//			markup += "</ul>";
//
//
//			// Inject the company markup into the content element.
//			$content.html( markup );
//
//			// Pages are lazily enhanced. We call page() on the page
//			// element to make sure it is always enhanced before we
//			// attempt to enhance the markup we just injected.
//			// Subsequent calls to page() are ignored since a page/widget
//			// can only be enhanced once.
//			$page.page();
//			
//			// Enhance the listview we just injected.
//			$content.find( ":jqmData(role=listview)" ).listview();
//
//			// We don't want the data-url of the page we just modified
//			// to be the url that shows up in the browser's location field,
//			// so set the dataUrl option to the URL for the category
//			// we just loaded.
//			options.dataUrl = urlObj.href;
//
//			// Now call changePage() and tell it to switch to
//			// the page we just modified.
//			$.mobile.changePage( $page, options );
//		}
//	}
    
});