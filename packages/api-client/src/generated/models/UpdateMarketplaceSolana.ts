/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateMarketplaceSolana = {
    /**
     * Blockchain to work with.
     */
    chain: 'SOL';
    /**
     * Blockchain address of a smart contract
     */
    contractAddress: string;
    /**
     * The percentage of the amount that an NFT was sold for that will be sent to the marketplace as a fee. To set the fee to 1%, set this parameter to <code>100</code>; to set 10%, set this parameter to <code>1000</code>; to set 50%, set this parameter to <code>5000</code>, and so on.
     */
    marketplaceFee?: number;
    /**
     * Marketplace authority.
     */
    from: string;
    /**
     * The address that will be able to withdraw funds from the marketplace treasury account to own address
     */
    treasuryWithdrawalDestination?: string;
    /**
     * The address that will be able to withdraw funds from the marketplace fee account to own address
     */
    feeWithdrawalDestination?: string;
    /**
     * Flag - DESC TOODO
     */
    requiresSignOff?: boolean;
    /**
     * Flag - DESC TOODO
     */
    canChangeSalePrice?: boolean;
    /**
     * Private key of sender address. Private key, or signature Id must be present.
     */
    fromPrivateKey: string;
}
