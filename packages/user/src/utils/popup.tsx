import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PopupFail from '../components/PopupFail';

const MySwal = withReactContent(Swal);

function popupFail(title: string, message: string) {
  MySwal.fire({
    html: <PopupFail title={title} description={message} close={Swal.close} />,
    showConfirmButton: false,
    width: '480px',
    padding: 0,
    customClass: {
      popup: 'popup-border-radius',
    },
  });
}

export { popupFail };
