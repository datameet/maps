## `india-osm.geojson`

Single feature for the land area of India including disputed territories. The data has been derieved from OSM and postprocessed in qgis:

### Source

**Download data**
- Export the India geojson for the land area https://wambachers-osm.website/boundaries/
- Export the geojson of disputed areas claimed by India from overpass http://overpass-turbo.eu/s/voe 

**Post processing**
- Open both files in qgis and use `processing->toolbox->union` to combine them into a single layer
- `Toggle editing` of the layer using the digitizing toolbar. Ctrl+select all the features and `Merge Selected Features` in the advanced digitzing toolbar
- Use `Delete Ring` to remove any holes in the merged feature

### License

The data is licensed under the ODbL license as it is sourced from OpenStreetMap Project. The original source for OSM is the [Global Large Scale International Boundary (LSIB) Polygons from the US State Department](https://catalog.data.gov/dataset/global-lsib-polygons-detailed-2017dec29) which is released as CC-0
