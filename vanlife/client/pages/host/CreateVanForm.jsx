import React from "react"
import { VanTypeSelector } from "../../components/VanTypeSelector"
import { createVan } from "../../api.js"

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const CreateVanForm = (props) => {
    const [vanType, setVanType] = React.useState('simple')

    const [loading, setLoading] = React.useState(false)
    
    const [status, setStatus] = React.useState('')

    const [createVanFormData, setCreateVanFormData] = React.useState({
        name:"",
        price:"",
        description:"",
        type:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const form = e.target
        const formData = new FormData(form)
        formData.set('type', vanType)

        await sleep(2000)

        const token = localStorage.getItem('token')
        try {
            const res = await createVan(formData, token)

            setStatus(res.ok ? 'success' : 'fail')

            await sleep(2000)

            props.onClose()
            props.onVanCreated()
        } catch (err) {
            setStatus('fail')
            console.log(err)
        }

        setLoading(false)

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCreateVanFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={`van-form-container ${status}`}>
            {status === 'success' ? <p className="success">You added new van successfully!</p> :
            status === 'fail' ? <p className="fail">Failed to add van. Try again.</p> : 
            <>
                <p className="exit" onClick={props.onClose}>✖</p>
                <form onSubmit={handleSubmit} className="van-form">
                    <input
                        disabled={loading}
                        name="name" required
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        value={createVanFormData.name}
                    />
                    <input
                        disabled={loading}
                        name="price" required
                        onChange={handleChange}
                        type="number"
                        placeholder="Price"
                        value={createVanFormData.price}
                    />
                    <textarea
                        disabled={loading}
                        name="description" required
                        onChange={handleChange}
                        type="text"
                        placeholder="Description"
                        value={createVanFormData.description}
                    />
                    <label>Select images
                        <input
                            disabled={loading}
                            name="images"
                            type="file" multiple
                        />
                    </label>
                    
                    <VanTypeSelector disabled={loading} name="type" selectedType={vanType} onChange={setVanType} />
                    
                    <button disabled={loading} type='submit'>{loading ? "Loading..." : "Create van"}</button>
                </form>
            </> }
        </div>
    )
}