import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Helmet } from 'react-helmet'
import { Input as NumericalInput } from '../../components/NumericalInput'
import AddressInputPanel from './components/AddressInput'
import PercentInputPanel from './components/PercentInput'
import NumericalInputPanel from './components/NumericalInput'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import SushiImage from '../../assets/images/token-list/kuku.png'
import VolcanoImage from '../../assets/images/volcano-cash.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTelegram, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import ToggleInputPanel from './components/ToggleInput'

import { ButtonDropdownLight, ButtonLight, ButtonPrimaryNormal, ButtonPrimary } from '../../components/ButtonLegacy'

const StyledNumericalInput = styled(NumericalInput)`
    caret-color: #e3e3e3;
`

const buttonStyle =
    'flex justify-center items-center w-full h-14 rounded font-bold md:font-medium md:text-lg mt-5 text-sm focus:outline-none focus:ring'
const buttonStyleEnabled = `${buttonStyle} text-black bg-gradient-to-r from-pink to-light-brown hover:opacity-90`
const buttonStyleInsufficientFunds = `${buttonStyleEnabled} opacity-60`
const buttonStyleDisabled = `${buttonStyle} text-secondary bg-dark-700`
const buttonStyleConnectWallet = `${buttonStyle} bg-pink text-black hover:bg-opacity-90`

export default function ILO() {
    const { account, chainId } = useActiveWeb3React()

    const walletConnected = !!account

    const { i18n } = useLingui()

    const parsedQs = useParsedQueryString()

    return (
        <>
            <Helmet>
                <title>KUKUSwap | ILO | Kuku</title>
            </Helmet>

            {parsedQs?.project != null ? (
                <>
                    <div className="flex flex-col justify-center">
                        <div className="text-right mb-5 px-8">
                            <a className="items-center font-medium text-secondary hover:text-primary" href="#/ilo">
                                <div className="text-base whitespace-nowrap">Go to Projects</div>
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex flex-row max-w-2xl w-full">
                                <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded">
                                    <img src={VolcanoImage} className="rounded-tl rounded-tr" alt="" />
                                    <div className="pb-6 md:pb-9 px-3 md:px-8">
                                        <div className="justify-between items-center w-full mt-6">
                                            <div className="mb-5 md:text-right">
                                                <p>
                                                    <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-pink-red rounded-full text-white mb-3">
                                                        Round 1: Live
                                                    </span>
                                                    <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-dark-blue rounded-full text-white mb-3">
                                                        Whitelist
                                                    </span>
                                                    <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-blue rounded-full text-white mb-3">
                                                        KYC
                                                    </span>
                                                </p>
                                            </div>

                                            <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                                Project Overview
                                            </p>
                                            <div className="my-5 text-justify">
                                                Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the
                                                Kucoin Community Chain based on zkSNARKs. It improves transaction
                                                privacy by breaking the on-chain link between the recipient and
                                                destination addresses. It uses a smart contract that accepts KCS
                                                deposits that can be withdrawn by a different address. Whenever KCS is
                                                withdrawn by the new address, there is no way to link the withdrawal to
                                                the deposit, ensuring complete privacy. To make a deposit user generates
                                                a secret and sends its hash (called a commitment) along with the deposit
                                                amount to the Volcano smart contract. The contract accepts the deposit
                                                and adds the commitment to its list of deposits. Later, the user decides
                                                to make a withdrawal. To do that, the user should provide a proof that
                                                he or she possesses a secret to an unspent commitment from the smart
                                                contract’s list of deposits. zkSnark technology allows that to happen
                                                without revealing which exact deposit corresponds to this secret. The
                                                smart contract will check the proof, and transfer deposited funds to the
                                                address specified for withdrawal. An external observer will be unable to
                                                determine which deposit this withdrawal came from.
                                                <p>
                                                    <a href="https://kukuswap.io">
                                                        <button
                                                            className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon icon={faHome} /> Website
                                                        </button>
                                                    </a>

                                                    <a href="https://kukuswap.io" target="_blank" rel="noreferrer">
                                                        <button
                                                            className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon icon={faTwitter} /> Twitter
                                                        </button>
                                                    </a>
                                                    <a href="https://kukuswap.io" target="_blank" rel="noreferrer">
                                                        <button
                                                            className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon icon={faTelegram} /> Telegram
                                                        </button>
                                                    </a>
                                                    <a href="https://kukuswap.io" target="_blank" rel="noreferrer">
                                                        <button
                                                            className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                        >
                                                            <FontAwesomeIcon icon={faGithub} /> Github
                                                        </button>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
                                                            30%
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-purple-600">
                                                            Soft cap 365,000 KCS
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                                                    <div
                                                        style={{ width: '30%' }}
                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center w-full mt-6">
                                            <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                                Purchase KUKU
                                            </p>
                                            <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                                Price: 1 KCS = 100 VCO
                                            </div>
                                        </div>
                                        <StyledNumericalInput
                                            value={''}
                                            onUserInput={() => {
                                                console.log('ok')
                                            }}
                                            className={`w-full h-14 px-3 md:px-5 mt-5 rounded bg-dark-800 text-caption2 md:text-lg font-bold`}
                                            placeholder="0.0"
                                        />
                                        <div className="mt-5">After ILO finished, you will receive 100,000 VCO</div>
                                        <button
                                            className={buttonStyleEnabled}
                                            onClick={() => {
                                                console.log('button')
                                            }}
                                        >
                                            {!walletConnected ? i18n._(t`Connect Wallet`) : i18n._(t`Purchase`)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block w-full max-w-xl mx-auto md:mx-0 md:ml-6 md:block md:w-72 border-yellow rounded bg-dark-900 text-left">
                                <div className="flex flex-col w-full px-4 pt-6 pb-5 md:px-8 md:pt-7 md:pb-9">
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Start block
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">
                                                12939242 (Approx: Sun 1 Aug 16:28)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                End block
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">
                                                13010690 (Approx: Thu 12 Aug 16:26)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Soft cap
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">365,000 KCS</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Hard cap
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">665,000 KCS</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Presale price
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">100 VCO / Per KCS</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Listing price
                                            </p>
                                            <p className="mb-3 text-lg text-high-emphesis">160 VCO / Per KCS</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap">
                                        <div className="flex flex-col flex-grow">
                                            <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                                Required Balance
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 pr-1 md:w-16  mr-1 md:md:mr-2 ml-2 -mb-1.5"
                                            src={SushiImage}
                                            alt="kuku"
                                        />
                                        <div className="flex flex-col justify-center">
                                            <p className="text-caption2 md:text-lg font-bold text-high-emphesis">100</p>
                                            <p className="text-caption2 md:text-caption text-primary">KUKU</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:hidden w-full mx-auto mt-5 border-yellow rounded bg-dark-900 text-left">
                            <div className="flex flex-col w-full px-4 pt-6 pb-5 md:px-8 md:pt-7 md:pb-9">
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Start block
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">
                                            12939242 (Approx: Sun 1 Aug 16:28)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            End block
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">
                                            13010690 (Approx: Thu 12 Aug 16:26)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Soft cap
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">365,000 KCS</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Hard cap
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">665,000 KCS</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Presale price
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">100 VCO / Per KCS</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Listing price
                                        </p>
                                        <p className="mb-3 text-lg text-high-emphesis">160 VCO / Per KCS</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    <div className="flex flex-col flex-grow">
                                        <p className="mb-3 text-lg font-bold md:text-2xl md:font-medium text-high-emphesis">
                                            Required Balance
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <img
                                        className="w-10 pr-1 md:w-16  mr-1 md:md:mr-2 ml-2 -mb-1.5"
                                        src={SushiImage}
                                        alt="kuku"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <p className="text-caption2 md:text-lg font-bold text-high-emphesis">100</p>
                                        <p className="text-caption2 md:text-caption text-primary">KUKU</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : parsedQs?.list == null ? (
                <div className="flex flex-col max-w-2xl w-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col max-w-2xl w-full">
                            <div className="flex mb-5">
                                <a
                                    className="pl-4 pr-2 sm:pl-8 sm:pr-4 flex items-center font-medium text-secondary hover:text-primary text-high-emphesis"
                                    href="#/ilo"
                                >
                                    <div className="text-base whitespace-nowrap">Upcoming</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="#/ilo?list=live"
                                >
                                    <div className="text-base whitespace-nowrap">Live</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="/"
                                >
                                    <div className="text-base whitespace-nowrap">Past</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="#/ilo?list=create"
                                >
                                    <div className="text-base whitespace-nowrap">Create</div>
                                </a>
                            </div>

                            <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded">
                                <a href="#/ilo?project=address">
                                    <img src={VolcanoImage} className="rounded-tl rounded-tr" alt="" />
                                </a>
                                <div className="pb-6 md:pb-9 px-3 md:px-8">
                                    <div className="justify-between items-center w-full mt-6">
                                        <div className="mb-5 md:text-right">
                                            <p>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-yellow-600 rounded-full text-white mb-3">
                                                    Round 1: Scheduled
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-dark-blue rounded-full text-white mb-3">
                                                    Whitelist
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-blue rounded-full text-white mb-3">
                                                    KYC
                                                </span>
                                            </p>
                                        </div>
                                        <p className="mb-3 md:text-right">
                                            <span className="md:border-gray-400 md:border-2rounded md:px-4 py-1 w-64 text-center">
                                                Presale start 16 August at 00:00 (124543 block)
                                            </span>
                                        </p>
                                        <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                            Project Overview
                                        </p>
                                        <div className="my-5 text-justify">
                                            Volcano Cash is a non-custodial KCS and KRC-20 privacy solution on the
                                            Kucoin Community Chain based on zkSNARKs. It improves transaction privacy by
                                            breaking the on-chain link between the recipient and destination addresses.
                                            It uses a smart contract that accepts KCS deposits that can be withdrawn by
                                            a different address. Whenever KCS is withdrawn by the new address, there is
                                            no way to link the withdrawal to the deposit, ensuring complete privacy.
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        {/*<div className="relative pt-1">
                                        <div className="flex mb-2 items-center justify-between">
                                            <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
                                                    0%
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-semibold inline-block text-purple-600">
                                                    Soft cap 365,000 KCS
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                                            <div
                                                style={{ width: '0%' }}
                                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                                            ></div>
                                        </div>
                                    </div>
                                    */}
                                    </div>
                                    <div className="flex justify-between items-center w-full mt-6">
                                        <div className="text-high-emphesis md:w-72">
                                            <a href="#/ilo?project=address">
                                                <ButtonLight>More details</ButtonLight>
                                            </a>
                                        </div>
                                        <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                            Price: 1 KCS = 100 VCO
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : parsedQs?.list == 'live' ? (
                <div className="flex flex-col max-w-2xl w-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col max-w-2xl w-full">
                            <div className="flex mb-5">
                                <a
                                    className="pl-4 pr-2 sm:pl-8 sm:pr-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="#/ilo"
                                >
                                    <div className="text-base whitespace-nowrap">Upcoming</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary text-high-emphesis"
                                    href="#/ilo?list=live"
                                >
                                    <div className="text-base whitespace-nowrap">Live</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="/"
                                >
                                    <div className="text-base whitespace-nowrap">Past</div>
                                </a>
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="#/ilo?list=create"
                                >
                                    <div className="text-base whitespace-nowrap">Create</div>
                                </a>
                            </div>

                            <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded mb-5">
                                <a href="#/ilo?project=address">
                                    <img
                                        src="https://pbs.twimg.com/profile_banners/1415282063742316548/1627150843/1500x500"
                                        className="rounded-tl rounded-tr"
                                        alt=""
                                    />
                                </a>
                                <div className="pb-6 md:pb-9 px-3 md:px-8">
                                    <div className="justify-between items-center w-full mt-6">
                                        <div className="mb-5 md:text-right">
                                            <p>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-pink-red rounded-full text-white mb-3">
                                                    Round 1: Live
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-dark-blue rounded-full text-white mb-3">
                                                    Whitelist
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-blue rounded-full text-white mb-3">
                                                    KYC
                                                </span>
                                            </p>
                                        </div>
                                        <p className="mb-3 md:text-right">
                                            <span className="md:border-gray-400 md:border-2rounded px-4 py-1 w-64 text-center">
                                                Presale until 16 August 23:30
                                            </span>
                                        </p>
                                        <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                            Project Overview
                                        </p>
                                        <div className="my-5 text-justify">
                                            KuKuswap is a next-gen DEX designed to provide access to new tokens and a
                                            simplistic trading experience. The network incorporates the most popular
                                            DeFi.
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        {
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
                                                            20%
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-purple-600">
                                                            Soft cap 365,000 KCS
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                                                    <div
                                                        style={{ width: '2%' }}
                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                                                    ></div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex justify-between items-center w-full mt-6">
                                        <div className="text-high-emphesis md:w-72">
                                            <a href="#/ilo?project=address">
                                                <ButtonLight>Purchase</ButtonLight>
                                            </a>
                                        </div>
                                        <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                            Price: 1 KCS = 100 KUKU
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded">
                                <a href="#/ilo?project=address">
                                    <img
                                        src="https://pbs.twimg.com/profile_banners/1415282063742316548/1627150843/1500x500"
                                        className="rounded-tl rounded-tr"
                                        alt=""
                                    />
                                </a>
                                <div className="pb-6 md:pb-9 px-3 md:px-8">
                                    <div className="justify-between items-center w-full mt-6">
                                        <div className="mb-5 md:text-right">
                                            <p>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-pink-red rounded-full text-white mb-3">
                                                    Round 2: Live
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-dark-blue rounded-full text-white mb-3">
                                                    Whitelist
                                                </span>
                                                <span className="inline-flex items-center justify-center px-10 py-1 md:mr-2 ml-2 text-lg font-bold leading-none  bg-blue rounded-full text-white mb-3">
                                                    KYC
                                                </span>
                                            </p>
                                        </div>
                                        <p className="mb-3 md:text-right">
                                            <span className="md:border-gray-400 md:border-2rounded px-4 py-1 w-64 text-center">
                                                Presale until 16 August 23:30
                                            </span>
                                        </p>
                                        <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                            Project Overview
                                        </p>
                                        <div className="my-5 text-justify">
                                            KuKuswap is a next-gen DEX designed to provide access to new tokens and a
                                            simplistic trading experience. The network incorporates the most popular
                                            DeFi.
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        {
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase">
                                                            20%
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-purple-600">
                                                            Soft cap 365,000 KCS
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 text-xs flex rounded bg-yellow-100">
                                                    <div
                                                        style={{ width: '2%' }}
                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                                                    ></div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex justify-between items-center w-full mt-6">
                                        <div className="text-high-emphesis md:w-72">
                                            <a href="#/ilo?project=address">
                                                <ButtonLight>Purchase</ButtonLight>
                                            </a>
                                        </div>
                                        <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                            Price: 1 KCS = 100 KUKU
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                parsedQs?.list == 'create' && (
                    <div className="flex flex-col max-w-2xl w-full">
                        <div className="flex justify-center">
                            <div className="flex flex-col max-w-2xl w-full">
                                <div className="flex mb-5">
                                    <a
                                        className="pl-4 pr-2 sm:pl-8 sm:pr-4 flex items-center font-medium text-secondary hover:text-primary"
                                        href="#/ilo"
                                    >
                                        <div className="text-base whitespace-nowrap">Upcoming</div>
                                    </a>
                                    <a
                                        className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                        href="#/ilo?list=live"
                                    >
                                        <div className="text-base whitespace-nowrap">Live</div>
                                    </a>
                                    <a
                                        className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                        href="/"
                                    >
                                        <div className="text-base whitespace-nowrap">Past</div>
                                    </a>
                                    <a
                                        className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                        href="#/ilo?list=create"
                                    >
                                        <div className="text-base whitespace-nowrap text-high-emphesis">Create</div>
                                    </a>
                                </div>

                                <div className="bg-dark-900 border-yellow shadow-swap-blue-glow w-full max-w-2xl rounded">
                                    <div className="pb-6 md:pb-9 px-3 md:px-8">
                                        <div className="justify-between items-center w-full mt-6">
                                            <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                                Create presale
                                            </p>
                                            <div className="my-5">
                                                <NumericalInputPanel
                                                    id="token_amount"
                                                    value={''}
                                                    onUserInput={() => {
                                                        console.log('ok')
                                                    }}
                                                    placeholder="0.0"
                                                    text="Token Amount"
                                                />
                                            </div>
                                            <div className="my-5">
                                                <AddressInputPanel
                                                    id="token"
                                                    value=""
                                                    onChange={() => {
                                                        console.log('ok')
                                                    }}
                                                />
                                            </div>
                                            <div className="my-5">
                                                <PercentInputPanel
                                                    id="percent"
                                                    onUserInput={() => {
                                                        console.log('ok')
                                                    }}
                                                    value=""
                                                />
                                            </div>
                                            <div className="my-5">
                                                <ToggleInputPanel
                                                    text="Buyers participate"
                                                    textOn="With KUKU"
                                                    textOff="With KCS"
                                                    id="toggle-kcs-kuku"
                                                    isActive={true}
                                                    toggle={() => {
                                                        console.log('ok')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    )
}
