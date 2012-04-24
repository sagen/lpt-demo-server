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
			return "member-page";
		} else if (url.search(/#map/) !== -1) {
			return "map";
		}
	} else if ($(data.toPage)[0] == $('#welcome-page')[0]) {
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

function getDateAsString(milliseconds){
	var dateObject = new Date(milliseconds);
	var year = dateObject.getFullYear();
	var month = dateObject.getMonth()+1;
	var date = dateObject.getDate();
	var time = date + '.' + month + '.' + year;
	return time;
}

