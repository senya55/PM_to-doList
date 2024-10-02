import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DealsContext } from '../../../dealsContext';
import { dealAPI } from '../../../API/dealAPI';

const DeleteDeal = ({ show, handleClose, id }) => {

    const { deals, setDeals } = useContext(DealsContext);

    const deleteDeal = () => {
        const updatedDeals = deals.filter(deal => deal.id !== id);
        dealAPI.deleteDeal(id);
        // Обновляем состояние
        setDeals(updatedDeals);
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this deal?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteDeal}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default DeleteDeal;