function getDateAsString(milliseconds){
    var dateObject = new Date(milliseconds);
    var year = dateObject.getFullYear();
    var month = dateObject.getMonth()+1;
    var date = dateObject.getDate();
    var time = date + '.' + month + '.' + year;
    return time;
}

function setupTheme() {
    $.extend($.mobile,{
        defaultPageTransition: 'slidefade', //or slide?
        defaultDialogTransition: 'pop'
    });


    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.page.prototype.options.backBtnText = "Tilbake";


    // Listviews
    $.mobile.listview.prototype.options.headerTheme  = "b";  // Header for nested lists
    $.mobile.listview.prototype.options.theme        = "b";  // List items / content
    $.mobile.listview.prototype.options.dividerTheme = "b";  // List divider
    $.mobile.listview.prototype.options.splitTheme   = "b";
    $.mobile.listview.prototype.options.countTheme   = "b";
    $.mobile.listview.prototype.options.filterTheme  = "b";
}

function attachSwipeDeleteListener(list) {
    $(list+' li').swipeDelete({
        btnTheme: 'e',
        btnLabel: 'Slett',
        btnClass: 'aSwipeButton',
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var url = $(e.target).closest('a.aSwipeButton').attr('href');
            $(this).parents('li').slideUp();
            $.ajax({
                url: baseUrl + url,
                type: 'DELETE',
                success:function(data) {
                    return false;
                }
            });
        }
    });
}

function getURL(data) {
    var url = $.mobile.path.parseUrl(data.toPage);
    return url.href;
}

function getURLParameter(name, hash) {
    var parameter = RegExp(name + '=(.+?)(&|$)').exec(hash);
    if (parameter) {
        return decodeURI(parameter[1]);
    } else {
        return null;
    }
}

function getPage(data) {
    if (typeof data.toPage === "string") {
        var url = getURL(data);

        if (url.search(/#agreement-page/) !== -1) {
            return "agreement";
        } else if (url.search(/#agreement-list-page/) !== -1) {
            return "agreement-list";
        } else if (url.search(/#register-member-form-page/) !== -1) {
            return "member-form";
        }else if (url.search(/#member-page/) !== -1) {
            return "member";
        } else if (url.search(/#map/) !== -1) {
            return "map";
        }
    } else if ($(data.toPage)[0] == $('#welcome-page')[0]) {
        return "frontpage";
    }
}

$(document).bind("mobileinit", function() {
    $('[data-role=page]').bind('pageshow', function () {
        //refresh the listview on the current page (if it exists)
        $(this).find('.ui-listview').listview('refresh');
    });
});
