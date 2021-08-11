import { IloStatus, IloProject } from '../../../../constants/iloProjects'

export interface CardProps {
    status: string
    bannerUrl: string
    roundPlaceHolder: string
    startDate: string
    endDate: string
    whilelist: boolean
    kyc: boolean
    description: string
    isKukuIlo: boolean
    softCap: string
    percent: string
    price: string
    tokenSymbol: string
    baseTokenSymbol: string
    presaleStatus: IloStatus
    id: string
}

export interface IloCardProps {
    project: IloProject
}
