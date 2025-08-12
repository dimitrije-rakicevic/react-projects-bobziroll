import React, { useEffect } from "react"
import { getReviews } from "../../api"
import { PiStarFill } from "react-icons/pi";


export default function Reviews() {
    const [revs,setRevs] = React.useState(null)

    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getReviews('123')
                setRevs(data)
            }
            catch(err) {
                console.log(err)
            }
        }
        loadReviews()
    },[])

    console.log(revs)
    
    const revElems = revs ? revs.map(rev => 
        <div className="review-container">
            <h2><PiStarFill />{rev.rating}/5.0</h2>
            <p><span>Comment:</span> {rev.text}</p>
        </div>
        
    ) : ''
    return (
        <div className="host-reviews-container">
            {revElems}
        </div>
    )
}