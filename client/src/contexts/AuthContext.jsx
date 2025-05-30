import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

const AuthContext = createContext()

const initialState = { isAuthenticated: false, userData: {}, isGuest: false, guestData: null }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_GUEST":
            return { isAuthenticated: false, userData: {}, isGuest: true, guestData: payload.guestData }
        case "SET_LOGGED_IN":
            return { isAuthenticated: true, userData: payload.user }
        case "SET_PROFILE":
            return { isAuthenticated: true, userData: payload.user }
        case "SET_LOGGED_OUT":
            return { ...initialState }
        default:
            return state
    }
}

const generateGuestID = () => "guest-" + Math.random().toString(36).substring(2, 15)

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getUserProfile = useCallback(async (token) => {
        if (!token) return
        const config = { headers: { Authorization: `Bearer ${token}` } }

        await axios.get(`${import.meta.env.VITE_HOST}/auth/user`, config)
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    dispatch({ type: "SET_PROFILE", payload: { user: data.user } })
                }
            })
            .catch((err) => {
                dispatch({ type: "SET_LOGGED_OUT" })
                localStorage.removeItem("pngjwt")
                console.error("Error fetching user profile:", err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    // useEffect(() => {
    //     setLoading(true)
    //     const token = localStorage.getItem("pngjwt")
    //     if (!token) {
    //         dispatch({ type: "SET_LOGGED_OUT" })
    //         setLoading(false)
    //         return
    //     }
    //     getUserProfile(token)
    // }, [getUserProfile])

    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("pngjwt")

        if (token) {
            getUserProfile(token)
        } else {
            const guestDataKey = "guestData"
            let guestDataRaw = localStorage.getItem(guestDataKey)
            let guestData = null
            const todayStr = dayjs().format("YYYY-MM-DD")

            if (guestDataRaw) {
                try {
                    guestData = JSON.parse(guestDataRaw)

                    // Reset dailyDownloadsCount if lastDownloadDate is not today
                    if (guestData.lastDownloadDate !== todayStr) {
                        guestData.dailyDownloadsCount = 0
                        guestData.lastDownloadDate = todayStr
                        localStorage.setItem(guestDataKey, JSON.stringify(guestData))
                    }
                } catch (error) {
                    guestData = null
                }
            }

            if (!guestData) {
                guestData = {
                    guestID: generateGuestID(),
                    dailyDownloadsCount: 0,
                    lastDownloadDate: todayStr,
                }
                localStorage.setItem(guestDataKey, JSON.stringify(guestData))
            }

            dispatch({ type: "SET_GUEST", payload: { guestData } })
            setLoading(false)
        }
    }, [getUserProfile])

    const handleLogout = () => {
        dispatch({ type: "SET_LOGGED_OUT" })
        localStorage.removeItem("pngjwt")
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loading, setLoading, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)