import React, { useContext, useEffect, useState } from 'react';
import './listOfDeals.css';
import Button from 'react-bootstrap/Button';
// import testData from '../../API/listDeals2.json';

import CardOfDeal from './cardOfDeal';
import { DealsContext } from '../../dealsContext';
import { type } from '@testing-library/user-event/dist/type';

const MainListOfDeal = () => {

    // const [deals, setDeals] = useState([]);

    // useEffect(() => {
    //     // const dataFromLocalSt = localStorage.getItem('listDeals');
    //     // if (dataFromLocalSt) {
    //     //     console.log("Get data from localStorage", dataFromLocalSt);
    //     //     setDeals(JSON.parse(dataFromLocalSt));
    //     // }

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
    //             setDeals(data);

    //         }).catch(error => console.log(error))
    //     };

    //     fetchDeals();



    // }, []);

    // // console.log("ttttest", testData);
    // console.log("dataFromFetch", deals);
    // localStorage.setItem('listDeals', JSON.stringify(deals));

    // const [deals, setDeals] = useState([{
    //     id: 1234,
    //     status: "Done",
    //     description: "ttttttttt"
    // }]);
    // setDeals([{
    //     id: 1234,
    //     status: "Done",
    //     description: "ttttttttt"
    // }]);



    const { deals, setDeals } = useContext(DealsContext);

    function saveAll(deals) {
        let textDeals = JSON.stringify(deals);
        let a = document.createElement("a");
        let file = new Blob([textDeals], { type: 'application/json' });
        a.href = URL.createObjectURL(file);
        a.download = "iiii.json";
        a.click();
    }

    function saveFile() {
        const fileDownloader = saveAll(deals);

    }

    const openFile = (e) => {
        let files = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result;
            try {
                const parsedDeals = JSON.parse(fileContent);
                if (Array.isArray(parsedDeals)) {
                    setDeals(parsedDeals);
                } else {
                    console.error("Загруженные данные не являются массивом.");
                }
            } catch (error) {
                console.error("Ошибка при разборе JSON:", error);
            }
        }
        reader.readAsText(files);
    }

    return (
        <div>
            <Button variant="success" onClick={saveFile} className='me-3'>Save</Button>
            <input type='file' className='ms-3' onChange={openFile} />
            {deals.map(deal => (
                <CardOfDeal
                    key={deal.id}
                    id={deal.id}
                    status={deal.status}
                    description={deal.description}
                />
            ))}

        </div>

    )
}

export default MainListOfDeal;