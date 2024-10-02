import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { DealsContext } from '../../../dealsContext';
import { dealAPI } from '../../../API/dealAPI';

const AddDeal = ({ show, handleClose }) => {

    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

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

    const saveForm = async () => {

        let err1 = 0;
        let err2 = 0;
        if (name === null || name === "") {
            document.getElementById("dealHelp2").hidden = false;
            console.log("atata");
            err1 = 1;
        }
        else {
            document.getElementById("dealHelp2").hidden = true;
            err1 = 0;

        }

        if (description === null || description === "") {
            document.getElementById("dealHelp1").hidden = false;
            console.log("atata");
            err2 = 1;
        }
        else {
            document.getElementById("dealHelp1").hidden = true;
            err2 = 0;
            console.log("vse verno", description);
        }

        if (!err1 && !err2) {
            // const idd = uuidv4();
            const requestBody = {
                // id: idd,
                name: name,
                description: description,
                status: 0
            }
            await dealAPI.addDeal(setDeals, requestBody);
            // await dealAPI.getListOfDeals(setDeals);

            // const currentDeals = loadDeals();
            // const newDeals = [...currentDeals, requestBody];
            // localStorage.setItem('listDeals', JSON.stringify(newDeals));
            // console.log("bod", requestBody);
            // setDeals([...deals, requestBody]);

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
                        <Form.Label>Deal name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Form.Text hidden className="text-danger " id="dealHelp2">
                            Enter a name of the deal
                        </Form.Text>
                        <div></div>
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