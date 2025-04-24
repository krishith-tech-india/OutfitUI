import { useDispatch } from "react-redux";

interface props {
  type: string;
}

export function useNotification(props: props) {
  const dispatch = useDispatch();

  const { type } = props;

  let callback: (message: string) => void;
  if (type === "error") {
    // callback = (message: string) => dispatch(errorNotification(message));
  } else if (type === "success") {
    // callback = (message: string) => dispatch(successNotification(message));
  } else {
    console.error("please define type of notification");
    callback = undefined;
  }

  return callback;
}
