// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const path = require("path");
const fs = require("fs").promises;

const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory(
    "Transactions"
  );
  const transactionsContract = await transactionsFactory.deploy();

  const deployed = await transactionsContract.deployed();

  console.log("Get All Transactions: ", await deployed.getAllTransactions());
  console.log("Transactions address: ", transactionsContract.address);

  const TransactionPath =
    "../artifacts/contracts/Transactions.sol/Transactions.json";
  const transactionAbi = await import(TransactionPath, {
    assert: { type: "json" },
  });
  await fs.writeFile(
    path.join(__dirname, TransactionPath),
    JSON.stringify({
      ...transactionAbi.default,
      contractAddress: transactionsContract.address,
    })
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
