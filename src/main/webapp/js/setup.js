//var baseUrl = 'http://lptdemo.herokuapp.com/rest/';
var baseUrl = 'rest/';

$(document).bind("mobileinit", function(){

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




	// Intercept calls to changePage() and fill pages with data from server
	$(document).bind("pagebeforechange", function(e, data) {
		var url = getURL(data);
		
		switch (getPage(data)) {
		case "frontpage":
			populateCompanies();
			break;

		case "agreement-list":
			$.mobile.showPageLoadingMsg();
			populateAgreements(url, data.options, $('#agreement-list-page')); // should be data.options here as well? But it isn't working. The back button from agreement-list-page to welcome-page won't work.
			break;

		case "agreement":
			$.mobile.showPageLoadingMsg();
			populateAgreementPage(url, data.options, $('#agreement-page'));
			break; 

		case "member-form":
			$.mobile.showPageLoadingMsg();
			populateMemberForm(url, data.options, $('#register-member-form-page'));
			break;

		case "member-page":
			$.mobile.showPageLoadingMsg();
			populateMemberPage(url, data.options, $('#member-page'));
			break;

		case "map":
			$.mobile.showPageLoadingMsg();
			showMap(url, data, $("#map"));
			break;

		default:
			break;
		}
	});

	function showMap(urlObj, options, page) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;

				displayMap(latitude, longitude);

				page.page();

				options.dataUrl = urlObj.href;

				$.mobile.changePage(page, options);
				$.mobile.hidePageLoadingMsg();
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

	function populateAgreements(urlObj, options, page) {
		var companyId = getURLParameter("companyid", urlObj.href);
		var list = $('#agreement-list');
		var markup = "";

		getData('companies/' + companyId + '/agreements', function(data) {
			list.empty();

			for(var i = 0; i<data.length; i++) {
				var agreement = data[i];

				markup += ('<li data-agreementid="' + agreement.id + '" ' +
						'data-agreementname="' + agreement.agreementNumber + '" ' +
						'data-companyid="' + companyId + '" ' +
						'data-swipeurl="companies/' + companyId + '/agreements/' + agreement.id + '">' +
						'<a href="#agreement-page?agreementid=' + agreement.id + '&companyid=' + companyId + '">' + agreement.type + '</a></li>');
			}

			list.append(markup);

			page.page();

			list.listview('refresh');

			attachSwipeDeleteListener();

			options.dataUrl = urlObj.href;

			$.mobile.hidePageLoadingMsg();
		});
	}


	function populateAgreementPage(urlObj, options, page) {
		var agreementId = getURLParameter("agreementid", urlObj.href);
		var companyId = getURLParameter("companyid", urlObj.href);
		$content = $(page).children(":jqmData(role=content)");
		getData('companies/' + companyId + '/agreements/' + agreementId, function(agreement) {
			var header = '<h4>' + agreement.type + ' - ' + agreement.agreementNumber + '</h4>';
			var details = '<p>Medlemmer: ' +  agreement.members.join() + '</p>'; 
			var list = $('#member-list');
			list.html("");
			list.empty();
			var members = getData('companies/' + companyId + '/agreements/' + agreementId + '/members', function(members){
				$.each(members, function(i, member){
					list.append('<li><a href="#member-page?companyid=' + companyId + '&agreementid=' + agreementId + '&memberid=' + member.id + '">' + member.name + '</a></li>');
				});
				$('#agreement-header').html(header);
				$('#agreement-details p').html(details);
				page.page();
				$('#member-list').listview('refresh');
				options.dataUrl = urlObj.href;
				$.mobile.hidePageLoadingMsg();
			});
		});
	}

	function populateMemberPage(urlObj, options, page) {
		var agreementId = getURLParameter("agreementid", urlObj.href);
		var companyId = getURLParameter("companyid", urlObj.href);
		var memberId = getURLParameter("memberid", urlObj.href);
		var header = $('#member-header');
		var details = $('#member-details');
		var editButton = $("#edit-member-button");

		getData('companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId, function(member) {
			var detailsText = '<p>Lønn: ' +  member.salary + ' kr</p>'; 

			header.html(member.name);
			details.html(detailsText);
			editButton.attr('href', "#register-member-form-page?edit=true&companyid=" + companyId + "&agreementid=" + agreementId + "&memberid=" +member.id);

			page.page();

			options.dataUrl = urlObj.href;

			$.mobile.hidePageLoadingMsg();
		});
	}

	function populateMemberForm(urlObj, options, page) {
		var agreementId = getURLParameter("agreementid", urlObj.href);
		var companyId = getURLParameter("companyid", urlObj.href);
		var isEdit = getURLParameter("edit", urlObj.href);
		var submitButton = $('#register-member-submit-button');
		var deleteButton = $('#member-delete-button');

		if(isEdit !== 'true'){
			deleteButton.hide();
		}else {
			var memberId = getURLParameter("memberid", urlObj.href);

			getData('companies/' + companyId + '/agreements/' + agreementId + '/members/' + memberId, function(member) {
				$('#register-member-form #ssn').val(member.fnr);
				$('#register-member-form #name').val(member.name);
				$('#register-member-form #salary').val(member.salary);
			});

			deleteButton.click(function(){
				deleteMember(companyId, agreementId, memberId);
			})
		}

		submitButton.click(function(){
			submitMemberForm(companyId, agreementId)
		});

		page.page();


		options.dataUrl = urlObj.href;

		$.mobile.hidePageLoadingMsg();

	}

	function submitMemberForm(companyId, agreementId) {
		var member = {};
		member.fnr = $('#register-member-form #ssn').val();
		member.name = $('#register-member-form #name').val();
		member.salary = $('#register-member-form #salary').val();


		$.ajax({
			url: 'rest/companies/' + companyId + "/agreements/" + agreementId + "/members/",
			contentType: "application/json",
			type : 'POST',
			data: JSON.stringify(member),
			dataType: "json",
			success : function(createdmember){
				$.mobile.changePage('#member-page?companyid=' + companyId + '&agreementid' + agreementId + '&memberid' + createdmember.id);
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



	function attachSwipeDeleteListener() {
		$('#agreement-list li').swipeDelete({
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
					type: 'POST',
					success:function(data) {
						return false;
					}
				});
			}
		});
	}

	function getURL(data) {
		var url = $.mobile.path.parseUrl(data.toPage);
		return url;
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

			if (url.hash.search(/^#agreement-page/) !== -1) {
				return "agreement";
			} else if (url.hash.search(/^#agreement-list-page/) !== -1) {
				return "agreement-list";
			} else if (url.hash.search(/^#register-member-form-page/) !== -1) {
				return "member-form";
			}else if (url.hash.search(/^#member-page/) !== -1) {
				return "member-page";
			} else if (url.hash.search(/^#map/) !== -1) {
				return "map";
			}
		} else if ($(data.toPage)[0]==$('#welcome-page')[0]) {
			return "frontpage";
		}
	}

	function getData(url, callback) {
		$.ajax({
			url: baseUrl + url,
			dataType: "json",
			success : callback
		});
	}

	function displayMap(latitude, longitude) {
		var start = new google.maps.LatLng(59.912083, 10.750615);
		var end = new google.maps.LatLng(latitude, longitude);
		var directionsDisplay = new google.maps.DirectionsRenderer();

		directionsDisplay.setMap(getMap());

		addDirections(directionsDisplay, start, end);
	}

	function getMap() {
		var oslo = new google.maps.LatLng(59.904719, 10.753341);
		var myOptions = {
				zoom:16,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: oslo
		};

		return new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	}

	function addDirections(map, start, end) {
		var directionsService = new google.maps.DirectionsService();
		var request = {
				origin: start,
				destination: end,
				travelMode: google.maps.TravelMode.WALKING,
				unitSystem: google.maps.UnitSystem.METRIC
		};

		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				map.setDirections(result);
			}
		});
	}
});
