import { Dispatch } from "redux";
import { FETCH_TRANSACTIONS } from "../constants";

export const fetchTransactions = async (dispatch: Dispatch) => {
  const resp = await fetch(process.env.PUBLIC_URL + "/data.json");
  const data = await resp.json();
  dispatch({ type: FETCH_TRANSACTIONS, payload: data });
};
