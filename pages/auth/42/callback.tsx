import { NextRouter, useRouter } from 'next/router';
async function fetchData(url:string) {
    const router = useRouter();
    const data = await fetch(url);
    
}

const callback = () => {
    const router = useRouter();
    router.query.code ? fetchData(`http://10.12.11.3:3000/auth/42/callback?code=${router.query.code}`) : undefined;
    return (
        <div>
        </div>
    )
}

export default callback;  