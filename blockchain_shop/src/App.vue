<script setup lang="ts">
import { ethers } from "ethers";
import { onMounted, ref } from "vue";

import TheContract from '../../artifacts/contracts/Counter.sol/Counter.json';
import { Counter } from '../../typechain'

const getProvider = async (): Promise<ethers.providers.Web3Provider> => {
  const window_ = window as any;

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window_.ethereum)

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  return provider
};

const getContract = async (): Promise<ethers.Contract> => {
  const provider = await getProvider();

  const signer = provider.getSigner()

  const contract = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    TheContract.abi,
    provider);

  return contract.connect(signer)
};

const add1 = async () => {
  const contract = await getContract();
  const tx = await contract.countUp();
  console.log(tx);
};

const minues1 = async () => {
  const contract = await getContract();
  const tx = await contract.countDown();
  console.log(tx);
};

const getCount = async () => {
  const contract = await getContract();
  const count = await contract.getCount();
  console.log(count);
};

onMounted(async () => {
  const contract = await getContract();
  // console.log(contract);

  contract.on("CountedTo", (counting: number) => {
    console.log(counting);
  });
});
</script>

<template>
  <div>yingshaxo</div>
  <button @click="add1">Count UP(+1</button>
  <button @click="minues1">Count Down(-1</button>
  <button @click="
  async () => {
    await getCount()
  }">Get Count</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
