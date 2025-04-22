import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
    const { van } = useOutletContext()
    return (
        <img className="host-van-photos-section" src={van.imageUrl} alt='van-picture'/>
    )
}