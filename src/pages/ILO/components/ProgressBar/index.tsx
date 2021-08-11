import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ProgressBarProps } from './types'

export default function ProgressBar(props: ProgressBarProps) {
    const { i18n } = useLingui()
    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">{props.percent}</span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                        {i18n._(t`Soft cap`)} {props.softCap} {props.baseTokenSymbol}
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                <div
                    style={{ width: props.percent }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                ></div>
            </div>
        </div>
    )
}
