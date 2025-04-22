import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getVans } from "../../api"

export default function Vans() {
    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [error, setError] = React.useState(null)
    
    const typeFilter = searchParams.get("type")

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVans()
                setVans(data)
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const displayedVans = typeFilter ? 
        vans.filter(van => van.type === typeFilter) : vans

    const vanElements = displayedVans && displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={`/vans/${van.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter }}>
                <img src={van.imageUrl} />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ))
    if(error) {
        return <h1>{error.message}. Press logo on right top to go back to Home page.</h1>
    }

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button 
                    onClick={() => setSearchParams({type: 'simple'})}
                    className={`van-type simple ${typeFilter === 'simple' ? 'selected' : null}`}
                >Simple</button>
                <button 
                    onClick={() => setSearchParams({type: 'luxury'})}
                    className={`van-type luxury ${typeFilter === 'luxury' ? 'selected' : null}`}
                >Luxury</button>
                <button 
                    onClick={() => setSearchParams({type: 'rugged'})}
                    className={`van-type rugged ${typeFilter === 'rugged' ? 'selected' : null}`}
                >Rugged</button>
                {typeFilter ? (<button 
                    onClick={() => setSearchParams({})}
                    className="van-type clear-filters"
                >Clear filter</button>) : null}
            
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>
    )
}