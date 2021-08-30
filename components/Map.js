import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from "geolib/es/getCenter";
function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({});

    //Transform the searchResults object into 
    // {latitude: 52.54432, longitude: 45.453465} object

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        zoom: 11,
        latitude: center.latitude, //19.0760,
        longitude: center.longitude, //72.8777
    });

    return (
        <ReactMapGL
        mapStyle='mapbox://styles/hardiksakpal1107/cksyqs04o0xzc17sdccexq4v3'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map((result) => (
                <div key={result.long}>
                    <Marker
                    latitude={result.lat}
                    longitude={result.long}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <img
                        role="img"
                        aria-label="push-pin"
                        onClick={() => setSelectedLocation(result)}
                        src="https://www.seekpng.com/png/full/11-114649_location-map-pin-icon-location-emoji-png.png"
                        alt="marker"
                        className="cursor-pointer h-7 w-5 animate-bounce"
                        />

                    </Marker>

                    {/* The popup that should show if we click on a marker */}

                    {selectedLocation.long == result.long ? (
                        <Popup
                        closeOnClick={true}
                        onClose={() => setSelectedLocation({})}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
