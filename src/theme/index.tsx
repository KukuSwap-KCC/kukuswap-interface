import React, { useMemo } from 'react'
import { Text, TextProps } from 'rebass'
import styled, {
    DefaultTheme,
    ThemeProvider as StyledComponentsThemeProvider,
    createGlobalStyle,
    css
} from 'styled-components'
import { Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
    upToExtra2Small: 320,
    upToExtraSmall: 500,
    upToSmall: 720,
    upToMedium: 960,
    upToLarge: 1280
}

const mediaWidthTemplates: { [width in keyof typeof MEDIA_WIDTHS]: typeof css } = Object.keys(MEDIA_WIDTHS).reduce(
    (accumulator, size) => {
        ;(accumulator as any)[size] = (a: any, b: any, c: any) => css`
            @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
                ${css(a, b, c)}
            }
        `
        return accumulator
    },
    {}
) as any

const white = '#FFFFFF'
const black = '#000000'

export function colors(darkMode: boolean): Colors {
    return {
        // base
        white,
        black,

        // text
        text1: darkMode ? '#FFFFFF' : '#000000',
        text2: darkMode ? '#c9cbc3' : '#565A69',
        text3: darkMode ? '#84826c' : '#888D9B',
        text4: darkMode ? '#696856' : '#C3C5CB',
        text5: darkMode ? '#36362c' : '#EDEEF2',

        // backgrounds / greys
        bg1: darkMode ? '#2b2b24' : '#FFFFFF',
        bg2: darkMode ? 'rgb(34, 33, 21)' : '#F7F8FA',
        bg3: darkMode ? '#504c2a' : '#EDEEF2',
        bg4: darkMode ? '#6f6c3a' : '#CED0D9',
        bg5: darkMode ? '#84826c' : '#888D9B',

        //specialty colors
        modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
        advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

        //primary colors
        primary1: darkMode ? '#0094ec' : '#0e0e23',
        primary2: darkMode ? '#0097fb' : '#FF8CC3',
        primary3: darkMode ? '#00aff5' : '#FF99C9',
        primary4: darkMode ? '#376bad' : '#F6DDE8',
        primary5: darkMode ? '#ffce2b' : '#ebebeb',

        // color text
        primaryText1: darkMode ? '#000000' : '#0e0e23',

        // secondary colors
        secondary1: darkMode ? '#ecc900' : '#ff007a',
        secondary2: darkMode ? '#17000b26' : '#F6DDE8',
        secondary3: darkMode ? '#17000b26' : '#ebebeb',

        // other
        red1: '#FD4040',
        red2: '#F82D3A',
        red3: '#D60000',
        green1: '#27AE60',
        yellow1: '#FFE270',
        yellow2: '#F3841E',
        blue1: '#0094ec',

        borderRadius: '10px'

        // dont wanna forget these blue yet
        // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
        // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
    }
}

export function theme(darkMode: boolean): DefaultTheme {
    return {
        ...colors(darkMode),

        grids: {
            sm: 8,
            md: 12,
            lg: 24
        },

        //shadows
        shadow1: darkMode ? '#000' : '#2F80ED',

        // media queries
        mediaWidth: mediaWidthTemplates,

        // css snippets
        flexColumnNoWrap: css`
            display: flex;
            flex-flow: column nowrap;
        `,
        flexRowNoWrap: css`
            display: flex;
            flex-flow: row nowrap;
        `
    }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    //const darkMode = useIsDarkMode()
    const darkMode = true

    const themeObject = useMemo(() => theme(darkMode), [darkMode])

    return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
    color: ${({ color, theme }) => (theme as any)[color]};
`

export const TYPE = {
    main(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text2'} {...props} />
    },
    link(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
    },
    black(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text1'} {...props} />
    },
    white(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'white'} {...props} />
    },
    body(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
    },
    mediumHeader(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={20} {...props} />
    },
    subHeader(props: TextProps) {
        return <TextWrapper fontWeight={400} fontSize={14} {...props} />
    },
    small(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={11} {...props} />
    },
    blue(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'blue1'} {...props} />
    },
    darkGray(props: TextProps) {
        return <TextWrapper fontWeight={500} color={'text3'} {...props} />
    },
    italic(props: TextProps) {
        return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
    },
    error({ error, ...props }: { error: boolean } & TextProps) {
        return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
    }
}

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: #BFBFBF;
  background-color: #191919;
}

input, textarea {
    font-family: "Poppins", sans-serif;
    font-display: fallback;
  }

body {
  min-height: 100vh;
}

::-moz-selection {
    color: black;
    background: #FFCA1C;
}

::-webkit-selection {
    color: black;
    background: #FFCA1C;
}

::selection {
    color: black;
    background: #FFCA1C;
}
`
