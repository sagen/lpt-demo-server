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
            populateAgreements(url, $('#agreement-list-page'));
            break;

        case "agreement":
            populateAgreementPage(url, $('#agreement-page'));
            break;

        case "member-form":
            populateMemberForm(url, $('#register-member-form-page'));
            break;

        case "member":
            populateMemberPage(url, $('#member-page'));
            break;

        case "map":
            showMap(url, data, $("#map"));
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
        success: function(data) {
            list.empty();

            for(var i = 0; i<data.length; i++) {
                var company = data[i];
                list.append('<li><a href="#agreement-list-page?companyid=' + company.id + '">' + company.name + '</a></li>');
            }

            list.listview('refresh');
        }
    });
}

function populateAgreements(url, page) {
    var companyId = getURLParameter("companyid", url);
    var list = $('#agreement-list');
    var markup = "";

    $.ajax({
        url: baseUrl + 'companies/' + companyId + '/agreements',
        dataType: "json",
        success: function(data) {
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


function populateAgreementPage(url, page) {
    // Oppgave 1 og 2
}

function populateMemberPage(url, page) {
    // Oppgave 3
}

function populateMemberForm(url, page) {
    // Oppgave 4
}

function deleteMember(companyId, agreementId, memberId){
    // Oppgave 5
}

function showMap(url, page) {
    // Oppgave 6
}
