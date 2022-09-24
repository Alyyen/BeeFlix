import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Link from "next/link";
import styles from "../styles/Movies.module.css";

export const getStaticProps = () => {
    return {
        // GET .ENV API_KEY FROM THE BACK SIDE
        props: {apikey: process.env.API_KEY}
    }
}

const Home = (context) => {
    const [data, setData] = useState([]);

    const onFormChange = (e) => {
        e.preventDefault();

        let searchVal = document.querySelector("input[type=search]").value;

        fetch('http://www.omdbapi.com/?apikey=' + context.apikey + '&type=movie&page=1&s="' + searchVal + '"')
            .then(res => res.json())
            .then(res => {
                    if (res.Search && res.Search.length > 0) {
                        setData(res.Search);
                    } else {
                        setData([]);
                    }
                }
            )
    };

    if (data.length >= 1) {
        // RESULTS TO DISPLAY
        return (
            <div>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <h4>Result(s)</h4>
                {data.map(elem => (
                    <Link key={elem.imdbID} href={'/movies/' + elem.imdbID}>
                        <a className={styles.single}>
                            <h4>{elem.Title}</h4>
                        </a>
                    </Link>
                ))}
                <hr/>
            </div>
        )
    } else {
        // TOO MANY OR NO RESULT AVAILABLE
        return (
            <div>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <h4>No data to display.</h4>
            </div>
        )
    }
}

export default Home;