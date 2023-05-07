import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-web3";
import "hardhat-gas-reporter";

import { config } from "dotenv";
config({
  path: '.env'
})

const DUMMY_ETHEREUM_KEY = "0x0000000000000000000000000000000000000000000000000000000000000001";
const DUMMY_SEPOLIA_KEY = "0x0000000000000000000000000000000000000000000000000000000000000001";
const INFURA_KEY = process.env.INFURA_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";

const configHardhat: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
    }
  },
  gasReporter: {
    enabled:true,
    currency: 'USDC',
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
      accounts: [DUMMY_SEPOLIA_KEY],
      chainId: 11155111,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
      gasPrice: 30000000000,
      accounts: [DUMMY_ETHEREUM_KEY],
      chainId: 1,
    },
  },
};

export default configHardhat;
