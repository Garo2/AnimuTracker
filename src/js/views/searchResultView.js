import 'react-bootstrap';
import { Card } from 'react-bootstrap';

const SearchResultView = ({ animeResults, currentAnime , nav, searchTitle}) => (
<div>
    <h2 className="d-flex justify-content-center">
        {searchTitle}
    </h2>

    <div className="d-flex flex-wrap justify-content-center">
    {animeResults.map((anime) => (
        <Card className="w-5 m-1 radiusDimensions popEffect" key={anime.id}>
        <Card.Body>
        <Card.Img className="resultsImageDimensions" variant="top" src={checkIfImageExists(anime)} alt="Anime poster"
            onClick={(e) => {
              currentAnime(anime.id);
              nav();
               }}
        ></Card.Img>
        <Card.Title className="textCenter pt-3">
              {anime.attributes.canonicalTitle}
            </Card.Title>
        </Card.Body>
        </Card>
        ))}
    </div>
</div>
);
export default SearchResultView;

function checkIfImageExists(anime) {
  if (anime.attributes.posterImage != null) {
    return anime.attributes.posterImage.large;
  }
  return "";
}