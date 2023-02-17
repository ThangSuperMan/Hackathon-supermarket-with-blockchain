"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { BsCart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import { Web3Context } from "../context/web3-provider";
import Logo from "./logo";

const Navbar = () => {
  const CONTRACT_ADDRESS: string = "dev-1675867092617-39932226292718";
  const [couter, setCouter] = useState<any>(0);

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

  function getNum() {
    let num = web3.wallet?.viewMethod({
      method: "get_num",
      contractId: CONTRACT_ADDRESS,
    });
    return num;
  }

  async function getCouter() {
    console.log("getCouter");
    console.log("contract address :>> ", CONTRACT_ADDRESS);
    let num;
    num = await web3.wallet?.viewMethod({
      method: "get_num",
      contractId: CONTRACT_ADDRESS,
    });

    setCouter(num);

    console.log("Result from contract :>> ", num);
  }

  async function handleIncrement() {
    console.log("handleIncrement");
    await web3.wallet?.callMethod({
      contractId: CONTRACT_ADDRESS,
      method: "increment",
    });
    // @ts-ignore
    setCouter(getNum);
  }

  return (
    <div className="bg-white h-[72px] flex items-center justify-between border-b-[1px] border-gray-200 px-16">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex">
        <div className="relative h-[72px] flex items-center justify-between px-4">
          {web3.isSignedIn ? (
            <>
              <h3 className="px-4 py-2 mr-4 font-bold text-white rounded shadow-md text-bold bg-primary-color hover:bg-blue-700">
                {getCleanAccountIdFromWallet()}
              </h3>
              <button
                onClick={handleIncrement}
                className="px-4 py-2 mt-4 font-bold bg-yellow-200 rounded hover:bg-yellow-600"
              >
                Increment num
              </button>
              <button
                onClick={getCouter}
                className="px-4 py-2 mt-4 ml-2 font-bold bg-yellow-200 rounded hover:bg-yellow-600"
              >
                Get num
              </button>
              <p>Result from get_num function: {couter}</p>
            </>
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
          <span className="ml-2 font-bold">{web3.wallet?.accountId}</span>
        </div>
        <div className="px-5 pt-5 pb-[72px]">
          <p className="text-gray">
            If you don't have a{" "}
            <span className="font-bold text-primary-color">wallet </span>
            yet, you can select a provider and create one now.
          </p>
          <button
            onClick={handleSignOutWallet}
            className="px-4 py-2 mt-4 font-bold text-white rounded bg-primary-color hover:bg-blue-700"
          >
            Sign out
          </button>
        </div>
      </div>,
      bodyTag
    );
  } else {
    return createPortal(
      <div className="absolute top-[72px] right-0 z-10 w-[378px] h-[calc(100vh-72px)]  bg-white">
        <div className="flex items-center p-5 border-b-[1px] border-gray-200">
          <CgProfile size={32} />
          <span className="ml-2 font-bold">My wallet</span>
        </div>
        <div className="px-5 pt-5 pb-[72px]">
          <p className="text-gray">
            If you don't have a wallet yet, you can select a provider and create
            one now.
          </p>
          <button
            onClick={handleSignInWallet}
            className="px-4 py-2 mt-4 font-bold text-white rounded bg-primary-color hover:bg-blue-700"
          >
            Connect to wallet
          </button>
        </div>
      </div>,
      bodyTag
    );
  }
};

export default Navbar;
