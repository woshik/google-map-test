var markers = [];
var map;
var infowindow;
var selectedmarker;

//Icons for th
var aesopIcon =
	'https://images.squarespace-cdn.com/content/64c413f541fc0e544918798e/38671277-8a7d-4f73-ac4c-c957915e15cb/Green+Marker.png';
var lelaboIcon =
	'https://images.squarespace-cdn.com/content/64c413f541fc0e544918798e/7cb4b5d7-aeec-4bff-9f16-4b83086e79dd/Red+Marker+.png';
var diptIcon =
	'https://images.squarespace-cdn.com/content/64c413f541fc0e544918798e/bf97084d-56aa-49f8-9161-39ac39cccf82/Purple+Marker.png';
var warbyIcon =
	'https://images.squarespace-cdn.com/content/64c413f541fc0e544918798e/a4cf64ce-986a-477a-9cd4-47dfff0e85a4/Orange+Marker.png';
var propertiesIcon =
	'https://images.squarespace-cdn.com/content/64c413f541fc0e544918798e/fd04f87d-68fe-483c-a2ad-4095788b9227/Blue+marker.png';

var availableBreweries = [];
var aesopMarkers = [];
var lelaboMarkers = [];
var diptMarkers = [];
var warbyMarkers = [];
var propMarkers = [];

const googleAppScriptApi =
	'https://script.google.com/macros/s/AKfycby_JgMjqjIFUXShC3FSjVoZUMBj_yfbdxbstL8KSnycOr-lnQtgsEezaJxIxuh16GAELg/exec';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function getDataFromGSheet(sheetName) {
	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			setMarker(JSON.parse(this.responseText));
		}
	};

	// Send a request
	xhttp.open('GET', `${googleAppScriptApi}?sheet_name=${sheetName}`);
	xhttp.send();
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 12,
		center: {
			lat: 40.754788433009736,
			lng: -73.98678043934693
		},
		fullscreenControl: false,
		mapTypeControl: false,
		clickableIcons: false,

		streetViewControl: false
	});

	getDataFromGSheet(urlParams.get('sheet_name'));
}

function setMarker(storeJson) {
	infowindow = new google.maps.InfoWindow();

	markers = storeJson.map((store) => {
		const [lat, lng] = [store['Latitude'], store['Longitude']];
		var icon;
		var marker;

		var addressText = store['Full Address'] + ', USA';
		if (store['Brand'] == 'Aesop') {
			icon = {
				url: aesopIcon, // url
				scaledSize: new google.maps.Size(35, 35) // scaled size
			};
			marker = new google.maps.Marker({
				icon: icon,
				position: {
					lat,
					lng
				},
				map: map,
				address: addressText,
				name: store['Brand'],
				neighhood: store['Neighborhood']
			});
			aesopMarkers.push(marker);
		} else if (store['Brand'] == 'Le Labo') {
			icon = {
				url: lelaboIcon, // url
				scaledSize: new google.maps.Size(35, 35) // scaled size
			};
			marker = new google.maps.Marker({
				icon: icon,
				position: {
					lat,
					lng
				},
				map: map,
				address: addressText,
				name: store['Brand'],
				neighhood: store['Neighborhood']
			});
			lelaboMarkers.push(marker);
		} else if (store['Brand'] == 'Diptyque') {
			icon = {
				url: diptIcon, // url
				scaledSize: new google.maps.Size(35, 35) // scaled size
			};
			marker = new google.maps.Marker({
				icon: icon,
				position: {
					lat,
					lng
				},
				map: map,
				address: addressText,
				name: store['Brand'],
				neighhood: store['Neighborhood']
			});
			diptMarkers.push(marker);
		} else if (store['Brand'] == 'Warby Parker') {
			icon = {
				url: warbyIcon, // url
				scaledSize: new google.maps.Size(35, 35) // scaled size
			};
			marker = new google.maps.Marker({
				icon: icon,
				position: {
					lat,
					lng
				},
				map: map,
				address: addressText,
				name: store['Brand'],
				neighhood: store['Neighborhood']
			});
			warbyMarkers.push(marker);
		} else if (store['Brand'] == 'Properties') {
			icon = {
				url: propertiesIcon, // url
				scaledSize: new google.maps.Size(35, 35) // scaled size
			};
			marker = new google.maps.Marker({
				icon: icon,
				position: {
					lat,
					lng
				},
				map: map,
				address: addressText,
				name: store['Brand'],
				neighhood: store['Neighborhood']
			});
			propMarkers.push(marker);
			marker.addListener('click', () => {
				if (
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
						navigator.userAgent
					)
				) {
					infowindow.setContent(
						"<img class='popupimg' src='" +
							store['Image'] +
							"' alt='' width='400' height='300'>" +
							'<br/><br/><b>' +
							marker['address'] +
							'</b><br/>' +
							'<br/><b>GF Size: </b>' +
							store['GF Size'] +
							'<br>' +
							'<br/><b>LL Size: </b>' +
							store['LL Size'] +
							'<br>' +
							'<br/><b>Total Size: </b>' +
							store['Total Size'] +
							'<br>' +
							'<br/><b>Asking Rent Per Month: </b>' +
							store['Asking Rent Per Month'] +
							'<br>' +
							'<br/><b>Asking Rent Per Year: </b>' +
							store['Asking Rent Per Year'] +
							'<br>' +
							'<br/><b>Notes: </b>' +
							store['Notes']
					);
				} else {
					infowindow.setContent(
						"<img src='" +
							store['Image'] +
							"' alt='' width='400' height='300'>" +
							'<br/><br/><b>' +
							marker['address'] +
							'</b><br/>' +
							'<br/><b>GF Size: </b>' +
							store['GF Size'] +
							'<br>' +
							'<br/><b>LL Size: </b>' +
							store['LL Size'] +
							'<br>' +
							'<br/><b>Total Size: </b>' +
							store['Total Size'] +
							'<br>' +
							'<br/><b>Asking Rent Per Month: </b>' +
							store['Asking Rent Per Month'] +
							'<br>' +
							'<br/><b>Asking Rent Per Year: </b>' +
							store['Asking Rent Per Year'] +
							'<br>' +
							'<br/><b>Notes: </b>' +
							store['Notes']
					);
				}

				infowindow.setPosition({ lat, lng });

				infowindow.open(map, marker);
				map.panTo(marker.getPosition());
			});
		}

		return marker;
	});
}

function showhideMarkers(radio) {
	selectedId = radio.value;
	if (selectedId == 'Aesop') {
		if (document.getElementById('Aesop').checked) {
			for (i = 0; i < aesopMarkers.length; i++) {
				aesopMarkers[i].setVisible(true);
			}
		} else {
			for (i = 0; i < aesopMarkers.length; i++) {
				aesopMarkers[i].setVisible(false);
			}
		}
	} else if (selectedId == 'LeLabo') {
		if (document.getElementById('LeLabo').checked) {
			for (i = 0; i < lelaboMarkers.length; i++) {
				lelaboMarkers[i].setVisible(true);
			}
		} else {
			for (i = 0; i < lelaboMarkers.length; i++) {
				lelaboMarkers[i].setVisible(false);
			}
		}
	} else if (selectedId == 'Diptique') {
		if (document.getElementById('Diptique').checked) {
			for (i = 0; i < diptMarkers.length; i++) {
				diptMarkers[i].setVisible(true);
			}
		} else {
			for (i = 0; i < diptMarkers.length; i++) {
				diptMarkers[i].setVisible(false);
			}
		}
	} else if (selectedId == 'WarbyParker') {
		if (document.getElementById('WarbyParker').checked) {
			for (i = 0; i < warbyMarkers.length; i++) {
				warbyMarkers[i].setVisible(true);
			}
		} else {
			for (i = 0; i < warbyMarkers.length; i++) {
				warbyMarkers[i].setVisible(false);
			}
		}
	} else if (selectedId == 'Opportunities') {
		if (document.getElementById('Opportunities').checked) {
			for (i = 0; i < propMarkers.length; i++) {
				propMarkers[i].setVisible(true);
			}
		} else {
			for (i = 0; i < propMarkers.length; i++) {
				propMarkers[i].setVisible(false);
			}
		}
	}

	/*	for (i = 0; i < markers.length; i++) {
			  oneMarker = markers[i];

			  if(oneMarker.category == selectedId)
			  {
				  oneMarker.setVisible(true);
			  }

			  else
			  {
				  oneMarker.setVisible(false);
			  }
			}  */
}
