import Swal from 'sweetalert2'

type confirmProps = {
    title: string,
    text?: string,
    icon?: 'success' | 'error' | 'warning' | 'info',
    callback: () => void
}

type toastProps = {
    title: string,
    text:  string,
    icon?: 'success' | 'error' | 'warning' | 'info',
}

export function showConfirm(props: confirmProps){

    Swal.fire({
        title: props.title,
        showCancelButton: true,
        confirmButtonText: "Ok",
        icon: props.icon?? "question",
        text: props.text,
        backdrop: 'swal2-backdrop-show',
        color: '#333333',
        }).then((result) => {

        if (result.isConfirmed) {

            props.callback();
        }
    });
}

export function showToast(props: toastProps){

    const {title, text, icon} = props

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: function (toast) {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
        });


        Toast.fire({
            text: text,
            icon: icon ?? 'info',
            title: title
    });
}

export function showLoading(){

    Swal.fire({
        allowEscapeKey: false,
        allowOutsideClick: false
    })
    Swal.showLoading()
}

export function hideLoading(){
    Swal.close()
}

export function showLoadingError(text: string, postSwalCallback?: () => void){
    if (Swal.isLoading()) Swal.hideLoading();
    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: text
    }).then(() => postSwalCallback? postSwalCallback() : null)
}

export function showLoadingSuccess(text: string, postSwalCallback?: () => void){
    if (Swal.isLoading()) Swal.hideLoading();
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: text
    }).then(() => postSwalCallback? postSwalCallback() : null)
}