"use client";

import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useNetworkSwitcherModal, useActiveAccount } from "thirdweb/react";
import { useState, useEffect } from "react";
import { FaFaucet } from "react-icons/fa";
import { toast } from "sonner";
import { ethers } from "ethers";

// get and parse the chain id
const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL as string;

// define the chain
export const chain = defineChain({
  id: chainId,
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
  },
  nativeCurrency: {
    decimals: 18,
    name: "tCORE",
    symbol: "tCORE2",
  },
  name: "Core Blockchain Testnet 2",
});

export function ConnectWalletButton() {
  const [isRequestingFaucet, setIsRequestingFaucet] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const activeAccount = useActiveAccount();

  // Create the client with the environment variable directly
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
    secretKey: process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY as string,
  });

  const networkSwitcher = useNetworkSwitcherModal();

  // Check if user can request tokens (24-hour cooldown)
  const canRequestTokens =
    !lastRequestTime || Date.now() - lastRequestTime >= 24 * 60 * 60 * 1000;

  // Load last request time from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && activeAccount?.address) {
      const storedTime = localStorage.getItem(
        `lastFaucetRequest_${activeAccount.address}`
      );
      if (storedTime) {
        setLastRequestTime(parseInt(storedTime));
      }
    }
  }, [activeAccount?.address]);

  // Fetch balance
  const fetchBalance = async () => {
    if (activeAccount?.address) {
      try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const balanceWei = await provider.getBalance(activeAccount.address);
        const balanceEth = Number(ethers.formatEther(balanceWei));
        setBalance(balanceEth.toFixed(4));
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  };

  // Update balance when account changes or after faucet request
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchBalance();
      // Set up an interval to update balance every 10 seconds
      const interval = setInterval(fetchBalance, 10000);
      return () => clearInterval(interval);
    }
  }, [activeAccount?.address]);

  const handleNetworkSwitch = () => {
    if (!activeAccount?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    networkSwitcher.open({
      client,
      theme: "light",
      sections: [
        { label: "Recently used", chains: [chain] },
        { label: "Popular", chains: [chain] },
      ],
    });
  };

  const handleFaucetRequest = async () => {
    if (!activeAccount?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!canRequestTokens) {
      const hoursLeft = Math.ceil(
        (24 * 60 * 60 * 1000 - (Date.now() - lastRequestTime!)) /
          (60 * 60 * 1000)
      );
      toast.error(
        `Please wait ${hoursLeft} hours before requesting tokens again`
      );
      return;
    }

    try {
      setIsRequestingFaucet(true);

      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: activeAccount.address,
        }),
      });

      const data = await response.json();

      // Handle cooldown case
      if (response.status === 429) {
        const timeMatch = data.error.match(/(\d+)h(\d+)m(\d+)s/);
        if (timeMatch) {
          const [_, hours, minutes] = timeMatch;
          const cooldownTime =
            Date.now() -
            (parseInt(hours) * 60 * 60 * 1000 + parseInt(minutes) * 60 * 1000);
          setLastRequestTime(cooldownTime);
          localStorage.setItem(
            `lastFaucetRequest_${activeAccount.address}`,
            cooldownTime.toString()
          );
        } else {
          setLastRequestTime(Date.now());
          localStorage.setItem(
            `lastFaucetRequest_${activeAccount.address}`,
            Date.now().toString()
          );
        }
        throw new Error(data.error);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to request faucet");
      }

      if (data.success && data.txHash) {
        toast.success(`Successfully requested faucet! TX: ${data.txHash}`);
        // Update last request time
        setLastRequestTime(Date.now());
        localStorage.setItem(
          `lastFaucetRequest_${activeAccount.address}`,
          Date.now().toString()
        );

        // Wait for transaction to be mined and update balance
        toast.promise(
          new Promise((resolve) => {
            // Check balance every 5 seconds for up to 2 minutes
            let attempts = 0;
            const interval = setInterval(async () => {
              attempts++;
              await fetchBalance();
              if (attempts >= 24) {
                // 2 minutes (24 * 5 seconds)
                clearInterval(interval);
                resolve(true);
              }
            }, 5000);
          }),
          {
            loading: "Waiting for transaction to be mined...",
            success: "Balance updated successfully!",
            error: "Balance may take a few more minutes to update",
          }
        );
      } else {
        throw new Error(data.error || "Failed to request faucet");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to request faucet"
      );
      console.error("Faucet request error:", error);
    } finally {
      setIsRequestingFaucet(false);
    }
  };

  // Calculate time remaining for cooldown
  const getTimeRemaining = () => {
    if (!lastRequestTime || canRequestTokens) return null;
    const timeLeft = 24 * 60 * 60 * 1000 - (Date.now() - lastRequestTime);
    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours}h ${minutes}m`;
  };

  const timeRemaining = getTimeRemaining();

  return (
    <div className="flex flex-col gap-2">
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
      <div className="flex gap-2">
        <button
          onClick={handleNetworkSwitch}
          disabled={!activeAccount?.address}
          className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Switch Network
        </button>
        <button
          onClick={handleFaucetRequest}
          disabled={
            isRequestingFaucet || !activeAccount?.address || !canRequestTokens
          }
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed group relative"
          title={
            !activeAccount?.address
              ? "Connect wallet first"
              : !canRequestTokens
              ? `Wait ${timeRemaining} before requesting again`
              : "Request test tokens"
          }
        >
          <FaFaucet
            className={`w-5 h-5 ${isRequestingFaucet ? "animate-spin" : ""}`}
          />
          {timeRemaining && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {timeRemaining} remaining
            </div>
          )}
        </button>
      </div>
      {balance !== null && (
        <div className="text-sm text-center mt-1 dark:text-white">
          Balance: {balance} tCORE2
        </div>
      )}
    </div>
  );
}
