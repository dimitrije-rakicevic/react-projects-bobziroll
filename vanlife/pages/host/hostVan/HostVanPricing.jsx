import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
    const { van } = useOutletContext()
    return(
        <p className="host-van-pricing-section"><span>${van.price}</span>/day</p>
    )
}