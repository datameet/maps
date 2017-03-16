/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Assembly Constituencies India////////////////////////////
var plotAC = function(pane){
	d3.json('../data/geojson/ac.geojson' , function(asscon){
		var map = L.map(pane,{scrollWheelZoom:false}).setView([23.40, 83.00], 5);
		var tile = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: 18,
			minZoom:2,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		var getColor = d3.interpolateHcl("#fff7f3",'#49006a');
		var style = function(feature) {
		    return {
		        fillColor: getColor((feature['properties']['Shape_Area']-minarea)/(maxarea-minarea)),
		        weight: 1,
		        opacity: 1,
		        color: 'white',
		        fillOpacity: 0.7
		    };
		}
		var infoTip = L.control();
		infoTip.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info');
		    this.update();
		    return this._div;
		};
		infoTip.update = function (props) {
		    this._div.innerHTML = '<h6>Assembly Constituencies</h6>' +  (props ?
		        'State :<b>' + props.ST_NAME + '</b><br />PC : <b>' + props.PC_NAME +
		        '</b><br />AC : <b>' + props.AC_NAME + '</b><br />Area : <b>' + props.Shape_Area + ' km<sup>2</sup></b>'
		        : 'Hover over a District');
		};
		infoTip.addTo(map);

		var legend = L.control({position: 'bottomright'});
		var highlightFeature =function(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 4,
		        color: '#fff',
		        dashArray: '',
		        fillOpacity: 0.9
		    });

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
			}
			infoTip.update(layer.feature.properties);
		}

		var resetHighlight = function(e) {
		    geolayer.resetStyle(e.target);
		    infoTip.update();
		}

		var zoomToFeature = function(e) {
		    map.fitBounds(e.target.getBounds());
		}

		var onEachFeature = function(feature, layer) {
		    layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        click: zoomToFeature
		    });
		}

		for(i=0; i<asscon['features'].length ;i++){
			asscon['features'][i]['properties']['Shape_Area'] = parseInt(asscon['features'][i]['properties']['Shape_Area']*1000000)
		}

		var maxarea = (1/7)*d3.max(d3.values(asscon['features']), function(d){return (d['properties']['Shape_Area'])})
		var minarea = d3.min(d3.values(asscon['features']), function(d){return (d['properties']['Shape_Area'])})
		var geolayer = L.geoJson(asscon,{style: style, onEachFeature:onEachFeature}).addTo(map);
	})
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////PARLIAMENTARY CONSTITUENCIES' DATA PLOT WITH ELECTION RESULTS 2014////////////////
var plotPC = function(pane){
	d3.json('../data/geojson/pc_14.geojson' , function(parcon){
		d3.csv('../data/csv/pc_14.csv' , function(info){
			var map = L.map(pane,{scrollWheelZoom:false}).setView([23.40, 83.00], 5);
			L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			var marker
			var getColor = function(d) {
			    return d == 'GEN' ? '#fdc086' :
			           d == '(SC)'  ? '#beaed4' :
			           d == '(ST)'  ? '#7fc97f' :
			            				'#fff' ;
			}
			var style = function(feature) {
			    return {
			        fillColor: getColor(feature.properties.category),
			        weight: 2,
			        opacity: 1,
			        color: 'white',
			        dashArray: '3',
			        fillOpacity: 0.7
			    };
			}
			var infoTip = L.control();
			infoTip.onAdd = function (map) {
			    this._div = L.DomUtil.create('div', 'info');
			    this.update();
			    return this._div;
			};
			infoTip.update = function (props) {
			    this._div.innerHTML = '<h6>Parliamentary Constituencies (2014)</h6>' +  (props ?
			        '<b>' +props.pcname +'</b> ( ' + props.state + ' ) <br />Winning Candidate : <b>'
			        + props.winner +'</b> ( ' + props.party + ' ) <br />Votes : <b>' + props.votes + '%</b>'
			        : 'Hover over a Constituency');
			};

			infoTip.addTo(map);

			var legend = L.control({position: 'bottomright'});
			legend.onAdd = function (map) {
			    var div = L.DomUtil.create('div', 'info legend')
		        div.innerHTML +=
		            '<i style="background:' + getColor('GEN') + '"></i> ' + ' GEN<br>'+
		            '<i style="background:' + getColor('(SC)') + '"></i> ' + ' SC<br>'+
		            '<i style="background:' + getColor('(ST)') + '"></i> ' + ' ST'
			    return div;
			};

			legend.addTo(map);

			var highlightFeature =function(e) {
			    var layer = e.target;

			    layer.setStyle({
			        weight: 4,
			        color: '#fff',
			        dashArray: '',
			        fillOpacity: 0.9
			    });

			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
				}
				infoTip.update(layer.feature.properties);
			}

			var resetHighlight = function(e) {
			    geolayer.resetStyle(e.target);
			    infoTip.update();
			}

			var zoomToFeature = function(e) {
			    map.fitBounds(e.target.getBounds());
			}

			var onEachFeature = function(feature, layer) {
			    layer.on({
			        mouseover: highlightFeature,
			        mouseout: resetHighlight,
			        click: zoomToFeature
			    });
			}

			var getstate = function(pcnm){
				if(pcnm == null) return 'Not Available'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? entry[0]['State'] : 'Not Available'
			}
			var getpcname = function(pcnm){
				if(pcnm == null) return 'Not Available'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? entry[0]['PC Name'] : 'Not Available'
			}
			var getwinner = function(pcnm){
				if(pcnm == null) return 'Not Available'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? entry[0]['Winner Candidates'] : 'Not Available'
			}
			var getparty = function(pcnm){
				if(pcnm == null) return 'Not Available'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? entry[0]['winner Party'] : 'Not Available'
			}
			var getvotes = function(pcnm){
				if(pcnm == null) return '-1'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? Math.round((parseInt(entry[0]['Votesw'])*10000) / (parseInt(entry[0]['Votesw']) + parseInt(entry[0]['Votesr'])))/100 : -1
			}
			var getcategory = function(pcnm){
				if(pcnm == null) return 'Not Available'
				entry = info.filter(function(d){
					return d['PC Name'].trim() == pcnm.trim()
				});
				return entry.length >0 ? entry[0]['PC Type'] : 'Not Available'
			}

			for(i=0; i<parcon['features'].length ;i++){
				parcon['features'][i]['properties']['state'] = getstate(parcon['features'][i]['properties']['PC_NAME'])
				parcon['features'][i]['properties']['pcname'] = getpcname(parcon['features'][i]['properties']['PC_NAME'])
				parcon['features'][i]['properties']['winner'] = getwinner(parcon['features'][i]['properties']['PC_NAME'])
				parcon['features'][i]['properties']['party'] = getparty(parcon['features'][i]['properties']['PC_NAME'])
				parcon['features'][i]['properties']['votes'] = getvotes(parcon['features'][i]['properties']['PC_NAME'])
				parcon['features'][i]['properties']['category'] = getcategory(parcon['features'][i]['properties']['PC_NAME'])
			}
			var geolayer = L.geoJson(parcon, {style: style, onEachFeature: onEachFeature}).addTo(map);


		})
	})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////DISCTRICT DATA PLOT WITH CENSUS 2001 AND 2011////////////////////////////
var plotDistricts = function(pane){
	d3.json('../data/geojson/dists11.geojson' , function(districts){
		d3.csv('../data/csv/dists.csv' , function(info){
			var map = L.map(pane,{scrollWheelZoom:false}).setView([23.40, 83.00], 6);
			var tile = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				maxZoom: 18,
				minZoom:2,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			var prop =  'litrate'
			var getColor = d3.interpolateHsl("#fff7ec",'#7f0000');
			var getTitle = function(){
				return 	prop=='litrate'? 'Literacy Rate' :
						prop=='sexratio'? 'Sex Ratio':
						prop=='area'? 'Area':
						prop=='popdensity'? 'Population Density':
						prop=='workpoprate'? 'Working Population Rate':
						'Not Defined'
			}
			var propColor = function(fepro){
				return  prop=='litrate'?getColor((fepro[prop]-minlitrate)/(maxlitrate-minlitrate)) :
						prop=='sexratio'?getColor((fepro[prop]-minsexratio)/(maxsexratio-minsexratio)) :
						prop=='area'?getColor((fepro[prop]-minarea)/(maxarea-minarea)) :
						prop=='popdensity'?getColor((fepro[prop]-minpopdensity)/(maxpopdensity-minpopdensity)) :
						prop=='workpoprate'?getColor((fepro[prop]-minworkpoprate)/(maxworkpoprate-minworkpoprate)):
						getColor(0.5)
			}
			var style = function(feature) {
			    return {
			        fillColor: propColor(feature['properties']),//mnltr)/(mxltr-mnltr)),
			        weight: 2,
			        opacity: 1,
			        color: 'white',
			        dashArray: '3',
			        fillOpacity: 0.7
			    };
			}
			var infoTip = L.control();
			infoTip.onAdd = function (map) {
			    this._div = L.DomUtil.create('div', 'info');
			    this.update();
			    return this._div;
			};
			infoTip.update = function (props) {
			    this._div.innerHTML = '<h6>India '+getTitle()+'</h6>' +  (props ?
			        '<b>' + props.ST_NM + '</b><br />District : <b>' + props.DISTRICT + '</b><br />'+getTitle()+' : <b>' + props.litrate + '</b>'
			        : 'Hover over a District');
			};
			infoTip.addTo(map);

			var legend = L.control({position: 'bottomright'});
			legend.onAdd = function (map) {
			    var div = L.DomUtil.create('div', 'info legend-control')
			    div.innerHTML +=
			    		'<h6>Select Metric</h6>' +
			            '<input type="button" style="clear: both" class="litrate" value="Literacy rate"></input><br>'+
			            '<input type="button" style="clear: both" class="sexratio" value="Sex Ratio"></input><br>'+
			            '<input type="button" style="clear: both" class="area" value="Area"></input><br>'+
			            '<input type="button" style="clear: both" class="popdensity" value="Population Density"></input><br>'+
			            '<input type="button" style="clear: both" class="workpoprate" value="Working Population"></input>'

			    return div;
			};
			legend.addTo(map)

			var highlightFeature =function(e) {
			    var layer = e.target;

			    layer.setStyle({
			        weight: 4,
			        color: '#fff',
			        dashArray: '',
			        fillOpacity: 0.9
			    });

			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
				}
				infoTip.update(layer.feature.properties);
			}

			var resetHighlight = function(e) {
			    geolayer.resetStyle(e.target);
			    infoTip.update();
			}

			var zoomToFeature = function(e) {
			    map.fitBounds(e.target.getBounds());
			}

			var onEachFeature = function(feature, layer) {
			    layer.on({
			        mouseover: highlightFeature,
			        mouseout: resetHighlight,
			        click: zoomToFeature
			    });
			}

			var getlitrate = function(distnm){
				entry = info.filter(function(d){
					return d['dist'].trim().toLowerCase() == distnm.trim().toLowerCase()
				});
				return entry.length >0 ? parseInt(entry[0]['litrate']) : 0
			}
			var getsexratio = function(distnm){
				entry = info.filter(function(d){
					return d['dist'].trim().toLowerCase() == distnm.trim().toLowerCase()
				});
				return entry.length >0 ? parseInt(entry[0]['sexratio']) : 0
			}
			var getarea = function(distnm){
				entry = info.filter(function(d){
					return d['dist'].trim().toLowerCase() == distnm.trim().toLowerCase()
				});
				return entry.length >0 ? parseInt(entry[0]['area']) : 0
			}
			var getpopdensity = function(distnm){
				entry = info.filter(function(d){
					return d['dist'].trim().toLowerCase() == distnm.trim().toLowerCase()
				});
				return entry.length >0 ? parseInt(entry[0]['popdensity']) : 0
			}
			var getworkpoprate = function(distnm){
				entry = info.filter(function(d){
					return d['dist'].trim().toLowerCase() == distnm.trim().toLowerCase()
				});
				return entry.length >0 ? parseInt(entry[0]['workpoprate']) : 0
			}


			for(i=0; i<districts['features'].length ;i++){
				districts['features'][i]['properties']['litrate'] = getlitrate(districts['features'][i]['properties']['DISTRICT'])
				districts['features'][i]['properties']['sexratio'] = getsexratio(districts['features'][i]['properties']['DISTRICT'])
				districts['features'][i]['properties']['area'] = getarea(districts['features'][i]['properties']['DISTRICT'])
				districts['features'][i]['properties']['popdensity'] = getpopdensity(districts['features'][i]['properties']['DISTRICT'])
				districts['features'][i]['properties']['workpoprate'] = getworkpoprate(districts['features'][i]['properties']['DISTRICT'])
			}

			var maxlitrate = d3.max(d3.values(districts['features']), function(d){return (d['properties']['litrate'])})
			var minlitrate = d3.min(d3.values(districts['features']), function(d){return (d['properties']['litrate']==0)?maxlitrate:d['properties']['litrate']})
			var maxsexratio = d3.max(d3.values(districts['features']), function(d){return (d['properties']['sexratio'])})
			var minsexratio = d3.min(d3.values(districts['features']), function(d){return (d['properties']['sexratio']==0)?maxsexratio:d['properties']['sexratio']})
			var maxarea = d3.max(d3.values(districts['features']), function(d){return (d['properties']['area'])})
			var minarea = d3.min(d3.values(districts['features']), function(d){return (d['properties']['area']==0)?maxarea:d['properties']['area']})
			var maxpopdensity = d3.max(d3.values(districts['features']), function(d){return (d['properties']['popdensity'])})
			var minpopdensity = d3.min(d3.values(districts['features']), function(d){return (d['properties']['popdensity']==0)?maxpopdensity:d['properties']['popdensity']})
			var maxworkpoprate = d3.max(d3.values(districts['features']), function(d){return (d['properties']['workpoprate'])})
			var minworkpoprate = d3.min(d3.values(districts['features']), function(d){return (d['properties']['workpoprate']==0)?maxworkpoprate:d['properties']['workpoprate']})
			var geolayer = L.geoJson(districts,{style: style, onEachFeature:onEachFeature}).addTo(map);

			d3.select('.legend-control').selectAll('input').on('click', function(){
				prop = d3.select(this).attr('class')
				geolayer.setStyle(style)
				infoTip.update()
			})

		})
	})
}

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////STATES DATA PLOT WITH CENSUS 2001 AND 2011////////////////////////////
var plotStates = function(pane){
	d3.json('../data/geojson/states.geojson' , function(states){
		d3.csv('../data/csv/statesCensus.csv' , function(info){
			var map = L.map(pane).setView([23.40, 83.00], 4);
			L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			var marker
			var getColor = function(d) {
			    return d > 1000 ? '#bd0026' :
			           d > 950  ? '#f03b20' :
			           d > 900  ? '#fd8d3c' :
			           d > 800  ? '#fecc5c' :
			            		'#ffffb2' ;
			}

			var style = function(feature) {
			    return {
			        fillColor: getColor(feature.properties.sr11),
			        weight: 2,
			        opacity: 1,
			        color: 'white',
			        dashArray: '3',
			        fillOpacity: 0.7
			    };
			}

			var infoTip = L.control();
			infoTip.onAdd = function (map) {
			    this._div = L.DomUtil.create('div', 'info');
			    this.update();
			    return this._div;
			};
			infoTip.update = function (props) {
			    this._div.innerHTML = '<h6>India Sex Ratio</h6>' +  (props ?
			        '<b>' + props.ST_NM + '</b><br />Census 2001 : <b>' + props.sr01 + '</b><br />Census 2011 : <b>' + props.sr11
			        : 'Hover over a state');
			};
			infoTip.addTo(map);

			var legend = L.control({position: 'bottomright'});
			legend.onAdd = function (map) {
			    var div = L.DomUtil.create('div', 'info legend'),
			        grades = [0, 800, 900, 950, 1000],
			        labels = [];
			    for (var i = 0; i < grades.length; i++) {
			        div.innerHTML +=
			            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
			            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
			    }
			    return div;
			};

			legend.addTo(map);

			var highlightFeature =function(e) {
			    var layer = e.target;

			    layer.setStyle({
			        weight: 3,
			        dashArray: '',
			        fillOpacity: 0.8
			    });

			    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			        layer.bringToFront();
				}
				infoTip.update(layer.feature.properties);
			}

			var resetHighlight = function(e) {
			    geolayer.resetStyle(e.target);
			    infoTip.update();
			}

			var zoomToFeature = function(e) {
			    map.fitBounds(e.target.getBounds());
			}

			var onEachFeature = function(feature, layer) {
			    layer.on({
			        mouseover: highlightFeature,
			        mouseout: resetHighlight,
			        click: zoomToFeature
			    });
			}

			var getsr01 = function(statenm){
				entry = info.filter(function(d){
					return d['state'].trim() == statenm.trim()
				});
				return entry[0]['2001']
			}

			var getsr11 = function(statenm){
				entry = info.filter(function(d){
					return d['state'].trim() == statenm.trim()
				});
				return entry[0]['2011']
			}

			for(i=0; i<states['features'].length ;i++){
				states['features'][i]['properties']['sr01'] = getsr01(states['features'][i]['properties']['ST_NM'])
				states['features'][i]['properties']['sr11'] = getsr11(states['features'][i]['properties']['ST_NM'])
			}
			var geolayer = L.geoJson(states, {style: style, onEachFeature: onEachFeature}).addTo(map);


		})
	})
}

