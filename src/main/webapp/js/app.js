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
    var agreementId = getURLParameter("agreementid", url);
    var companyId = getURLParameter("companyid", url);
    var registerButton = $('#register-member-button');

    $content = $(page).children(":jqmData(role=content)");

    $.ajax({
        url: baseUrl + 'companies/' + companyId + '/agreements/' + agreementId,
        dataType: "json",
        success: function(agreement) {
            var header = '<h4>' + agreement.type + ' - ' + agreement.agreementNumber + '</h4>';

            var details = '<p>Registrert: ' +  getDateAsString(agreement.registered) + '<br />';
            details += 'Status: ' +  agreement.status + '<br />';
            details += 'Laveste opptaksalder: ' +  agreement.minimumAge + ' år</p>';

            $('#agreement-header').html(header);
            $('#agreement-details p').html(details);

            registerButton.attr('href', "#register-member-form-page?companyid=" + companyId + "&agreementid=" + agreementId);

            var list = $('#member-list');
            list.empty();

            $.ajax({
                url: baseUrl + 'companies/' + companyId + '/agreements/' + agreementId + '/members',
                dataType: "json",
                success: function(members){
                    $.each(members, function(i, member){
                        list.append('<li data-swipeurl="companies/' + companyId + '/agreements/' + agreement.id + '/members/' + member.id + '"><a href="#member-page?companyid=' + companyId + '&agreementid=' + agreementId + '&memberid=' + member.id + '">' + member.name + '</a></li>');
                    });

                    page.page();
                    $('#member-list').listview('refresh');
                    attachSwipeDeleteListener('#member-list');
                }
            });
        }
    });
}

function populateMemberPage(url, page) {
    var agreementId = getURLParameter("agreementid", url);
    var companyId = getURLParameter("companyid", url);
    var memberId = getURLParameter("memberid", url);
    var header = $('#member-header');
    var details = $('#member-details');
    var editButton = $("#edit-member-button");

    $.ajax({
        url: baseUrl + 'companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId,
        dataType: "json",
        success : function(member) {
            var detailsText = '<p>Fødselsnummer: ' +  member.fnr + '<br />';
            detailsText += 'Lønn: ' +  member.salary + ' kr <br>';
            detailsText += 'Registeringsdato: ' +  getDateAsString(member.registered) + '</p>';

            header.html(member.name);
            details.html(detailsText);
            editButton.attr('href', "#register-member-form-page?companyid=" + companyId + "&agreementid=" + agreementId + "&memberid=" +member.id);

            page.page();
        }
    });
}

function populateMemberForm(url, page) {
    var agreementId = getURLParameter("agreementid", url);
    var companyId = getURLParameter("companyid", url);
    var submitButton = $('#register-member-submit-button');
    var deleteButton = $('#member-delete-button');
    var memberId = getURLParameter("memberid", url);
    
    var isEdit = memberId === null ? false : true;

    if(isEdit !== true){
        deleteButton.hide();
        $('#register-member-form #ssn').val("");
        $('#register-member-form #name').val("");
        $('#register-member-form #salary').val("");
    }else {
        $.ajax({
            url: baseUrl + 'companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId,
            dataType: "json",
            success : function(member) {
                $('#register-member-form #ssn').val(member.fnr);
                $('#register-member-form #name').val(member.name);
                $('#register-member-form #salary').val(member.salary);
            }
        });

        deleteButton.click(function(){
            deleteMember(companyId, agreementId, memberId);
        });
    }

    submitButton.click(function(){
        submitMemberForm(companyId, agreementId, memberId);
    });

    page.page();
}

function submitMemberForm(companyId, agreementId, memberId) {
    var member = {};
    member.fnr = $('#register-member-form #ssn').val();
    member.name = $('#register-member-form #name').val();
    member.salary = $('#register-member-form #salary').val();

    var url = baseUrl + 'companies/' + companyId + '/agreements/' + agreementId + '/members/';
    if (memberId) {
        url += memberId;
    }

    $.ajax({
        url: url,
        contentType: "application/json",
        type : 'POST',
        data: JSON.stringify(member),
        dataType: "json",
        success: function(createdmember){
            $.mobile.changePage('#member-page?companyid=' + companyId + '&agreementid=' + agreementId + '&memberid=' + createdmember.id);
        },
        error: function(){

        }
    });

}

function deleteMember(companyId, agreementId, memberId){
    $.ajax({
        url: baseUrl+'companies/' + companyId + "/agreements/" + agreementId + "/members/" + memberId,
        type : 'Delete',
        success: function(createdmember){
            $.mobile.changePage('#agreement-page?companyid=' + companyId + '&agreementid=' + agreementId);
        },
        error: function(){

        }
    });
}

function showMap(url, page) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            displayMap(latitude, longitude);

            page.page();
        }, function() {
            alert("getlocation failed");
        });
    }
}
