import { IloStatus, IloProject } from '../../../../constants/iloProjects'
import { BigNumber } from 'ethers'

export interface IloDetailCardProps {
    project: IloProject
}

export interface ProjectInfoProps {
    status: IloStatus
    roundPlaceHolder: string
    whilelist: boolean
    kyc: boolean
    description: string
    website: string
    twitter: string
    telegram: string
    github: string
}

export interface IloInfoProps {
    startDate: string
    endDate: string
    startBlock: number
    endBlock: number
    softCap: string
    hardCap: string
    isKukuIlo: boolean
    tokenSymbol: string
    basicTokenSymbol: string
    presalePrice: string
    listingPrice: string
    isRequiredKuku: boolean
    balanceRequiredKuku: string
}

export interface FormActionsProps {
    price: string
    purchased: string
    deposited: string
    status: IloStatus
    maxPerBayer: BigNumber
    basicTokenSymbol: string
    tokenSymbol: string
}
