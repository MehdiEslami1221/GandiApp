import {Flip, toast} from "react-toastify";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export function ToastError(str) {
    toast.error(str, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: false,
        rtl: true,
        theme: "dark",
        transition: Flip,
    });
}


export function ToastSuccess(str) {
    toast.success(str, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        rtl: true,
        theme: "dark",
        transition: Flip,
    });
}





