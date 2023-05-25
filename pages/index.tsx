import { useEffect, useState } from "react";
import Head from "next/head";
import { Product, Dependency, WalletSection } from "../components";
import {
  ACTIVE_CHAINS,
  PLATFORM_NETWORKS,
  dependencies,
  products,
} from "../config";
import { useTheme } from "../contexts/theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
// import { toast } from "react-toastify";

export default function Home() {
  const chainName = process.env.NEXT_PUBLIC_CHAIN ?? "stargaze";
  const { theme, toggleTheme } = useTheme();
  const [currentNetworkSymbol, setCurrentNetworkSymbol] = useState(0);
  const [isInMintingWL, setIsInMintingWL] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletStatus, setWalletStatus] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [publicMintDate, setPublicMintDate] = useState("5-1-23 12PM");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [isRizeMember, setIsRizeMember] = useState(false);

  useEffect(() => {
    let dateTimeStrInterval = setInterval(() => {
      let nowTime = new Date();
      let datetimestr = `${nowTime.getDate()}-${
        nowTime.getMonth() + 1
      }-${nowTime.getFullYear()} ${nowTime.getHours()}h GMT`;
      setPublicMintDate(datetimestr);
    }, 10000);
    return () => {
      if (dateTimeStrInterval) {
        try {
          clearInterval(dateTimeStrInterval);
        } catch (err) {}
      }
    };
  }, []);

  const isSupportedNetwork = (currentNetwork: number) => {
    if (
      currentNetwork === PLATFORM_NETWORKS.COREUM ||
      currentNetwork === PLATFORM_NETWORKS.ETHEREUM ||
      currentNetwork === PLATFORM_NETWORKS.BSC ||
      currentNetwork === PLATFORM_NETWORKS.AVALANCHE ||
      currentNetwork === PLATFORM_NETWORKS.POLYGON ||
      currentNetwork === PLATFORM_NETWORKS.NEAR
    ) {
      return true;
    } else return false;
  };

  const containsObject = (obj: any, list: Array<any>) => {
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i].slug === obj.slug) {
        return i;
      }
    }

    return -1;
  };

  const shuffleArray = (array: Array<any>) => {
    const newArr = array.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  };

  const hasKey = (obj: any, key: string) =>
    !!Object.prototype.hasOwnProperty.call(obj, key);

  const isEmpty = (value: string) => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  };

  const getShortAddress = (address: string) => {
    if (isEmpty(address)) return "";
    return (
      address.slice(0, 2) +
      "..." +
      address.slice(address.length - 2, address.length)
    );
  };

  const getMidAddress = (address: string) => {
    if (isEmpty(address)) return "";
    return (
      address.slice(0, 10) +
      "..." +
      address.slice(address.length - 10, address.length)
    );
  };

  const getLongAddress = (address: string) => {
    if (isEmpty(address)) return "";
    return (
      address.slice(0, 25) +
      "..." +
      address.slice(address.length - 25, address.length)
    );
  };

  const numberWithCommas = (x: any, digit = 3) => {
    if (isEmpty(x) || isNaN(x)) return "0";
    return Number(x).toLocaleString(undefined, {
      maximumFractionDigits: digit,
    });
  };

  const getExtension = (filename: string) => {
    return filename.split(".").pop();
  };

  const onClickConnectEVMWallet = () => {};

  const authenticate = (walletName: string) => {};

  const handleSelectNetwork = (networkId: number) => {};

  const handleApplyNewPrice = () => {};

  const handleMenuUpdateWL = () => {};

  const handleMenuUploadFiles = () => {};

  return (
    <div className="max-w-5xl py-10 mx-6 lg:mx-auto">
      <Head>
        <div className="absolute z-10 bg-[#000000] w-full min-h-[80px] text-white flex items-center justify-between">
          <div className="flex items-center">
            {/* <Logo className="w-[120px] ml-10" /> */}
            {isInMintingWL === true && (
              <div className="ml-10 flex items-center gap-2">
                <div className="relative dropdown">
                  <div className={`dropbtn p-2`}>
                    <div className="group py-3 px-6 h-[50px] rounded-full inline-flex items-center text-sm font-medium hover:text-opacity-100 relative !outline-none">
                      <div className="flex justify-center items-center py-3 px-5 bg-[#33ff00] rounded-xl">
                        <span className=" text-neutral-900 text-sm ml-2">
                          Creators Options
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-content">
                    <div className="overflow-hidden rounded-2xl shadow-lg ring-1 bg-gray-400 border-[1px] border-[#33ff00] text-black w-[180px]">
                      <div className="relative grid  px-2 py-2 w-full">
                        <div
                          className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-500  flex gap-2 items-center group w-full"
                          onClick={() => handleMenuUploadFiles()}
                        >
                          <span className="group-hover:text-white text-neutral-900 text-sm">
                            Upload folders
                          </span>
                        </div>
                        {isRizeMember === true && (
                          <div
                            className="py-2 px-2 mt-1  transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-gray-500  flex gap-2 items-center group w-full"
                            onClick={() => handleMenuUpdateWL()}
                          >
                            <span className="group-hover:text-white text-neutral-900 text-sm">
                              Update Whitelist
                            </span>
                          </div>
                        )}
                        <div className="mt-3 h-8"></div>
                        <div className=" px-2 mt-1 w-full ">
                          <span className=" text-neutral-900 text-sm w-full text-center">
                            Create mint price
                          </span>
                        </div>
                        <div className=" px-2 mt-1 w-full flex ">
                          <input
                            className=" text-[#33ff00] text-sm w-1/2  p-1 bg-gray-500 rounded-lg text-center"
                            type="number"
                            min={0}
                            max={1000}
                            defaultValue={1}
                            value={newItemPrice}
                            onChange={(e) =>
                              setNewItemPrice(Number(e.target.value))
                            }
                          />
                          <span className=" text-[#33ff00] text-sm w-1/2 ml-1 p-1 bg-gray-500 rounded-lg text-center">
                            {ACTIVE_CHAINS[currentNetworkSymbol]?.currency}
                          </span>
                        </div>
                        <div className="mt-1 px-2 w-full flex ">
                          <button
                            className="w-full text-neutral-900 text-sm bg-gray-300 hover:bg-gray-600 hover:text-white py-1 rounded-lg"
                            onClick={() => handleApplyNewPrice()}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-1 items-center">
            <div className=" text-lg text-[#33ff00] p-1 text-center rounded-lg">
              {" "}
              {!isMobile ? `Public Mint Date ${publicMintDate}` : <></>}
            </div>
          </div>
          <div className="flex items-center mr-10 ">
            <div className="relative dropdown">
              <div className={`dropbtn p-2`}>
                <div className="group py-3 px-6 h-[50px] hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-sm font-medium hover:text-opacity-100 relative !outline-none">
                  {isSupportedNetwork(currentNetworkSymbol) === false &&
                    "Chains"}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.COREUM && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/core.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Coreum
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.ETHEREUM && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/eth.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Ethereum
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.BSC && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/bsc.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        BSC
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.POLYGON && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/polygon.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Polygon
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.AVALANCHE && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/avax.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Avalanche
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Near
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        XRPL
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Cosmos
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Solana
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Hedera
                      </span>
                    </div>
                  )}
                  {currentNetworkSymbol === PLATFORM_NETWORKS.NEAR && (
                    <div className="flex justify-center items-center">
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm ml-2">
                        Tezos
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="dropdown-content">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid bg-white dark:bg-neutral-800 px-2 py-2 ">
                    <div
                      className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.COREUM)
                      }
                    >
                      <img
                        src="/images/icons/core.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Coreum
                      </span>
                    </div>
                    <div
                      className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.ETHEREUM)
                      }
                    >
                      <img
                        src="/images/icons/eth.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Ethereum
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() => handleSelectNetwork(PLATFORM_NETWORKS.BSC)}
                    >
                      <img
                        src="/images/icons/bsc.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        BSC
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.POLYGON)
                      }
                    >
                      <img
                        src="/images/icons/polygon.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Polygon
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.AVALANCHE)
                      }
                    >
                      <img
                        src="/images/icons/avax.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Avalanche
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/near.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Near
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/xrp2.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        XRPL
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/atom.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Cosmos
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/solana.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Solana
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/hedera.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Hedera
                      </span>
                    </div>
                    <div
                      className="hover:bg-neutral-100 dark:hover:bg-neutral-700 py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg flex gap-2 items-center"
                      onClick={() =>
                        handleSelectNetwork(PLATFORM_NETWORKS.NEAR)
                      }
                    >
                      <img
                        src="/images/icons/tezos.png"
                        className="w-[25px] h-[25px]"
                        width={25}
                        height={25}
                        alt=""
                      ></img>
                      <span className="dark:text-white text-neutral-900 text-sm">
                        Tezos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative dropdown">
              <button
                onClick={() => {
                  if (isSupportedNetwork(currentNetworkSymbol) === true) {
                    if (currentNetworkSymbol === PLATFORM_NETWORKS.COREUM) {
                      // authenticate();
                    } else if (
                      currentNetworkSymbol === PLATFORM_NETWORKS.NEAR
                    ) {
                    } else {
                      onClickConnectEVMWallet();
                    }
                  } else {
                    // toast.warn("Please select a network and try again.");
                  }
                }}
                className="px-4 py-2 sm:px-5 my-2"
              >
                {/* <IoWalletOutline size={22} /> */}
                {isEmpty(walletAddress) === false && walletStatus === true ? (
                  <span className="pl-2">{getShortAddress(walletAddress)}</span>
                ) : (
                  <span className="pl-2">Wallet connect</span>
                )}
              </button>
              {currentNetworkSymbol === PLATFORM_NETWORKS.COREUM ? (
                <div className="dropdown-content !w-full">
                  <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid bg-white dark:bg-neutral-800 px-2 py-2">
                      <div
                        className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 flex gap-2 items-center"
                        onClick={() => {
                          // authenticate("keplr");
                        }}
                      >
                        <img
                          src="/images/icons/keplr.png"
                          className="w-[25px] h-[25px]"
                          width={25}
                          height={25}
                          alt=""
                        ></img>
                        <span className="dark:text-white text-neutral-900 text-sm">
                          Keplr
                        </span>
                      </div>
                      <div
                        className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 flex gap-2 items-center"
                        onClick={() => {
                          // authenticate("leap");
                        }}
                      >
                        <img
                          src="/images/icons/leap.png"
                          className="w-[25px] h-[25px]"
                          width={25}
                          height={25}
                          alt=""
                        ></img>
                        <span className="dark:text-white text-neutral-900 text-sm">
                          Leap
                        </span>
                      </div>
                      <div
                        className="py-2 px-2 transition cursor-pointer duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 flex gap-2 items-center"
                        onClick={() => {
                          // authenticate("cosmostation");
                        }}
                      >
                        <img
                          src="/images/icons/cosmostation.png"
                          className="w-[25px] h-[25px]"
                          width={25}
                          height={25}
                          alt=""
                        ></img>
                        <span className="dark:text-white text-neutral-900 text-sm">
                          Cosmostation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Head>
      <div className="flex flex-row justify-end mb-4"></div>
      <div className="text-center">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          Create Cosmos App
        </h1>
        <h1 className="text-2xl font-bold sm:text-3xl md:text-3xl">
          Welcome to&nbsp;
          <span className="text-purple-damp">
            CosmosKit + Next.js + TailwindCSS
          </span>
        </h1>
      </div>
      <WalletSection />
      <div className="grid gap-8 mb-14 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Product key={product.title} {...product}></Product>
        ))}
      </div>
      <div className="grid gap-8 mb-20 md:grid-cols-2">
        {dependencies.map((dependency) => (
          <Dependency key={dependency.title} {...dependency}></Dependency>
        ))}
      </div>
      <div className="flex justify-center pt-6 text-sm text-center border-t border-black/10 dark:border-white/10">
        <span className="flex flex-row items-center space-x-2">
          <p>Built with</p>
          <a
            href="https://cosmology.tech/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/cosmology.webp"
              className="w-auto h-4 transition duration-150 transform cursor-pointer hover:scale-105"
            />
          </a>
        </span>
      </div>
    </div>
  );
}
