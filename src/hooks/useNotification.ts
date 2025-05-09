import { errorNotification, successNotification } from "@src/redux/reducers/slice/commonAction";
import { useDispatch } from "react-redux";

interface props {
  type: string;
}

export function useNotification(props: props) {
  const dispatch = useDispatch();

  const { type } = props;

  let callback: (message: string) => void;

  if (type === "error") {
    callback = (message: string) => dispatch(errorNotification(message));
  } else if (type === "success") {
    console.log("look inside Success");
    callback = (message: string) => dispatch(successNotification(message));
    console.log("look outside succss");
  } else {
    console.error("please define type of notification");
    callback = undefined;
  }

  return callback;
}
