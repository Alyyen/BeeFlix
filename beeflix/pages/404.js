import Link from "next/link";
import {useEffect} from "react";
import {useRouter} from "next/router";

const Error = () => {
    const router = useRouter ();
    useEffect( () => {
        setTimeout( ()=> {
            router.push("/");
        }, 4000)
    }, [])

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <Link href="/" className="btn"><a>Go back to home</a></Link>
        </div>
    )
}

export default Error;