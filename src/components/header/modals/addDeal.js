import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { DealsContext } from '../../../dealsContext';

const AddDeal = ({ show, handleClose }) => {

    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!show) {
            setDescription('');
        }
    }, [show]);

    // const loadDeals = () => {
    //     const savedDeals = localStorage.getItem('listDeals');
    //     return savedDeals ? JSON.parse(savedDeals) : [];
    // }

    const { deals, setDeals } = useContext(DealsContext);

    const saveForm = () => {

        if (description === null || description === "") {
            document.getElementById("dealHelp1").hidden = false;
            console.log("atata");
        }
        else {
            document.getElementById("dealHelp1").hidden = true;
            console.log("vse verno", description);
            const idd = uuidv4();
            const requestBody = {
                id: idd,
                status: "None",
                description: description
            }

            // const currentDeals = loadDeals();
            // const newDeals = [...currentDeals, requestBody];
            // localStorage.setItem('listDeals', JSON.stringify(newDeals));
            // console.log("bod", requestBody);
            setDeals([...deals, requestBody]);

            handleClose();
        }


    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Deal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="courseName1">
                        <Form.Label>Deal description</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <Form.Text hidden className="text-danger" id="dealHelp1">
                            Enter a description of the deal
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={saveForm}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default AddDeal;