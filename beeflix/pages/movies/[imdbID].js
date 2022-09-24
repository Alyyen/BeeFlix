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
        props: { data: data }
    }
}

const Details = ({ data }) => {
    return (
        <div>
            <h1>{ data.Title }</h1>
            <p>{ data.Year }</p>
            <p>{ data.Poster }</p>
        </div>
    );
}

export default Details;