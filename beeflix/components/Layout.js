import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";

const Layout = ({children}) => {
    return (
        <div className="content">
            <Head>
                <title>BeeFlix</title>
                <meta name="description" content="Search movies by title" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;