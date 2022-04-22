import { NextRouter, useRouter } from 'next/router';
async function fetchData(url:string) {
    const router = useRouter();
    console.log(process.env.NEXT_PUBLIC_APP_UID);
    const data = await fetch(url);
    console.log(data);
    
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