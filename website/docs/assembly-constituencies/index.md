<style>

#acmaps {
    width: 700px;
    height: 800px;
}
#acmaps .info {
    padding: 6px 8px;
    font: 0.7rem Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
#acmaps .info h6 {
    font-size: 1.2rem;
    margin: 0 0 5px;
    color: #777;
}

</style>

# India - Assembly Constituencies


The Assembly Constituencies of India, Scraped from ECI's [Poling Station Locations](http://psleci.nic.in/) Website.

           
Before using this data, please note the following:
 
 1. The Assembly Constituencies for the states of  Jammu And Kashmir, Jharkhand, Assam, Manipur, Nagaland & Arunachal Pradesh, appear to be pre-delimitation boundaries.
 2. There is some shift in the data.
 3. Some Assemblies Constituency Names seem to be incorrect or Missing.
 4. The Assembly Constituencies in the State of Telengana are still marked as belonging to Andhra Pradesh
 5. The Union Territories of Andaman and Nicobar Islands, Chandigarh,  Dadra and Nagar Haveli, Daman and Diu, 
 and Lakshadweep do not have a state assembly.


## Shapefile Attributes.
Each Constituency will have the following attributes.

- ST_CODE: Code of the states as per the Assembly Constituency.
- ST_NAME: Name of the states as per the Assembly Constituency.
- DT_CODE: District code of each state as per the Assembly Constituency.
- DIST_NAME: Name of Districts as per the Assembly Constituency.
- AC_NO: Numbers of Assembly Constituency.
- AC_NAME: Name of Assembly Constituency.
- PC_NO: Numbers of Parliamentary Constituency.
- PC_NAME:Name of Parliamentary Constituency.
- PC_ID: IDs of the parliamentary Constituency.
- STATUS: Status of each id of the Parliamentary Constituency.

# Quick View

<div id="acmaps" ></div>


## Download

You can download the whole repository as a zip file to get everything you want. Using the button below.
<a class="btn btn-lg btn-success" href="https://github.com/datameet/maps/archive/master.zip"> <i class="fa fa-download fa-2x pull-left"></i> Download Everything</a>

<code>Right click on download link -&gt; Save link as</code>.

## License
The dataset is shared under [Creative Commons Attribution 2.5 India](http://creativecommons.org/licenses/by/2.5/in/) license.

## Attribute

Please use the following lines to attribute the maps if you use in your work. You could link instead of printing 
the URLs in case of web projects.

Assembly Constituencies Maps are provided by [Data{Meet} Community Maps Project](http://projects.datameet.org/maps/). Its made available under the [Creative Commons Attribution 2.5 India](http://creativecommons.org/licenses/by/2.5/in/).

## Issues
If you have any issues with the maps, please report them on the github repository:
<p><a href="https://github.com/datameet/maps/issues/new"><button class="btn btn-primary" type="submit">Report Issue</button></a>
<a href="https://github.com/datameet/maps/issues"><button class="btn btn-primary" type="submit">Active Issues</button></a></p>
## Repository

<p><a class="btn btn-lg btn-success" href="https://github.com/datameet/maps">
  <i class="fa fa-github fa-2x pull-left"></i> GitHub</a>   <a class="btn btn-lg btn-success" href="https://gitlab.com/datameet/maps">
  <i class="fa fa-git fa-2x pull-left"></i> GitLab</a></p>


<script>
$( document ).ready(function() {
    console.log( "ready!" );
    plotAC('acmaps')
});
</script>

