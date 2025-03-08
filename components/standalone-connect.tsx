"use client";

import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// get and parse the chain id
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);

// define the chain
export const chain = defineChain({
  id: chainId,
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_RPC_URL as string],
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: "tCORE",
    symbol: "tCORE2",
  },
  name: "Core Blockchain Testnet 2",
});

export function StandaloneConnect() {
  // Create the client with a hardcoded client ID for testing
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
    secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY as string,
  });

  return (
    <ThirdwebProvider>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            auth: {
              options: [
                "google",
                "email",
                "phone",
                "telegram",
                "discord",
                "wallet",
              ],
            },
          }),
        ]}
        theme="light"
      />
    </ThirdwebProvider>
  );
}
