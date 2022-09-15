import swal from "sweetalert";

export default function usePrompts() {
  const alertSuccess = (message) => {
    return swal("Success", message || "" ? message : "Success", "success");
  };

  const alertError = (message) => {
    return swal(
      "Error",
      message || "" ? message : "Something went wrong",
      "error"
    );
  };

  const alertWarning = (message) => {
    return swal("Warning", message || "" ? message : "Warning", "warning");
  };

  const alertWithCallBack = (data) => {
    return swal(data?.type, data?.message, data?.type, {
      buttons: {
        okay: data?.message ? data?.message : "Okay",
        value: "okay",
      },
      text: "Close",
      dangerMode: true,
    }).then((val) => {
      if (val === "okay") {
        data?.onConfirm?.();
      }
    });
  };
  return {
    alertSuccess,
    alertError,
    alertWarning,
    alertWithCallBack,
  };
}
