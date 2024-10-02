import { useContext, useEffect, useState } from 'react';
import './deal.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { DealsContext } from '../../dealsContext';
import { dealAPI } from '../../API/dealAPI';

const MainDeal = () => {

    const { id } = useParams();
    console.log("id deal", id);

    const [deal, setDeal] = useState(null);

    const { deals, setDeals } = useContext(DealsContext);
    console.log("saaaaaaa", deals);

    const [status, setStatus] = useState(false); // Инициализируем состояние status

    useEffect(() => {
        const foundDeal = deals.find(deal => deal.id === id);
        if (foundDeal) {
            setDeal(foundDeal);
            setStatus(foundDeal.status > 0); // Устанавливаем статус при загрузке дела
        }
    }, [id, deals]);

    if (!deal) {
        return <div>тип че-то должно быть, но ничего нет...</div>;
    }

    const handleStatusChange = () => {
        setStatus(prevStatus => !prevStatus);
    };

    const saveStatus = () => {
        const requestBody = {
            status: status ? 1 : 0
        }
        dealAPI.editStatusOfDeal(requestBody, id);
        const updatedDeals = deals.map(d =>
            d.id === id ? { ...d, status: status ? 1 : 0 } : d
        );
        setDeals(updatedDeals);
    };

    // useEffect(() => {
    //     const fetchDeals = () => {
    //         fetch(`${process.env.PUBLIC_URL}/listDeals.json`, {// Тяжелые мутки с путем к файлу
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }).then(response => {
    //             if (!response.ok) {
    //                 console.log(response);
    //                 throw new Error('Не удалось получить инфу о списке дел')
    //             }
    //             console.log("Успешно получена инфа о списке дел")
    //             return response.json()
    //         }).then(data => {
    //             console.log(data);
    //             let oneDeal = data.find(de => de.id === id);
    //             setDeal(oneDeal);
    //         }).catch(error => console.log(error))
    //     };

    //     fetchDeals();
    // }, [])

    // console.log("uuuuuuuu", deal);

    return (
        <div className="cardOfDeal mx-5 mt-3">
            <Form>
                <Form.Check // prettier-ignore
                    type="switch"
                    id="custom-switch"
                    label="Done"
                    checked={status}
                    onChange={handleStatusChange}
                />
            </Form>
            <div className='mt-3'>Deal description:</div>
            <div className='mt-1'>{deal.description}</div>
            <Button variant="primary" className='mt-5' onClick={saveStatus}>Save status</Button>
        </div>

    )
}

export default MainDeal;