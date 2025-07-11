import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast:true,
    position:'bottom-right',
    timer:3000,
    timerProgressBar:true,
    
    didOpen: (toast) => {
        toast.addEventListener("mouseenter",Swal.stopTimer)

        toast.addEventListener("mouseleave",Swal.resumeTimer)
    }
})