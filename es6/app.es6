// 'use strict';
import console from 'console';
import 'mapbox';
import omnivore from 'leaflet-omnivore';

/**
 * add functions to show Bar charts sepecificily
 */

class Map {
	constructor() {
		console.log('L: %o, omnivore: %o', L, omnivore);
	}
	init() {
		console.dir(L);

		L.mapbox.accessToken = '' || 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
		var map = L.mapbox.map('map', 'mapbox.streets')
			.setView([37.773972, -122.431297], 13);
			//var sfLayer = omnivore.topojson('./phys_contours_wgs.topojson')
		var sfLayer = omnivore.topojson('./gis/sf-contour-00001.topojson')
			.addTo(map);
		console.dir(sfLayer);
	}


}

var c = new Map();
c.init();
