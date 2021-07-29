import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Helmet } from 'react-helmet'
import xKUKUSign from '../../assets/images/stakingLogo.gif'
import InfoCard from './InfoCard'
import StakeCard from './StakeCard'
import BalanceCard from './BalanceCard'
import { BAR_ADDRESS, KUKU_ADDRESS, ChainId } from '@kukuswap/sdk'
import useTokenBalance from '../../hooks/useTokenBalance'
import useStakingRewardBalance from '../../hooks/useStakingRewardBalance'

const mockData = {
    kukuEarnings: 345.27898,
    weightedApr: 15.34
}

export default function XKUKU() {
    const { account, chainId } = useActiveWeb3React()

    const kukuBalance = useTokenBalance(KUKU_ADDRESS[ChainId.KCC])
    const xKUKUBalance = useTokenBalance(BAR_ADDRESS[ChainId.KCC])

    const WKCSBalance = useStakingRewardBalance()

    return (
        <>
            <Helmet>
                <title>Stake | Kuku</title>
            </Helmet>
            <div className="flex flex-col w-full max-w-2xl min-h-fitContent">
                <div className="flex justify-center">
                    <div className="flex flex-col max-w-2xl w-full">
                        <div>
                            <InfoCard />
                            <StakeCard kukuBalance={kukuBalance} xKUKUBalance={xKUKUBalance} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-col max-w-2xl w-full mt-5">
                        <BalanceCard
                            xKUKUBalance={xKUKUBalance}
                            kukuBalance={kukuBalance}
                            stakingRewardBalance={WKCSBalance}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
