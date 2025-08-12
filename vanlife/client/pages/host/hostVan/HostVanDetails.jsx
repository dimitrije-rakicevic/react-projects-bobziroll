import React from "react"
import { useOutletContext } from "react-router-dom"

export default function HostVanDetails() {
    const { van } = useOutletContext()
    return (
        <section className="host-van-details-section">
            <h4>Name: <span>{van.name}</span></h4>
            <h4>Category: <span>{van.type}</span></h4>
            <h4>Description: <span>{van.description}</span></h4>
            <h4>Visibility: <span>public</span></h4>
        </section>
    )
}