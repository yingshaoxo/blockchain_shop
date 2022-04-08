import { reactive } from "vue";

import { ethers } from "ethers";
import { onMounted, ref } from "vue";

import CounterJson from '../../artifacts/contracts/Counter.sol/Counter.json';
import AdoptionJson from '../../artifacts/contracts/Adoption.sol/Adoption.json';
import { Adoption, Counter } from '../../typechain'

const getProvider = async (): Promise<ethers.providers.Web3Provider> => {
    const window_ = window as any;

    const provider = new ethers.providers.Web3Provider(window_.ethereum)

    await provider.send("eth_requestAccounts", []);

    return provider
};

export const dict = reactive({
    functions: {
        getCounterContract: async (): Promise<Counter> => {
            const provider = await getProvider();

            const signer = provider.getSigner()

            const contract = new ethers.Contract(
                "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
                CounterJson.abi,
                provider);

            return contract.connect(signer) as Counter
        },
        getAdoptionContract: async (): Promise<Adoption> => {
            const provider = await getProvider();

            const signer = provider.getSigner()

            const contract = new ethers.Contract(
                "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
                AdoptionJson.abi,
                provider);

            return contract.connect(signer) as Adoption
        }
    }
})

export default { getProvider, dict };
export type { Counter, Adoption };