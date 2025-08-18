import React from "react"

import { VanTypeSelector } from "../../../components/VanTypeSelector"
import FormImages from "../../../components/FormImages"

import { updateVan } from "../../../api";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const EditVanForm = (props) => {
    
    const { van } = props
    
    const [vanType, setVanType] = React.useState(van.type)

    const [loading, setLoading] = React.useState(false)
    const [status, setStatus] = React.useState('')

    const [editVanFormData, setEditVanFormData] = React.useState({
        name: van.name,
        price: van.price,
        description: van.description,
        type: van.type,
        images: []
    })

    const [newImages, setNewImages] = React.useState([])
    const [imagesToDelete, setImagesToDelete] = React.useState([])

    console.log(van.id)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        
        const form = e.target
        const formData = new FormData(form)

        formData.set('type', vanType)
        console.log(formData.get('name'))

        imagesToDelete.forEach(id => formData.append("deleteImagesIds", id))
        newImages.forEach(img => formData.append("newImages", img))

        setLoading(true)
        await sleep(2000)
        try {
            await updateVan(van.id, formData, token)
        } catch(error) {
            console.log(error)
        } 
        setLoading(false)
        props.onVanUpdated()
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setEditVanFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className="van-form-container">
            <>
                <p className="exit" onClick={props.onClose}>✖</p>
                <form onSubmit={handleSubmit} className="van-form">
                    <input
                        disabled={loading}
                        name="name" required
                        onChange={handleChange}
                        type="text"
                        placeholder="Name"
                        value={editVanFormData.name}
                    />
                    <input
                        disabled={loading}
                        name="price" required
                        onChange={handleChange}
                        type="number"
                        placeholder="Price"
                        value={editVanFormData.price}
                    />
                    <textarea
                        disabled={loading}
                        name="description" required
                        onChange={handleChange}
                        type="text"
                        placeholder="Description"
                        value={editVanFormData.description}
                    />
                    
                    <FormImages 
                        vanImages={van ? van.vanImages : ""}
                        onAdd={setNewImages}
                        onDelete={setImagesToDelete}
                        disabled={loading}
                    />
                    
                    <VanTypeSelector 
                        name="type" 
                        selectedType={vanType} 
                        onChange={setVanType} 
                        disabled={loading}
                    />
                    <button disabled={loading} type='submit'>{loading ? "Loading..." : "Save changes"}</button>
                </form>
            </>
        </div>
    )
}