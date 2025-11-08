import React, { createContext, useState, useContext, useCallback } from 'react';
const CompareContext = createContext();


const defaultAC = {
    id: 'default',
    title: 'WindFree Inverter Split AC AR18CY5APWK, 5.00kw (1.5T) 5 Star',
    price: 32290,
    originalPrice: 63900,
    image:"https://picsum.photos/200/300"
};

// 2. Provider component banaayein
export const CompareProvider = ({ children }) => {
    const [selectedACs, setSelectedACs] = useState([]);

    const addAC = useCallback((newAC) => {
        setSelectedACs(prev => {
            // Duplicate check
            if (prev.some(ac => ac.id === newAC.id)) {
                return prev;
            }
            // Max 2 limit check
            if (prev.length >= 2) {
                return prev; // Do se zyada select nahi kar sakte
            }

            console.log('Context mein AC add hua:', newAC.title);
            return [...prev, newAC];
        });
    }, []);

    const removeAC = useCallback((id) => {
        setSelectedACs(prev => prev.filter(ac => ac.id !== id));
    }, []);
    
    const allACsForCompare = [defaultAC, ...selectedACs];

    return (
        <CompareContext.Provider value={{ 
            selectedACs, 
            addAC, 
            removeAC, 
            allACsForCompare,
            defaultAC
        }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    return useContext(CompareContext);
};