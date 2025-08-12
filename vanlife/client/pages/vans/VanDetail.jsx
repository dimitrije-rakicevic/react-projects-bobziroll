import React from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getVan } from "../../api"

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function VanDetail() {
    const [van, setVan] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const { id } = useParams()
    const location = useLocation()

    const [imageIndex, setImageIndex] = React.useState(1)

    React.useEffect(() => {
        async function loadVan() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVan()
    }, [id])

    React.useEffect(() => {
        
    })
    
    if (loading) {
        return <h1>Loading...</h1>
    }
    
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    const images = van ? van.vanImages ? van.vanImages.map(image => {
        return image.path
    }) : "" : ""

    console.log(van)
    
    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            
            {van && (
                <div className="van-detail">
                    <div className="van-image-slider">
                        <div><FaArrowAltCircleLeft /></div>
                        <img src={`http://localhost:3000${images[imageIndex]}`}></img>
                        <div><FaArrowAltCircleRight /></div>
                    </div>
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            )}
        </div>
    )
}