import { useState, useEffect } from "react"
export default function Main() {

    const [meme, setMeme] = useState({
        imageUrl: null,
        topText: "One does not simply",
        bottomText: "Walk into Mordor"
    })
    const [memeImages, setMemeImages] = useState([])

    useEffect(() => {
            fetch("https://api.imgflip.com/get_memes")
                .then(res => res.json())
                .then(data => setMemeImages(data.data.memes))
                
            
        }, [])

    // setMeme(memeImages[Math.ceil(Math.random()*100)].url)
    function getRandomMeme() {
        setMeme(prev => ({
            ...prev,
            imageUrl: memeImages[Math.floor(Math.random() * memeImages.length)].url
        }))

    }

    function handleChange(e) {
        const {value, name} = e.currentTarget
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <main>
            <section className="start-page">
                <div className="inputs-div">
                    <div className="top-text-div">
                        <label>Top Text</label>
                        <input 
                            type="text" 
                            name="topText"
                            placeholder="One does not simply"
                            onChange={handleChange}
                            value={meme.topText}>
                        </input>
                    </div>
                    <div className="bottom-text-div">
                        <label>Bottom Text</label>
                        <input 
                            type="text" 
                            name="bottomText"
                            placeholder="Walk through Mordor!"
                            onChange={handleChange}
                            value={meme.bottomText}>
                        </input>
                    </div>
                </div>
                <button 
                    className="btn-new-image"
                    onClick={getRandomMeme}>
                    Get a new meme image
                </button>
                <div className="meme">
                    <img src={meme.imageUrl}></img>
                    {meme.imageUrl && <span className="top">{meme.topText}</span>}
                    {meme.imageUrl && <span className="bottom">{meme.bottomText}</span>}
                </div>
            </section>
        </main>
   ) 
}