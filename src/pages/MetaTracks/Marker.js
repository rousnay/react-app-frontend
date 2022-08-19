import React, { useState, useEffect } from "react";

_renderCityMarker = (city, index) => {
  return (
    <Marker
      key={`marker-${index}`}
      longitude={city.longitude}
      latitude={city.latitude}
    >
      <CityPin size={20} onClick={() => this.setState({ popupInfo: city })} />
    </Marker>
  );
};

<Marker
  longitude={position.longitude}
  latitude={position.latitude}
  onClick={onMarkerClick}
>
  <div style={style}>Click me! ✨</div>
</Marker>;
