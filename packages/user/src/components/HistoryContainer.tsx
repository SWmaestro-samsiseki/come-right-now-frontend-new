import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthStore from '../stores/authStore';
import { StoreInfo } from '../interfaces/reservation';
import { getReservationHistory } from '../apis/reservationAPI';
import HistoryList from './HistoryList';
import ListEmpty from './ListEmpty';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function HistoryContainer() {
  const { auth } = useAuthStore();
  const [historyList, setHistoryList] = useState<{ day: string; store: StoreInfo[] }[]>([]);

  const fetchHistory = async (id: string) => {
    const response = await getReservationHistory(id);
    if (!('error' in response)) {
      setHistoryList(
        response.map((list) => {
          const day = new Date(list[0].arrivalTime).toLocaleDateString();
          const store = list.map((item) => item.store);
          return {
            day,
            store,
          };
        }),
      );
    }
  };

  useEffect(() => {
    if (auth) {
      fetchHistory(auth.id);
    }
  }, [auth]);

  return (
    <Container>
      {historyList.length !== 0 ? (
        historyList.map((list, index) => <HistoryList key={index} list={list} />)
      ) : (
        <ListEmpty text={'이용내역이 없습니다 :0'} />
      )}
    </Container>
  );
}

export default HistoryContainer;
