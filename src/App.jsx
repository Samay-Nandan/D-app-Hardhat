import Footer from "./components/footer";
import NavBar from "./components/navbar";
import Transactions from "./components/transactions";
import Welcome from "./components/welcome";
import useConnectWallet from "./hooks/useConnectWallet";

const App = () => {
  useConnectWallet();
  return (
    <div className="gradient-bg-welcome">
      <NavBar />
      <Welcome />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
