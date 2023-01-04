import * as _solana_wallet_adapter_base from '@solana/wallet-adapter-base';
import { BaseMessageSignerWalletAdapter, WalletReadyState, WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PublicKey, Transaction } from '@solana/web3.js';

interface SiteMetadata {
    name: string;
    icon: string;
    url: string;
}
declare enum CrossmintEmbedRequestType {
    REQUEST_ACCOUNTS = "crossmint_requestAccounts",
    SIGN_MESSAGE = "crossmint_signMessage",
    USER_REJECT = "crossmint_userReject"
}
interface CrossmintEmbedBaseRequest<CrossmintEmbedBaseRequestDataType> {
    request: CrossmintEmbedRequestType;
    data?: CrossmintEmbedBaseRequestDataType;
}
interface CrossmintEmbedBaseRequestData {
    libVersion: string;
    chain: BlockchainTypes;
    apiKey: string;
    siteMetadata: SiteMetadata;
}
interface CrossmintEmbedRequestAccountData extends CrossmintEmbedBaseRequestData {
}
interface CrossmintEmbedSignMessageData extends CrossmintEmbedBaseRequestData {
    message: Uint8Array;
}
declare type CrossmintEmbedBaseRequestDataType = CrossmintEmbedRequestAccountData | CrossmintEmbedSignMessageData;

interface CrossmintEmbedParams {
    /**
     * API key
     * Get yours at {@link https://console.crossmint.io | Developer Dashboard}
     */
    apiKey: string;
    chain: BlockchainTypes;
    environment?: CrossmintEnvironment;
    autoConnect?: boolean;
    maxTimeAutoConnectMs?: number;
    /**
     * Dapp Metadata
     * If metadata is not provided, it will be extracted from your application automatically
     */
    appMetadata?: AppMetadata;
}
interface AppMetadata {
    name?: string;
    icon?: string;
}
interface CrossmintEmbedConfig {
    libVersion: string;
    apiKey: string;
    chain: BlockchainTypes;
    environment: CrossmintEnvironment;
    autoConnect: boolean;
    maxTimeAutoConnectMs: number;
    appMetadata?: AppMetadata;
}
declare enum CrossmintEnvironment {
    PROD = "https://www.crossmint.io",
    STAGING = "https://staging.crossmint.io",
    LOCAL = "http://localhost:3001"
}
interface CrossmintStore {
    accounts: {
        [key in BlockchainTypes]: string | null;
    };
}

declare enum BlockchainTypes {
    SOLANA = "solana",
    ETHEREUM = "ethereum",
    POLYGON = "polygon"
}

declare class CrossmintEmbed {
    private _config;
    private get _frameUrl();
    private constructor();
    static init(config: CrossmintEmbedConfig): CrossmintEmbed;
    login(): Promise<string | undefined | null>;
    signMessage(message: Uint8Array): Promise<Uint8Array | undefined | null>;
    cleanUp(): Promise<void>;
    postMessage(postWindow: Window, request: CrossmintEmbedRequestType, data?: Omit<CrossmintEmbedSignMessageData | CrossmintEmbedRequestAccountData, "libVersion" | "chain" | "apiKey" | "siteMetadata">, targetOrigin?: string): Promise<void>;
    private getLoginFromIFrame;
}

declare class CrossmintSolanaWalletAdapter extends BaseMessageSignerWalletAdapter {
    name: _solana_wallet_adapter_base.WalletName<"Crossmint">;
    url: string;
    icon: string;
    private _connecting;
    private _publicKey;
    private _forceInstalled;
    private _config;
    private _client?;
    constructor(params: Omit<CrossmintEmbedParams & {
        forceInstalled?: boolean;
    }, "chain">);
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get connected(): boolean;
    get readyState(): WalletReadyState;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
}

declare function networkToCrossmintEnvironment(network: WalletAdapterNetwork): CrossmintEnvironment;

declare class CrossmintEVMWalletAdapter {
    name: _solana_wallet_adapter_base.WalletName<"Crossmint">;
    url: string;
    icon: string;
    private _connecting;
    private _publicKey;
    private _config;
    private _client?;
    constructor(params: Omit<CrossmintEmbedParams, "chain"> & {
        chain: BlockchainTypes.ETHEREUM | BlockchainTypes.POLYGON;
    });
    get publicKey(): string | null;
    get connecting(): boolean;
    get connected(): boolean;
    connect(): Promise<string | undefined>;
    disconnect(): Promise<void>;
    signMessage(message: string): Promise<string>;
}

export { AppMetadata, BlockchainTypes, CrossmintEVMWalletAdapter, CrossmintEmbedBaseRequest, CrossmintEmbedBaseRequestData, CrossmintEmbedBaseRequestDataType, CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEmbedRequestAccountData, CrossmintEmbedRequestType, CrossmintEmbedSignMessageData, CrossmintEnvironment, CrossmintSolanaWalletAdapter, CrossmintStore, SiteMetadata, CrossmintEmbed as default, networkToCrossmintEnvironment };
