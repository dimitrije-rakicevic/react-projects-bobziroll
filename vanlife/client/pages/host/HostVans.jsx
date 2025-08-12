import React from "react"
import { Link, NavLink } from "react-router-dom"
import { getHostVans } from "../../api"
import { IoAdd, IoTrashOutline } from "react-icons/io5";

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
            <Link key={van.id} style={{ textDecoration: 'none' }} to={(props.linkToAll ? "vans/" : "") + `${van.id}`}>
                <div className="host-van-container">
                    <img src={`http://localhost:3000${van.imageUrl}`} alt='name' />
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
            <h1 style={{justifyContent: props.linkToAll && "space-between", alignItems: 'center'}}>
                Your listed vans
                {props.linkToAll ? 
                <Link className="view-all" to={props.linkToAll}>View all</Link> : 
                <>
                    <button className="add-new-van"><IoAdd />Add</button>
                    <button className="delete-van"><IoTrashOutline />Delete</button>
                </>}
            </h1>
            {vansElems.length !== 0 ? vansElems : (<h1>...Loading</h1>)}
        </div>
    )
}