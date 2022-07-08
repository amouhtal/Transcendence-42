import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../../components/login/Login'

const login = () => {
    const router = useRouter();
    return (
        <div>
            <Login />
        </div>
    )
}

export default login;