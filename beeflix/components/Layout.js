import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import Script from "next/script"

const Layout = ({children}) => {
    return (
        <div className="content">
            <Head>
                <title>BeeFlix</title>
                <meta name="description" content="Search movies by title" />
                <link rel="icon" href="/favicon.png" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
                    crossOrigin="anonymous"
                />
            </Head>
            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
                crossorigin="anonymous"/>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;