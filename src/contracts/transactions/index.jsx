import TransactionsContract from "../../abis/Transactions.json";
import { formatDate } from "../../utils";
import { ethers } from "ethers";

export const Transactions = async () => {
  const abi = TransactionsContract.abi;
  const contractAddress = TransactionsContract.contractAddress;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};

export const addNewTransaction = async (addressTo, amount) => {
  const transactionsContract = await Transactions();
  const addedToBlockchain = await transactionsContract.addToBlockchain(
    addressTo,
    amount
  );
  await addedToBlockchain.wait();
};

export const getAllTransactions = async () => {
  const transactionsContract = await Transactions();
  const transactions = await transactionsContract.getAllTransactions();
  if (transactions.length === 0) return [];
  return transactions.map(([sender, receiver, amount, timestamp]) => {
    const payload = {
      sender,
      receiver,
      amount: amount.toString(),
      timestamp: formatDate(timestamp),
    };
    return payload;
  });
};
