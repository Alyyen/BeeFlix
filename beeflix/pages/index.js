import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image"
import styles from "../styles/Home.module.css"

export const getStaticProps = () => {
    return {
        // GET .ENV API_KEY FROM THE BACK SIDE
        props: {apikey: process.env.API_KEY}
    }
}

const Home = (context) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pagesNumber, setPagesNumber] = useState(1);

    const [firstPassage, setFirstPassage] = useState('');

    const onFormChange = (e) => {
        setPage(1);
        e.preventDefault();

        setSearch(document.querySelector("input[type=search]").value);

        fetch('http://www.omdbapi.com/?apikey=' + context.apikey + '&type=movie&page=' + page + '&s="' + search + '"')
            .then(res => res.json())
            .then(res => {
                    if (res.Search && res.Search.length > 0) {
                        setData(res.Search);
                        setPagesNumber( Math.ceil(res.totalResults/10));
                    } else {
                        setData([]);
                    }
                }
            )

        // ERROR MESSAGE
        if (document.querySelector("input[type=search]").value === ''){
            setFirstPassage('');
        } else {
            setFirstPassage('No result to display');
        }
    };

    const nextPage = () => {
        setData([]);
        setPage(page+1);
        setSearch(document.querySelector("input[type=search]").value);

        fetch('http://www.omdbapi.com/?apikey=' + context.apikey + '&type=movie&page=' + page + '&s="' + search + '"')
            .then(res => res.json())
            .then(res => {
                    if (res.Search && res.Search.length > 0) {
                        setData(res.Search);
                    } else {
                        setData([]);
                    }
                }
            )
    }

    const previousPage = () => {
        setData([]);
        setPage(page-1);
        setSearch(document.querySelector("input[type=search]").value);

        fetch('http://www.omdbapi.com/?apikey=' + context.apikey + '&type=movie&page=' + page + '&s="' + document.querySelector("input[type=search]").value + '"')
            .then(res => res.json())
            .then(res => {
                    if (res.Search && res.Search.length > 0) {
                        setData(res.Search);
                    } else {
                        setData([]);
                    }
                }
            )
    }

    if (data.length >= 1) {
        // RESULTS TO DISPLAY
        return (
            <div className='container'>
                <h2>Search movies by title</h2>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <br/>
                <br/>
                <h5>Results for "{search}"</h5>
                <div className="row text-center text-lg-start d-flex">
                    {data.map(elem => (
                        <div key={elem.imdbID} className="col-sm-4 col-6 col-md-3 col-lg-2">
                            <Link href={'/movies/' + elem.imdbID} className="">
                                <a className="d-block">
                                    <Image src={elem.Poster ? (elem.Poster) : ('/no-poster.png')} width={126} height={190} alt={elem.Title}
                                           className="img-fluid img-thumbnail" onError={() => setSrc('/no-poster.png')}/>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                <p>Page {page} / {pagesNumber}</p>
                {page > 1 ? (
                    <button onClick={previousPage} className={styles.btn}>Previous page</button>) : (<></>)}
                {pagesNumber > page ? (
                    <button onClick={nextPage} className={styles.btn}>Next page</button>
                ) : (<></>)}
            </div>
        )
    } else {
        // TOO MANY OR NO RESULT AVAILABLE
        return (
            <div className='container'>
                <h2>Search movies by title</h2>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <br/>
                <br/>
                <h5>{firstPassage}</h5>
            </div>
        )
    }
}


export default Home;