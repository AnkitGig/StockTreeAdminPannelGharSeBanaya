// SweetAlert utility functions
export const showSuccessAlert = (title, text) => {
  if (window.Swal) {
    window.Swal.fire({
      icon: "success",
      title: title,
      text: text,
      confirmButtonColor: "#28a745",
    })
  }
}

export const showErrorAlert = (title, text) => {
  if (window.Swal) {
    window.Swal.fire({
      icon: "error",
      title: title,
      text: text,
      confirmButtonColor: "#dc3545",
    })
  }
}

export const showConfirmAlert = (title, text, confirmButtonText = "Yes, delete it!") => {
  if (window.Swal) {
    return window.Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancel",
    })
  }
  return Promise.resolve({ isConfirmed: false })
}

export const showLoadingAlert = (title = "Loading...") => {
  if (window.Swal) {
    window.Swal.fire({
      title: title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        window.Swal.showLoading()
      },
    })
  }
}

export const closeAlert = () => {
  if (window.Swal) {
    window.Swal.close()
  }
}
