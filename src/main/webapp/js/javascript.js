$(document).ready(function(){
//    
    $('[data-role=page]').bind('pageshow', function () {
        //refresh the listview on the current page (if it exists)
        $(this).find('.ui-listview').listview('refresh');
    });
    
});