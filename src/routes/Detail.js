import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Movie from "../components/Movie";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movieInfo, setMovieInfo] = useState();
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovieInfo(json.data.movie);
    console.log(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Movie
            id={movieInfo.id}
            coverImg={movieInfo.medium_cover_image}
            title={movieInfo.title}
            summary={movieInfo.description_full}
            genres={movieInfo.genres}
          />
        </div>
      )}
    </div>
  );
}
export default Detail;
