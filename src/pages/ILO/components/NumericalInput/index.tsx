import React, { useCallback, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Input as NumericalInput } from '../../../../components/NumericalInput'
import { ExternalLink, TYPE } from '../../../../theme'

interface NumericalInputPanelProps {
    placeholder: string
    text: string
    value: string
    onUserInput: (value: string) => void
    id: string
}

export default function NumericalInputPanel({ placeholder, text, value, onUserInput, id }: NumericalInputPanelProps) {
    const theme = useContext(ThemeContext)

    return (
        <div id={id} className="rounded bg-dark-800 p-5">
            <div className="flex flex-col space-y-3  justify-between">
                <div className="w-full">
                    <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
                        {text}
                    </TYPE.black>
                </div>
                <div className="flex items-center rounded font-bold text-xl w-full">
                    <NumericalInput
                        className="token-amount-input"
                        value={value}
                        onUserInput={val => {
                            onUserInput(val)
                        }}
                        placeholder={placeholder}
                    />
                </div>
            </div>
        </div>
    )
}
