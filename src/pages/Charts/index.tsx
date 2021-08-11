/* eslint-disable  @typescript-eslint/no-empty-interface */

/* eslint-disable no-restricted-globals */

/* eslint no-restricted-globals:0 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { createChart, CrosshairMode, IChartApi } from 'lightweight-charts'
import { priceData } from './priceData'
import CurrencySearchModal from '../../components/SearchModal/CurrencySearchModal'
import { TVChartContainer } from '../../components/ProCharts'
import { currencyId } from '../../utils/currencyId'
import CurrencyLogo from '../../components/CurrencyLogo'
import { ButtonDropdownLight, ButtonLight, ButtonPrimaryNormal, ButtonPrimary } from '../../components/ButtonLegacy'
import { Currency, ETHER, JSBI, TokenAmount, Token, ChainId } from '@kukuswap/sdk'
import Row from '../../components/Row'
import { Text } from 'rebass'
import './styles.css'
import { t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Helmet } from 'react-helmet'
import { use15MinRateData, use30MinRateData, useHourlyRateData, getRateData } from '../../contexts/PairData'

import { timeframeOptions } from '../../constants'
import { PairState, usePair } from '../../data/Reserves'
import ChartAnimationLogo from '../../assets/images/chartAnimation.gif'
import usePairs from '../../hooks/usePairs'
import { CurrencySelect } from 'components'
import { useBlockNumber } from 'state/application/hooks'
import { features } from 'process'

enum Fields {
    TOKEN0 = 0,
    TOKEN1 = 1
}

export default function App() {
    const { i18n } = useLingui()

    const KUKU = new Token(321, '0x509195A9d762BC6F3282c874156bd2E45dE86a10', 18, 'KUKU', 'KuKu Token')

    const chainId = 321
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)

    const [selectCurrency, setCurrencySelected] = useState(false)

    const [currency0, setCurrency0] = useState<Currency | Token>(KUKU)
    const [currency1, setCurrency1] = useState<Currency>(ETHER)

    const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)

    const pairs = usePairs(pair?.liquidityToken.address.toLowerCase())

    const latestBlock = useBlockNumber()

    const handleCurrencySelect = useCallback(
        (currency: Currency) => {
            if (activeField === Fields.TOKEN0) {
                setCurrency0(currency)
            } else {
                setCurrency1(currency)
            }

            setCurrencySelected(true)
        },
        [activeField]
    )

    const handleSearchDismiss = useCallback(() => {
        setShowSearch(false)
    }, [setShowSearch])

    let cur0: string | undefined = 'KUKU'
    if (currency0) {
        if (currency0?.symbol != 'ETH') {
            cur0 = currency0?.symbol
        }
    }

    let cur1: string | undefined = 'KCS'
    if (currency1) {
        if (currency1?.symbol != 'ETH') {
            cur1 = currency1?.symbol
        }
    }

    return (
        <div className="App">
            <Helmet>
                <title>Charts | Kuku</title>
            </Helmet>
            <div className="rounded flex flex-col w-full">
                <div className="flex flex-row">
                    <div className="max-w-sm">
                        <div>
                            <ButtonDropdownLight
                                onClick={() => {
                                    setShowSearch(true)
                                    setActiveField(Fields.TOKEN0)
                                }}
                            >
                                {currency0 ? (
                                    <Row>
                                        <CurrencyLogo currency={currency0} />
                                        <Text fontWeight={500} fontSize={20} marginLeft={'12px'}>
                                            {currency0.getSymbol(chainId)}
                                        </Text>
                                    </Row>
                                ) : (
                                    <Text fontWeight={500} fontSize={20} marginLeft={'12px'}>
                                        {i18n._(t`Select a token`)}
                                    </Text>
                                )}
                            </ButtonDropdownLight>
                        </div>
                    </div>
                    <div className="flex  max-w-sm flex ml-1">
                        <div>
                            <ButtonDropdownLight
                                onClick={() => {
                                    setShowSearch(true)
                                    setActiveField(Fields.TOKEN1)
                                }}
                            >
                                {currency1 ? (
                                    <Row>
                                        <CurrencyLogo currency={currency1} />
                                        <Text fontWeight={500} fontSize={20} marginLeft={'12px'}>
                                            {currency1.getSymbol(chainId)}
                                        </Text>
                                    </Row>
                                ) : (
                                    <Text fontWeight={500} fontSize={20} marginLeft={'12px'}>
                                        {i18n._(t`Select a token`)}
                                    </Text>
                                )}
                            </ButtonDropdownLight>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:grid xl:grid-cols-2 xl:gap-2">
                <div className="flex mb-5 ">
                    <div className="flex max-w-sm w-full">
                        {currency0 && currency1 ? (
                            <a
                                href={`/#/swap?inputCurrency=${currencyId(currency0)}&outputCurrency=${currencyId(
                                    currency1
                                )}`}
                                className="max-w-sm w-full"
                            >
                                <ButtonPrimary>{i18n._(t`Swap`)}</ButtonPrimary>
                            </a>
                        ) : (
                            ''
                        )}
                    </div>

                    <div className="ml-10 flex max-w-sm w-full">
                        {currency0 && currency1 ? (
                            <a
                                href={`/#/add/${currencyId(currency0)}/${currencyId(currency1)}`}
                                className="max-w-sm w-full"
                            >
                                <ButtonPrimary>{i18n._(t`Add Liquidity`)}</ButtonPrimary>
                            </a>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>

            <div className="App">
                {pair ? (
                    <TVChartContainer
                        pairAddress={pair.liquidityToken?.address.toLowerCase()}
                        latestBlock={latestBlock}
                        baseCurrencySymbol={pair.token0.symbol}
                        baseCurrencyId={cur0 ?? 'KUKU'}
                        baseCurrency={currency0 ?? KUKU}
                        otherCurrencyId={cur1 ?? 'KCS'}
                        otherCurrency={currency1 ?? ETHER}
                    />
                ) : (
                    <img src={ChartAnimationLogo} alt="" className="m-auto border-yellow" />
                )}

                <CurrencySearchModal
                    isOpen={showSearch}
                    onCurrencySelect={handleCurrencySelect}
                    onDismiss={handleSearchDismiss}
                    showCommonBases
                    selectedCurrency={(activeField === Fields.TOKEN0 ? currency1 : currency0) ?? undefined}
                />
            </div>
        </div>
    )
}
