import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { INSTALL_METAMASK_EXTENSION } from "../constants/error";
import { WALLET_CONNECTED_SUCCESFULLY } from "../constants/success";
import { ETH_REQUEST_ACCOUNTS, ACCOUNTS_CHANGED } from "../constants/ethereum";
import { CONNECTED_WALLET_ACCOUNT } from "../store/types/wallet";

const useConnectWallet = () => {
  const dispatch = useDispatch();

  const web3Handler = useCallback(async () => {
    try {
      const [account] = await window.ethereum.request({
        method: ETH_REQUEST_ACCOUNTS,
      });
      dispatch({ type: CONNECTED_WALLET_ACCOUNT, payload: account });
      window.ethereum.on(ACCOUNTS_CHANGED, function ([account]) {
        dispatch({ type: CONNECTED_WALLET_ACCOUNT, payload: account });
      });
      if (sessionStorage.getItem(WALLET_CONNECTED_SUCCESFULLY)) return;
      sessionStorage.setItem(WALLET_CONNECTED_SUCCESFULLY, true);
      toast.success(WALLET_CONNECTED_SUCCESFULLY, {
        toastId: WALLET_CONNECTED_SUCCESFULLY,
      });
    } catch (error) {
      toast.error(error.message, { toastId: error.message });
    }
  }, [dispatch]);

  useEffect(() => {
    if (typeof window.ethereum === "undefined")
      toast.error(INSTALL_METAMASK_EXTENSION, {
        toastId: INSTALL_METAMASK_EXTENSION,
      });
    else web3Handler();
  }, [web3Handler]);
};

export default useConnectWallet;
