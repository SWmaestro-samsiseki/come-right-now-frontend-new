import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PopupConfirm from '../components/PopupConfirm';
import PopupSuccess from '../components/PopupSuccess';
import PopupFail from '../components/PopupFail';
import PopupMap from '../components/PopupMap';
import PopupSelect from '../components/PopupSelect';

const MySwal = withReactContent(Swal);

function popupFail(title: string, message: string, timer?: number) {
  if (timer) {
    MySwal.fire({
      html: <PopupFail title={title} description={message} close={Swal.close} />,
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'popup-border-radius',
      },
      timer: timer,
    });
  } else {
    MySwal.fire({
      html: <PopupFail title={title} description={message} close={Swal.close} />,
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'popup-border-radius',
      },
    });
  }
}

function popupSuccess(title: string, message: string, timer?: number) {
  if (timer) {
    MySwal.fire({
      html: <PopupSuccess title={title} description={message} close={Swal.close} />,
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'popup-border-radius',
      },
      timer: timer,
    });
  } else {
    MySwal.fire({
      html: <PopupSuccess title={title} description={message} close={Swal.close} />,
      showConfirmButton: false,
      width: '280px',
      padding: 0,
      customClass: {
        popup: 'popup-border-radius',
      },
    });
  }
}

function popupConfirm(title: string, message: string) {
  return MySwal.fire({
    html: (
      <PopupConfirm
        title={title}
        description={message}
        confirm={Swal.clickConfirm}
        close={Swal.close}
      />
    ),
    showConfirmButton: false,
    width: '280px',
    padding: 0,
    customClass: {
      popup: 'popup-border-radius',
    },
  });
}

function popupMap(latitude: number, longitude: number) {
  MySwal.fire({
    html: <PopupMap location={{ la: latitude, lo: longitude }} />,
    showConfirmButton: false,
    width: '370px',
    padding: 0,
    customClass: {
      popup: 'popup-border-radius',
    },
  });
}

function popupSelect() {
  MySwal.fire({
    html: (
      <PopupSelect
        title="길 찾기"
        description={'원하는 서비스를 골라주세요'}
        confirm={Swal.clickConfirm}
        close={Swal.close}
      />
    ),
    showConfirmButton: false,
    width: '280px',
    padding: 0,
    customClass: {
      popup: 'popup-border-radius',
    },
  });
}

export { popupFail, popupSuccess, popupConfirm, popupMap, popupSelect };
