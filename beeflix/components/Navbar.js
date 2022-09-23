import Link from "next/link";
import Image from "next/image"

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/"><h1>BeeFlix</h1></Link>
                <Image src="/favicon.ico" width={21} height={22} />
            </div>
        </nav>
    );
}

export default Navbar;