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

	case "member-form":
		populateMemberForm(url, data.options, $('#register-member-form-page'));
		break;

	case "member":
		populateMemberPage(url, data.options, $('#member-page'));
		break;

	case "map":
		showMap(url, data, $("#map"));
		break;

	default:
		break;
	}
	
});

function showMap(url, options, page) {
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

function populateCompanies() {
	var list = $('#company-list');

	getData('companies', function(data) {
		list.empty();

		for(var i = 0; i<data.length; i++) {
			var company = data[i];
			list.append('<li data-companyid="' + company.id + '" data-companyname="' + company.name + '" data-swipeurl="companies/' + company.id + '">' +
					'<a href="#agreement-list-page?companyid=' + company.id + '">' + company.name + '</a></li>');
		}

		list.listview('refresh');
	});
}

function populateAgreements(url, options, page) {
	var companyId = getURLParameter("companyid", url);
	var list = $('#agreement-list');
	var markup = "";

	getData('companies/' + companyId + '/agreements', function(data) {
		list.empty();

		for(var i = 0; i<data.length; i++) {
			var agreement = data[i];

			markup += ('<li data-agreementid="' + agreement.id + '" ' +
					'data-agreementname="' + agreement.agreementNumber + '" ' +
					'data-companyid="' + companyId + '">' +
					'<a href="#agreement-page?agreementid=' + agreement.id + '&companyid=' + companyId + '">' + agreement.type + '</a></li>');
		}

		list.append(markup);

		page.page();

		list.listview('refresh');
	});
}


function populateAgreementPage(url, options, page) {
	var agreementId = getURLParameter("agreementid", url);
	var companyId = getURLParameter("companyid", url);
	var registerButton = $('#register-member-button');
	$content = $(page).children(":jqmData(role=content)");
	getData('companies/' + companyId + '/agreements/' + agreementId, function(agreement) {
		var header = '<h4>' + agreement.type + ' - ' + agreement.agreementNumber + '</h4>';
		var details = '<p>Registrert: ' +  getDateAsString(agreement.registered) + '<br />'; 
		details += 'Status: ' +  agreement.status + '<br />'; 
		details += 'Minimumsalder: ' +  agreement.minimumAge + ' år</p>'; 
		$('#agreement-header').html(header);
		$('#agreement-details p').html(details);
		registerButton.attr('href', "#register-member-form-page?companyid=" + companyId + "&agreementid=" + agreementId);
		
		var list = $('#member-list');
		list.empty();
		var members = getData('companies/' + companyId + '/agreements/' + agreementId + '/members', function(members){
			$.each(members, function(i, member){
				list.append('<li data-swipeurl="companies/' + companyId + '/agreements/' + agreement.id + '/members/' + member.id + '"><a href="#member-page?companyid=' + companyId + '&agreementid=' + agreementId + '&memberid=' + member.id + '">' + member.name + '</a></li>');
			});
			
			page.page();
			$('#member-list').listview('refresh');
			attachSwipeDeleteListener('#member-list');
		});
	});
}

function populateMemberPage(url, options, page) {
	var agreementId = getURLParameter("agreementid", url);
	var companyId = getURLParameter("companyid", url);
	var memberId = getURLParameter("memberid", url);
	var header = $('#member-header');
	var details = $('#member-details');
	var editButton = $("#edit-member-button");

	getData('companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId, function(member) {
		var detailsText = '<p>Lønn: ' +  member.salary + ' kr</p>'; 

		header.html(member.name);
		details.html(detailsText);
		editButton.attr('href', "#register-member-form-page?edit=true&companyid=" + companyId + "&agreementid=" + agreementId + "&memberid=" +member.id);

		page.page();
	});
}

function populateMemberForm(url, options, page) {
	var agreementId = getURLParameter("agreementid", url);
	var companyId = getURLParameter("companyid", url);
	var isEdit = getURLParameter("edit", url);
	var submitButton = $('#register-member-submit-button');
	var deleteButton = $('#member-delete-button');
	var memberId = getURLParameter("memberid", url);

	if(isEdit !== 'true'){
		deleteButton.hide();
		$('#register-member-form #ssn').val("");
		$('#register-member-form #name').val("");
		$('#register-member-form #salary').val("");
	}else {
		getData('companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId, function(member) {
			$('#register-member-form #ssn').val(member.fnr);
			$('#register-member-form #name').val(member.name);
			$('#register-member-form #salary').val(member.salary);
		});

		deleteButton.click(function(){
			deleteMember(companyId, agreementId, memberId);
		});
	}

	submitButton.click(function(){
		submitMemberForm(companyId, agreementId, memberId);
	});

	page.page();

	options.dataUrl = url;
}

function submitMemberForm(companyId, agreementId, memberId) {
	var member = {};
	member.fnr = $('#register-member-form #ssn').val();
	member.name = $('#register-member-form #name').val();
	member.salary = $('#register-member-form #salary').val();

	var url = 'rest/companies/' + companyId + '/agreements/' + agreementId + '/members/';
	if (memberId) {
		url += memberId;
	}

	$.ajax({
		url: url,
		contentType: "application/json",
		type : 'POST',
		data: JSON.stringify(member),
		dataType: "json",
		success : function(createdmember){
			$.mobile.changePage('#member-page?companyid=' + companyId + '&agreementid=' + agreementId + '&memberid=' + createdmember.id);
		},
		error: function(){

		}
	});

}

function deleteMember(companyId, agreementId, memberId){
	$.ajax({
		url: 'rest/companies/' + companyId + "/agreements/" + agreementId + "/members/" + memberId,
		type : 'Delete',
		success : function(createdmember){
			$.mobile.changePage('#agreement-page?companyid=' + companyId + '&agreementid=' + agreementId);
		},
		error: function(){

		}
	});
}
