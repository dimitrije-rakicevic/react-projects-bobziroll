import React from "react"
import { VanTypeSelector } from "../../components/VanTypeSelector"
import { createVan } from "../../api.js"


export const CreateVanForm = () => {
    const [vanType, setVanType] = React.useState('simple')

    const [createVanFormData, setCreateVanFormData] = React.useState({
        name:"",
        price:"",
        description:"",
        type:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        formData.set('type', vanType)

        const token = localStorage.getItem('token')

        await createVan(formData, token)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setCreateVanFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="create-van-container">
            <form onSubmit={handleSubmit} className="create-van-form">
                <input
                    name="name" required
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                    value={createVanFormData.name}
                />
                <input
                    name="price" required
                    onChange={handleChange}
                    type="number"
                    placeholder="Price"
                    value={createVanFormData.price}
                />
                <textarea
                    name="description" required
                    onChange={handleChange}
                    type="text"
                    placeholder="Description"
                    value={createVanFormData.description}
                />
                <input
                    name="images" required
                    type="file" multiple
                />
                <VanTypeSelector name="type" selectedType={vanType} onChange={setVanType} />
                <button type='submit'>Create Van</button>
                <input name="type" type="text" value={createVanFormData.type} hidden/>
            </form>
        </div>
    )
}