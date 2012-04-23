$(document).bind("mobileinit", function(){

    $.extend($.mobile,{
        defaultPageTransition: 'slidefade', //or slide?
        defaultDialogTransition: 'pop'
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
    //  The call is intercepted and we fill the pages with data from server
    $(document).bind("pagebeforechange", function(e, data) {
        var url = getURL(data);

        switch (getPage(data)) {
          case "frontpage":
            populateCompanies();
            break;

          case "agreement-list":
            $.mobile.showPageLoadingMsg();
            e.preventDefault();
            populateAgreements(url, data , $('#agreement-list-page'));
            break;

          case "agreement":
            $.mobile.showPageLoadingMsg();
            e.preventDefault();
            populateAgreementPage(url, data.options , $('#agreement-page'));
            break;

          default:
            break;
        }
    });

    function getURL(data) {
        var url = $.mobile.path.parseUrl(data.toPage);
        return url;
    }

    function getPage(data) {
      if (typeof data.toPage === "string") {
            var url = getURL(data);

            if (url.hash.search(/^#agreement-page/) !== -1) {
              return "agreement";
            } else if (url.hash.search(/^#agreement-list-page/) !== -1) {
              return "agreement-list";
            }
        } else if ($(data.toPage)[0]==$('#welcome-page')[0]) {
            return "frontpage";
        }
    }

    function populateCompanies(data , page) {
        var list = $('#company-list');

        $.ajax({
            url: 'rest/companies/',
            dataType: "json",
            success : function(data) {
                list.empty();

                for(var i = 0; i<data.length; i++) {
                    var id = data[i].id;
                    var name = data[i].name;
                    list.append('<li data-companyid="'+id+'" data-companyname="'+name+'" data-swipeurl="rest/companies/'+id+'">' +
                            '<a href="#agreement-list-page?companyid='+id+'">'+name+'</a></li>');
                }

                list.listview('refresh');
            }
        });
    }

    function populateAgreements(urlObj, options , page) {
        var companyId = getURLParameter("companyid", urlObj.href);
        var list = $('#agreement-list');
        var markup = "";

        $.ajax({
            url: 'rest/companies/'+companyId+'/agreements',
            dataType: "json",
            success : function(data) {
                list.empty();

                for(var i = 0; i<data.length; i++)
                {
                    var agreement = data[i];

                    markup += ('<li data-agreementid="'+agreement.id+'"'+
                            'data-agreementname="'+agreement.agreementNumber+'"'+
                            'data-companyid="'+companyId+'"'+
                            'data-swipeurl="rest/companies/'+companyId+'/agreements/'+agreement.id+'">'+
                            '<a href="#agreement-page?agreementid='+agreement.id+'&companyid='+companyId+'">'+agreement.agreementNumber+'</a></li>');
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


    function populateAgreementPage(urlObj , options , page) {
        var agreementId = getURLParameter("agreementid", urlObj.href);
        var companyId = getURLParameter("companyid", urlObj.href);
        $content = $(page).children(":jqmData(role=content)");
        var markup = "";

        $.ajax({
            url: 'rest/companies/'+companyId+'/agreements/'+agreementId,
            dataType: "json",
            success : function(data) {
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
        var parameter = RegExp('.*'+ name + '=(.+?)(&|$)').exec(hash);
        if (parameter) {
          return decodeURI(parameter[1]);
        } else {
          return null;
        }
    }

    function attachSwipeDeleteListener() {
        $('#agreement-list li').swipeDelete({
            btnTheme: 'e',
            btnLabel: 'Slett',
            btnClass: 'aSwipeButton',
            click: function(e) {
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
                    }
                });
            }
        });
    }

});
