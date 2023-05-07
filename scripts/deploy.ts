
import { ethers, network, run, web3, } from "hardhat";
// Create a Frame connection
const ethProvider = require('eth-provider') // eth-provider is a simple EIP-1193 provider

const SLEEP_MILLISECONDS = 120000
const AMOUNT_TO_LOCK_IN_ETH = "0.00000000001";

async function sleep() {
  console.log('start sleep ' + SLEEP_MILLISECONDS + ' milliSeconds');
  await new Promise(resolve => setTimeout(resolve, SLEEP_MILLISECONDS));
  console.log('end sleep');
}

async function main() {

  // Connect to Frame
  const frame = ethProvider('frame')

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = ethers.utils.parseEther(AMOUNT_TO_LOCK_IN_ETH);

  // Use `getDeployTransaction` instead of `deploy` to return deployment data
  const Lock = await ethers.getContractFactory('Lock')
  const tx = await Lock.getDeployTransaction(unlockTime)

  // Set `tx.from` to current Frame account
  tx.from = (await frame.request({ method: 'eth_requestAccounts' }))[0]
  console.log("Using this account to deploy: " + tx.from)

  // Set `tx.value`
  tx.value = lockedAmount.toHexString()

  if (network.config.chainId === undefined) {
    console.log('Using chainId 1 because chainId is not defined in `hardhat.config`')
  }

  let chainId = network.config.chainId ? network.config.chainId : 1

  // Sign and send the transaction using Frame
  let lockTx = await frame.request({ chainId: '0x' + chainId.toString(16), method: 'eth_sendTransaction', params: [tx] })

  await sleep();

  let receipt = await web3.eth.getTransactionReceipt(lockTx)

  // Verifying the contract
  try {
    await run('verify:verify', {
      contract: 'contracts/Lock.sol:Lock',
      address: receipt.contractAddress,
      constructorArguments: [unlockTime]
    })
  } catch (err) {
    console.error(err)
  }

  console.log(
    `Lock with ${ethers.utils.formatEther(lockedAmount)} ETH and unlock timestamp ${unlockTime} deployed to ${receipt.contractAddress}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
