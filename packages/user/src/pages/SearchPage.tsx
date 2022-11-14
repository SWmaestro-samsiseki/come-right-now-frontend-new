import { useState } from 'react';
import styled from 'styled-components';
import SearchMap from '../components/SearchMap';
import SearchStoreList from '../components/SearchStoreList';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function SearchPage() {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  return (
    <Container>
      <SearchMap mapSetter={setMap} />
      <SearchStoreList map={map} />
    </Container>
  );
}

export default SearchPage;
