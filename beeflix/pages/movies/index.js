import React from 'react';
import styles from '../../styles/Movies.module.css'
import Link from "next/link";

export const getStaticProps = async () => {
    const res = await fetch('http://www.omdbapi.com/?apikey=' + process.env.API_KEY + '&s=dumbo&type=movie', {
        method: 'GET',
    });
    const data = await res.json();
    return {
        props: {data: data}
    }
}


const Movies = ({data}) => {
    return (
        <div>
            {data.Search.map(elem => (
                <Link key={elem.imdbID} href={'/movies/' + elem.imdbID}>
                    <a className={styles.single}>
                        <h4>{elem.Title}</h4>
                    </a>
                </Link>
            ))}
        </div>
    )
}

export default Movies;