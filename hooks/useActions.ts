import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux";
import { bindActionCreators } from "redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
