import React from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Helmet } from 'react-helmet'
import xKUKUSign from '../../assets/images/stakingLogo.gif'
import InfoCard from './InfoCard'
import StakeCard from './StakeCard'
import BalanceCard from './BalanceCard'
import { ChainId } from '@kukuswap/sdk'
import { SUSHI, xKUKU } from '../../constants'
import useTokenBalance from '../../hooks/useTokenBalance'

const mockData = {
    sushiEarnings: 345.27898,
    weightedApr: 15.34
}

export default function XKUKU() {
    const { account, chainId } = useActiveWeb3React()

    const sushiBalance = useTokenBalance(SUSHI[ChainId.KCC]?.address ?? '')
    const xKUKUBalance = useTokenBalance(xKUKU?.address ?? '')

    return (
        <>
            <Helmet>
                <title>xKUKU | Kuku</title>
            </Helmet>
            <div className="flex flex-col w-full max-w-2xl min-h-fitContent">
                <div className="flex justify-center">
                    <div className="flex flex-col max-w-2xl w-full">
                        <div>
                            <StakeCard kukuBalance={sushiBalance} xKUKUBalance={xKUKUBalance} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full">
                    <div className="flex flex-col max-w-2xl w-full mt-5">
                        <BalanceCard
                            sushiEarnings={mockData.sushiEarnings}
                            xKUKUBalance={xKUKUBalance}
                            sushiBalance={sushiBalance}
                            weightedApr={mockData.weightedApr}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
