// 'use strict';
import console from 'console';
import 'mapbox';
import omnivore from 'leaflet-omnivore';

/**
 * add functions to show Bar charts sepecificily
 */

class Map {
	constructor() {
		L.mapbox.accessToken = '' || 'pk.eyJ1IjoibWFwYm94IiwiYSI6IlhHVkZmaW8ifQ.hAMX5hSW-QnTeRCMAy9A8Q';
	}
	init() {
		var map = L.mapbox.map('map', 'mapbox.streets')
			.setView([37.773972, -122.431297], 13);
			//var sfLayer = omnivore.topojson('./phys_contours_wgs.topojson')
		var customLayer = L.geoJson(null, {
			style: this.getStyle,
			onEachFeature: (feature, layer) => layer.on({
				mousemove: this.showPopup.bind(this)
				//mouseout: mouseout,
				//click: zoomToFeature
			}),
		});
		this.map = map;

		var sfLayer = omnivore.topojson('./gis/sf-contour-00001.topojson', null, customLayer)
			.addTo(map);
		this.popup = new L.Popup({ autoPan: false });
		console.dir(sfLayer);
	}

	getStyle(feature) {
		// var color = 'blue', elv = feature.properties.ELEVATION;
		// var opacity = Math.sqrt(elv)/30;
		// if(opacity > 0.7) color = 'red';
		// else if(opacity > 0.4) color = 'green';
		// return {
		// 	opacity: opacity,
		// 	color: color
		// }
	}

	showPopup(e) {
		var layer = e.target, latlng = e.latlng;
		var props = layer.feature.properties;

		this.popup.setLatLng(latlng);
		this.popup.setContent([
			'<span>ELEVATION: '+props.ELEVATION+'</span>',
			'<span>ISOLINE_TY: '+props.ISOLINE_TY+'</span>',
			'<span>OBJECTID: '+props.OBJECTID+'</span>',
			'<span>SHAPE__Len: '+props.SHAPE__Len+'</span>',
		].join('<br>'));
		if (!this.popup._map) this.popup.openOn(this.map);


		window.clearTimeout(this.closeTooltip);
	}


}

var c = new Map();
c.init();
