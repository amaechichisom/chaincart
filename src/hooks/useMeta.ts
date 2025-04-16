import useWallet from "@/components/Wallet/useWallet";
import { uxionToXion, xionToUxion } from "@/utils/convert";

// xion1t6pp2v9fz5lsdl5ru9ynwcs322qrqe7hjpj66cqsmfjwfkukel8sesxm8y
const contractAddress =
  "xion1t6pp2v9fz5lsdl5ru9ynwcs322qrqe7hjpj66cqsmfjwfkukel8sesxm8y";

export default function useMeta() {
  const {
    signingClient,
    queryClient,
    isConnected,
    openWalletModal,
    isConnecting,
    bech32Address,
    // signArb
  } = useWallet();

  // console.log("⚙️ use meta running");
  
  const getMetaBalance = async (address: string, denom: string = "uxion"):Promise<string | undefined> => {
    try {
      if (!isConnected) {
        openWalletModal();
        throw new Error("Please connect your wallet.");
      }

      if (!queryClient) {
        throw new Error("Query client is not initialized.");
      }

      const bal = await queryClient.getBalance(address, denom);
        const {amount} = bal
      if (bal && amount) {
        return uxionToXion(bal.amount);
      } else {
        throw new Error("Balance not found or invalid balance structure.");
      }
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  const getWalletQuery = async () => {
    try {
      if (!isConnected) {
        openWalletModal();
        throw new Error("Please connect your wallet.");
      }

      if (!queryClient) {
        throw new Error("Query client is not initialized.");
      }

      const response = await queryClient.queryContractSmart(contractAddress, {
        get_count: {},
      });
      console.log(response);
    } catch (error) {
      console.error("Error querying wallet:", error);
    }
  };

  const initEscrow = async (userWalletAddress: string, amount: string, sellerAddress: string) => {
    console.log({ isConnected, isConnecting, bech32Address }, "from init");
    console.log("Client type:", signingClient?.constructor?.name);
  console.log({amount})
    try {
      if (!isConnected) {
        openWalletModal();
        throw new Error("Please connect your wallet.");
      }
  
      if (!signingClient) {
        throw new Error("Signing client is not initialized.");
      }
  
      if (!amount || Number(amount) <= 0) {
        throw new Error("Invalid amount: must be greater than zero.");
      }
  
      if (userWalletAddress !== bech32Address) {
        throw new Error("User wallet address does not match connected wallet address.");
      }
  
      
  
      const formattedAmountx = xionToUxion(amount);
      const formattedAmount = Math.floor(Number(amount) * 1e6).toString();
      
      console.log({bech32Address})
      console.log({garntee:signingClient.granteeAddress})
      // const messageToSign = `I approve initiating an escrow of ${amount} XION to ${sellerAddress}`;
      // const signature = await signArb?.(bech32Address,messageToSign) ;
      // console.log("Off-chain signature:", signature);
      const msg = {
        initiate_escrow: {
          seller: sellerAddress,
          amount: formattedAmountx,
        },
      };
      const funds = [{ denom: "uxion", amount: formattedAmount }];
      const fee = {
        amount: [{ denom: "uxion", amount: "1000" }], 
        // gas: "100000",
      };
      console.log({formattedAmount})
      console.log({formattedAmountx})
  
      console.log("Executing:", { bech32Address, contractAddress, msg, funds, fee });
      console.log("Client details:", {
        type: signingClient.constructor.name,
        rpc: await signingClient.getChainId(),
        granteeAddress: signingClient.granteeAddress,
      });
  
      // const result = await signingClient.execute(bech32Address, contractAddress, msg, fee, undefined, funds);
      // const result = await signingClient.execute(bech32Address, contractAddress, msg,"auto");
      const result = await signingClient.execute(bech32Address, contractAddress, msg,"auto",undefined, funds);
  
      console.log("Escrow initiated:", result);
      return {
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed,
        height: result?.height,
        events: result?.events,
      };
    } catch (error) {
      console.error("Error initiating escrow:", error);
      return null;
    }
  };
  
  const releaseOrCancelFund = async (
    userWalletAddress: string,
    action: "cancel" | "release"
  ) => {
    try {
      if (!isConnected) {
        openWalletModal();
        throw new Error("Please connect your wallet.");
      }

      if (!signingClient) {
        throw new Error("Signing client is not initialized.");
      }

      const msg =
        action.toLowerCase() === "cancel"
          ? { cancel_escrow: {} }
          : { release_funds: {} };

      const result = await signingClient.execute(
        userWalletAddress,
        contractAddress,
        msg,
        "auto"
      );

      console.log("Funds released:", result);
      return {
        transactionHash: result?.transactionHash,
        gasUsed: result?.gasUsed,
        height: result?.height,
        events: result?.events,
      };
    } catch (error) {
      console.error("Error releasing or canceling fund:", error);
    }
  };

  return { getMetaBalance, getWalletQuery, initEscrow, releaseOrCancelFund };
}
