import { useState } from 'react';
import './listOfDeals.css'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import DeleteDeal from './modals/deleteDeal';
import EditDeal from './modals/editDeal';

const CardOfDeal = ({ id, status, description, name }) => {

    //edit
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    //delete
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    let backColor;
    let textColor;
    if (status == 0) {
        backColor = '#d4d4d4';
    }
    else {
        backColor = '#9dff9c';
    }

    let statu;
    if (status == 0) {
        statu = "None"
    }
    else {
        statu = "Done"
    }
    return (

        <div className="mainDeal mx-5 mt-3" style={{ background: backColor }}>
            <Nav.Link as={Link} to={`/info/${id}`}>
                <div className="dealInfo">
                    <div className='ms-4 mt-2'>{statu}</div>
                    <div className='name ms-4 mt-2'>{name}</div>
                    <div className='description ms-4 mt-2'>{description}</div>

                </div>
            </Nav.Link>
            <div className='twoBtn me-4 '>
                <Button variant="warning mx-3" onClick={handleShowEdit}>Edit</Button>
                <EditDeal show={showEdit} handleClose={handleCloseEdit} id={id} description={description} />
                <Button variant="danger " onClick={handleShowDelete}>Delete</Button>{' '}
                <DeleteDeal show={showDelete} handleClose={handleCloseDelete} id={id} />
                {/* <Button variant="danger ms-auto me-4 my-2" className='redBtn'>Delete</Button>{' '} */}
            </div>

        </div >

    )
}

export default CardOfDeal;