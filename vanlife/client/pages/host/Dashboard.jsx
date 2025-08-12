import { getIncome, getReviews } from "../../api";
import React from "react";
import HostVans from "./HostVans";
import { Link } from "react-router-dom";
import { PiStarFill } from "react-icons/pi";

export default function Dashboard() { 
    const [revs, setRevs] = React.useState(null)
    const [income, setIncome] = React.useState(null)
    React.useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getReviews('123')
                setRevs(data)
            } catch (err) {
                console.log(err)
            }
        }
        loadReviews()
    }, [])
    
    React.useEffect(() => {
        async function loadIncome() {
            try {
                const data = await getIncome()
                setIncome(data)
            } catch (err) {
                console.log(err)
            }
        }
        loadIncome()
    }, [])    

    const reviewScore = revs ? (revs.reduce((acc,curr) => acc + curr.rating, 0)/revs.length).toFixed(2) : '0.0'
    
    return (
        <>
            <div className="host-pricing-overview">
                <div>
                    <h1>Welcome!</h1>
                    <p>Total income</p>
                    <h1>{income ? income : 0}$</h1>
                </div>
                <Link to='income'>Details</Link>
            </div>
            <div className="host-review-overview">
                <h2>Review score <PiStarFill />{reviewScore}<span>/5</span>
                    <Link to='reviews'>Details</Link>
                </h2>
            </div>
            <div className="host-vans-overview">
                <HostVans linkToAll='vans'/>
            </div>
        </>
        
    )
}