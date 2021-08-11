import React from 'react'
import KukuImage from '../../../../../assets/images/token-list/kuku.png'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { IloInfoProps } from '../types'

export default function Ilonfo(props: IloInfoProps) {
    const { i18n } = useLingui()

    return (
        <div className="flex flex-col w-full px-4 pt-6 pb-5 md:px-8 md:pt-7 md:pb-9">
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`Start block`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.startBlock} ({i18n._(t`Approx`)}: {props.startDate})
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`End block`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.endBlock} ({i18n._(t`Approx`)}: {props.endDate})
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`Soft cap`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.softCap} {props.basicTokenSymbol}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`Hard cap`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.hardCap} {props.basicTokenSymbol}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`Presale price`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.presalePrice} {props.tokenSymbol} / {i18n._(t`Per`)} {props.basicTokenSymbol}
                    </p>
                </div>
            </div>
            <div className="flex flex-wrap">
                <div className="flex flex-col flex-grow">
                    <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                        {i18n._(t`Listing price`)}
                    </p>
                    <p className="mb-3 text-lg text-high-emphesis">
                        {props.listingPrice} {props.tokenSymbol} / {i18n._(t`Per`)} {props.basicTokenSymbol}
                    </p>
                </div>
            </div>
            {props.isRequiredKuku ? (
                <>
                    <div className="flex flex-wrap">
                        <div className="flex flex-col flex-grow">
                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                {i18n._(t`Required Balance`)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 pr-1 md:w-16  mr-1 md:md:mr-2 ml-2 -mb-1.5" src={KukuImage} alt="kuku" />
                        <div className="flex flex-col justify-center">
                            <p className="text-caption2 md:text-lg font-bold text-high-emphesis">
                                {props.balanceRequiredKuku}
                            </p>
                            <p className="text-caption2 md:text-caption text-primary">KUKU</p>
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    )
}
