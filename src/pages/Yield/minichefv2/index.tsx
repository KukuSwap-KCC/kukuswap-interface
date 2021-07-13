import { Card, CardHeader, DoubleLogo, Paper, Search } from '../components'
import { ChevronDown, ChevronUp } from 'react-feather'
import React, { useState } from 'react'
import { formattedNum, formattedPercent } from '../../../utils'
import { useFuse, useSortableData } from 'hooks'

import AsyncTokenIcon from '../../../kashi/components/AsyncTokenIcon'
import Badge from '../../../components/Badge'
import { SimpleDots as Dots } from 'kashi/components'
import { Helmet } from 'react-helmet'
import InputGroup from './InputGroup'
import { RowBetween } from '../../../components/Row'
import styled from 'styled-components'
import { sumBy } from 'lodash'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import useFarmsV2 from 'hooks/minichefv2/useFarms'
import { useLingui } from '@lingui/react'

export const FixedHeightRow = styled(RowBetween)`
    height: 24px;
`

export default function Yield(): JSX.Element {
    const { i18n } = useLingui()
    const query = useFarmsV2()
    const farms = query?.farms
    const userFarms = query?.userFarms

    const tvl = sumBy(farms, 'tvl')

    // Search Setup
    const options = { keys: ['symbol', 'name', 'pairAddress'], threshold: 0.4 }
    const { result, search, term } = useFuse({
        data: farms && farms.length > 0 ? farms : [],
        options
    })
    const flattenSearchResults = result.map((a: { item: any }) => (a.item ? a.item : a))
    // Sorting Setup
    const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults)

    return (
        <>
            <Helmet>
                <title>{i18n._(t`Yield`)} | Sushi</title>
                <meta name="description" content="Farm SUSHI by staking LP (Liquidity Provider) tokens" />
            </Helmet>
            <div className="container max-w-4xl mx-auto px-0 sm:px-4">
                <Card
                    className="h-full bg-dark-900"
                    header={
                        <CardHeader className="flex justify-between items-center bg-dark-800">
                            <div className="flex w-full justify-between">
                                <div className="hidden md:block items-center">
                                    {/* <BackButton defaultRoute="/pool" /> */}
                                    <div className="text-lg mr-2 whitespace-nowrap flex items-center">
                                        <div className="mr-2">{i18n._(t`Yield Instruments`)}</div>
                                        <Badge color="blue">{i18n._(t`V2 Rewarder`)}</Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="text-sm text-gray-500 mr-2">
                                            Total Deposits: {farms && farms.length > 0 && formattedNum(tvl, true)}
                                        </div>
                                    </div>
                                </div>
                                <Search search={search} term={term} />
                            </div>
                        </CardHeader>
                    }
                >
                    {/* UserFarms */}
                    {userFarms && userFarms.length > 0 && (
                        <>
                            <div className="pb-4">
                                <div className="grid grid-cols-3 pb-4 px-4 text-sm  text-secondary">
                                    <div className="flex items-center">
                                        <div>{i18n._(t`Your Yields`)}</div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <div>{i18n._(t`Deposited`)}</div>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <div>{i18n._(t`Claim`)}</div>
                                    </div>
                                </div>
                                <div className="flex-col space-y-2">
                                    {userFarms.map((farm: any, i: number) => {
                                        return <UserBalance key={farm.address + '_' + i} farm={farm} />
                                    })}
                                </div>
                            </div>
                        </>
                    )}
                    {/* All Farms */}
                    <div className="grid grid-cols-3 md:grid-cols-4 pb-4 px-4 text-sm  text-secondary">
                        <div
                            className="flex items-center cursor-pointer hover:text-secondary"
                            onClick={() => requestSort('symbol')}
                        >
                            <div>{i18n._(t`Instruments`)}</div>
                            {sortConfig &&
                                sortConfig.key === 'symbol' &&
                                ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
                        </div>
                        <div className="hidden md:block ml-4">
                            <div className="flex items-center justify-start">
                                <div className="pr-2">{i18n._(t`Pool Rewards`)}</div>
                                <Badge color="blue">2X</Badge>
                            </div>
                        </div>
                        <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('tvl')}>
                            <div className="flex items-center justify-end">
                                <div>{i18n._(t`TVL`)}</div>
                                {sortConfig &&
                                    sortConfig.key === 'tvl' &&
                                    ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                                        (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
                            </div>
                        </div>
                        <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('roiPerYear')}>
                            <div className="flex items-center justify-end">
                                <div>{i18n._(t`APY (incl. Fees)`)}</div>
                                {sortConfig &&
                                    sortConfig.key === 'roiPerYear' &&
                                    ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                                        (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-col space-y-2">
                        {items && items.length > 0 ? (
                            items.map((farm: any, i: number) => {
                                return <TokenBalance key={farm.address + '_' + i} farm={farm} />
                            })
                        ) : (
                            <>
                                {term ? (
                                    <div className="w-full text-center py-6">{i18n._(t`No Results`)}</div>
                                ) : (
                                    <div className="w-full text-center py-6">
                                        <Dots>{i18n._(t`Fetching Instruments`)}</Dots>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </Card>
            </div>
        </>
    )
}

const TokenBalance = ({ farm }: any) => {
    const { i18n } = useLingui()
    const { chainId } = useActiveWeb3React()
    const [expand, setExpand] = useState<boolean>(false)
    return (
        <>
            {farm.type === 'SLP' && (
                <Paper className="bg-dark-800">
                    {process.env.NODE_ENV == 'development' && farm && (
                        <div className="px-4 py-2">
                            {farm.liquidityPair.token0.id + '-' + farm.liquidityPair.token1.id}
                        </div>
                    )}
                    <div
                        className="bg-dark-850 grid grid-cols-3 md:grid-cols-4 px-4 py-2  cursor-pointer select-none rounded rounded-b-none"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="text-sm sm:text-base font-semibold">
                            {farm && farm.liquidityPair.token0.symbol + '-' + farm.liquidityPair.token1.symbol}
                        </div>
                        <div className="hidden md:block text-sm sm:text-base ml-4 text-gray-500">{'SUSHI & MATIC'}</div>
                        <div className="text-gray-500 text-sm sm:text-base text-right">
                            {formattedNum(farm.tvl, true)}
                        </div>
                        <div className="font-semibold text-sm sm:text-base text-right">
                            {farm.roiPerYear > 100 ? '10000%+' : formattedPercent(farm.roiPerYear * 100)}
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-3 md:grid-cols-12 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="md:col-span-3 flex flex-col space-y-2">
                            <div className="mr-4 flex flex-row space-x-2 items-center">
                                <div>
                                    <AsyncTokenIcon
                                        address={farm.liquidityPair.token0.id}
                                        chainId={chainId}
                                        className="block w-10 h-10 rounded-sm"
                                    />
                                </div>
                                <div>
                                    <AsyncTokenIcon
                                        address={farm.liquidityPair.token1.id}
                                        chainId={chainId}
                                        className="block w-10 h-10 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-4 hidden md:flex flex-row space-x-2 justify-start items-center ml-4">
                            <div>
                                <AsyncTokenIcon
                                    address={farm.rewardTokens?.[0]}
                                    chainId={chainId}
                                    className="block w-10 h-10 rounded-sm"
                                />
                            </div>
                            <div>
                                <AsyncTokenIcon
                                    address={farm.rewardTokens?.[1]}
                                    chainId={chainId}
                                    className="block w-10 h-10 rounded-sm"
                                />
                            </div>
                            <div className="flex flex-col pl-2 space-y-1">
                                <div className="text-gray-500 text-xs">
                                    {formattedNum(farm.sushiRewardPerDay)} SUSHI / day
                                </div>
                                <div className="text-gray-500 text-xs">
                                    {formattedNum(farm.secondaryRewardPerDay)} MATIC / day
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 flex justify-end items-center">
                            <div>
                                {/* <div className="text-right">{formattedNum(farm.tvl, true)} </div> */}
                                <div className="text-gray-500 text-right font-semibold text-sm sm:text-sm">
                                    {formattedNum(farm.slpBalance / 1e18, false)} SLP
                                </div>
                                <div className="text-gray-500 text-right text-xs">{i18n._(t`Market Staked`)}</div>
                            </div>
                        </div>
                        <div className="md:col-span-3 flex justify-end items-center">
                            <div>
                                <div className="text-gray-500 text-right font-semibold text-base sm:text-lg">
                                    {farm.roiPerYear > 100 ? '10000%+' : formattedPercent(farm.roiPerYear * 100)}
                                    {/* {formattedPercent(farm.roiPerMonth * 100)}{' '} */}
                                </div>
                                <div className="text-gray-500 text-right text-xs">{i18n._(t`annualized`)}</div>
                            </div>
                        </div>
                    </div>
                    {expand && (
                        <InputGroup
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.token0.id}
                            token1Address={farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                </Paper>
            )}
            {farm.type === 'KMP' && (
                <Paper className="bg-dark-800">
                    <div
                        className="grid grid-cols-3 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="flex items-center">
                            <div className="mr-4">
                                <DoubleLogo
                                    a0={'kashiLogo'}
                                    a1={farm.liquidityPair.asset.id}
                                    size={32}
                                    margin={true}
                                    higherRadius={'0px'}
                                />
                            </div>
                            <div className="hidden sm:block">{farm && farm.symbol}</div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(farm.tvl, true)} </div>
                                <div className="text-secondary text-right">
                                    {formattedNum(farm.totalAssetStaked, false)} KMP
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div className="text-right font-semibold text-xl">
                                {formattedPercent(farm.roiPerYear * 100)}{' '}
                            </div>
                        </div>
                    </div>
                    {expand && (
                        <InputGroup
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.collateral.id}
                            token1Address={farm.liquidityPair.asset.id}
                            type={'KMP'}
                            assetSymbol={farm.liquidityPair.asset.symbol}
                            assetDecimals={farm.liquidityPair.asset.decimals}
                        />
                    )}
                </Paper>
            )}
        </>
    )
}

const UserBalance = ({ farm }: any) => {
    const [expand, setExpand] = useState<boolean>(false)
    return (
        <>
            {farm.type === 'SLP' && (
                <Paper className="bg-dark-800">
                    <div
                        className="grid grid-cols-3 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="flex items-center">
                            <div className="mr-4">
                                <DoubleLogo
                                    a0={farm.liquidityPair.token0.id}
                                    a1={farm.liquidityPair.token1.id}
                                    size={26}
                                    margin={true}
                                />
                            </div>
                            <div className="hidden sm:block">
                                {farm && farm.liquidityPair.token0.symbol + '-' + farm.liquidityPair.token1.symbol}
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(farm.depositedUSD, true)} </div>
                                <div className="text-secondary text-right">
                                    {formattedNum(farm.depositedLP, false)} SLP
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(farm.pendingSushi)} </div>
                                <div className="text-secondary text-right">SUSHI</div>
                            </div>
                        </div>
                    </div>
                    {expand && (
                        <InputGroup
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.token0.id}
                            token1Address={farm.liquidityPair.token1.id}
                            type={'SLP'}
                        />
                    )}
                </Paper>
            )}
            {farm.type === 'KMP' && (
                <Paper className="bg-dark-800">
                    <div
                        className="grid grid-cols-3 py-4 px-4 cursor-pointer select-none rounded text-sm"
                        onClick={() => setExpand(!expand)}
                    >
                        <div className="flex items-center">
                            <div className="mr-4">
                                <DoubleLogo
                                    a0={'kashiLogo'}
                                    a1={farm.liquidityPair.asset.id}
                                    size={32}
                                    margin={true}
                                    higherRadius={'0px'}
                                />
                            </div>
                            <div className="hidden sm:block">{farm && farm.symbol}</div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(farm.depositedUSD, true)} </div>
                                <div className="text-secondary text-right">
                                    {formattedNum(farm.depositedLP, false)} KMP
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <div>
                                <div className="text-right">{formattedNum(farm.pendingSushi)} </div>
                                <div className="text-secondary text-right">SUSHI</div>
                            </div>
                        </div>
                    </div>
                    {expand && (
                        <InputGroup
                            pid={farm.pid}
                            pairAddress={farm.pairAddress}
                            pairSymbol={farm.symbol}
                            token0Address={farm.liquidityPair.collateral.id}
                            token1Address={farm.liquidityPair.asset.id}
                            type={'KMP'}
                            assetSymbol={farm.liquidityPair.asset.symbol}
                            assetDecimals={farm.liquidityPair.asset.decimals}
                        />
                    )}
                </Paper>
            )}
        </>
    )
}
