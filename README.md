# Hardhat Project with Hardware Wallet Deployment

The usual deployment with hardhat via scripts requires the exposure of a private key (deployer address) to your machine. This deployer address should be considered compromised (unsafe) and needs to be replaced with hardware wallets/multiSig addresses before going to production. This requires the correct execution of the following steps:

- Roles granted in the constructors to the deployment wallets as part of the [AccessControl smart contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol) need to be transferred or/and revoked correctly
- Roles granted in the deployment script to the deployment wallets as part of the [AccessControl smart contract](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol) need to be transferred or/and revoked correctly
- Admin/Owner addresses in the contracts need to be transferred to hardware wallets/multiSig wallets.

The correct execution of the above steps might be tricky, deployment directly with a hardware wallet address should be considered.

Having experienced people facing problems deploying smart contract protocols to mainnets (using a disposable deployer address) and then having to correctly adjust the protocol to a safe production setting, this repo aims for setting up a simple hardhat project that deploys its contracts using hardware wallets.

## Prerequisite

Install `Frame` as described in their [README.md](https://github.com/floating/frame), enable the `Sepolia` network in the `Frame` wallet, and connect your hardware wallet device.

## Setup of this repo

- Clone this repo:
```shell
git clone https://github.com/DOBEN/hardhat-with-hardware-wallet-deployment.git
```

- Install dependencies:
```shell
npm install
npm install -g npx (if you haven't installed npx on your machine yet)
```

- Copy the `.env.sample` file and rename it to `.env`. Insert your KEYS into the `.env` file.

Try running some of the following tasks in the root folder:

- To compile the smart contracts:

```shell
npx hardhat compile
```

- To cleanup the compiled contract folder:

```shell
npx hardhat clean
```

- To run the smart contract tests, to display the contract deployment costs, and to display the execution costs of the smart contract functions. Add your COINMARKETCAP_API_KEY to the `.env` file:

```shell
npx hardhat test
```

- To get a coverage report of the smart contract tests:
```
npx hardhat coverage
```

- To deploy and verify the smart contracts on the sepolia testnet with your hardware wallet. Add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env` file:

```shell
npx hardhat run ./scripts/deploy.ts --network sepolia
```

- To deploy and verify the smart contracts on the Ehereum mainnet. Add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env` file:

```shell
npx hardhat run ./scripts/deploy.ts --network mainnet
```

