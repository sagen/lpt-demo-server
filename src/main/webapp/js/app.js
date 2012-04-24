var baseUrl = 'http://lptdemo.herokuapp.com/rest/';

$(document).bind("mobileinit", setupTheme);

// Intercept calls to changePage() and fill pages with data from server
$(document).bind("pagebeforechange", function(e, data) {
    var url = getURL(data);

    switch (getPage(data)) {
    case "frontpage":
        populateCompanies();
        break;

    case "agreement-list":
        populateAgreements(url, data.options, $('#agreement-list-page')); // should be data.options here as well? But it isn't working. The back button from agreement-list-page to welcome-page won't work.
        break;

    case "agreement":
        populateAgreementPage(url, data.options, $('#agreement-page'));
        break;

    default:
        break;
    }
});

function populateCompanies() {
    var list = $('#company-list');

    $.ajax({
        url: baseUrl + 'companies',
        dataType: "json",
        success : function(data) {
            list.empty();

            for(var i = 0; i<data.length; i++) {
                var company = data[i];
                list.append('<li><a href="#agreement-list-page?companyid=' + company.id + '">' + company.name + '</a></li>');
            }

            list.listview('refresh');
        }
    });
}

function populateAgreements(url, options, page) {
    var companyId = getURLParameter("companyid", url);
    var list = $('#agreement-list');
    var markup = "";

    $.ajax({
        url: baseUrl + 'companies/' + companyId + '/agreements',
        dataType: "json",
        success : function(data) {
            list.empty();

            for(var i = 0; i<data.length; i++) {
                var agreement = data[i];

                markup += ('<li data-agreementid="' + agreement.id + '" ' +
                           'data-agreementname="' + agreement.agreementNumber + '" ' +
                           'data-companyid="' + companyId + '">' +
                           '<a href="#agreement-page?agreementid=' + agreement.id + '&companyid=' + companyId + '">' + agreement.type +
                           '<span class="ui-li-count">'+agreement.members.length+'</span></a></li>');
            }

            list.append(markup);

            page.page();

            list.listview('refresh');
        }
    });
}


function populateAgreementPage(url, options, page) {
    // oppgave 1!
}
