$(document).ready(function(){
//	$('#page2').live('pageshow',function(event, ui){
//        populateList(list); //TODO: implement function
//    })
	
//	$('list').listview(); //Might need to restyle list after init
	
	$('#list li').swipeDelete({
	    click: function(e){
	    	// This should also update backend
	        e.preventDefault();
	        $(this).parents('li').remove();
	    }
	});

	
});

