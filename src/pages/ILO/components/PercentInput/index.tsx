import React, { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Input as PercentInput } from '../../../../components/PercentInput'
import { ExternalLink, TYPE } from '../../../../theme'

interface PercentInputPanelProps {
    value: string
    onUserInput: (value: string) => void
    id: string
}

export default function PercentInputPanel({ value, onUserInput, id }: PercentInputPanelProps) {
    const theme = useContext(ThemeContext)

    return (
        <div id={id} className="rounded bg-dark-800 p-5">
            <div className="flex flex-col space-y-3  justify-between">
                <div className="w-full">
                    <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
                        Percent of raised KCS used for liquidity
                    </TYPE.black>
                </div>
                <div className="flex items-center rounded bg-dark-900 font-bold text-xl p-3 w-full">
                    <PercentInput
                        className="token-amount-input"
                        value={value}
                        onUserInput={val => {
                            onUserInput(val)
                        }}
                        align="right"
                    />
                    <div className="font-bold text-xl pl-2">%</div>
                </div>
            </div>
        </div>
    )
}
