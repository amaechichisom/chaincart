import { Xion_Chain } from "@/config/xion";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

// #[cw_serde]
// pub enum ExecuteMsg {
//     InitiateEscrow { seller: Addr, amount: Uint128 }, // Buyer initiates escrow
//     ReleaseFunds {},                                  // Buyer releases funds to seller
//     CancelEscrow {},
// }

// const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractAddress = 'xion1t6pp2v9fz5lsdl5ru9ynwcs322qrqe7hjpj66cqsmfjwfkukel8sesxm8y';

const getClient = async () => {
  if (!window.keplr) throw new Error("Sign in to continue.");

  const offlineSigner = window.keplr.getOfflineSigner(Xion_Chain.chainId);
  return SigningCosmWasmClient.connectWithSigner(Xion_Chain.rpc, offlineSigner, {
    gasPrice: GasPrice.fromString("0.025uxion"),
  });
};

export const initEscrow = async (
  userWalletAddress: string,
  amount: string,
  sellerAddress: string
) => {
  try {
    const client = await getClient();
    
    if (!amount || Number(amount) <= 0) {
      throw new Error("Invalid amount: must be greater than zero.");
    }

    const formattedAmount = Math.floor(Number(amount) * 1e6).toString();

    const msg = {
      initiate_escrow: {
        seller: sellerAddress,
        amount: formattedAmount, 
      },
    };

    const funds = [{ denom: "untrn", amount: formattedAmount }];

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto", undefined, funds);

    console.log("Escrow initiated:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error initiating escrow:", error);
    return null;
  }
};

export const releaseFunds = async (
  userWalletAddress: string,
) => {
  try {
    const client = await getClient();

    const msg = { release_funds: {} };

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto");

    console.log("Funds released:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error releasing funds:", error);
    return null;
  }
};

export const cancelEscrow = async (
  userWalletAddress: string,
) => {
  try {
    const client = await getClient();

    const msg = { cancel_escrow: {} }; 

    const result = await client.execute(userWalletAddress, contractAddress, msg, "auto");

    console.log("Escrow canceled:", result);
    return {
      transactionHash: result.transactionHash,
      gasUsed: result.gasUsed,
      height: result.height,
      events: result.events,
    };
  } catch (error) {
    console.error("Error canceling escrow:", error);
    return null;
  }
};