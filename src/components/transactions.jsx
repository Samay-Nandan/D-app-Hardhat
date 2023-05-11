import { useDispatch, useSelector } from "react-redux";
import { shortenAddress } from "../utils";
import { useEffect } from "react";
import { getAllTransactions } from "../contracts/transactions";
import { toast } from "react-toastify";
import { SET_LATEST_TRANSACTIONS } from "../store/types/transactions";
import { ETH_REQUEST_ACCOUNTS } from "../constants/ethereum";

const TransactionsCard = ({ sender, receiver, amount, timestamp }) => {
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl text-center"
    >
      <div className="flex flex-col items-center w-full">
        <div className="display-flex justify-start w-full p-2">
          <p className="text-white text-base">From: {shortenAddress(sender)}</p>
          <p className="text-white text-base">To: {shortenAddress(receiver)}</p>
          <p className="text-white text-base">Amount: {amount} ETH</p>
        </div>
        <div className="bg-black p-2 px-5 w-max rounded-3xl shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.Wallet);
  const { transactions } = useSelector((state) => state.Transactions);
  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: SET_LATEST_TRANSACTIONS,
          payload: await getAllTransactions(),
        });
      } catch (error) {
        if (error?.error?.payload?.method === ETH_REQUEST_ACCOUNTS) return;
        const message = error?.info?.error?.data?.message
          ? error.info.error.data.message
          : error.message;
        toast.error(message, { toastId: message });
      }
    })();
  }, []);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col px-4">
        <h3 className="text-white text-3xl text-center my-5">
          {account
            ? "Latest Transactions"
            : "Connect your account to see the latest transactions"}
        </h3>
        <div className="flex flex-wrap justify-center items-center">
          {[...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
