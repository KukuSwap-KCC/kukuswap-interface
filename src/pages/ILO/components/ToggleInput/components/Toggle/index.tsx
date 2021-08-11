import React from 'react'
import styled from 'styled-components'

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
    padding: 0.25rem 0.5rem;
    border-radius: 14px;
    font-size: 1rem;
    font-weight: 400;

    padding: 0.35rem 0.6rem;
    border-radius: ${({ theme }) => theme.borderRadius};
    background: ${({ theme, isActive, isOnSwitch }) =>
        isActive ? (isOnSwitch ? theme.primary1 : theme.text4) : 'none'};
    color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.black : theme.text2) : theme.text2)};
    font-size: 1rem;
    font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
    :hover {
        user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
        background: ${({ theme, isActive, isOnSwitch }) =>
            isActive ? (isOnSwitch ? theme.primary1 : theme.text3) : 'none'};
        color: ${({ theme, isActive, isOnSwitch }) =>
            isActive ? (isOnSwitch ? theme.white : theme.text2) : theme.text3};
    }
`

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean }>`
    border-radius: ${({ theme }) => theme.borderRadius};
    border: none;
    background: ${({ theme }) => theme.bg3};
    display: flex;
    width: fit-content;
    cursor: pointer;
    outline: none;
    padding: 0;
`

export interface ToggleProps {
    textOn: string
    textOff: string
    id?: string
    isActive: boolean
    toggle: () => void
}

export default function Toggle({ textOn, textOff, id, isActive, toggle }: ToggleProps) {
    return (
        <StyledToggle id={id} isActive={isActive} onClick={toggle} className="w-full">
            <ToggleElement isActive={isActive} isOnSwitch={true} className="w-6/12">
                {textOn}
            </ToggleElement>
            <ToggleElement isActive={!isActive} isOnSwitch={false} className="w-6/12">
                {textOff}
            </ToggleElement>
        </StyledToggle>
    )
}