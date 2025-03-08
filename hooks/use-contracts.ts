"use client"

import { useEffect, useState } from "react"
import { GameContracts } from "@/lib/contracts"
import { ethers } from "ethers"
import { useWalletStatus } from "./use-wallet-status"

export function useContracts() {
  const { address, isConnected } = useWalletStatus()
  const [contracts, setContracts] = useState<GameContracts | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initContracts = async () => {
      if (!isConnected || !address) {
        setContracts(null)
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        // Get the provider from window.ethereum
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const gameContracts = new GameContracts(provider)
          setContracts(gameContracts)
          setError(null)
        } else {
          setError("No Ethereum provider found. Please install MetaMask or use a Web3 browser.")
        }
      } catch (err) {
        console.error("Failed to initialize contracts:", err)
        setError("Failed to initialize contracts. Please try again.")
        setContracts(null)
      } finally {
        setIsLoading(false)
      }
    }

    initContracts()
  }, [address, isConnected])

  return { contracts, isLoading, error }
}

