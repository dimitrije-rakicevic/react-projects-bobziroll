import React from "react"
import { Link, NavLink } from "react-router-dom"
import { getHostVans, deleteVan } from "../../api"
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { CreateVanForm } from "./CreateVanForm";

import noimage from '../../assets/images/no-image.jpeg'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function HostVans(props) {

    const [vans, setVans] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false);

    const [deleteMode, setDeleteMode] = React.useState(false)
    const [deletePrompt, setDeletePrompt] = React.useState([false, null])
    const [deleteStatus, setDeleteStatus] = React.useState('')
    const [deleteLoading, setDeleteLoading] = React.useState(false)

    React.useEffect(() => {
        modalOpen ? 
            document.body.style.overflow = 'hidden' : 
            document.body.style.overflow = 'auto'
    }, [modalOpen])

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
    function handleDelete(id) {
        console.log(id)
        setDeletePrompt([true, id])
        console.log(deletePrompt)
    }
    async function deleteSingleVan() {
        const token = localStorage.getItem('token')
        setDeleteLoading(true)
        await sleep(2000)
        try {
            const res = await deleteVan(deletePrompt[1], token)
            setDeleteStatus('success')
        } catch(error) {
            setDeleteStatus('fail')
            console.log(error)
        }
        setDeleteLoading(false)
        await sleep(1800)
        setDeletePrompt([false, null])
        setDeleteStatus('')
        await loadVans()
    }

    React.useEffect(() => {
        loadVans()
    }, [])

    const vansElems = vans.map(van => (   
            <div className="host-van-wrap">
                <Link key={van.id} style={{ textDecoration: 'none' }} to={(props.linkToAll ? "vans/" : "") + `${van.id}`}>
                    <div className="host-van-container">
                        <img src={van.imageUrl ? `http://localhost:3000${van.imageUrl}` : noimage} alt='name' />
                        <div className="host-van-info">
                            <h2>{van.name}</h2>
                            <p>${van.price}/day</p>
                        </div>
                    </div>
                </Link>
                {deleteMode && <div onClick={() => handleDelete(van.id)} className="delete-single-van">✖</div>}
            </div>
        )
    )
    
    return (
        <div className="host-vans">
            <h1 style={{justifyContent: props.linkToAll && "space-between", alignItems: 'center'}}>
                Your listed vans
                {props.linkToAll ? 
                <Link className="view-all" to={props.linkToAll}>View all</Link> : 
                <>
                    <button onClick={() => {setModalOpen(true); setDeleteMode(false)}} className="add-new-van"><IoAdd />Add</button>
                    <button onClick={() => setDeleteMode((prev) => !prev)}className="delete-van"><IoTrashOutline />Delete</button>
                </>}
            </h1>
            {vansElems.length !== 0 ? vansElems : (<h1>...Loading</h1>)}
            {modalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateVanForm onVanCreated={() => loadVans()} onClose={() => setModalOpen(false) } />
                    </div>
                </div>
            )}
            {deletePrompt[0] && 
                <div className="modal-overlay">
                    <div className="delete-prompt">
                        {deleteStatus === '' ? <>
                            <p>Are you sure you wanna delete van?</p>
                            <div className="options">
                                {!deleteLoading ? 
                                    <>
                                        <span onClick={() => setDeletePrompt([false, null])}>No</span>
                                        <span onClick={deleteSingleVan}>Yes</span>
                                    </> : 
                                    <span>Loading...</span>                            
                                }                                                 
                            </div>
                            </> : 
                            <p className={`delete-${deleteStatus}`}>{deleteStatus === 'success' ? 'Van deleted successfully' : 
                                deleteStatus === 'fail' && 'Failed to delete van'}
                            </p>
                        } 
                    </div>

                </div>}
        </div>
    )
}