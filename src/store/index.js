import { configureStore } from "@reduxjs/toolkit";
import { VITE_NODE_ENV } from "../constants/environment";
import { Wallet } from "./reducer/wallet";
import { Transactions } from "./reducer/transactions";

const reducer = {
  Wallet,
  Transactions,
};

const store = configureStore({
  reducer,
  devTools: VITE_NODE_ENV !== "production",
});

export default store;
