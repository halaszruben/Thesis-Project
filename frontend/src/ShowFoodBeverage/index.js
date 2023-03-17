import { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BeverageAndPastryTableView from '../BeverageAndPastryTableView';

function ShowFoodBeverage(props) {

    const bevsAndPasts = props.bevAndPastData;
    console.log("italok", bevsAndPasts);

    const [query, setQuery] = useState("");
    const keys = ["name"];
    const search = (bevsAndPasts) => {
        return bevsAndPasts.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(query))
        );
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Here you can see our Book collection!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mt-2">
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Search by: Beverage or Food name</InputGroup.Text>
                        <Form.Control
                            placeholder='Search ...'
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                    </InputGroup>
                    <BeverageAndPastryTableView bevsAndPasts={search(bevsAndPasts)} />


                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ShowFoodBeverage;
