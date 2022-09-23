import Link from "next/link";
import Image from "next/image"
import Searchbar from "./Searchbar";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <Link href="/">
                    <a><Image src="/logo.png" width={150} height={65} /></a>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;