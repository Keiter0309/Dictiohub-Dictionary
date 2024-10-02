import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Toast = (message: string, icon: "success" | "error") => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      toast: true,
      text: message,
      icon: icon,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };

export default Toast;