
const API_URL = 'http://localhost:3000/api'

export const getVans = async () => {
    const res = await fetch(`${API_URL}/vans`)
    if(!res.ok) throw new Error("Failed to fetch vans.")
    return res.json();
}

export const getVan = async(id) => {
    const res = await fetch(`${API_URL}/vans/${id}`)
    if(!res.ok) throw new Error("Failed to fetch van.")
    return res.json();
}

export const login = async (loginForm) => {
    const { email, password } = loginForm
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    if(!res.ok) throw new Error("Login failed.")
    return res.json()
}

function getAuthHeaders() {
    const token = localStorage.getItem('token')
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
}

export async function getHostVans() {
    const res = await fetch(`${API_URL}/host/vans`, {
        headers: getAuthHeaders(),
    })

    if (!res.ok) {
        throw new Error('Failed to fetch host vans')
    }

    return await res.json()
}

export const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    if(!res.ok) throw new Error("Registration failed.")
    return res.json()
}

export const getReviews = async (req, res) => {

}

export const getIncome = async (req, res) => {

}

export const getIncomes = async (req, res) => {

}

export const createVan = async (formData, token) => {
    const res = await fetch(`${API_URL}/host/vans`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })

    if (!res.ok) {
        throw new Error('Failed to create van')
    }
    return res
}

export const deleteVan = async (id, token) => {
    const res = await fetch(`${API_URL}/host/vans/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!res.ok) {
        throw new Error('Failed to delete van')
    }

    return res
}

export const updateVan = async (id, formData, token) => {
    const res = await fetch(`${API_URL}/host/vans/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    })
    if(!res.ok) {
        throw new Error("Failed to update van")
    }

    return res
}