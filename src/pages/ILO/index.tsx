import React from 'react'
import { Helmet } from 'react-helmet'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import IloProjects, { IloProject } from '../../constants/iloProjects'
import IloCard from './components/IloCard'
import IloDetailCard from './components/IloDetailCard'
import { useHistory, useLocation } from 'react-router'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import iloProjects from '../../constants/iloProjects'

const activeArrayIlo: IloProject[] = IloProjects.filter(ilo => ilo.isActive)

const pastArrayIlo: IloProject[] = IloProjects.filter(ilo => !ilo.isActive)

let activeIlo = new Map<string, IloProject>()
let pastIlo = new Map<string, IloProject>()
let projects = new Map<string, IloProject>()

activeArrayIlo.forEach(ilo => {
    activeIlo.set(ilo.id, ilo)
})

pastArrayIlo.forEach(ilo => {
    pastIlo.set(ilo.id, ilo)
})

iloProjects.forEach(ilo => {
    projects.set(ilo.id, ilo)
})

const activeSize = activeIlo.size
const pastSize = pastIlo.size

let defaultTab = 'current'

if (!activeSize) {
    defaultTab = 'past'
}

export default function ILO() {
    const { i18n } = useLingui()

    const parsedQs = useParsedQueryString()
    const history = useHistory()
    const location = useLocation()

    if (parsedQs?.list == null && parsedQs?.project == null) {
        const params = new URLSearchParams({ list: defaultTab })
        history.replace({ pathname: location.pathname, search: params.toString() })
    }

    let currentEmphasis = ''
    if (parsedQs?.list == 'current') {
        currentEmphasis = 'text-high-emphesis'
    }

    let pastEmphasis = ''
    if (parsedQs?.list == 'past') {
        pastEmphasis = 'text-high-emphesis'
    }

    let project = projects.get(parsedQs?.project as string)

    return (
        <>
            <Helmet>
                <title>KUKUSwap | ILO | Kuku</title>
            </Helmet>

            {project == null ? (
                <div className="flex flex-col max-w-2xl w-full">
                    <div className="flex justify-center">
                        <div className="flex flex-col max-w-2xl w-full">
                            <div className="flex mb-5">
                                {activeSize ? (
                                    <a
                                        className={
                                            'pl-4 pr-2 sm:pl-8 sm:pr-4 flex items-center font-medium text-secondary hover:text-primary' +
                                            ' ' +
                                            currentEmphasis
                                        }
                                        href="#/ilo?list=current"
                                    >
                                        <div className="text-base whitespace-nowrap">{i18n._(t`Current`)}</div>
                                    </a>
                                ) : (
                                    ''
                                )}

                                {pastSize ? (
                                    <a
                                        className={
                                            'px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary' +
                                            ' ' +
                                            pastEmphasis
                                        }
                                        href="#/ilo?list=past"
                                    >
                                        <div className="text-base whitespace-nowrap">{i18n._(t`Past`)}</div>
                                    </a>
                                ) : (
                                    ''
                                )}
                                <a
                                    className="px-2 sm:px-4 flex items-center font-medium text-secondary hover:text-primary"
                                    href="#/ilo?list=create"
                                >
                                    <div className="text-base whitespace-nowrap">{i18n._(t`Create`)}</div>
                                </a>
                            </div>

                            {activeSize && parsedQs?.list == 'current'
                                ? Array.from(activeIlo).map(([key, ilo]) => <IloCard key={key} project={ilo} />)
                                : ''}

                            {pastSize && parsedQs?.list == 'past'
                                ? Array.from(pastIlo).map(([key, ilo]) => <IloCard key={key} project={ilo} />)
                                : ''}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center">
                        <div className="text-right mb-5 px-8">
                            <a className="items-center font-medium text-secondary hover:text-primary" href="#/ilo">
                                <div className="text-base whitespace-nowrap">Go to Projects</div>
                            </a>
                        </div>
                        <IloDetailCard project={project} />
                    </div>
                </>
            )}
        </>
    )
}
