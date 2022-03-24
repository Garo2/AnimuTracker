import { Button, Form } from "react-bootstrap";
import { Search } from 'react-bootstrap-icons';

const SearchView = ({ setAnimeName, searchAnime }) => (
  <Form className="search d-flex justify-content-center">
    <Form.Group className="py-2 w-75">
      <Form.Control size="lg searchInput" onKeyPress={(e) => {
        if (e.charCode === 13) {
          e.preventDefault();
          searchAnime();
        }
      }}
        onChange={(e) => {
          e.preventDefault();
          setAnimeName(e.target.value);
        }}
        type="text"
        placeholder="search an anime" />
    </Form.Group>

    <Form.Group className="d-flex p-1">
      <Button className="searchButton my-1" size="md" variant="outline-dark" type="button" onClick={(e) => searchAnime()}>
        <Search size={25} />
      </Button>
    </Form.Group>
  </Form>
);

export default SearchView;
