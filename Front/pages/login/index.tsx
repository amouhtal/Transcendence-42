import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../../components/login/Login'

const login = () => {
    return (
        <div>
            <Login />
        </div>
    )
}

export default login;