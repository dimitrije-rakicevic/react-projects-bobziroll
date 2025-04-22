import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    getDoc, 
    doc,
    query, 
    where
} from "firebase/firestore/lite"

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG_JSON);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// refactoring fetch functions below


const revsCollectionRef = collection(db,'reviews')
const vansCollectionRef = collection(db,'vans')

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db,'vans',id)
    const snapshot = await getDoc(docRef)
    return {...snapshot.data(), id: snapshot.id}
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId","==","123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getReviews(id) {
    const q = query(revsCollectionRef,where("user","==",id))
    const snapshot = await getDocs(q)
    const revs = snapshot.docs.map(rev => ({
        ...rev.data(),
        id: rev.id
    }))
    console.log(revs)
    return revs
}

export async function getIncome() {
    const vans = await getHostVans()
    const q = query(revsCollectionRef,where("user","==",'123'))
    const snapshot = await getDocs(q)
    const revs = snapshot.docs.map(rev => ({
        ...rev.data(),
        id: rev.id
    }))
    const income = revs.reduce((acc, rev) => {
        const van = vans.find(v => v.id === rev.van); // Pronađi odgovarajući objekat iz vans
        return van ? acc + rev.days * van.price : acc; // Ako je nađen, dodaj proizvod; inače, ne menjaj acc
    }, 0);
    return income
}

export async function getIncomes() {
    const vans = await getHostVans()
    const q = query(revsCollectionRef,where("user","==",'123'))
    const snapshot = await getDocs(q)
    const revs = snapshot.docs.map(rev => ({
        ...rev.data(),
        id: rev.id
    }))
    
    return {vans, revs}
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}