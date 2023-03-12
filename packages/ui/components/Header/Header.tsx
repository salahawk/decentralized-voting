import React from "react";
import { WalletButton } from "../WalletButton/WalletButton";

type Props = {};

export function Header({}: Props) {
  return (
    <header className="sticky top-0 p-5 flex items-center max-w-7xl mx-auto z-20 justify-between font-bold">
      <div className="items-center text-2xl italic font-bold">
        Optic Voting System
      </div>
      <div className="flex flex-row items-center text-gray-300 cursor-pointer border border-2 rounded-full p-3">
        <WalletButton />
      </div>
    </header>
  );
}
