import { Transactions, ReduxAction } from "../types";
import { FETCH_TRANSACTIONS } from "../constants";

export type ReducerState = {
  transactions: Transactions[];
};

export const initialState: ReducerState = {
  transactions: [],
};

export default function reducer(
  state: ReducerState = initialState,
  action: ReduxAction
) {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      debugger;
      return {
        ...state,
        transactions: action.payload.data || [],
      };
    default:
      return state;
  }
}
