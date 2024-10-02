import axios from "axios";

const getListOfDeals = (setDeals) => {
    const response = axios.get('http://toDoList/api/deal')
        .then(response => {
            console.log("iiii", response.data);
            setDeals(response.data)
        });

    // setDeals(response);
}

const deleteDeal = (id) => {
    const response = axios.delete(`http://toDoList/api/deal/${id}`)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
        });
}

const addDeal = (setDeals, body) => {
    const response = axios.post('http://toDoList/api/deal/deal', body)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
            getListOfDeals(setDeals);
        });

    // setDeals(response);
}

const editDescriptionOfDeal = (body, id) => {
    const response = axios.put(`http://toDoList/api/deal/description/${id}`, body)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
        });

    // setDeals(response);
}

const editStatusOfDeal = (body, id) => {
    const response = axios.put(`http://toDoList/api/deal/status/${id}`, body)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
        });

    // setDeals(response);
}

export const dealAPI = {
    getListOfDeals: getListOfDeals,
    deleteDeal: deleteDeal,
    addDeal: addDeal,
    editDescriptionOfDeal: editDescriptionOfDeal,
    editStatusOfDeal: editStatusOfDeal
}