import React from 'react';
import styled from 'styled-components';
import SearchMap from '../components/SearchMap';
import SearchStoreList from '../components/SearchStoreList';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

function SearchPage() {
  return (
    <Container>
      <SearchMap />
      <SearchStoreList />
    </Container>
  );
}

export default SearchPage;
