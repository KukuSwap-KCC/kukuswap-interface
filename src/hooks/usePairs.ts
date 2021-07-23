import { BigNumber } from '@ethersproject/bignumber'
import { useCallback, useEffect, useState } from 'react'
import { kukuswap } from 'apollo/client'
import { PAIR } from 'apollo/queries'

const usePairs = (pairAddress: string | undefined) => {
    const [pair, setPair] = useState<any | undefined>()
    const fetchPairs = useCallback(async () => {
        if (pairAddress) {
            const id = pairAddress
            const results = await Promise.all([
                kukuswap.query({
                    // results[0]
                    query: PAIR,
                    variables: { id }
                })
            ])

            const pair = results[0]?.data.pair

            setPair({ pair: pair })
        }
    }, [pairAddress])

    useEffect(() => {
        fetchPairs()
    }, [fetchPairs, pairAddress])

    return pair
}

export default usePairs
