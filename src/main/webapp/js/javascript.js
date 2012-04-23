$(document).ready(function(){
//    
    $('[data-role=page]').bind('pageshow', function () {
        //refresh the listview on the current page (if it exists)
        $(this).find('.ui-listview').listview('refresh');
    });
    
    if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error);
	} else {
	  error('not supported');
	}

    function success(position)
    {
    	alert("found you at "+position.coords.latitude + " " + position.coords.longitude);
    }
    
    function error(msg)
    {
    	alert("didnt find you "+msg);
    }
    
});