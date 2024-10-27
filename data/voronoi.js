import fs from "fs";
import * as turf from "@turf/turf";
import { geoVoronoi } from "d3-geo-voronoi";
import * as maptilerClient from "@maptiler/client";

// Replace this with your actual API key when you're running it.
maptilerClient.config.apiKey = "";

const inFile = "./output.geojson";
const outFile = "./output-voronoi.geojson";

// Read inFile, parse JSON
const inFileData = fs.readFileSync( inFile, "utf8" );
// Read into JSON object
const geoData = JSON.parse( inFileData );

// Create an array to store the coordinate pairs
let coordArray = [];
geoData.features.forEach( (feature) => {
    coordArray.push( turf.getCoords( feature ) );
})
// Convert coordinates from wgs84 -> spherical
const coordArraySpherical = await maptilerClient.coordinates.transform(coordArray, {sourceCrs: 41001, targetCrs: 3857 })

const voronoiObject = geoVoronoi( coordArraySpherical );

const voronoiOut = JSON.stringify( voronoiObject.polygons() );

fs.writeFileSync(outFile, voronoiOut);