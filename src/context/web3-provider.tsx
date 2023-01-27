"use client";

import React, { useEffect, useState } from "react";
import { Contract } from "../near/near-interface";
import { Wallet } from "../near/near-wallet";

const CONTRACT_ID: string = "dev-1673256990748-99909988391461";

interface Props {
  children: React.ReactElement;
}

export interface Web3Value {
  wallet: Wallet | null;
  contract: Contract | null;
  isSignedIn?: boolean | null;
}

export const Web3Context = React.createContext<Web3Value>({
  wallet: null,
  contract: null,
  isSignedIn: false,
});

const Web3Provider = ({ children }: Props) => {
  const [web3, setWeb3] = useState<Web3Value>({
    wallet: null,
    contract: null,
    isSignedIn: null,
  });

  useEffect(() => {
    async function loadProviders() {
      console.log("loadProviders just being executed");
      const wallet: Wallet = new Wallet({
        createAccessKeyFor: CONTRACT_ID,
        network: "testnet",
      });

      const contract = new Contract({
        contractId: CONTRACT_ID,
        walletToUse: wallet,
      });
      const isSignedIn = await wallet.startUp();
      setWeb3({ wallet, contract, isSignedIn });
    }
    loadProviders();
  }, []);

  console.log("rendering the Web3 Provider component");

  return (
    <Web3Context.Provider
      value={{
        wallet: web3.wallet,
        contract: web3.contract,
        isSignedIn: web3.isSignedIn,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
