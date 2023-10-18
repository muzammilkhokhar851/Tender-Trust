import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import metamask from "../data/metamask.svg";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import ABI from "../ABI.json";

const Wallet = () => {
  const navigateTo = useNavigate();
  const { currentColor } = useStateContext();

  const isMetaMaskInstalled = typeof window.ethereum !== "undefined";

  const openMetaMaskInstallPage = () => {
    window.open("https://metamask.io/download.html", "_blank");
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const contractAddress = "0x714225eF1F1575D0Ed17B108869413E38656B475";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        // saveState({ web3: web3, contract: contract, account: accounts[0] });
        console.log(web3);
        console.log(contract);
        console.log(accounts[0]);
        navigateTo("/home");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isMetaMaskInstalled ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
          <div className="text-xl font-semibold">
            <span>WELCOME TO TENDER TRUST</span>
          </div>
          <div className="mt-4 text-center">
            <p> Please connect MetaMask wallet to access the app </p>
            <div className="mt-3">
              <button
                onClick={connectWallet}
                style={{ backgroundColor: currentColor }}
                className={` text-white font-bold py-2 px-4 rounded-md `}
              >
                <img
                  className="inline-block h-5 w-5 mr-2"
                  src={metamask}
                  alt="Metamask"
                />
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          MetaMask is not installed. Please{" "}
          <strong
            onClick={openMetaMaskInstallPage}
            style={{ cursor: "pointer" }}
          >
            install MetaMask
          </strong>{" "}
          to continue.
        </Alert>
      )}
    </>
  );
};

export default Wallet;