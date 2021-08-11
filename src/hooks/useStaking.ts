import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import Fraction from '../entities/Fraction'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useStakingContract, useKUKUContract } from '../hooks/useContract'
import { useTransactionAdder } from '../state/transactions/hooks'
import { BalanceProps } from './useTokenBalance'

const { BigNumber } = ethers

const useStaking = () => {
    const { account } = useActiveWeb3React()
    const addTransaction = useTransactionAdder()
    const sushiContract = useKUKUContract(true) // withSigner
    const stakingContract = useStakingContract(true) // withSigner

    const [allowance, setAllowance] = useState('0')

    const fetchAllowance = useCallback(async () => {
        if (account) {
            try {
                const allowance = await sushiContract?.allowance(account, stakingContract?.address)
                const formatted = Fraction.from(BigNumber.from(allowance), BigNumber.from(10).pow(18)).toString()
                setAllowance(formatted)
            } catch (error) {
                setAllowance('0')
                throw error
            }
        }
    }, [account, stakingContract, sushiContract])

    useEffect(() => {
        if (account && stakingContract && sushiContract) {
            fetchAllowance()
        }
        const refreshInterval = setInterval(fetchAllowance, 10000)
        return () => clearInterval(refreshInterval)
    }, [account, stakingContract, fetchAllowance, sushiContract])

    const approve = useCallback(async () => {
        try {
            const tx = await sushiContract?.approve(stakingContract?.address, ethers.constants.MaxUint256.toString())
            return addTransaction(tx, { summary: 'Approve' })
        } catch (e) {
            return e
        }
    }, [addTransaction, stakingContract, sushiContract])

    const enter = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: BalanceProps | undefined) => {
            if (amount?.value) {
                try {
                    const tx = await stakingContract?.enter(amount?.value)

                    return addTransaction(tx, { summary: 'Enter Staking' })
                } catch (e) {
                    return e
                }
            }
        },
        [addTransaction, stakingContract]
    )

    const leave = useCallback(
        // todo: this should be updated with BigNumber as opposed to string
        async (amount: BalanceProps | undefined) => {
            if (amount?.value) {
                try {
                    const tx = await stakingContract?.leave(amount?.value)
                    //const tx = await stakingContract?.leave(ethers.utils.parseUnits(amount)) // where amount is string
                    return addTransaction(tx, { summary: 'Leave Staking' })
                } catch (e) {
                    return e
                }
            }
        },
        [addTransaction, stakingContract]
    )

    return { allowance, approve, enter, leave }
}

export default useStaking
