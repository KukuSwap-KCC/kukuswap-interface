import { BigNumber } from '@ethersproject/bignumber'
import { useCallback, useEffect, useState } from 'react'
import { kukuswap } from 'apollo/client'
import { GET_SWAP_UPDATE_QUERY } from 'apollo/queries'

const useSwaps = (pairAddress: string, startTimeStamp: number) => {
    const [swaps, setSwaps] = useState<any | undefined>()

    const fetchSwaps = useCallback(async () => {
        const results = await Promise.all([
            kukuswap.query({
                // results[0]
                query: GET_SWAP_UPDATE_QUERY(pairAddress, startTimeStamp)
            })
        ])

        const swaps = results[0]?.data.swaps

        console.log(swaps)
    }, [])

    useEffect(() => {
        fetchSwaps()
    }, [fetchSwaps])
}

export default useSwaps
