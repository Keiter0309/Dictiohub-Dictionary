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

export const ModalShowSwal = (message: string, icon: "success" | "error" | "info") => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    text: message,
    icon: icon,
    confirmButtonText: "OK",
  });
};


export const Confirm = (message: string, icon: "success" | "error" | "info") => {
  const MySwal = withReactContent(Swal);
  return MySwal.fire({
    text: message,
    icon: icon,
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
}