import { Button, Form, InputGroup, Card, CardDeck } from "react-bootstrap";

const DetailsView = ({ anime, animeAdded, isAnimeInList, personalRating, animeStatus, addToListText, addToListNav, backToSearchNav, loggedIn }) => (
  <div>
    <h1 className="textCenter"> {anime.attributes.canonicalTitle}</h1>
    <CardDeck className="p-2 d-flex flex-wrap justify-content-center">
      <div>
        <Card className="radiusDimensions">
          <Card.Body>
            <Card.Img className="detailsImageDimensions" variant="top" src={anime.attributes.posterImage.small} alt=""></Card.Img>
            <Card.Title>
              {anime.attributes.canonicalTitle}
            </Card.Title>
            <Card.Text >
              <span className="cardTextLine"><strong>Titles:</strong></span>
              <span className="cardTextLine"><strong>-en:</strong> {anime.attributes.titles.en}</span>
              <span className="cardTextLine"><strong>-en_jp:</strong> {anime.attributes.titles.en_jp}</span>
            </Card.Text>
            <Card.Text >
              <span className="cardTextLine"><strong>Started in:</strong> {anime.attributes.startDate}</span>
              <span className="cardTextLine"><strong>Ended in:</strong> {anime.attributes.endDate}</span>
              <span className="cardTextLine"><strong>Episodes:</strong> {anime.attributes.episodeCount}</span>
              <span className="cardTextLine"><strong>Average rating: </strong>{anime.attributes.averageRating}/100</span>
              <span className="cardTextLine"><strong>Popularity: </strong>{anime.attributes.popularityRank}</span>
              <span className="cardTextLine"><strong>Age rating:</strong> {anime.attributes.ageRating},{" "} {anime.attributes.ageRatingGuide} </span>
              <span className="cardTextLine"><strong>Type of anime: </strong>{anime.attributes.subtype}</span>
              <span className="cardTextLine"><strong>Anime status: </strong>{anime.attributes.status}</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Card className="p-2 radiusDimensions ">
        <InputGroup className="d-flex justify-content-center p-2">
          <InputGroup.Append className="mr-2 my-2">

            <Form.Control className="mr-2" size="sm" as="select" disabled={isAnimeInList} onChange={(e) => animeStatus(e.target.value)}>
              <option value="Plan to watch" hidden>Choose anime status</option>
              {["Plan to watch", "Watching", "Completed"].map(k => <option key={k} >{k}</option>)}
            </Form.Control>

            <Form.Control size="sm" as="select" disabled={isAnimeInList} onChange={(e) => personalRating(e.target.value)}>
              <option value="" hidden>Rate the anime</option>
              <option key={"(1) Appalling"} value="1" >(1) Appalling</option>
              <option key={"(2) Horrible"} value="2" >(2) Horrible</option>
              <option key={"(3) Very bad"} value="3" >(3) Very bad</option>
              <option key={"(4) Bad"} value="4" >(4) Bad</option>
              <option key={"(5) Average"} value="5" >(5) Average</option>
              <option key={"(6) Fine"} value="6" >(6) Fine</option>
              <option key={"(7) Good"} value="7" >(7) Good</option>
              <option key={"(8) Very Good"} value="8" >(8) Very Good</option>
              <option key={"(9) Great"} value="9" >(9) Great</option>
              <option key={"(10) Masterpiece"} value="10" >(10) Masterpiece</option>
            </Form.Control>

          </InputGroup.Append>
          <Button size="sm" className="mr-2 my-2" variant="outline-dark" onClick={(e) => { animeAdded(anime); addToListNav(); }} disabled={isAnimeInList || !loggedIn}>
            {addToListText}
          </Button>
          <Button className=" my-2" size="sm" variant="outline-dark" onClick={backToSearchNav}>Back to Search</Button>
        </InputGroup>


        <div className="p-1">
          {anime.attributes.description}
        </div>

        <h4 className="textCenter p-1">{anime.attributes.canonicalTitle} Trailer:</h4>
        <div className="embed-responsive embed-responsive-16by9 hoverable trailerBox textCenter radiusDimensions">
          <iframe className="embed-responsive-item"
            title="trailer"
            src={"https://www.youtube.com/embed/" + anime.attributes.youtubeVideoId}
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </Card>
    </CardDeck>




  </div >
);

export default DetailsView;


