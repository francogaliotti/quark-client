import Swal from "sweetalert2";



//How to use this service: 

//Import Alert class "import Alert from 'route'"

//Do not instantiate an object, just use it as a static class

//Example: Alert.confirm({title:'A custom title', message:'A custom message'}, OnConfirmCallbackFunction)

export default class Alert {

  //Button colors follow UI guidelines, icons colors are defaulted from the sweetAlert2 package

  static buttonConfirmColor = '#FE720F'
  static buttonCancelColor = '#181B20'


  static success({ title, message }) {
    Swal.fire({
      title,
      text: message,
      confirmButtonColor: this.buttonConfirmColor,
      icon: 'success',
    })
  }

  static error({ title, message }) {
    Swal.fire({
      title,
      text: message,
      confirmButtonColor: this.buttonConfirmColor,
      icon: 'error',
    })
  }


  static info({ title, message }) {
    Swal.fire({
      title,
      text: message,
      confirmButtonColor: this.buttonConfirmColor,
      icon: 'info',
    })
  }


  static confirm({ title, message }, onConfirm) {

    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.buttonConfirmColor,
      confirmButtonText: 'Aceptar',
      cancelButtonColor: this.buttonCancelColor,
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) { return onConfirm() }
    })
  }

  static confirmWithCancel({ title, message }, onConfirm, onCancel) {

    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.buttonConfirmColor,
      confirmButtonText: 'Aceptar',
      cancelButtonColor: this.buttonCancelColor,
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.isConfirmed) { return onConfirm() }
      else if(result.dismiss) { return onCancel() }
    })
  }


  static confirmRequest({ title, message }, request, onSuccess) {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: this.buttonCancelColor,
      confirmButtonColor: this.buttonConfirmColor,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return request()
          .then(response => {
            return response.data
          })
          .catch(error => {
            console.log(error)
            Swal.showValidationMessage(
              `No se pudo realizar la solicitud: ${error.response.data.message}`
            )
            Swal.getConfirmButton().textContent = 'Reintentar'
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {

        return onSuccess()
      }
    })
  }


}