import { useEffect } from 'react';
import styled from 'styled-components';
import useAuthStore from '../stores/authStore';

const Container = styled.div`
  width: 370px;
  height: 400px;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

function MapPopup({ location }: { location: { la: number; lo: number } }) {
  const { latitude, longitude } = useAuthStore();

  useEffect(() => {
    const initMap = () => {
      if (latitude && longitude) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(latitude, longitude),
          zoom: 15,
        });
        map.setOptions({
          scaleControl: false,
          logoControl: false,
          mapDataControl: false,
          zoomControl: false,
          mapTypeControl: false,
        });
        new naver.maps.Marker({
          position: new naver.maps.LatLng(latitude, longitude),
          map: map,
          icon: {
            url: require('../images/location_cur.png'),
          },
        });
        new naver.maps.Marker({
          position: new naver.maps.LatLng(location.la, location.lo),
          map: map,
          icon: {
            url: require('../images/location_cur.png'),
          },
        });
      }
    };
    initMap();
  }, [latitude, longitude]);

  return (
    <Container>
      <Map id="map"></Map>
    </Container>
  );
}

export default MapPopup;
