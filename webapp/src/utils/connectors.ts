import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { isDevelopment } from "shared/lib/utils/env";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: isDevelopment() ? [42] : [1],
});

/**
 * A bug causes wallet connect connector to stuck forever upon second invoke
 * Possibly workaround as getting new connector after every connect
 * More about issue: https://github.com/NoahZinsmeister/web3-react/pull/130
 */
export const getWalletConnectConnector = () => {
  return new WalletConnectConnector({
    rpc: isDevelopment()
      ? { 42: process.env.REACT_APP_TESTNET_URI || "" }
      : { 1: process.env.REACT_APP_MAINNET_URI || "" },
  });
};

export const walletlinkConnector = new WalletLinkConnector({
  url: (isDevelopment()
    ? process.env.REACT_APP_TESTNET_URI
    : process.env.REACT_APP_MAINNET_URI)!,
  appName: "Ribbon Finance",
  supportedChainIds: isDevelopment() ? [42] : [1],
});
