import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faTelegram, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ProjectInfoProps } from '../types'

export default function ProjectInfo(props: ProjectInfoProps) {
    const { i18n } = useLingui()

    let status = 'live'

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

            <p className="text-large md:text-h5 font-bold text-high-emphesis">{i18n._(t`Project Overview`)}</p>
            <div className="my-5 text-justify">
                {props.description}

                <p>
                    {props.website ? (
                        <a href={props.website}>
                            <button
                                className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faHome} /> Website
                            </button>
                        </a>
                    ) : (
                        ''
                    )}

                    {props.twitter ? (
                        <a href={props.twitter} target="_blank" rel="noreferrer">
                            <button
                                className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faTwitter} /> Twitter
                            </button>
                        </a>
                    ) : (
                        ''
                    )}

                    {props.telegram ? (
                        <a href={props.telegram} target="_blank" rel="noreferrer">
                            <button
                                className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faTelegram} /> Telegram
                            </button>
                        </a>
                    ) : (
                        ''
                    )}

                    {props.github ? (
                        <a href={props.github} target="_blank" rel="noreferrer">
                            <button
                                className="text-white background-transparent font-bold uppercase pr-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                <FontAwesomeIcon icon={faGithub} /> Github
                            </button>
                        </a>
                    ) : (
                        ''
                    )}
                </p>
            </div>
        </div>
    )
}
