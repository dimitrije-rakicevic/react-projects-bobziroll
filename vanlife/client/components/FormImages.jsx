import React from "react";
import './FormImages.css'
export default function FormImages({ vanImages, onAdd, onDelete, disabled }) {

    const [images, setImages] = React.useState(vanImages)
    
    let imageElems = []
    if(images) {
        imageElems = images.map(img => (
            <div key={img.id} className="form-image-wrapper">
                <img 
                    src={img.path ? `http://localhost:3000${img.path}` : URL.createObjectURL(img)} 
                    className="form-image"/>
                <button hidden={disabled}
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                        if (img.id) {
                            // stara slika iz baze
                            onDelete(prev => [...prev, img.id]);
                        } else {
                            // nova slika (File objekat) -> prosleđuješ njen name
                            onAdd(prev => prev.filter(f => f.name !== img.name))
                        }
                        setImages(prev => prev.filter(i => i.id ? i.id !== img.id : i.name !== img.name));
                    }}
                >✖
                </button>
            </div>
        ))
    }

    console.log(images)

    const handleChange = (e) => { 
        const files = Array.from(e.target.files)

        onAdd(prev => ([...prev, ...files]))

        setImages(prev => ([ ...prev, ...files ]));
        e.target.value = null; 
    }

    return (
        <div className="form-images-section">
            <h3>Images</h3>
            <div className="form-images-grid">
                {imageElems.length > 0 ? imageElems : ""}
                <label hidden={disabled}className="add-btn">
                    +
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        onChange={handleChange}
                    />
                </label>
            </div>
        </div>
    )
}