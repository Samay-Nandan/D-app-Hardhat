require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { GOERLI_ALCHEMY_URL, METAMASK_PRIVATE_ACCOUNTS } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: GOERLI_ALCHEMY_URL,
      accounts: METAMASK_PRIVATE_ACCOUNTS.split(","),
    },
  },
};
