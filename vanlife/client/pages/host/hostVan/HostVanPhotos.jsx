import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
    const { van } = useOutletContext()
    const imagePaths = van.vanImages
    
    return (
        imagePaths.map(imageUrl => {
             return <img key={`${imageUrl.path}`} className="host-van-photos-section" src={`http://localhost:3000${imageUrl.path}`} alt='van-picture'/>
        })
    )
}