import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect, useState } from 'react'
import { HOURLY_PAIR_RATES, GET_BLOCKS } from '../apollo/queries'

import { kukuswap, blockClient } from '../apollo/client'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useBlockNumber } from '../state/application/hooks'
import { timeframeOptions } from '../constants'

dayjs.extend(utc)

const PairDataContext = createContext()

const UPDATE_15MIN_DATA = 'UPDATE_15MIN_DATA'
const UPDATE_30MIN_DATA = 'UPDATE_30MIN_DATA'
const UPDATE_HOURLY_DATA = 'UPDATE_HOURLY_DATA'

function usePairDataContext() {
    return useContext(PairDataContext)
}

const getHourlyRateData = async (pairAddress, startTime, latestBlock) => {
    try {
        const utcEndTime = dayjs.utc()

        console.log(utcEndTime.unix())

        let time = startTime

        // create an array of hour start times until we reach current hour
        const timestamps = []
        while (time <= utcEndTime.unix()) {
            timestamps.push(time)
            time += 3600
        }

        // backout if invalid timestamp format
        if (timestamps.length === 0) {
            return []
        }

        // once you have all the timestamps, get the blocks for each timestamp in a bulk query
        let blocks

        console.log(timestamps)

        blocks = await getBlocksFromTimestamps(timestamps, 500)

        // catch failing case
        if (!blocks || blocks?.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter(b => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        const result = await splitQuery(HOURLY_PAIR_RATES, kukuswap, [pairAddress], blocks, 100)

        // format token ETH price results
        let values = []
        for (var row in result) {
            let timestamp = row.split('t')[1]
            if (timestamp && result[row]) {
                values.push({
                    timestamp,
                    rate0: parseFloat(result[row]?.token0Price),
                    rate1: parseFloat(result[row]?.token1Price)
                })
            }
        }

        let formattedHistoryRate0 = []
        let formattedHistoryRate1 = []

        // for each hour, construct the open and close price
        for (let i = 0; i < values.length - 1; i++) {
            formattedHistoryRate0.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate0),
                close: parseFloat(values[i + 1].rate0)
            })
            formattedHistoryRate1.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate1),
                close: parseFloat(values[i + 1].rate1)
            })
        }

        return [formattedHistoryRate0, formattedHistoryRate1]
    } catch (e) {
        console.log(e)
        return [[], []]
    }
}

export const getRateData = async (pairAddress, latestBlock, window) => {
    try {
        const currentTime = dayjs.utc()
        const utcEndTime = dayjs.utc()

        console.log(utcEndTime.unix())

        const windowSize = 'week'
        const startTime = currentTime
            .subtract(1, windowSize)
            .startOf('hour')
            .unix()

        let time = startTime

        // create an array of hour start times until we reach current hour
        const timestamps = []
        while (time <= utcEndTime.unix()) {
            timestamps.push(time)
            time += window
        }

        // backout if invalid timestamp format
        if (timestamps.length === 0) {
            return []
        }

        // once you have all the timestamps, get the blocks for each timestamp in a bulk query
        let blocks

        blocks = await getBlocksFromTimestamps(timestamps, 500)

        // catch failing case
        if (!blocks || blocks?.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter(b => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        const result = await splitQuery(HOURLY_PAIR_RATES, kukuswap, [pairAddress], blocks, 100)

        // format token ETH price results
        let values = []
        for (var row in result) {
            let timestamp = row.split('t')[1]
            if (timestamp && result[row]) {
                values.push({
                    timestamp,
                    rate0: parseFloat(result[row]?.token0Price),
                    rate1: parseFloat(result[row]?.token1Price),
                    volumeToken0: parseFloat(result[row]?.volumeToken0),
                    volumeToken1: parseFloat(result[row]?.volumeToken1)
                })
            }
        }

        let formattedHistoryRate0 = []
        let formattedHistoryRate1 = []

        // for each hour, construct the open and close price
        for (let i = 0; i < values.length - 1; i++) {
            formattedHistoryRate0.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate0),
                close: parseFloat(values[i + 1].rate0),
                volume: parseFloat(values[i].volumeToken0)
            })
            formattedHistoryRate1.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate1),
                close: parseFloat(values[i + 1].rate1),
                volume: parseFloat(values[i].volumeToken1)
            })
        }

        return [formattedHistoryRate0, formattedHistoryRate1]
    } catch (e) {
        console.log(e)
        return [[], []]
    }
}

const get15MinRateData = async (pairAddress, startTime, latestBlock) => {
    try {
        const utcEndTime = dayjs.utc()

        console.log(utcEndTime.unix())

        let time = startTime

        // create an array of hour start times until we reach current hour
        const timestamps = []
        while (time <= utcEndTime.unix()) {
            timestamps.push(time)
            time += 900
        }

        // backout if invalid timestamp format
        if (timestamps.length === 0) {
            return []
        }

        // once you have all the timestamps, get the blocks for each timestamp in a bulk query
        let blocks

        console.log('timestamps')
        console.log(timestamps)

        blocks = await getBlocksFromTimestamps(timestamps, 500)

        // catch failing case
        if (!blocks || blocks?.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter(b => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        const result = await splitQuery(HOURLY_PAIR_RATES, kukuswap, [pairAddress], blocks, 100)

        // format token ETH price results
        let values = []
        for (var row in result) {
            let timestamp = row.split('t')[1]
            if (timestamp && result[row]) {
                values.push({
                    timestamp,
                    rate0: parseFloat(result[row]?.token0Price),
                    rate1: parseFloat(result[row]?.token1Price)
                })
            }
        }

        let formattedHistoryRate0 = []
        let formattedHistoryRate1 = []

        // for each hour, construct the open and close price
        for (let i = 0; i < values.length - 1; i++) {
            formattedHistoryRate0.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate0),
                close: parseFloat(values[i + 1].rate0)
            })
            formattedHistoryRate1.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate1),
                close: parseFloat(values[i + 1].rate1)
            })
        }

        return [formattedHistoryRate0, formattedHistoryRate1]
    } catch (e) {
        console.log(e)
        return [[], []]
    }
}

const get30MinRateData = async (pairAddress, startTime, latestBlock) => {
    try {
        const utcEndTime = dayjs.utc()

        console.log(utcEndTime.unix())

        let time = startTime

        // create an array of hour start times until we reach current hour
        const timestamps = []
        while (time <= utcEndTime.unix()) {
            timestamps.push(time)
            time += 1800
        }

        // backout if invalid timestamp format
        if (timestamps.length === 0) {
            return []
        }

        // once you have all the timestamps, get the blocks for each timestamp in a bulk query
        let blocks

        console.log(timestamps)

        blocks = await getBlocksFromTimestamps(timestamps, 500)

        // catch failing case
        if (!blocks || blocks?.length === 0) {
            return []
        }

        if (latestBlock) {
            blocks = blocks.filter(b => {
                return parseFloat(b.number) <= parseFloat(latestBlock)
            })
        }

        const result = await splitQuery(HOURLY_PAIR_RATES, kukuswap, [pairAddress], blocks, 100)

        // format token ETH price results
        let values = []
        for (var row in result) {
            let timestamp = row.split('t')[1]
            if (timestamp && result[row]) {
                values.push({
                    timestamp,
                    rate0: parseFloat(result[row]?.token0Price),
                    rate1: parseFloat(result[row]?.token1Price)
                })
            }
        }

        let formattedHistoryRate0 = []
        let formattedHistoryRate1 = []

        // for each hour, construct the open and close price
        for (let i = 0; i < values.length - 1; i++) {
            formattedHistoryRate0.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate0),
                close: parseFloat(values[i + 1].rate0)
            })
            formattedHistoryRate1.push({
                timestamp: values[i].timestamp,
                open: parseFloat(values[i].rate1),
                close: parseFloat(values[i + 1].rate1)
            })
        }

        return [formattedHistoryRate0, formattedHistoryRate1]
    } catch (e) {
        console.log(e)
        return [[], []]
    }
}

/**
 * @notice Fetches block objects for an array of timestamps.
 * @dev blocks are returned in chronological order (ASC) regardless of input.
 * @dev blocks are returned at string representations of Int
 * @dev timestamps are returns as they were provided; not the block time.
 * @param {Array} timestamps
 */
export async function getBlocksFromTimestamps(timestamps, skipCount = 500) {
    if (timestamps?.length === 0) {
        return []
    }

    let fetchedData = await splitQuery(GET_BLOCKS, blockClient, [], timestamps, skipCount)

    let blocks = []
    if (fetchedData) {
        for (var t in fetchedData) {
            if (fetchedData[t].length > 0) {
                blocks.push({
                    timestamp: t.split('t')[1],
                    number: fetchedData[t][0]['number']
                })
            }
        }
    }
    return blocks
}

export async function splitQuery(query, localClient, vars, list, skipCount = 100) {
    let fetchedData = {}
    let allFound = false
    let skip = 0

    while (!allFound) {
        let end = list.length
        if (skip + skipCount < list.length) {
            end = skip + skipCount
        }
        let sliced = list.slice(skip, end)
        let result = await localClient.query({
            query: query(...vars, sliced),
            fetchPolicy: 'cache-first'
        })
        fetchedData = {
            ...fetchedData,
            ...result.data
        }
        if (Object.keys(result.data).length < skipCount || skip + skipCount > list.length) {
            allFound = true
        } else {
            skip += skipCount
        }
    }

    return fetchedData
}

function reducer(state, { type, payload }) {
    console.log('reducer')
    console.log(state)
    console.log(type)
    console.log(payload)

    switch (type) {
        case UPDATE_HOURLY_DATA: {
            const { address, hourlyData, timeWindow } = payload
            return {
                ...state,
                [address]: {
                    ...state?.[address],
                    hourlyData: {
                        ...state?.[address]?.hourlyData,
                        [timeWindow]: hourlyData
                    }
                }
            }
        }

        case UPDATE_15MIN_DATA: {
            const { address, min15Data, timeWindow } = payload

            console.log(payload)

            return {
                ...state,
                [address]: {
                    ...state?.[address],
                    min15Data: {
                        ...state?.[address]?.min15Data,
                        [timeWindow]: min15Data
                    }
                }
            }
        }

        case UPDATE_30MIN_DATA: {
            const { address, min30Data, timeWindow } = payload
            return {
                ...state,
                [address]: {
                    ...state?.[address],
                    min30Data: {
                        ...state?.[address]?.min30Data,
                        [timeWindow]: min30Data
                    }
                }
            }
        }

        default: {
            throw Error(`Unexpected action type in DataContext reducer: '${type}'.`)
        }
    }
}

export default function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, {})

    const updateHourlyData = useCallback((address, hourlyData, timeWindow) => {
        dispatch({
            type: UPDATE_HOURLY_DATA,
            payload: { address, hourlyData, timeWindow }
        })
    }, [])

    const update15MinData = useCallback((address, min15Data, timeWindow) => {
        dispatch({
            type: UPDATE_15MIN_DATA,
            payload: { address, min15Data, timeWindow }
        })
    }, [])

    const update30MinData = useCallback((address, min30Data, timeWindow) => {
        dispatch({
            type: UPDATE_30MIN_DATA,
            payload: { address, min30Data, timeWindow }
        })
    }, [])

    return (
        <PairDataContext.Provider
            value={useMemo(() => [state, { update15MinData, update30MinData, updateHourlyData }], [
                state,
                { update15MinData, update30MinData, updateHourlyData }
            ])}
        >
            {children}
        </PairDataContext.Provider>
    )
}

export function use15MinRateData(pairAddress, timeWindow) {
    const [state, { update15MinData }] = usePairDataContext()

    const chartData = state?.[pairAddress]?.min15Data?.[timeWindow]

    console.log('chart data')
    console.log(chartData)
    const latestBlock = useBlockNumber()

    useEffect(() => {
        const currentTime = dayjs.utc()

        const windowSize = timeWindow === timeframeOptions.MONTH ? 'month' : 'week'
        const startTime =
            timeWindow === timeframeOptions.ALL_TIME
                ? 1589760000
                : currentTime
                      .subtract(1, windowSize)
                      .startOf('hour')
                      .unix()

        async function fetch() {
            let data = await get15MinRateData(pairAddress, startTime, latestBlock)

            console.log('update Data')

            console.log(update15MinData)

            update15MinData(pairAddress, data, timeWindow)
        }
        if (!chartData) {
            fetch()
        }
    }, [chartData, timeWindow, pairAddress])

    return chartData
}

export function use30MinRateData(pairAddress, timeWindow) {
    const [state, { update30MinData }] = usePairDataContext()
    const chartData = state?.[pairAddress]?.min30Data?.[timeWindow]
    const latestBlock = useBlockNumber()

    useEffect(() => {
        const currentTime = dayjs.utc()

        const windowSize = timeWindow === timeframeOptions.MONTH ? 'month' : 'week'
        const startTime =
            timeWindow === timeframeOptions.ALL_TIME
                ? 1589760000
                : currentTime
                      .subtract(1, windowSize)
                      .startOf('hour')
                      .unix()

        async function fetch() {
            let data = await get30MinRateData(pairAddress, startTime, latestBlock)

            update30MinData(pairAddress, data, timeWindow)
        }
        if (!chartData) {
            fetch()
        }
    }, [chartData, timeWindow, pairAddress])

    return chartData
}

export function useHourlyRateData(pairAddress, timeWindow) {
    const [state, { updateHourlyData }] = usePairDataContext()
    const chartData = state?.[pairAddress]?.hourlyData?.[timeWindow]
    const latestBlock = useBlockNumber()

    useEffect(() => {
        const currentTime = dayjs.utc()

        const windowSize = timeWindow === timeframeOptions.MONTH ? 'month' : 'week'
        const startTime =
            timeWindow === timeframeOptions.ALL_TIME
                ? 1589760000
                : currentTime
                      .subtract(1, windowSize)
                      .startOf('hour')
                      .unix()

        async function fetch() {
            let data = await getHourlyRateData(pairAddress, startTime, latestBlock)

            updateHourlyData(pairAddress, data, timeWindow)
        }
        if (!chartData) {
            fetch()
        }
    }, [chartData, timeWindow, pairAddress])

    return chartData
}
