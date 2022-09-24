import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import Link from "next/link";
import Image from "next/image"

export const getStaticProps = () => {
    return {
        // GET .ENV API_KEY FROM THE BACK SIDE
        props: {apikey: process.env.API_KEY}
    }
}

const Home = (context) => {
    const [data, setData] = useState([]);
    const [firstPassage, setFirstPassage] = useState('');

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

        setFirstPassage('No result to display');
    };

    if (data.length >= 1) {
        // RESULTS TO DISPLAY
        return (
            <div className='container'>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <br/>
                <h4>Result(s)</h4>
                <div className="row text-center text-lg-start d-flex">
                    {data.map(elem => (
                        <div className="col-sm-4 col-6 col-md-3 col-lg-2">
                            <Link key={elem.imdbID} href={'/movies/' + elem.imdbID} className="">
                                <a className="d-block">
                                    <Image src={elem.Poster} width={126} height={190} alt={elem.Title}
                                           className="img-fluid img-thumbnail"/>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        // TOO MANY OR NO RESULT AVAILABLE
        return (
            <div className='container'>
                <Form onSubmit={onFormChange} className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                </Form>
                <br/>
                <h4>{firstPassage}</h4>
            </div>
        )
    }
}


export default Home;