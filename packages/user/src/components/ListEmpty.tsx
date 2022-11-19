import styled from 'styled-components';
import thema from '../styles/thema';

const EmtpyHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font: ${thema.font.p2};
  color: ${thema.color.primary.main2_active};

  & img {
    width: 140px;
    margin-bottom: 12px;
  }
`;

function ListEmpty({ text }: { text: string }) {
  return (
    <EmtpyHistory>
      <img
        src={'https://s3.ap-northeast-2.amazonaws.com/static.jigeumgo.com/images/emtpyHistory.png'}
        alt="빈 이미지"
      />
      {text}
    </EmtpyHistory>
  );
}

export default ListEmpty;
