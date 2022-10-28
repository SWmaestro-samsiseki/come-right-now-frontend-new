import { useEffect } from 'react';
import styled from 'styled-components';
import useResponseInfoStore from '../stores/responseInfoStore';
import SearchStoreItem from './SearchStoreItem';

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;
const LoadImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function SearchStoreList() {
  const { responses, resetResponse } = useResponseInfoStore();

  useEffect(() => {
    return () => {
      resetResponse();
    };
  }, []);
  return (
    <ListContainer>
      {responses.map((item, index) => (
        <SearchStoreItem key={index} item={item} />
      ))}
    </ListContainer>
  );
}

export default SearchStoreList;
