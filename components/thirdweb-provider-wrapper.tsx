"use client";

import type { ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";
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

// Create the client
const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
  secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY as string,
});

export function ThirdwebProviderWrapper({ children }: { children: ReactNode }) {
  return <ThirdwebProvider client={client}>{children}</ThirdwebProvider>;
}
