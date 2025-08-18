import React from "react"
import { Outlet, useParams } from "react-router-dom"
import { NavLink, Link } from "react-router-dom"
import { getVan } from "../../api"
import { EditVanForm } from "./hostVan/EditVanForm"

import noimage from '../../assets/images/no-image.jpeg'

export default function HostVanDetail() { 
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const [modalOpen, setModalOpen] = React.useState(false)
    

    const activeStyle = {
        color: 'black',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }

    async function loadVan() {
        setLoading(true)
        try {
            const data = await getVan(id)
            setVan(data)
            console.log(data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadVan()
    }, [id])

    console.log(van)

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const vanElem = van ? (
        <>
            <div className="host-van-container">
            <img src={van.imageUrl ? `http://localhost:3000${van.imageUrl}` : noimage} alt='name' />
                <div className="host-van-info">
                    <div className={`type ${van.type}`}>{van.type}</div>
                    <h1>{van.name}</h1>
                    <p><span style={{fontWeight: 'bold', fontSize: '22px'}}>${van.price}</span>/day</p>
                </div>
            </div>
        </>) : null
    console.log(van)

    return (
        <div className="host-van-detail-container">
            {van ? (
                <>
                    <Link style={{textDecoration: 'underline'}} to='..' relative="path">&larr; Back to all vans</Link>
                    <p onClick={() => setModalOpen(true)} className="edit-van">✎ Edit</p>
                    {vanElem}
                    <nav className="host-van-detail-nav">
                        <NavLink style={({isActive}) => isActive ? activeStyle : {textDecoration: 'none'}} to="." end>Details</NavLink>
                        <NavLink style={({isActive}) => isActive ? activeStyle : {textDecoration: 'none'}} to="pricing">Pricing</NavLink>
                        <NavLink style={({isActive}) => isActive ? activeStyle : {textDecoration: 'none'}} to="photos">Photos</NavLink>
                    </nav>
                    <Outlet context={{ van }}/>
                </> ) : (<h1>...Loading</h1>) }
                {modalOpen && 
                <div className="modal-overlay">
                    <div className="modal-content">
                        <EditVanForm onVanUpdated={() => loadVan()} van={van} onClose={() => setModalOpen(false) } />
                    </div>
                </div>
                }
        </div>
        )
    
}