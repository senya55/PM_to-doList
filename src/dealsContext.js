import React, { createContext, useState } from 'react';

const DealsContext = createContext();

const DealsProvider = ({ children }) => {
    const [deals, setDeals] = useState([]);

    return (
        <DealsContext.Provider value={{ deals, setDeals }}>
            {children}
        </DealsContext.Provider >
    );
};

export { DealsContext, DealsProvider };