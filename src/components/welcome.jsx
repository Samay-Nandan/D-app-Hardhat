import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./loader";
import { formatDate, shortenAddress } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { ALL_FIELDS_ARE_REQUIRED } from "../constants/error";
import { addNewTransaction } from "../contracts/transactions";
import { SET_LATEST_TRANSACTIONS } from "../store/types/transactions";
import { ETH_REQUEST_ACCOUNTS } from "../constants/ethereum";

const AboutUs = [
  "Reliability",
  "Security",
  "Ethereum",
  "Web 3.0",
  "Low Fees",
  "Blockchain",
];

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center text-sm font-light text-white";

const DEFAULT_FORM = {
  addressTo: "",
  amount: "",
};

const Input = ({ placeholder, name, type, handleChange, value }) => (
  <input
    name={name}
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={handleChange}
    className="my-2 w-full p-2 outline-none bg-transparent text-white border-none text-sm"
  />
);

const Welcome = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.Wallet);
  const { transactions } = useSelector((state) => state.Transactions);
  const [form, setForm] = useState(DEFAULT_FORM);
  const isLoading = false;
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { addressTo, amount } = form;
    if (!addressTo || !amount)
      return toast.error(ALL_FIELDS_ARE_REQUIRED, {
        toastId: ALL_FIELDS_ARE_REQUIRED,
      });
    try {
      await addNewTransaction(addressTo, amount);
      const [account] = await window.ethereum.request({
        method: ETH_REQUEST_ACCOUNTS,
      });
      const payload = {
        sender: account,
        receiver: addressTo,
        amount,
        timestamp: formatDate(new Date().getTime() / 1000),
      };
      dispatch({
        type: SET_LATEST_TRANSACTIONS,
        payload: [...transactions, payload],
      });
      setForm(DEFAULT_FORM);
    } catch (error) {
      const message = error?.info?.error?.message
        ? error.info.error.message
        : error.message;
      toast.error(message, { toastId: message });
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-row flex-col items-start justify-between">
        <div className="flex flex-col w-full px-5">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypto.
          </p>

          <div className="grid sm:grid-cols-3 w-full mt-10">
            {AboutUs.map((item) => (
              <div className={commonStyles} key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 px-5">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(account)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={handleChange}
              value={form.addressTo}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
              value={form.amount}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
