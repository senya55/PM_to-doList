import axios from "axios";

const getListOfDeals = (setDeals) => {
    const response = axios.get('http://91.184.243.83:8085/api/deal')
        .then(response => {
            console.log("iiii", response.data);
            setDeals(response.data)
        });

    // setDeals(response);
}

const deleteDeal = (id) => {
    const response = axios.delete(`http://91.184.243.83:8085/api/deal/${id}`)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
        });
}

const addDeal = (setDeals, body) => {
    const response = axios.post('http://91.184.243.83:8085/api/deal/deal', body)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
            getListOfDeals(setDeals);
        });

    // setDeals(response);
}

const editDescriptionOfDeal = (body, id) => {
    const response = axios.put(`http://91.184.243.83:8085/api/deal/description/${id}`, body)
        .then(response => {
            console.log("iiii", response.data);
            // setDeals(response.data)
        });

    // setDeals(response);
}

const editStatusOfDeal = (body, id) => {
    const response = axios.put(`http://91.184.243.83:8085/api/deal/status/${id}`, body)
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