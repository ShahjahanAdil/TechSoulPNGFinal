import React from 'react'
import Stat from '../../../components/Stat'
import Contributors from '../../../components/Contributors'
import AboutBanner from '../../../components/AboutBanner/index'

export default function About() {
    return (
        <>
            <AboutBanner />
            <Contributors />
            <Stat />
        </>
    )
}