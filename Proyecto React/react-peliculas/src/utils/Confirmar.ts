import Swal from 'sweetalert2';

export default function confirmar(onConfirm: any, titulo: string = 
'¿Desea borrar el registro?', textoBotonConfirmar = "Borrar"){


    Swal.fire({
        title: titulo, 
        icon: 'warning',
        showCancelButton: true, 
        confirmButtonText: "Borrar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar"
    }).then(result => {
        if(result.isConfirmed){
            onConfirm();
        }
    })
}