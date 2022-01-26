import { BlockchainHarmonyOneService } from '@tatumio/api-client'
import { erc20, EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'

export const oneTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    erc20: {
      ...erc20({
        ...args,
        broadcastFunction: BlockchainHarmonyOneService.oneBroadcast,
      }),
    }
  }
}
