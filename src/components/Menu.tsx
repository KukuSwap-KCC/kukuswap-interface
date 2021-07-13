/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { classNames } from '../functions/styling'
import { ExternalLink } from './Link'
import { ReactComponent as MenuIcon } from '../assets/images/menu.svg'
import { t } from '@lingui/macro'
import { I18n } from '@lingui/core'
import { useLingui } from '@lingui/react'

const items = (i18n: I18n) => [
    {
        name: i18n._(t`Docs`),
        description: i18n._(t`Documentation for users of Sushi.`),
        href: 'https://docs.sushi.com'
    },
    {
        name: i18n._(t`Dev`),
        description: i18n._(t`Documentation for developers of Sushi.`),
        href: 'https://dev.sushi.com'
    },
    {
        name: i18n._(t`Open Source`),
        description: i18n._(t`Sushi is a supporter of Open Source.`),
        href: 'https://github.com/sushiswap'
    },
    {
        name: i18n._(t`Tools`),
        description: i18n._(t`Tools to optimize your workflow.`),
        href: '/tools'
    },
    {
        name: i18n._(t`Discord`),
        description: i18n._(t`Join the community on Discord.`),
        href: 'https://discord.gg/NVPXN4e'
    }
]

export default function Menu() {
    const { i18n } = useLingui()
    const solutions = items(i18n)

    return (
        <Popover className="relative">
        </Popover>
    )
}
