import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export const chilizChainId = 88888;
export const contractAddress = "0x39fa5ab558799b2636fd110e10cfa93111ad6f1b";
export const tokenAddress = "0xBd5bABA6EB9591e12dfBb8C044b177832B1E6DB0";

export const contract = getContract({
    client: client,
    chain: defineChain(chilizChainId),
    address: contractAddress
});

export const tokenContract = getContract({
    client: client,
    chain: defineChain(chilizChainId),
    address: tokenAddress
});


export const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("io.zerion.wallet"),
  // createWallet("io.")
]
