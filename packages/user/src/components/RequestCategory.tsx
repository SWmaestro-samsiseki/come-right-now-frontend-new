import styled from 'styled-components';
import useReservationStore from '../stores/reservationStore';
import CategoryItem from './CategoryItem';

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 344px;
  }
`;

function RequestCategory() {
  const { category } = useReservationStore();

  return (
    <CategoryContainer>
      <div>
        {category.map((ele, index) => (
          <CategoryItem key={index} category={ele} />
        ))}
      </div>
    </CategoryContainer>
  );
}

export default RequestCategory;
