import React, { useState } from 'react'
import { useActiveWeb3React } from '../../../../../hooks/useActiveWeb3React'
import { Input as NumericalInput } from '../../../../../components/NumericalInput'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { FormActionsProps } from '../types'
import { useWalletModalToggle } from '../../../../../state/application/hooks'
import { BigNumber, utils } from 'ethers'

const INPUT_CHAR_LIMIT = 18

const StyledNumericalInput = styled(NumericalInput)`
    caret-color: #e3e3e3;
`

const buttonStyle =
    'flex justify-center items-center w-full h-14 rounded font-bold md:font-medium md:text-lg mt-5 text-sm focus:outline-none focus:ring'

const buttonStyleEnabled = `${buttonStyle} text-black bg-gradient-to-r from-pink to-light-brown hover:opacity-90`

export default function FormActions(props: FormActionsProps) {
    const { account, chainId } = useActiveWeb3React()

    const walletConnected = !!account

    const { i18n } = useLingui()

    const toggleWalletModal = useWalletModalToggle()

    const handleClickButton = async () => {
        if (!walletConnected) {
            toggleWalletModal()
        }
    }

    const handleInput = (v: string) => {
        console.log(v)
        if (v.length >= INPUT_CHAR_LIMIT) {
            setUsingBalance(false)
        }

        setBalance(v)
        setUsingBalance(true)
    }

    const [balance, setBalance] = useState<string>('')
    const [usingBalance, setUsingBalance] = useState(false)

    let value = utils.formatEther(props.maxPerBayer)
    if (usingBalance) {
        value = balance
    }

    return (
        <>
            {props.status == 'live' || props.status == 'finished' || props.status == 'failed' ? (
                <>
                    <div className="flex justify-between items-center w-full mt-6">
                        {props.status == 'live' && (
                            <>
                                <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                    Purchase {props.tokenSymbol}
                                </p>

                                <div className="border-gradient-r-pink-red-light-brown-dark-pink-red border-transparent border-solid border rounded-3xl px-4 md:px-3.5 py-1.5 md:py-0.5 text-high-emphesis text-xs font-medium md:text-caption md:font-normal">
                                    {i18n._(t`Price`)}: 1 {props.basicTokenSymbol} = {props.price} {props.tokenSymbol}
                                </div>
                            </>
                        )}

                        {props.status == 'finished' && (
                            <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                Withdraw {props.tokenSymbol}
                            </p>
                        )}

                        {props.status == 'failed' && (
                            <p className="text-large md:text-h5 font-bold text-high-emphesis">
                                Withdraw {props.basicTokenSymbol}
                            </p>
                        )}
                    </div>
                    {props.status == 'live' && (
                        <>
                            <StyledNumericalInput
                                value={value}
                                onUserInput={handleInput}
                                className={`w-full h-14 px-3 md:px-5 mt-5 rounded bg-dark-800 text-caption2 md:text-lg font-bold`}
                                placeholder="0.0"
                            />
                            <div className="mt-5">
                                {i18n._(t`After ILO finished, you will receive`)} {props.purchased} {props.tokenSymbol}
                            </div>
                        </>
                    )}
                    <button className={buttonStyleEnabled} onClick={handleClickButton}>
                        {!walletConnected
                            ? i18n._(t`Connect Wallet`)
                            : props.status == 'live'
                            ? i18n._(t`Purchase`)
                            : props.status == 'finished'
                            ? i18n._(t`Withdraw`)
                            : i18n._(t`Withdraw Deposit`)}
                    </button>
                </>
            ) : (
                ''
            )}
        </>
    )
}
