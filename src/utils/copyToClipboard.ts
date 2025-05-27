export const copyToClipboard = async (address?:string) => {
    try {
      await navigator.clipboard.writeText(
        address || "0x0000000000000000000000000000000000000000"
      );
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };