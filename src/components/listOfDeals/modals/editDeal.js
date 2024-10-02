import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DealsContext } from '../../../dealsContext';
import { dealAPI } from '../../../API/dealAPI';

const EditDeal = ({ show, handleClose, id, description }) => {

    const { deals, setDeals } = useContext(DealsContext);

    const [newDescription, setNewDescription] = useState(description);

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const editDeal = () => {
        const requestBody = {
            description: newDescription
        }
        dealAPI.editDescriptionOfDeal(requestBody, id);
        const updatedDeals = deals.map(deal =>
            deal.id === id ? { ...deal, description: newDescription } : deal
        );
        setDeals(updatedDeals);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit the description of your deal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="courseName1">
                        <Form.Label>Deal description</Form.Label>
                        <Form.Control
                            type="text"
                            value={newDescription}
                            onChange={handleDescriptionChange}
                        />
                        {/* <Form.Text hidden className="text-danger" id="courseNameHelp1">
                            Введите название курса
                        </Form.Text> */}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={editDeal}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default EditDeal;