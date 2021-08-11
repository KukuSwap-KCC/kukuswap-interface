import React from 'react'
import { ButtonLight } from '../../../../../components/ButtonLegacy'
import { CardProps } from '../types'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ProgressBar from '../../ProgressBar'

export default function CardInternal(props: CardProps) {
    const { i18n } = useLingui()

    let status = 'coming_soon'

    if (props.status == 'live') {
        status = 'Live'
    } else if (props.status == 'coming_soon') {
        status = 'Coming soon'
    } else if (props.status == 'finished') {
        status = 'finished'
    } else if (props.status == 'waiting_lp') {
        status = 'LP generation'
    } else if (props.status == 'presale_finished') {
        status = 'Presale finished'
    } else {
        status = 'Failed'
    }

    return (
        <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded mb-5">
            <a href="#/ilo?project=address">
                <img src={props.bannerUrl} className="rounded-tl rounded-tr" alt="" />
            </a>
            <div className="pb-6 md:pb-9 px-3 md:px-8">
                <div className="justify-between items-center w-full mt-6">
                    <div className="mb-5 md:text-right">
                        <p>
                            <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-pink-red rounded-full text-white mb-3">
                                {props.roundPlaceHolder}: {status}
                            </span>
                            {props.whilelist && (
                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-dark-blue rounded-full text-white mb-3">
                                    {i18n._(t`Whitelist`)}
                                </span>
                            )}

                            {props.kyc && (
                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-blue rounded-full text-white mb-3">
                                    {i18n._(t`KYC`)}
                                </span>
                            )}
                        </p>
                    </div>
                    <p className="mb-3 md:text-right">
                        {props.presaleStatus == 'coming_soon' ? (
                            <span className="md:border-gray-400 md:border-2rounded px-4 py-1 w-64 text-center">
                                {i18n._(t`Presale start`)} {props.startDate}
                            </span>
                        ) : (
                            props.presaleStatus == 'live' && (
                                <span className="md:border-gray-400 md:border-2rounded px-4 py-1 w-64 text-center">
                                    {i18n._(t`Presale until`)} {props.endDate}
                                </span>
                            )
                        )}
                    </p>
                    <p className="text-large md:text-h5 font-bold text-high-emphesis">{i18n._(t`Project Overview`)}</p>
                    <div className="my-5 text-justify">{props.description}</div>
                </div>
                <div className="mt-5">
                    <ProgressBar
                        percent={props.percent}
                        softCap={props.softCap}
                        baseTokenSymbol={props.baseTokenSymbol}
                    />
                </div>
                <div className="flex justify-between items-center w-full mt-6">
                    <div className="text-high-emphesis md:w-72">
                        <a href={'#/ilo?project=' + props.id}>
                            {props.presaleStatus == 'coming_soon' ? (
                                <ButtonLight>{i18n._(t`More details`)}</ButtonLight>
                            ) : props.presaleStatus == 'live' ? (
                                <ButtonLight>{i18n._(t`Purchase`)}</ButtonLight>
                            ) : (
                                <ButtonLight>{i18n._(t`Withdraw`)}</ButtonLight>
                            )}
                        </a>
                    </div>
                    <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                        {i18n._(t`Price`)}: 1 {props.baseTokenSymbol} = {props.price} {props.tokenSymbol}
                    </div>
                </div>
            </div>
        </div>
    )
}
