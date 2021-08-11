export type IloStatus = 'coming_soon' | 'live' | 'finished'

export interface IloProject {
    id: string
    isActive: boolean
    address: string
    name: string
    shortDescription: string
    description: string
    bannerUrl: string
    isKukuIlo: boolean
    startDate: string
    endDate: string
    kyc: boolean
    website: string
    telegram: string
    twitter: string
    github: string
}

const iloProjects: IloProject[] = [
    {
        id: 'vulcanocash',
        isActive: false,
        address: '',
        name: 'Vulcano Finance',
        shortDescription:
            'Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the Kucoin Community Chain based on zkSNARKs. It improves transaction privacy by breaking the on-chain link between the recipient and destination addresses. It uses a smart contract that accepts KCS deposits that can be withdrawn by a different address. Whenever KCS is withdrawn by the new address, there is no way to link the withdrawal to the deposit, ensuring complete privacy.',
        description:
            'Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the Kucoin Community Chain based on zkSNARKs. It improves transaction privacy by breaking the on-chain link between the recipient and destination addresses. It uses a smart contract that accepts KCS deposits that can be withdrawn by a different address. Whenever KCS is withdrawn by the new address, there is no way to link the withdrawal to the deposit, ensuring complete privacy. To make a deposit user generates a secret and sends its hash (called a commitment) along with the deposit amount to the Volcano smart contract. The contract accepts the deposit and adds the commitment to its list of deposits. Later, the user decides to make a withdrawal. To do that, the user should provide a proof that he or she possesses a secret to an unspent commitment from the smart contract’s list of deposits. zkSnark technology allows that to happen without revealing which exact deposit corresponds to this secret. The smart contract will check the proof, and transfer deposited funds to the address specified for withdrawal. An external observer will be unable to determine which deposit this withdrawal came from.',
        bannerUrl: 'https://raw.githubusercontent.com/KukuSwap-KCC/icons/main/ilo/volcano-cash.png',
        isKukuIlo: false,
        startDate: 'Sun 1 Aug 16:28',
        endDate: 'Thu 12 Aug 16:26',
        kyc: true,
        website: 'https://kukuswap.io',
        telegram: 'https://t.me/kukuswapio',
        twitter: 'https://twitter.com/kukuswapio',
        github: 'https://github.com/kukuswap_kcc'
    },
    {
        id: 'kukuswap',
        isActive: true,
        address: '',
        name: 'Vulcano Finance',
        shortDescription:
            'Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the Kucoin Community Chain based on zkSNARKs. It improves transaction privacy by breaking the on-chain link between the recipient and destination addresses. It uses a smart contract that accepts KCS deposits that can be withdrawn by a different address. Whenever KCS is withdrawn by the new address, there is no way to link the withdrawal to the deposit, ensuring complete privacy.',
        description:
            'Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the Kucoin Community Chain based on zkSNARKs. It improves transaction privacy by breaking the on-chain link between the recipient and destination addresses. It uses a smart contract that accepts KCS deposits that can be withdrawn by a different address. Whenever KCS is withdrawn by the new address, there is no way to link the withdrawal to the deposit, ensuring complete privacy. To make a deposit user generates a secret and sends its hash (called a commitment) along with the deposit amount to the Volcano smart contract. The contract accepts the deposit and adds the commitment to its list of deposits. Later, the user decides to make a withdrawal. To do that, the user should provide a proof that he or she possesses a secret to an unspent commitment from the smart contract’s list of deposits. zkSnark technology allows that to happen without revealing which exact deposit corresponds to this secret. The smart contract will check the proof, and transfer deposited funds to the address specified for withdrawal. An external observer will be unable to determine which deposit this withdrawal came from.',
        bannerUrl: 'https://raw.githubusercontent.com/KukuSwap-KCC/icons/main/ilo/kukuswap.jpeg',
        isKukuIlo: true,
        startDate: 'Sun 1 Aug 16:28',
        endDate: 'Thu 12 Aug 16:26',
        kyc: true,
        website: 'https://kukuswap.io',
        telegram: 'https://t.me/kukuswapio',
        twitter: 'https://twitter.com/kukuswapio',
        github: 'https://github.com/kukuswap_kcc'
    }
]

export default iloProjects
