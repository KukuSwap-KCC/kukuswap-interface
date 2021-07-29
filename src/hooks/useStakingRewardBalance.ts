import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useStakingContract} from '../hooks/useContract'
import { BalanceProps } from './useTokenBalance'
import { useBlockNumber } from '../state/application/hooks'



const { BigNumber } = ethers

const useStakingRewardBalance = () => {
    const [balance, setBalance] = useState<BalanceProps>({ value: BigNumber.from(0), decimals: 18 })
    const { account, chainId, library } = useActiveWeb3React()
    const currentBlockNumber = useBlockNumber()
    const stakingContract = useStakingContract(false)

    const fetchBalance = useCallback(async () => {
        async function getBalance(contract: Contract | null, owner: string | null | undefined): Promise<BalanceProps> {
            try {

                const balance = await contract?.getRewardsAmount(owner)
                const decimals = 18

                return { value: BigNumber.from(balance), decimals: decimals }
            } catch (error) {
                return { value: BigNumber.from(0), decimals: 18 }
            }
        }

        const balance = await getBalance(stakingContract, account)

        setBalance(balance)
    }, [account, chainId, library, stakingContract])

    useEffect(() => {
        if (account && stakingContract) {
            fetchBalance()
        }
    }, [account, setBalance, currentBlockNumber, stakingContract, fetchBalance, stakingContract])

    return balance
}   

export default useStakingRewardBalance