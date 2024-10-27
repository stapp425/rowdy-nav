import * as turf from "@turf/turf";
import fs from "fs";

// Define in/out files
const inFile = "./sp1.geojson";
const outFile = "./output.geojson";

// Read file
try {
    const inFileData = fs.readFileSync( inFile, "utf8" );
    // Read into JSON object
    const geoData = JSON.parse( inFileData );
    // Filter to just the hallway(s), and the rooms
    const hallwayFeatures = geoData.features.filter((feature) => feature.properties?.is_hallway);
    const roomFeatures = geoData.features.filter((feature) => !feature.properties?.is_hallway);
    // Define roomVertices intersect array
    let roomVerticesIntersect = [];
    roomFeatures.forEach( ( roomFeature ) => {
        // Get coords of vertices
        const roomCoordinates = roomFeature.geometry.coordinates;
        // Iterate & get midpoints, too
        let roomVertices = [];
        let lastRoomVertexCoords = undefined;
        roomCoordinates.forEach( ( roomVertexCoordsList ) => {
            console.log( roomVertexCoordsList )
            roomVertexCoordsList.forEach( ( roomVertexCoords ) => {
                const roomPoint = turf.point( roomVertexCoords );
                roomVertices.push( roomPoint );
                // Get midpoint, push
                if ( lastRoomVertexCoords && lastRoomVertexCoords.some( (val, index) => val != roomVertexCoords[index] ) ) {
                    // Create point from "from"
                    const roomVertexFrom = turf.point( lastRoomVertexCoords );
                    
                    const roomVertexMidpoint = turf.midpoint( roomVertexFrom, roomPoint );
                    
                    roomVertices.push( roomVertexMidpoint );
                }
                else {
                    lastRoomVertexCoords = roomVertexCoords;
                }
            })
        })
        // Get hallway polygon
        const hallwayPolygon = turf.polygon( hallwayFeatures[0].geometry.coordinates );
        // Buffer hallway polygon to help intersect/point-in-polygon
        const hallwayPolygonBuffered = turf.buffer(hallwayPolygon, 0.1, { units: "meters" })
        roomVertices.forEach(( roomVertex ) => {
            if ( turf.booleanPointInPolygon( roomVertex, hallwayPolygonBuffered ) ) {
                roomVerticesIntersect.push( roomVertex );
            }
        })
    });
    // Turn intersectFeatures into a feature collection, stringify
    const intersectFeatureCollection = JSON.stringify( turf.featureCollection( roomVerticesIntersect ) );
    // Output to some file
    fs.writeFileSync(outFile, intersectFeatureCollection);
} catch ( err ) {
    console.error( err );
}