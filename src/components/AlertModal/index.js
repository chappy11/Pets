import swal from "sweetalert";

export const AlertModal = {
  success: (data) => {
    const { onConfirm, onCancel, message, confirmText, cancelText } = data;
    return swal("Success", message ? message : "Successfully Added", {
      buttons: {
        confirm: {
          text: confirmText ? confirmText : "Save",
          value: "confirm",
        },
      },
      dangerMode: true,
    }).then((val) => {
      if (val) {
        onConfirm?.();
        return;
      }

      onCancel?.();
      return;
    });
  },
};
