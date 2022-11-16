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
    return swal({
      title: data?.title,
      icon: data?.type,
      buttons: {
        okay: data?.btnTextConfirm,
        value: "okay",
      },
      text: data?.message,
      dangerMode: true,
    }).then((val) => {
      if (val === "okay") {
        data?.onConfirm?.();
        return;
      }
      data?.onConfirm?.();
    });
  };
  return {
    alertSuccess,
    alertError,
    alertWarning,
    alertWithCallBack,
  };
}
