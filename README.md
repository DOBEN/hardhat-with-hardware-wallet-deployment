# Hardhat Project with Hardware Wallet Deployment

Having experienced people facing problems deploying smart contract protocols to mainnets (using a disposable deployer address) and then having to correctly adjust the protocol to a safe production setting (transferring special permissions/ownerAddresses/adminAddresses to hardware wallets/multiSig addresses while revoking all special roles given to the deployer addresses), this repo aims for setting up a simple hardhat project that can use hardware wallets to deploy the contracts to public blockchains.

The usual deployment with hardhat via scripts requires the exposure of a private key (deployer address) to your machine. This deployer address should be considered compromised (unsafe) and needs to be replaced with hardware wallets/multiSig addresses before going to production. This requires the correct execution of the following steps:

- Permissions granted in the constructors to the deployment wallets need to be transferred or/and revoked correctly [AccessControl](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol)
- Permissions granted in the deployment scripts to the deployment wallets need to be transferred or/and revoked correctly [AccessControl](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol)
- Admin/Owner accounts in the contracts need to be transferred to the hardware wallets/multiSig wallets.

The correct execution of the above steps might be tricky, deployment directly with a hardware wallet address should be considered.

## Prerequisite

Install `Frame` as described in their [READ.me](https://github.com/floating/frame) and connect your hardware wallet device.

## Setup of this repo

- Clone this repo:
```shell
git clone https://github.com/DOBEN/hardhat-with-hardware-wallet-deployment.git
```

- Install dependencies:
```shell
npm install
npm install -g npx
```

Try running some of the following tasks in the root folder:

- To compile the smart contracts:

```shell
npx hardhat compile
```

- To cleanup the compiled contract folders:

```shell
npx hardhat clean
```

- To run the smart contract tests, contract deployment costs, and function execution costs, add your COINMARKETCAP_API_KEY to the `.env` file:

```shell
npx hardhat test
```

- To get a coverage report of the smart contract tests:
```
npx hardhat coverage
```

- To deploy the smart contracts to the sepolia testnet with your hardware wallet, add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env`:

```shell
npx hardhat run ./scripts/deploy.ts --network sepolia
```

- To deploy the smart contracts to the Ehereum mainnet, add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env`:

```shell
npx hardhat run ./scripts/deploy.ts --network mainnet
```

