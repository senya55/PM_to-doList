import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import plusIcon from './plus.svg';
import './header.css';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddDeal from './modals/addDeal';


const MainHeader = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = () => {

    }
    return (
        <div>
            <Navbar className="bg-body-tertiary px-5">
                <Navbar.Brand><Nav.Link as={Link} to="/">TO-DO List</Nav.Link></Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <img className='pluss' src={plusIcon} alt='' onClick={handleShow} />
                        <AddDeal show={show} handleClose={handleClose} />
                    </Navbar.Text>
                </Navbar.Collapse>



            </Navbar>

        </div>

    )
}

export default MainHeader;