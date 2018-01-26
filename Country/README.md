## `india-osm.geojson`

Single feature for the land area of India including disputed territories. The data has been derieved from OSM and postprocessed in qgis:

**Download data**
- Export the India geojson for the land area https://wambachers-osm.website/boundaries/
- Export the geojson of disputed areas claimed by India from overpass http://overpass-turbo.eu/s/voe 

**Post processing**
- Open both files in qgis and use `processing->toolbox->union` to combine them into a single layer
- `Toggle editing` of the layer using the digitizing toolbar. Ctrl+select all the features and `Merge Selected Features` in the advanced digitzing toolbar
- Use `Delete Ring` to remove any holes in the merged feature
