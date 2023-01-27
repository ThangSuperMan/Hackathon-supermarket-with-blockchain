"use client";

import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import Logo from "./logo";
import { Web3Context } from "../context/web3-provider";

const Navbar = () => {
  const web3 = useContext(Web3Context);
  const [isShowDropDown, setIsShowdropdown] = useState<boolean>(false);

  function getCleanAccountIdFromWallet(): string {
    const start = 0;
    const end = web3.wallet?.accountId.indexOf(".");
    const cleanAccountId = web3.wallet?.accountId.substring(start, end);
    return cleanAccountId;
  }

  function handleShowDropDown() {
    setIsShowdropdown((prev) => !prev);
  }

  console.log("rendering the Navbar Provider component");

  return (
    <div className="bg-white h-[72px] flex items-center justify-between border-b-[1px] border-gray-200 px-16">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex">
        <div className="relative h-[72px] flex items-center justify-between px-4">
          {web3.isSignedIn ? (
            <h3 className="text-bold mr-4 bg-primary-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {getCleanAccountIdFromWallet()}
            </h3>
          ) : undefined}
          <div onClick={handleShowDropDown} className="cursor-pointer">
            <IoWalletOutline size={32} />
          </div>
          {isShowDropDown && <DropdownWalletsContent />}
        </div>
        <div className="h-[72px] flex items-center justify-between px-4">
          <div className="cursor-pointer">
            <BsCart size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownWalletsContent = () => {
  const bodyTag: Element = document.querySelector("body") as Element;
  const web3 = useContext(Web3Context);

  function handleSignOutWallet() {
    web3.wallet?.signOut();
  }

  function handleSignInWallet() {
    web3.wallet?.signIn();
  }

  if (web3.isSignedIn) {
    return createPortal(
      <div className="absolute z-10 w-[378px] h-[calc(100vh-72px)] top-[72px] right-0 bg-white">
        <div className="flex items-center p-5 border-b-[1px] border-gray-200">
          <CgProfile size={32} />
          <span className="font-bold ml-2">{web3.wallet?.accountId}</span>
        </div>
        <div className="px-5 pt-5 pb-[72px]">
          <p className="text-gray">
            If you don't have a{" "}
            <span className="font-bold text-primary-color">wallet </span>
            yet, you can select a provider and create one now.
          </p>
          <button
            onClick={handleSignOutWallet}
            className="bg-primary-color hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
          >
            Sign out
          </button>
        </div>
      </div>,
      bodyTag,
    );
  } else {
    return createPortal(
      <div className="absolute top-[72px] right-0 z-10 w-[378px] h-[calc(100vh-72px)]  bg-white">
        <div className="flex items-center p-5 border-b-[1px] border-gray-200">
          <CgProfile size={32} />
          <span className="font-bold ml-2">My wallet</span>
        </div>
        <div className="px-5 pt-5 pb-[72px]">
          <p className="text-gray">
            If you don't have a wallet yet, you can select a provider and create
            one now.
          </p>
          <button
            onClick={handleSignInWallet}
            className="bg-primary-color hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded"
          >
            Connect to wallet
          </button>
        </div>
      </div>,
      bodyTag,
    );
  }
};

export default Navbar;
