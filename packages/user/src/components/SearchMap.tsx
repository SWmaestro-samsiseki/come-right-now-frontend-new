import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useSocket from '../hooks/useSocket';
import useResponseInfoStore from '../stores/responseInfoStore';
import { getReservationInfo } from '../apis/reservationAPI';
import useRequestInfoStore from '../stores/requestInfoStore';
import thema from '../styles/thema';
import PopupConfirm from '../components/PopupConfirm';
import PopupFail from './PopupFail';

const MapContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 50%;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
`;
const Noti = styled.div`
  position: absolute;
  top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 192px;
  height: 36px;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2};
  background: ${thema.color.primary.main1};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.24);
  border-radius: 100px;
`;
const BtnContainer = styled.div`
  position: absolute;
  bottom: 5%;
`;
const StopBtn = styled.button`
  width: 72px;
  height: 28px;
  margin: 5px;
  font: ${thema.font.p3};
  color: ${thema.color.primary.main3};
  border: none;
  border-radius: 4px;
  background: rgba(40, 40, 40, 0.72);
`;
const MoreBtn = styled.button`
  width: 72px;
  height: 28px;
  margin: 5px;
  font: ${thema.font.p3};
  color: ${thema.color.primary.main3};
  border: none;
  border-radius: 4px;
  background: rgba(21, 147, 253, 0.72);
`;

function SearchMap({
  mapSetter,
}: {
  mapSetter: React.Dispatch<React.SetStateAction<naver.maps.Map | null>>;
}) {
  const { socket } = useSocket(localStorage.getItem('token') as string);
  const { addResponse } = useResponseInfoStore();
  const { selectedCategories, people, time, latitude, longitude } = useRequestInfoStore();
  const [isSearch, setIsSearch] = useState(true);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const initMap = (latitude: number, longitude: number) => {
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
    mapSetter(map);
  };

  function moreSearch() {
    MySwal.fire({
      html: (
        <PopupConfirm
          title="탐색"
          description={'더 넓은 범위로 탐색하시겠습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit(
          'user.find-store-further.server',
          {
            categories: selectedCategories.map((ele) => ele.id),
            numberOfPeople: people,
            delayMinutes: time,
            longitude: longitude,
            latitude: latitude,
          },
          (response: boolean) => {
            console.log(response);

            if (response) {
              setIsSearch(true);
              socket.on('server.available-seat.user', (reservationId: number) => {
                console.log('가게의 수락이벤트를 받는데 성공했습니다.');
                getReservationInfo(reservationId).then((res) => {
                  if (!('error' in res)) addResponse(res);
                });
              });
            } else {
              MySwal.fire({
                html: (
                  <PopupFail
                    title="탐색"
                    description={`탐색에 실패했습니다.`}
                    close={Swal.clickCancel}
                  />
                ),
                showConfirmButton: false,
                width: '280px',
                padding: 0,
                customClass: {
                  popup: 'fail-popup-border',
                },
                timer: 2000,
              });
            }
          },
        );
      }
    });
  }

  function cancel() {
    navigate('/request', { replace: true });
  }

  useEffect(() => {
    setTimeout(() => {
      socket.off('server.available-seat.user');
      setIsSearch(false);
    }, 60000);
  });

  useEffect(() => {
    socket.on('server.available-seat.user', (reservationId: number) => {
      console.log('가게의 수락이벤트를 받는데 성공했습니다.');
      getReservationInfo(reservationId).then((res) => {
        if (!('error' in res)) addResponse(res);
      });
    });
    return () => {
      socket.off('server.available-seat.user');
    };
  }, [socket]);

  useEffect(() => {
    const m = document.getElementById('map');
    if (latitude && longitude && m) {
      initMap(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <MapContainer>
      <Map id="map"></Map>
      <Noti>{isSearch ? '가게를 탐색하고 있습니다' : '가게 탐색이 중지되었습니다.'}</Noti>
      <BtnContainer>
        <StopBtn onClick={cancel}>탐색 취소</StopBtn>
        {isSearch ? null : <MoreBtn onClick={moreSearch}>재탐색</MoreBtn>}
      </BtnContainer>
    </MapContainer>
  );
}

export default SearchMap;
