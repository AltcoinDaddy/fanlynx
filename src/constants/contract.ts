import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

export const chilizChainId = 88888;
export const contractAddress = "0xB6004245A8a2B6D8F4b68937cDc069C6a8Fc2f40";
export const tokenAddress = "0x39fa5ab558799b2636fd110e10cfa93111ad6f1b";

export const contract = getContract({
  client: client,
  chain: defineChain(chilizChainId),
  address: contractAddress,
});

export const tokenContract = getContract({
  client: client,
  chain: defineChain(chilizChainId),
  address: tokenAddress,
});

export const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("io.zerion.wallet"),
  // createWallet("io.")
];
