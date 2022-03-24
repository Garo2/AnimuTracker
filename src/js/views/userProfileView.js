import {Button, Form, Table} from "react-bootstrap";
import {ArrowDown} from "react-bootstrap-icons"


const UserProfileView = ({ animeList, removeAnime, showAnimeDetails, updatedAnimeStatus, updateAnimeRating, sortingType, sortingFunction}) =>
    <div className = "animeListContainer m-auto">
        <h1 className = "textCenter p-3">Your Anime List</h1>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Anime name {<Button size= "sm" variant="outline-dark" onClick={e => { e.preventDefault(); sortingType("name"); }}><ArrowDown /></Button>}</th>
                    <th>Anime status {<Button size= "sm" variant="outline-dark" onClick={e => { e.preventDefault(); sortingType("status"); }}><ArrowDown /></Button>}</th>
                    <th>Rating {<Button size= "sm" variant="outline-dark" onClick={e => { e.preventDefault(); sortingType("rating"); }}><ArrowDown /></Button>}</th>
                </tr>
            </thead>
            <tbody>
                {animeList.sort(sortingFunction).map(animeEntry =>
                    <tr key={animeEntry.id}>
                        <td><Button size="sm" onClick={e => removeAnime(animeEntry.id)} variant="outline-dark">x</Button></td>
                        <td><a href="" onClick={(e) => { e.preventDefault(); showAnimeDetails(animeEntry.id); }}>{animeEntry.name} </a></td>
                        <td>
                            <Form.Control size="sm" as="select" onChange = {(e) => updatedAnimeStatus(e.target.value, animeEntry)}> 
                                <option value="" hidden>{animeEntry.animeStatus}</option>
                                {["Plan to watch", "Watching", "Completed"].map(k=> <option key={k} >{k}</option>)}
                            </Form.Control>
                        </td>
                        <td>
                            <Form.Control size = "sm" as="select" onChange = {(e) => updateAnimeRating(e.target.value, animeEntry)}> 
                                <option value="" hidden>{animeEntry.personalRating}</option>
                                {["1", "2", "3","4", "5", "6","7", "8", "9", "10"].map(k=> <option key={k} value={k}>{k}</option>)}
                            </Form.Control>
                        </td>
                    </tr>)}
            </tbody>
        </Table>
    </div>

export default UserProfileView;