import React from 'react'
import Routes from './pages/Routes'
import Loader from './components/Loader'
import { useAuthContext } from './contexts/AuthContext'

function App() {

    const { loading } = useAuthContext()

    return (
        <>
            {
                loading ? <Loader /> : <Routes />
            }
        </>
    )
}

export default App