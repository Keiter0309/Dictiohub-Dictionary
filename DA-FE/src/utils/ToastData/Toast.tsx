import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const Toast = (message: string, icon: "success" | "error") => {
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

export const Modal = (message: string, icon: "success" | "error" | "info") => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
};
