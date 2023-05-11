import { createSlice } from "@reduxjs/toolkit";
import { SET_LATEST_TRANSACTIONS } from "../types/transactions";

const initialState = {
  transactions: [],
};

const transactions = createSlice({
  name: "Transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(SET_LATEST_TRANSACTIONS, (state, { payload }) => {
      state.transactions = payload;
    });
  },
});

export const Transactions = transactions.reducer;
