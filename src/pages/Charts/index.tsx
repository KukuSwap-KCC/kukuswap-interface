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
    const chartContainerRef = useRef<any>()

    const [timeWindow, setTimeWindow] = useState(timeframeOptions.WEEK)

    const KUKU = new Token(321, '0x509195A9d762BC6F3282c874156bd2E45dE86a10', 18, 'KUKU', 'KuKu Token')

    const chart = useRef<any>()
    const preloader = useRef<any>()

    const resizeObserver = useRef<any>()

    const chainId = 321
    const [showSearch, setShowSearch] = useState<boolean>(false)

    const [show15MinTimeFrame, setShow15MinTimeframe] = useState<boolean>(true)

    const [show30MinTimeFrame, setShow30MinTimeframe] = useState<boolean>(false)

    const [show1HTimeFrame, setShow1HTimeframe] = useState<boolean>(false)

    const [changeTimeFrame, setChangeTimeFrame] = useState<boolean>(false)

    const [activeField, setActiveField] = useState<number>(Fields.TOKEN1)

    const [chartCreated, setChartCreated] = useState(false)

    const [selectCurrency, setCurrencySelected] = useState(false)

    const [currency0, setCurrency0] = useState<Currency | Token>(KUKU)
    const [currency1, setCurrency1] = useState<Currency>(ETHER)

    const [pairState, pair] = usePair(currency0 ?? undefined, currency1 ?? undefined)

    const pairs = usePairs(pair?.liquidityToken.address.toLowerCase())

    const latestBlock = useBlockNumber()

    /*let token0
    let token1
    if (pairs) {
        token0 = pairs.pair.token0.symbol
        token1 = pairs.pair.token1.symbol
    }


    
    const min15Data = use15MinRateData(pair?.liquidityToken.address.toLowerCase(), timeWindow)
   

    const min15Rate0 = min15Data && min15Data[0]
    const min15Rate1 = min15Data && min15Data[1]

    const min30Data = use30MinRateData(pair?.liquidityToken.address.toLowerCase(), timeWindow)
    const min30Rate0 = min30Data && min30Data[0]
    const min30Rate1 = min30Data && min30Data[1]


    const hourlyData = useHourlyRateData(pair?.liquidityToken.address.toLowerCase(), timeWindow)
    const hourlyRate0 = hourlyData && hourlyData[0]
    const hourlyRate1 = hourlyData && hourlyData[1]


    let formattedData: any
    let formattedData15: any
    let formattedData30: any
    let formattedData60: any

    if (token0 == currency0.symbol) {
        formattedData15 = min15Rate1?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })

        formattedData30 = min30Rate1?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })

        formattedData60 = hourlyRate1?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })
    } else {
        formattedData15 = min15Rate0?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })

        formattedData30 = min30Rate0?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })

        formattedData60 = hourlyRate0?.map((entry: any) => {
            return {
                time: parseFloat(entry.timestamp),
                open: parseFloat(entry.open),
                low: parseFloat(entry.open),
                close: parseFloat(entry.close),
                high: parseFloat(entry.close)
            }
        })
    }
    
    console.log('formatted15')
    console.log(formattedData15)

    if (show15MinTimeFrame) {
        formattedData = formattedData15
    }

    if (show30MinTimeFrame) {
        formattedData = formattedData30
    }


    if (show1HTimeFrame) {
        formattedData = formattedData60
    }
    */

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

    const handle15MinTimeFrameSelect = () => {
        setShow15MinTimeframe(true)
        setShow30MinTimeframe(false)
        setShow1HTimeframe(false)
        setChangeTimeFrame(true)

        preloader.current.className = 'm-auto lg:mt-28'
        chartContainerRef.current.className = 'hidden'
    }

    const handle30MinTimeFrameSelect = () => {
        setShow15MinTimeframe(false)
        setShow30MinTimeframe(true)
        setShow1HTimeframe(false)
        setChangeTimeFrame(true)

        preloader.current.className = 'm-auto lg:mt-28'
        chartContainerRef.current.className = 'hidden'
    }

    const handle1HTimeFrameSelect = () => {
        setShow15MinTimeframe(false)
        setShow30MinTimeframe(false)
        setShow1HTimeframe(true)
        setChangeTimeFrame(true)

        preloader.current.className = 'm-auto lg:mt-28'
        chartContainerRef.current.className = 'hidden'
    }

    const handleSearchDismiss = useCallback(() => {
        setShowSearch(false)
    }, [setShowSearch])

    /*useEffect(() => {
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

        if (!chartCreated && formattedData) {

            chartContainerRef.current.className = "chart-container w-2xl w-full"
            preloader.current.className = "hidden"

            chart.current = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                layout: {
                    backgroundColor: 'rgba(26, 25, 16)',
                    textColor: 'rgb(255, 255, 255)'
                },
                grid: {
                    vertLines: {
                        color: '#334158'
                    },
                    horzLines: {
                        color: '#334158'
                    }
                },
                crosshair: {
                    mode: CrosshairMode.Normal
                },
                timeScale: {
                    borderColor: '#485c7b'
                }
            })

            chart.current.applyOptions({
                priceScale: {
                    position: 'right',
                    mode: 1,
                    autoScale: true,
                    invertScale: false,
                    alignLabels: true,
                    borderVisible: true,
                    borderColor: '#ffce2b',
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25
                    }
                }
            })

            chart.current.applyOptions({
                watermark: {
                    color: '#FFFFFF',
                    visible: true,
                    text: cur0 + '/' + cur1,
                    fontSize: 24,
                    horzAlign: 'left',
                    vertAlign: 'bottom'
                }
            })

            chart.current.applyOptions({
                crosshair: {
                    vertLine: {
                        color: '#FFCE2B',
                        width: 0.5,
                        style: 1,
                        visible: true,
                        labelVisible: true,
                        labelBackgroundColor: '#FFCE2B'
                    },
                    horzLine: {
                        color: '#FFCE2B',
                        width: 0.5,
                        style: 0,
                        visible: true,
                        labelVisible: true,
                        labelBackgroundColor: '#FFCE2B'
                    },
                    mode: 1
                }
            })

            chart.current.applyOptions({
                timeScale: {
                    rightOffset: 12,
                    barSpacing: 3,
                    fixLeftEdge: true,
                    lockVisibleTimeRangeOnResize: true,
                    rightBarStaysOnScroll: true,
                    borderVisible: false,
                    borderColor: '#fff000',
                    visible: true,
                    timeVisible: true,
                    secondsVisible: false
                }
            })
            
            const candleSeries = chart.current.addCandlestickSeries({
                upColor: '#4bffb5',
                downColor: '#ff4976',
                borderDownColor: '#ff4976',
                borderUpColor: '#4bffb5',
                wickDownColor: '#838ca1',
                wickUpColor: '#838ca1'
            })

            if (formattedData) {
                console.log(formattedData)

                candleSeries.setData(formattedData)
                candleSeries.applyOptions({
                    priceFormat: {
                        type: 'price',
                        precision: 8,
                        minMove: 0.000001
                    }
                })
            }

            setChartCreated(chart.current)
        
            chart.current.timeScale().fitContent()
        }

        return () => {
            if (chartCreated && (selectCurrency || changeTimeFrame)) {
                const chart: any = chartCreated
                chart.remove()
                setCurrencySelected(false)
                setChartCreated(false)
                setChangeTimeFrame(false)
                formattedData = []
            }
        }
    }, [pair, min15Data, setChartCreated, selectCurrency, changeTimeFrame])

    // Resize chart on container resizes.
    useEffect(() => {

        if (chartCreated) {
        resizeObserver.current = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect


                const chart :any = chartCreated 
                chart.applyOptions({ width, height })
                setTimeout(() => {
                    chart.timeScale().fitContent()
                }, 0)
        })

        resizeObserver.current.observe(chartContainerRef.current)
        }

        return () => { 
            if (chartCreated) {
                resizeObserver.current.disconnect()
            }
        }
    }, [chartCreated])
    */

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
            <div className="App border-yellow">
                {pair ? (
                    <TVChartContainer
                        pairAddress={pair.liquidityToken?.address.toLowerCase()}
                        latestBlock={latestBlock}
                    />
                ) : (
                    ''
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
