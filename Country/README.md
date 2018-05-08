# India - Admin 0 with Disputed Territories

Single feature shapefile for the land area of India including disputed territories in accorance with the [Official boundary of India as per the Survey of India](http://www.surveyofindia.gov.in/pages/display/190-public-awareness).

## `india-composite.geojson`

The data is compiled from multiple global public domain sources.

### Source

- India, Aksai Chin and disputed territories with China: [LSIB - U.S. Department of State - Humanitarian Information Unit](https://data.humdata.org/dataset/global-lsib-polygons-detailed)
- Pakistan occupied Kashmir: [Pakistan admin boundaries dataset - Alhasan Systems](https://data.humdata.org/dataset/pakistan-union-council-boundaries-along-with-other-admin-boundaries-dataset)
- Shaksgam Valley - [Admin 0 Breakaway, Disputed Areas - Natural Earth Vectors](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-breakaway-disputed-areas/)


### License

CC-0

## `india-soi.geojson`

Dissolved shapefiles from the official Indian shapefile data available.

### Source

- [Census of India Districts 2011 / Survey of India - Datameet](https://github.com/datameet/maps/tree/master/Survey-of-India-Index-Maps/Boundaries)


### License

CC-by-sa 2.5 / ODbL

## `india-osm.geojson`

The data has been derieved from OSM and postprocessed in qgis:

### Source

**Download data**
- Export the India geojson for the land area https://wambachers-osm.website/boundaries/
- Export the geojson of disputed areas claimed by India from overpass http://overpass-turbo.eu/s/voe 

**Post processing**
- Open both files in qgis and use `processing->toolbox->union` to combine them into a single layer
- `Toggle editing` of the layer using the digitizing toolbar. Ctrl+select all the features and `Merge Selected Features` in the advanced digitzing toolbar
- Use `Delete Ring` to remove any holes in the merged feature

### License

ODbL
