import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Toggle from './components/Toggle'
import { TYPE } from '../../../../theme'

interface ToggleInputPanelProps {
    text: string
    textOn: string
    textOff: string
    id?: string
    isActive: boolean
    toggle: () => void
}

export default function ToggleInputPanel({ id, text, textOn, textOff, isActive, toggle }: ToggleInputPanelProps) {
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
                    <Toggle textOn={textOn} textOff={textOff} id={id} isActive={isActive} toggle={toggle} />
                </div>
            </div>
        </div>
    )
}
