import React from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVans(props) {

    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [])

    const vansElems = vans.map(van => (   
            <Link key={van.id} style={{ textDecoration: 'none' }} to={`${van.id}`}>
                <div className="host-van-container">
                    <img src={van.imageUrl} alt='name' />
                    <div className="host-van-info">
                        <h2>{van.name}</h2>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        )
    )
    
    return (
        <div className="host-vans">
            <h1>Your listed vans{props.linkToAll && <Link to={props.linkToAll}>View all</Link>}</h1>
            {vansElems.length !== 0 ? vansElems : (<h1>...Loading</h1>)}
        </div>
    )
}