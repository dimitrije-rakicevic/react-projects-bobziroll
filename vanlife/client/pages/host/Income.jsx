import React, { useEffect } from "react"
import { getIncomes } from "../../api"

export default function Income() { // /host/income

    const [incomes, setIncomes] = React.useState(null)

    useEffect(() => {
        async function loadIncomes() { 
            try {
                const data = await getIncomes()
                setIncomes(data)
            }
            catch(err) {
                console.log(err)
            }
        }
        loadIncomes()
    },[incomes])

    const incomeElems = incomes ? incomes.revs.map(rev => (
        <div className="income-container">
            <img src={incomes.vans
                        .find(van => van.id === rev.van).imageUrl} />
            <div className="info-income">
                <h2>{incomes.vans
                        .find(van => van.id === rev.van).name}</h2>
                <p>{rev.days} days, van price: {incomes.vans
                    .find(van => van.id === rev.van).price}/day
                </p>
            </div>  
            <span>Total income: {incomes.vans
                        .find(van => van.id === rev.van).price * rev.days}</span>           
        </div>
    )) : ''

    return (
        <div className="incomes-container">
            {incomeElems}
        </div>
    )
}