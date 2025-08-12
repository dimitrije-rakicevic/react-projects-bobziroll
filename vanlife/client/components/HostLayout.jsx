import { Outlet, NavLink } from "react-router-dom"

export default function HostLayout() {

    const activeStyle = {
        color: 'black',
        fontWeight: 'bold',
        textDecoration:'underline'
    }
    return (
        <>
            <nav className="host-nav">
                <NavLink style={({isActive}) => isActive ? activeStyle : null}
                    to="." end>Dashboard</NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : null}
                    to="income">Income</NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : null} 
                    to="vans">Vans</NavLink>
                <NavLink style={({isActive}) => isActive ? activeStyle : null} 
                    to="reviews">Reviews</NavLink>
            </nav>
            <Outlet />
        </>
    )
}