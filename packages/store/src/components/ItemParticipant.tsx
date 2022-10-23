import styled from 'styled-components';
import thema from '../styles/thema';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteParticipantByStore } from '../apis/timeDealAPI';
import useSocket from '../hooks/useSocket';
import useTimeDealStore from '../stores/timeDealStore';
import PopupConfirm from './PopupConfirm';
import PopupSuccess from './PopupSuccess';
import PopupFail from './PopupFail';
import type { MiniUserDTO } from '../interfaces/timeDeal';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 49%;
  height: 100px;
  padding: 20px;
  border: 1px solid ${thema.color.secondary.main3};
`;
const InfoBox = styled.div`
  color: ${thema.color.primary.main2};
  & p:nth-child(1) {
    font: ${thema.font.h4};
    margin-bottom: 6px;
  }
  & p:nth-child(2) {
    font: ${thema.font.pb2};
  }
`;
const BtnBox = styled.div`
  & button {
    width: 80px;
    height: 65px;
    border: none;
    border-radius: 4px;
    background: ${thema.color.primary.main1};
    font: ${thema.font.pb1};
    color: ${thema.color.primary.main2_active};
  }
`;

function ItemParticipant({
  item,
  timeDealId,
}: {
  item: { id: number; status: string; user: MiniUserDTO };
  timeDealId: number;
}) {
  const { removeParticipant } = useTimeDealStore();
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem('token') as string;
  const { socket } = useSocket(token);

  async function checkOut() {
    MySwal.fire({
      html: (
        <PopupConfirm
          title="체크아웃"
          description={'체크아웃하시겠습니까?'}
          confirm={Swal.clickConfirm}
          close={Swal.close}
        />
      ),
      showConfirmButton: false,
      width: '480px',
      padding: 0,
      customClass: {
        popup: 'fail-popup-border',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteParticipantByStore(item.id);
        if (typeof response === 'boolean') {
          removeParticipant(timeDealId, item.id);
          MySwal.fire({
            html: (
              <PopupSuccess
                title="체크아웃"
                description="체크아웃에 성공했습니다."
                close={Swal.clickCancel}
              />
            ),
            showConfirmButton: false,
            width: '480px',
            padding: 0,
            customClass: {
              popup: 'fail-popup-border',
            },
            timer: 2000,
          });
        } else {
          MySwal.fire({
            html: (
              <PopupFail title="체크아웃" description={response.message} close={Swal.clickCancel} />
            ),
            showConfirmButton: false,
            width: '480px',
            padding: 0,
            customClass: {
              popup: 'fail-popup-border',
            },
            timer: 2000,
          });
        }
      }
    });
  }

  return (
    <Container>
      <InfoBox>
        <p>{item.user.name}</p>
        <p>{item.user.phone}</p>
      </InfoBox>
      <BtnBox>
        <button onClick={checkOut}>체크아웃</button>
      </BtnBox>
    </Container>
  );
}

export default ItemParticipant;
