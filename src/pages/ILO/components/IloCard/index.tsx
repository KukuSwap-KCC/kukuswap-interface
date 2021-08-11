import React from 'react'
import { IloCardProps } from './types'
import CardInternal from './CardInternal'

export default function IloCard({ project }: IloCardProps) {
    const whitelist = true

    /*
        Getting from Smart Contract
    */

    const softCap = '365,000'

    const percent = '20%'

    const price = '100'

    const tokenSymbol = 'VCO'

    const baseTokenSymbol = 'KCS'

    const presaleStatus = 'coming_soon'

    const roundPlaceHolder = 'Round 1'

    let status = 'coming_soon'

    return (
        <CardInternal
            id={project.id}
            status={status}
            bannerUrl={project.bannerUrl}
            startDate={project.startDate}
            endDate={project.endDate}
            kyc={project.kyc}
            description={project.shortDescription}
            isKukuIlo={project.isKukuIlo}
            whilelist={whitelist}
            softCap={softCap}
            percent={percent}
            price={price}
            tokenSymbol={tokenSymbol}
            baseTokenSymbol={baseTokenSymbol}
            presaleStatus={presaleStatus}
            roundPlaceHolder={roundPlaceHolder}
        />
    )
}
