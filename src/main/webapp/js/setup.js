$(document).bind("mobileinit", function(){
	$.extend($.mobile,{
		defaultPageTransition: 'fade', //or slide?
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
    	if ( typeof data.toPage === "string" ) {

    		var u = $.mobile.path.parseUrl( data.toPage );

    		if ( u.hash.search(/^#agreement-page/) !== -1 ) {
    			$.mobile.showPageLoadingMsg();
    			e.preventDefault();
    			populateAgreementPage( u, data.options , $('#agreement-page'));
    			
    		} else if ( u.hash.search(/^#agreement-list-page/) !== -1 ) {
    			$.mobile.showPageLoadingMsg();
    			e.preventDefault();
    			populateAgreements( u, data , $('#agreement-list-page') , $('#agreement-list'));
    		} 

    	}else if($(data.toPage)[0]==$('#welcome-page')[0]){
    		populateCompanies( u, data.options , $('#welcome-page'), $('#company-list'));
    	}

    });
    
    
	function populateCompanies( u, data , page, list){
		list.empty();
		$.ajax({
			url: '/rest/companies/',
			dataType: "json",
			success : function(data){
				for(var i = 0; i<data.length; i++)
				    {
					var id = data[i].id;
					var name = data[i].name;
					list.append('<li data-companyid="'+id+'" data-companyname="'+name+'" data-swipeurl="rest/companies/'+id+'">' +
							'<a href="#agreement-list-page?companyid='+id+'">'+name+'</a></li>');
				    }  

				page.page();
				
				list.listview('refresh'); //Might need to restyle list after init
			}
		});
	}

	function populateAgreements( urlObj, options , page, list){
	var companyId = getURLParameter("companyid", urlObj.href);
	
	$.ajax({
		url: '/rest/companies/'+companyId+'/agreements',
		dataType: "json",
		success : function(data){
			list.empty();
			markup = "";
			
			for(var i = 0; i<data.length; i++)
			{
				markup += ('<li data-agreementid="'+data[i].id+'"'+
						'data-agreementname="'+data[i].name+'"'+
						'data-companyid="'+companyId+'"'+
						'data-swipeurl="rest/companies/'+companyId+'/agreements/'+data[i].id+'">'+
						'<a href="#agreement-page?agreementid='+data[i].id+'&companyid='+companyId+'">'+data[i].name+'</a></li>');
			}  

			list.append(markup);

			page.page();


			list.listview('refresh'); 

			attachSwipeDeleteListener();

			options.dataUrl = urlObj.href;

			$.mobile.changePage(page, options);
			$.mobile.hidePageLoadingMsg();
		}
	});
}
    
	
	function populateAgreementPage(urlObj , options , page){
		var agreementId = getURLParameter("agreementid", urlObj.href);
		var companyId = getURLParameter("companyid", urlObj.href);
		$content = $(page).children( ":jqmData(role=content)" );
		
		// The markup we are going to inject into the content
		// area of the page.
		var markup = "";
		
		$.ajax({
			url: '/rest/companies/'+companyId+'/agreements/'+agreementId,
			dataType: "json",
			success : function(data){
				markup += '<h4>Avtaledetaljer for ' + data.name + '</h4>';
				markup += '<p>Avtalenummer: ' + data.id + '</p>';
				markup += '<p>Medlemmer: '+data.members.join()+'</p>';
				
				markup += '<a href="#members-page?companyid'+companyId+'=&agreementid='+agreementId+'" data-role="button">Vis medlemmer</a>';
				
				
				$content.html(markup);

				page.page();

				options.dataUrl = urlObj.href;

				$.mobile.changePage(page, options);
				$.mobile.hidePageLoadingMsg();
			}
		});
	}
	
	function getURLParameter(name, hash) {
	    return decodeURI(
	        (RegExp('.*'+name + '=' + '(.+?)(&|$)').exec(hash)||[,null])[1]
	    );
	}
	
	function attachSwipeDeleteListener(){
		$('#agreement-list li').swipeDelete({
			btnTheme: 'e',
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