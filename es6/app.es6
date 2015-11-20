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
				mousemove: this.mousemove.bind(this),
				mouseout: this.mouseout.bind(this)
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
		var color = '#A0D2DB', elv = feature.properties.ELEVATION;
		var opacity = Math.sqrt(elv)/30;
		if(opacity > 0.8) color = '#D90558';
		else if(opacity > 0.6) color = '#726DA8';
		else if(opacity > 0.4) color = '#C490D1';
		else if(opacity > 0.2) color = '#79ADDC';
		return {
			opacity: .2,
			color: 'blue'
		}
	}

	mousemove(e) {
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
		layer.setStyle({
			opacity: .8,
			color: '#D90558'
			weight: 50
		});

		//window.clearTimeout(this.closeTooltip);
	}

	mouseout(e) {
		e.target.setStyle({
			opacity: .2,
			color: 'blue',
			weight: 5
		});
	}


}

var c = new Map();
c.init();
