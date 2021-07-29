import React from 'react'
import styled from 'styled-components'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

const StyledLink = styled.a`
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;

    :hover {
        text-decoration: underline;
    }

    :focus {
        outline: none;
        text-decoration: underline;
    }

    :active {
        text-decoration: none;
    }
`

export default function InfoCard() {
    const { i18n } = useLingui()
    return (
        <div className="flex flex-col w-full mb-2 mt-auto">
            <div className="flex max-w-lg">
                <div className="text-body font-bold md:text-h5 text-high-emphesis self-end mb-3 md:mb-7">
                    {i18n._(t`Maximize yield by staking KUKU`)}
                </div>
                {/* <div className="pl-6 pr-3 mb-1 min-w-max self-start md:hidden">
                    <img src={XSushiSignSmall} alt="xsushi sign" />
                </div> */}
            </div>
            <div className="text-gray-500 text-sm leading-5 md:text-caption  mb-2 md:mb-4 pr-3 md:pr-0 text-justify">
                {t`For every project that is launched from KUKUPAD, 5% of the total raise in KCS, will be distributed as WKCS
                proportional to your share of the Staking Contract. When your KUKU is staked into the Staking Contract, you receive
                KUKU Shares, a fully composable token that can interact with other protocols.
                When you unstake you will receive all the originally deposited
                KUKU and WKCS.`}
            </div>
            {/* <div className="flex">
                <div className="mr-14 md:mr-9">
                    <StyledLink className="text-body whitespace-nowrap text-caption2 md:text-lg md:leading-5">
                        Enter the Kitchen
                    </StyledLink>
                </div>
                <div>
                    <StyledLink className="text-body whitespace-nowrap text-caption2 md:text-lg md:leading-5">
                        Tips for using xSUSHI
                    </StyledLink>
                </div>
            </div> */}
        </div>
    )
}
