import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { SolanaWeb3 } from './solana.web3'
import {
  AuctionHouse,
  createBuyInstruction,
  createCancelInstruction,
  createCancelListingReceiptInstruction,
  createCreateAuctionHouseInstruction,
  createExecuteSaleInstruction,
  createPrintBidReceiptInstruction,
  createPrintListingReceiptInstruction,
  createPrintPurchaseReceiptInstruction,
  createSellInstruction,
  createUpdateAuctionHouseInstruction,
  createWithdrawFromFeeInstruction,
  createWithdrawFromTreasuryInstruction,
} from '@metaplex-foundation/mpl-auction-house'
import BN from 'bn.js'
import { TOKEN_METADATA_PROGRAM_ID } from '../schema/instructions'
import web3 from '@solana/web3.js'
import { BuyInstructionAccounts } from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/buy'
import {
  ExecuteSaleInstructionAccounts,
  ExecuteSaleInstructionArgs,
} from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/executeSale'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import {
  PrintBidReceiptInstructionAccounts,
  PrintBidReceiptInstructionArgs,
} from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/printBidReceipt'
import { WithdrawFromTreasuryInstructionAccounts } from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/withdrawFromTreasury'
import {
  WithdrawFromFeeInstructionAccounts,
  WithdrawFromFeeInstructionArgs,
} from '@metaplex-foundation/mpl-auction-house/dist/src/generated/instructions/withdrawFromFee'
import { solanaUtils } from '@tatumio/solana'
import BigNumber from 'bignumber.js'
import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import _ from 'lodash'
import {
  ApiServices,
  BuyAssetOnMarketplaceSolana,
  CancelSellAssetOnMarketplaceSolana,
  Currency,
  GenerateMarketplaceSolana,
  SellAssetOnMarketplaceSolana,
  SolanaListingData,
  UpdateMarketplaceSolana,
  WithdrawFromMarketplaceSolana,
} from '@tatumio/api-client'

export const AUCTION_HOUSE = 'auction_house'
export const AUCTION_HOUSE_PROGRAM_ID = new PublicKey('hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk')
export const FEE_PAYER = 'fee_payer'
export const TREASURY = 'treasury'
export const BID_RECEIPT = 'bid_receipt'
export const PURCHASE_RECEIPT = 'purchase_receipt'

export type CreateSolanaMarketplace = FromPrivateKeyOrSignatureId<GenerateMarketplaceSolana>
export type UpdateSolanaMarketplace = FromPrivateKeyOrSignatureId<UpdateMarketplaceSolana>
export type SellMarketplaceSolana = FromPrivateKeyOrSignatureId<SellAssetOnMarketplaceSolana>
export type BuyMarketplaceSolana = FromPrivateKeyOrSignatureId<BuyAssetOnMarketplaceSolana>
export type CancelMarketplaceSolana = FromPrivateKeyOrSignatureId<CancelSellAssetOnMarketplaceSolana>
export type WithdrawMarketplaceSolana = FromPrivateKeyOrSignatureId<WithdrawFromMarketplaceSolana>

export const solanaMarketPlaceService = (
  args: { web3: SolanaWeb3 },
  apiCalls: {
    getMarketplaceInfo: typeof ApiServices.marketplace.getMarketplaceInfo
    getListingDetails: typeof ApiServices.marketplace.getMarketplaceListing
  } = {
    getMarketplaceInfo: ApiServices.marketplace.getMarketplaceInfo,
    getListingDetails: ApiServices.marketplace.getMarketplaceListing,
  },
) => {
  const getAuctionHouseFeeAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
    return await PublicKey.findProgramAddress(
      [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(FEE_PAYER)],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getAuctionHouseTreasuryAcct = async (auctionHouse: PublicKey): Promise<[PublicKey, number]> => {
    return await PublicKey.findProgramAddress(
      [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), Buffer.from(TREASURY)],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getAuctionHouse = async (
    creator: PublicKey,
    treasuryMint: PublicKey,
  ): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [Buffer.from(AUCTION_HOUSE), creator.toBuffer(), treasuryMint.toBuffer()],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getAuctionHouseTradeState = (
    auctionHouse: PublicKey,
    wallet: PublicKey,
    tokenAccount: PublicKey,
    treasuryMint: PublicKey,
    tokenMint: PublicKey,
    tokenSize: BN,
    buyPrice: BN,
  ): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [
        Buffer.from(AUCTION_HOUSE),
        wallet.toBuffer(),
        auctionHouse.toBuffer(),
        tokenAccount.toBuffer(),
        treasuryMint.toBuffer(),
        tokenMint.toBuffer(),
        buyPrice.toBuffer('le', 8),
        tokenSize.toBuffer('le', 8),
      ],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getAuctionHouseProgramAsSigner = async (): Promise<[PublicKey, number]> => {
    return await PublicKey.findProgramAddress(
      [Buffer.from(AUCTION_HOUSE), Buffer.from('signer')],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getMetadataAccount = (tokenMint: PublicKey): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [Buffer.from('metadata'), TOKEN_METADATA_PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
      TOKEN_METADATA_PROGRAM_ID,
    )
  }

  const getAuctionHouseEscrow = (
    auctionHouse: PublicKey,
    wallet: PublicKey,
  ): Promise<[PublicKey, number]> => {
    return PublicKey.findProgramAddress(
      [Buffer.from(AUCTION_HOUSE), auctionHouse.toBuffer(), wallet.toBuffer()],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const findListingReceiptAddress = (sellerTradeState: PublicKey) => {
    return PublicKey.findProgramAddress(
      [Buffer.from('listing_receipt'), sellerTradeState.toBuffer()],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const findBidReceiptAddress = async (buyerTradeState: PublicKey) => {
    return PublicKey.findProgramAddress(
      [Buffer.from(BID_RECEIPT, 'utf8'), buyerTradeState.toBuffer()],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }
  const findPurchaseReceiptAddress = async (sellerTradeState: PublicKey, buyerTradeState: PublicKey) => {
    return PublicKey.findProgramAddress(
      [Buffer.from(PURCHASE_RECEIPT, 'utf8'), sellerTradeState.toBuffer(), buyerTradeState.toBuffer()],
      AUCTION_HOUSE_PROGRAM_ID,
    )
  }

  const getFeePayer = (externalFeePayer: boolean, from: PublicKey, feePayer?: string) => {
    if (externalFeePayer) {
      return new PublicKey(FEE_PAYER)
    }
    return feePayer ? new PublicKey(feePayer) : from
  }

  const createMarketplace = async (params: CreateSolanaMarketplace, web3: SolanaWeb3) => {
    const connection = web3.getClient()
    const from = new PublicKey(params.from)
    const feePayerKey = getFeePayer(false, from)
    const transaction = new Transaction({ feePayer: feePayerKey })

    const {
      marketplaceFee,
      canChangeSalePrice = false,
      requiresSignOff = false,
      treasuryWithdrawalDestination,
      feeWithdrawalDestination,
      treasuryMint,
    } = params

    const twdKey = treasuryWithdrawalDestination ? new PublicKey(treasuryWithdrawalDestination) : from

    const fwdKey = feeWithdrawalDestination ? new PublicKey(feeWithdrawalDestination) : from

    const tMintKey = treasuryMint ? new PublicKey(treasuryMint) : NATIVE_MINT

    const twdAta = tMintKey.equals(NATIVE_MINT) ? twdKey : await getAssociatedTokenAddress(tMintKey, twdKey)

    const [auctionHouse, bump] = await getAuctionHouse(from, tMintKey)

    const [feeAccount, feePayerBump] = await getAuctionHouseFeeAcct(auctionHouse)

    const [treasuryAccount, treasuryBump] = await getAuctionHouseTreasuryAcct(auctionHouse)

    transaction.add(
      createCreateAuctionHouseInstruction(
        {
          treasuryMint: tMintKey,
          payer: from,
          authority: from,
          feeWithdrawalDestination: fwdKey,
          treasuryWithdrawalDestination: twdAta,
          treasuryWithdrawalDestinationOwner: twdKey,
          auctionHouse,
          auctionHouseFeeAccount: feeAccount,
          auctionHouseTreasury: treasuryAccount,
        },
        {
          bump,
          feePayerBump,
          treasuryBump,
          sellerFeeBasisPoints: marketplaceFee,
          requiresSignOff,
          canChangeSalePrice,
        },
      ),
    )

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(params.fromPrivateKey)]
    return {
      txId: await connection.sendTransaction(transaction, signers),
      contractAddress: auctionHouse.toBase58(),
      feeAccount: feeAccount.toBase58(),
      treasuryAccount: treasuryAccount.toBase58(),
    }
  }

  const updateMarketplace = async (params: UpdateSolanaMarketplace, web3: SolanaWeb3) => {
    const connection = web3.getClient()
    const from = new PublicKey(params.from)
    const feePayerKey = getFeePayer(false, from)
    const transaction = new Transaction({ feePayer: feePayerKey })

    const {
      marketplaceFee,
      canChangeSalePrice,
      requiresSignOff,
      treasuryWithdrawalDestination,
      feeWithdrawalDestination,
      contractAddress,
    } = params

    const auctionHouse = new PublicKey(contractAddress)
    const auctionHouseObj = await apiCalls.getMarketplaceInfo(Currency.SOL, contractAddress)

    const authority = new PublicKey(auctionHouseObj.authority)
    const treasuryMint = new PublicKey(auctionHouseObj.treasuryMint)

    // TODO CHECK AUTHORITY?

    const tMintKey = treasuryMint ? treasuryMint : NATIVE_MINT
    const isNative = tMintKey.equals(NATIVE_MINT)

    let twdAta = new PublicKey(auctionHouseObj.treasuryWithdrawalDestination)
    let twdKey: PublicKey
    if (treasuryWithdrawalDestination) {
      twdKey = new PublicKey(treasuryWithdrawalDestination)
      twdAta = isNative ? twdKey : await getAssociatedTokenAddress(tMintKey, twdKey)
    } else {
      twdKey = isNative ? twdAta : (await getAccount(connection, twdAta)).owner
    }

    const fwdKey = new PublicKey(
      feeWithdrawalDestination ? feeWithdrawalDestination : auctionHouseObj.feeWithdrawalDestination,
    )

    transaction.add(
      createUpdateAuctionHouseInstruction(
        {
          treasuryMint: tMintKey,
          payer: from,
          authority: from,
          newAuthority: from,
          feeWithdrawalDestination: fwdKey,
          treasuryWithdrawalDestination: twdAta,
          treasuryWithdrawalDestinationOwner: twdKey,
          auctionHouse,
        },
        {
          sellerFeeBasisPoints: solanaUtils.valueOrNull(marketplaceFee),
          requiresSignOff: solanaUtils.valueOrNull(requiresSignOff),
          canChangeSalePrice: solanaUtils.valueOrNull(canChangeSalePrice),
        },
      ),
    )

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(params.fromPrivateKey)]
    return {
      txId: await connection.sendTransaction(transaction, signers),
    }
  }

  const formatPrice = async (
    connection: Connection,
    isNative: boolean,
    price: string,
    treasuryMint: PublicKey,
  ): Promise<string> => {
    if (isNative) {
      return new BigNumber(price).multipliedBy(LAMPORTS_PER_SOL).toFixed()
    }

    const balance = await connection.getTokenSupply(treasuryMint)
    return new BigNumber(price).multipliedBy(new BigNumber(10).pow(balance.value.decimals)).toFixed()
  }

  const post = async (body: SellMarketplaceSolana, web3: SolanaWeb3) => {
    const { authorityPrivateKey, contractAddress, nftAddress, fromPrivateKey } = body

    const connection = web3.getClient()
    const from = new PublicKey(body.from)
    const feePayerKey = getFeePayer(false, from)
    const transaction = new Transaction({ feePayer: feePayerKey })

    const publicKey = new PublicKey(body.from)

    const tokenMint = new PublicKey(nftAddress)
    const [metadata] = await getMetadataAccount(tokenMint)

    const auctionHouse = new PublicKey(contractAddress)
    const auctionHouseObj = await apiCalls.getMarketplaceInfo(Currency.SOL, contractAddress)

    const authority = new PublicKey(auctionHouseObj.authority)
    const treasuryMint = new PublicKey(auctionHouseObj.treasuryMint)
    const associatedTokenAccount = await getAssociatedTokenAddress(tokenMint, from)

    const isNative = treasuryMintIsNative(treasuryMint)
    const buyerPrice = await formatPrice(connection, isNative, body.price, treasuryMint)

    const [feeAccount] = await getAuctionHouseFeeAcct(auctionHouse)

    const [sellerTradeState, tradeStateBump] = await getAuctionHouseTradeState(
      auctionHouse,
      publicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(buyerPrice),
    )

    const [freeTradeState, freeTradeBump] = await getAuctionHouseTradeState(
      auctionHouse,
      publicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(0),
    )

    const [programAsSigner, programAsSignerBump] = await getAuctionHouseProgramAsSigner()

    const sellInstructionArgs = {
      tradeStateBump,
      freeTradeStateBump: freeTradeBump,
      programAsSignerBump: programAsSignerBump,
      buyerPrice: new BN(buyerPrice),
      tokenSize: new BN(1),
    }

    const sellInstructionAccounts = {
      wallet: publicKey,
      tokenAccount: associatedTokenAccount,
      metadata: metadata,
      authority: authority,
      auctionHouse: auctionHouse,
      auctionHouseFeeAccount: feeAccount,
      sellerTradeState: sellerTradeState,
      freeSellerTradeState: freeTradeState,
      programAsSigner: programAsSigner,
    }

    const sellInstruction = createSellInstruction(sellInstructionAccounts, sellInstructionArgs)

    transaction.add(sellInstruction)

    const [receipt, receiptBump] = await findListingReceiptAddress(sellerTradeState)

    const printListingReceiptInstruction = createPrintListingReceiptInstruction(
      {
        receipt,
        bookkeeper: publicKey,
        instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
      },
      {
        receiptBump,
      },
    )

    transaction.add(printListingReceiptInstruction)

    if (body.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(fromPrivateKey)]

    if (authorityPrivateKey) {
      signers.push(web3.generateKeyPair(authorityPrivateKey))
    }

    return {
      txId: await connection.sendTransaction(transaction, signers),
      listingId: receipt.toBase58(),
    }
  }

  const treasuryMintIsNative = (treasuryMint: PublicKey) => {
    return treasuryMint.equals(NATIVE_MINT)
  }

  const safeAwaitCall = <T>(promise: Promise<T>, callback?: any) => {
    return promise
      .then((data) => {
        return { result: data, error: undefined }
      })
      .catch((error: Error) => {
        return { result: undefined, error: error }
      })
      .finally(() => {
        if (callback && typeof callback === 'function') {
          callback()
        }
      })
  }

  const generateCreationInstructions = async (
    web3: SolanaWeb3,
    payer: PublicKey,
    addresses: string[],
    mint: PublicKey,
  ): Promise<TransactionInstruction[] | null> => {
    const connection = web3.getClient()

    const ix: TransactionInstruction[] = []
    for (const addr of addresses) {
      const addrPubKey = new PublicKey(addr)
      const tokenAddress = await getAssociatedTokenAddress(mint, addrPubKey)

      const tokenAccountRes = await safeAwaitCall(getAccount(connection, tokenAddress))

      const tokenAccount = tokenAccountRes.result

      if (!tokenAccount || !tokenAccount.isInitialized) {
        ix.push(
          createAssociatedTokenAccountInstruction(
            payer,
            tokenAddress,
            addrPubKey,
            mint,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID,
          ),
        )
      }
    }
    return ix
  }

  const checkBalance = async (
    connection: Connection,
    paymentAccount: PublicKey,
    isNative: boolean,
    price: string,
  ) => {
    let paymentAccountBalance: BigNumber

    if (isNative) {
      const info = await connection.getAccountInfo(paymentAccount)
      paymentAccountBalance = new BigNumber(info?.lamports || '0')
    } else {
      try {
        const accountBalance = await connection.getTokenAccountBalance(paymentAccount)
        paymentAccountBalance = new BigNumber(accountBalance.value.amount)
      } catch (e) {
        paymentAccountBalance = new BigNumber(0)
      }
    }

    if (new BigNumber(price).isGreaterThan(paymentAccountBalance)) {
      throw new SdkError({
        code: SdkErrorCode.INSUFFICIENT_FUNDS,
        originalError: {
          name: SdkErrorCode.INSUFFICIENT_FUNDS,
          message: `Insufficient funds to create transaction from sender account ${paymentAccount.toBase58()} -> available balance is ${paymentAccountBalance.toFixed()}, required balance is ${price}.`,
        },
      })
    }
  }

  const checkNft = async (
    connection: Connection,
    associatedTokenAccount: PublicKey,
    sellTradeState: PublicKey,
    sellTradeStateBump: number,
    amount: number,
  ) => {
    const [programAsSigner] = await getAuctionHouseProgramAsSigner()
    const tokenAccountInfo = await getAccount(connection, associatedTokenAccount)
    const sellTradeStateInfo = await connection.getAccountInfo(sellTradeState)

    if (
      _.isNil(tokenAccountInfo.delegate) ||
      tokenAccountInfo.delegate.toBase58() !== programAsSigner.toBase58() ||
      Number(tokenAccountInfo.amount) < amount ||
      sellTradeStateInfo?.data[0] != sellTradeStateBump
    ) {
      throw new SdkError({
        code: SdkErrorCode.COMMON_ERROR,
        originalError: {
          name: SdkErrorCode.COMMON_ERROR,
          message: `NFT not available`,
        },
      })
    }
  }

  const buyAndExecuteSale = async (params: BuyMarketplaceSolana, web3: SolanaWeb3) => {
    const { contractAddress, authorityPrivateKey, listingId, fromPrivateKey, from } = params

    const connection = web3.getClient()

    const auctionHouse = new PublicKey(contractAddress)
    const auctionHouseObj = await apiCalls.getMarketplaceInfo(Currency.SOL, contractAddress)

    const authority = new PublicKey(auctionHouseObj.authority)
    const treasuryMint = new PublicKey(auctionHouseObj.treasuryMint)

    const buyerPublicKey = new PublicKey(from)

    const feePayerKey = getFeePayer(false, buyerPublicKey)

    const listing = (await apiCalls.getListingDetails(
      Currency.SOL,
      contractAddress,
      listingId,
    )) as SolanaListingData

    const isNative = treasuryMintIsNative(treasuryMint)

    // TODO - can be optimized re-using call in checkBalance
    const price = await formatPrice(connection, isNative, listing.price, treasuryMint)

    const seller = new PublicKey(listing.seller)
    const tokenMint = new PublicKey(listing.nft.address)
    const [metadata] = await getMetadataAccount(tokenMint)

    const associatedTokenAccount = await getAssociatedTokenAddress(tokenMint, seller)

    const [feeAccount] = await getAuctionHouseFeeAcct(auctionHouse)

    const [buyerEscrow, buyerEscrowBump] = await getAuctionHouseEscrow(auctionHouse, buyerPublicKey)

    const [buyTradeState, buyTradeStateBump] = await getAuctionHouseTradeState(
      auctionHouse,
      buyerPublicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(price),
    )

    const sellerPublicKey = new PublicKey(seller)

    const [treasuryAccount, treasuryBump] = await getAuctionHouseTreasuryAcct(auctionHouse)

    const [sellTradeState, sellTradeStateBump] = await getAuctionHouseTradeState(
      auctionHouse,
      sellerPublicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(price),
    )

    const [listingReceipt, _listingReceiptBump] = await findListingReceiptAddress(sellTradeState)

    const [freeTradeState, freeTradeStateBump] = await getAuctionHouseTradeState(
      auctionHouse,
      sellerPublicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(0),
    )
    const [programAsSigner, programAsSignerBump] = await getAuctionHouseProgramAsSigner()

    const transaction = new Transaction({ feePayer: feePayerKey })

    const paymentAccount = isNative
      ? buyerPublicKey
      : await getAssociatedTokenAddress(treasuryMint, buyerPublicKey)

    await checkBalance(connection, paymentAccount, isNative, price)
    await checkNft(connection, associatedTokenAccount, sellTradeState, sellTradeStateBump, 1)

    const buyInstructionArgs = {
      buyerPrice: new BN(price),
      tokenSize: new BN(1),
      tradeStateBump: buyTradeStateBump,
      escrowPaymentBump: buyerEscrowBump,
    }

    const buyInstructionAccounts: BuyInstructionAccounts = {
      wallet: buyerPublicKey,
      paymentAccount,
      transferAuthority: buyerPublicKey,
      treasuryMint,
      tokenAccount: associatedTokenAccount,
      metadata,
      escrowPaymentAccount: buyerEscrow,
      authority,
      auctionHouse,
      auctionHouseFeeAccount: feeAccount,
      buyerTradeState: buyTradeState,
    }

    const buyInstruction = createBuyInstruction(buyInstructionAccounts, buyInstructionArgs)

    const remainingAccounts = [] as Array<{
      pubkey: web3.PublicKey
      isWritable: boolean
      isSigner: boolean
    }>

    const accountsRequireTokenSet = new Set<string>()

    const metadataParsed = listing.nft.data
    if (metadataParsed && metadataParsed.creators) {
      for (let creator of metadataParsed.creators) {
        const creatorPublicKey = new PublicKey(creator.address)

        remainingAccounts.push({
          pubkey: creatorPublicKey,
          isWritable: true,
          isSigner: false,
        })

        if (!isNative) {
          const associatedTokenAddress = await getAssociatedTokenAddress(treasuryMint, creatorPublicKey)
          remainingAccounts.push({
            pubkey: associatedTokenAddress,
            isWritable: true,
            isSigner: false,
          })
          accountsRequireTokenSet.add(creatorPublicKey.toString())
        }
      }
    }

    const sellerPaymentReceiptAccount = isNative
      ? sellerPublicKey
      : await getAssociatedTokenAddress(treasuryMint, sellerPublicKey)

    if (!isNative) {
      accountsRequireTokenSet.add(sellerPublicKey.toString())
    }

    // TODO - finish it
    const allTokenInstructions: TransactionInstruction[] = []

    const treasuryMintTokenInstructions = await generateCreationInstructions(
      web3,
      buyerPublicKey,
      Array.from(accountsRequireTokenSet.values()),
      treasuryMint,
    )
    if (treasuryMintTokenInstructions) {
      allTokenInstructions.push(...treasuryMintTokenInstructions)
    }

    const buyerReceiptTokenAccount = await getAssociatedTokenAddress(tokenMint, buyerPublicKey)

    if (!isNative) {
      const tokenMintInstructions = await generateCreationInstructions(
        web3,
        buyerPublicKey,
        [buyerPublicKey.toString()],
        tokenMint,
      )
      if (tokenMintInstructions) {
        allTokenInstructions.push(...tokenMintInstructions)
      }
    }

    const [bidReceipt, bidReceiptBump] = await findBidReceiptAddress(buyTradeState)

    const printBidReceiptAccounts: PrintBidReceiptInstructionAccounts = {
      bookkeeper: buyerPublicKey,
      receipt: bidReceipt,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
    }
    const printBidReceiptArgs: PrintBidReceiptInstructionArgs = {
      receiptBump: bidReceiptBump,
    }

    const printBidReceiptInstruction = createPrintBidReceiptInstruction(
      printBidReceiptAccounts,
      printBidReceiptArgs,
    )

    const [purchaseReceipt, purchaseReceiptBump] = await findPurchaseReceiptAddress(
      sellTradeState,
      buyTradeState,
    )

    const executeSellInstructionArgs: ExecuteSaleInstructionArgs = {
      escrowPaymentBump: buyerEscrowBump,
      freeTradeStateBump: freeTradeStateBump,
      programAsSignerBump: programAsSignerBump,
      buyerPrice: new BN(price),
      tokenSize: new BN(1),
    }

    const executeSellInstructionAccounts: ExecuteSaleInstructionAccounts = {
      buyer: buyerPublicKey,
      seller: sellerPublicKey,
      tokenAccount: associatedTokenAccount,
      tokenMint: tokenMint,
      metadata,
      treasuryMint,
      escrowPaymentAccount: buyerEscrow,
      sellerPaymentReceiptAccount,
      buyerReceiptTokenAccount,
      authority,
      auctionHouse,
      auctionHouseFeeAccount: feeAccount,
      auctionHouseTreasury: treasuryAccount,
      buyerTradeState: buyTradeState,
      sellerTradeState: sellTradeState,
      freeTradeState: freeTradeState,
      programAsSigner: programAsSigner,
      anchorRemainingAccounts: remainingAccounts,
    }

    const executeSaleInstruction = createExecuteSaleInstruction(
      executeSellInstructionAccounts,
      executeSellInstructionArgs,
    )

    const printPurchaseReceiptAccounts = {
      bookkeeper: buyerPublicKey,
      purchaseReceipt,
      bidReceipt,
      listingReceipt,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
    }
    const printPurchaseReceiptArgs = {
      purchaseReceiptBump,
    }

    const printPurchaseReceiptInstruction = createPrintPurchaseReceiptInstruction(
      printPurchaseReceiptAccounts,
      printPurchaseReceiptArgs,
    )

    transaction.add(buyInstruction)
    transaction.add(printBidReceiptInstruction)
    transaction.add(executeSaleInstruction)
    transaction.add(printPurchaseReceiptInstruction)

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(fromPrivateKey)]

    if (authorityPrivateKey) {
      signers.push(web3.generateKeyPair(authorityPrivateKey))
    }

    return {
      txId: await connection.sendTransaction(transaction, signers),
    }
  }

  const cancel = async (params: CancelMarketplaceSolana, web3: SolanaWeb3) => {
    const { contractAddress, listingId, authorityPrivateKey, fromPrivateKey, from } = params

    const connection = web3.getClient()

    const auctionHouse = new PublicKey(contractAddress)
    const auctionHouseObj = await apiCalls.getMarketplaceInfo(Currency.SOL, contractAddress)

    const authority = new PublicKey(auctionHouseObj.authority)
    const treasuryMint = new PublicKey(auctionHouseObj.treasuryMint)

    const sellerPublicKey = new PublicKey(from)

    const feePayerKey = getFeePayer(false, sellerPublicKey)

    const listing = (await apiCalls.getListingDetails(
      Currency.SOL,
      contractAddress,
      listingId,
    )) as SolanaListingData

    const price = listing.price

    const tokenMint = new PublicKey(listing.nft.address)

    const associatedTokenAccount = await getAssociatedTokenAddress(tokenMint, new PublicKey(listing.seller))

    const [feeAccount] = await getAuctionHouseFeeAcct(auctionHouse)

    const [sellTradeState] = await getAuctionHouseTradeState(
      auctionHouse,
      sellerPublicKey,
      associatedTokenAccount,
      treasuryMint,
      tokenMint,
      new BN(1),
      new BN(price),
    )

    const [listingReceipt, _listingReceiptBump] = await findListingReceiptAddress(sellTradeState)

    const cancelInstructionAccounts = {
      wallet: sellerPublicKey,
      tokenAccount: associatedTokenAccount,
      tokenMint,
      authority,
      auctionHouse,
      auctionHouseFeeAccount: feeAccount,
      tradeState: sellTradeState,
    }
    const cancelInstructionArgs = {
      buyerPrice: new BN(price),
      tokenSize: 1,
    }

    const cancelListingReceiptAccounts = {
      receipt: listingReceipt,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY,
    }

    const transaction = new Transaction({ feePayer: feePayerKey })

    const cancelInstruction = createCancelInstruction(cancelInstructionAccounts, cancelInstructionArgs)
    const cancelListingReceiptInstruction = createCancelListingReceiptInstruction(
      cancelListingReceiptAccounts,
    )

    transaction.add(cancelInstruction)
    transaction.add(cancelListingReceiptInstruction)

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(fromPrivateKey)]

    if (authorityPrivateKey) {
      signers.push(web3.generateKeyPair(authorityPrivateKey))
    }

    return {
      txId: await connection.sendTransaction(transaction, signers),
    }
  }

  const withdraw = async (params: WithdrawMarketplaceSolana, web3: SolanaWeb3) => {
    const { contractAddress, amount, from, fromPrivateKey } = params

    const connection = web3.getClient()

    const auctionHouseAddress = new PublicKey(contractAddress)

    const auctionHouse = await AuctionHouse.fromAccountAddress(connection, auctionHouseAddress)

    const authority = auctionHouse.authority
    const treasuryMint = auctionHouse.treasuryMint

    const feePayerKey = getFeePayer(false, new PublicKey(from))

    const auctionHouseTreasury = new PublicKey(auctionHouse.auctionHouseTreasury)

    const treasuryWithdrawalDestination = new PublicKey(auctionHouse.treasuryWithdrawalDestination)

    const finalAmount = await formatPrice(connection, false, amount, treasuryMint)

    const withdrawFromTreasuryInstructionAccounts: WithdrawFromTreasuryInstructionAccounts = {
      treasuryMint,
      authority,
      treasuryWithdrawalDestination,
      auctionHouseTreasury,
      auctionHouse: auctionHouseAddress,
    }
    const withdrawFromTreasuryInstructionArgs = {
      amount: new BN(finalAmount),
    }

    const withdrawFromTreasuryInstruction = createWithdrawFromTreasuryInstruction(
      withdrawFromTreasuryInstructionAccounts,
      withdrawFromTreasuryInstructionArgs,
    )

    const transaction = new Transaction({ feePayer: feePayerKey })

    transaction.add(withdrawFromTreasuryInstruction)

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(fromPrivateKey)]

    return {
      txId: await connection.sendTransaction(transaction, signers),
    }
  }

  const withdrawFee = async (params: WithdrawMarketplaceSolana, web3: SolanaWeb3) => {
    const { contractAddress, amount, from, fromPrivateKey } = params

    const connection = web3.getClient()

    const auctionHouseAddress = new PublicKey(contractAddress)

    const auctionHouse = await AuctionHouse.fromAccountAddress(connection, auctionHouseAddress)

    const authority = auctionHouse.authority

    const feePayerKey = getFeePayer(false, new PublicKey(from))

    const auctionHouseFeeAccount = auctionHouse.auctionHouseFeeAccount

    const feeWithdrawalDestination = auctionHouse.feeWithdrawalDestination

    const lamports = new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL).toFixed()

    const withdrawFromTreasuryInstructionAccounts: WithdrawFromFeeInstructionAccounts = {
      authority,
      feeWithdrawalDestination,
      auctionHouseFeeAccount,
      auctionHouse: auctionHouseAddress,
    }
    const withdrawFromTreasuryInstructionArgs: WithdrawFromFeeInstructionArgs = {
      amount: new BN(lamports),
    }

    const withdrawFromTreasuryInstruction = createWithdrawFromFeeInstruction(
      withdrawFromTreasuryInstructionAccounts,
      withdrawFromTreasuryInstructionArgs,
    )

    const transaction = new Transaction({ feePayer: feePayerKey })

    transaction.add(withdrawFromTreasuryInstruction)

    if (params.signatureId) {
      transaction.recentBlockhash = '7WyEshBZcZwEbJsvSeGgCkSNMxxxFAym3x7Cuj6UjAUE'
      return { txData: transaction.compileMessage().serialize().toString('hex') }
    }

    const signers = [web3.generateKeyPair(fromPrivateKey)]

    return {
      txId: await connection.sendTransaction(transaction, signers),
    }
  }

  return {
    send: {
      deploySignedTransaction: async (params: CreateSolanaMarketplace) => {
        return createMarketplace(params, args.web3)
      },
      updateSignedTransaction: async (params: UpdateSolanaMarketplace) => {
        return updateMarketplace(params, args.web3)
      },
      sellSignedTransaction: async (params: SellMarketplaceSolana) => {
        return post(params, args.web3)
      },
      buySignedTransaction: async (params: BuyMarketplaceSolana) => {
        return buyAndExecuteSale(params, args.web3)
      },
      cancelSignedTransaction: async (params: CancelMarketplaceSolana) => {
        return cancel(params, args.web3)
      },
      withdrawSignedTransaction: async (params: WithdrawMarketplaceSolana) => {
        return withdraw(params, args.web3)
      },
      withdrawFeeSignedTransaction: async (params: WithdrawMarketplaceSolana) => {
        return withdrawFee(params, args.web3)
      },
    },
  }
}
