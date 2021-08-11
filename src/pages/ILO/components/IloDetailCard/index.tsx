import React from 'react'

import { IloDetailCardProps } from './types'
import VolcanoImage from '../../../../assets/images/volcano-cash.png'
import SushiImage from '../../../../assets/images/token-list/kuku.png'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ProgressBar from '../ProgressBar'
import ProjectInfo from './ProjectInfo'
import FormActions from './FormActions'
import Ilonfo from './IloInfo'
import { utils } from 'ethers'

export default function IloDetailCard({ project }: IloDetailCardProps) {
    const { i18n } = useLingui()

    //progress bar
    const percent = '20%'
    const softCap = '365,000'
    const baseTokenSymbol = 'KCS'
    const presaleStatus = 'live'

    //projact info
    const roundPlaceHolder = 'Round 1'
    const whitelist = true

    //Ilo info

    const startBlock = 2051713
    const startDate = project.startDate

    const endBlock = 2057713
    const endDate = project.endDate

    const hardCap = '700,000'
    const isKukuIlo = project.isKukuIlo
    const tokenSymbol = 'VCO'
    const presalePrice = '100'
    const listingPrice = '160'
    const isRequiredKuku = false
    const balanceRequiredKuku = '600'

    //form action

    const price = '100'
    const purchased = '10000'
    const deposited = '100'
    const maxPerBayer = utils.parseEther('0.01')

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-row max-w-2xl w-full">
                    <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded">
                        <img src={project.bannerUrl} className="rounded-tl rounded-tr" alt="" />
                        <div className="pb-6 md:pb-9 px-3 md:px-8">
                            <ProjectInfo
                                status={presaleStatus}
                                roundPlaceHolder={roundPlaceHolder}
                                whilelist={whitelist}
                                kyc={project.kyc}
                                description={project.description}
                                website={project.website}
                                twitter={project.twitter}
                                telegram={project.telegram}
                                github={project.github}
                            />
                            {
                                //presaleStatus != 'coming_soon' ?
                                <div className="mt-5">
                                    <ProgressBar
                                        percent={percent}
                                        softCap={softCap}
                                        baseTokenSymbol={baseTokenSymbol}
                                    />
                                </div>
                                //:''
                            }
                            <FormActions
                                status={presaleStatus}
                                price={price}
                                purchased={purchased}
                                deposited={deposited}
                                basicTokenSymbol={baseTokenSymbol}
                                tokenSymbol={tokenSymbol}
                                maxPerBayer={maxPerBayer}
                            />
                        </div>
                    </div>
                </div>
                <div className="hidden md:block w-full max-w-xl mx-auto md:mx-0 md:ml-6 md:block md:w-72 border-yellow rounded bg-dark-900 text-left">
                    <Ilonfo
                        startDate={startDate}
                        startBlock={startBlock}
                        endDate={endDate}
                        endBlock={endBlock}
                        softCap={softCap}
                        hardCap={hardCap}
                        isKukuIlo={isKukuIlo}
                        tokenSymbol={tokenSymbol}
                        basicTokenSymbol={baseTokenSymbol}
                        presalePrice={presalePrice}
                        listingPrice={listingPrice}
                        isRequiredKuku={isRequiredKuku}
                        balanceRequiredKuku={balanceRequiredKuku}
                    />
                </div>
            </div>

            <div className="md:hidden w-full mx-auto mt-5 border-yellow rounded bg-dark-900 text-left">
                <Ilonfo
                    startDate={startDate}
                    startBlock={startBlock}
                    endDate={endDate}
                    endBlock={endBlock}
                    softCap={softCap}
                    hardCap={hardCap}
                    isKukuIlo={isKukuIlo}
                    tokenSymbol={tokenSymbol}
                    basicTokenSymbol={baseTokenSymbol}
                    presalePrice={presalePrice}
                    listingPrice={listingPrice}
                    isRequiredKuku={isRequiredKuku}
                    balanceRequiredKuku={balanceRequiredKuku}
                />
            </div>
        </>
    )
}
