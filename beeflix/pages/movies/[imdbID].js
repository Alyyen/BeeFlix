import Image from "next/image";
import React from "react";

export const getStaticPaths = async () => {
    // CAN'T FIND ALL PATHS, SEND EMPTY ARRAY AS PATHS
    // BLOCKING = TO CALL BEFORE INITIAL RENDER
    return {
        paths: [],
        fallback: "blocking",
    };
}

export async function getStaticProps(context) {
    // FUNCTION TO GET DYNAMICALLY IMDBID
    const id = context.params.imdbID;
    const res = await fetch('http://www.omdbapi.com/?apikey=' + process.env.API_KEY + "&type=movie&i=" + id);
    const data = await res.json();
    return {
        props: {data: data}
    }
}

const Details = ({data}) => {
    return (
        <div className='container'>
            <h1>{data.Title}</h1>
            <Image src={data.Poster && data.Poster !== "N/A" ? (data.Poster) : ('/no-poster.png')} width={126} height={190} alt={data.Title}
                   className="img-fluid img-thumbnail"/>
            <p>{data.Year} ({data.Runtime})</p>
            <h6>{data.Genre}</h6>
            <p>"{data.Plot}"</p>
            <p>Directed by {data.Director} and written by {data.Writer}</p>
            <p>With {data.Actors}</p>
        </div>
    );
}

export default Details;