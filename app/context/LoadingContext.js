'use client';

import React, {useState, useContext, createContext} from 'react';

// ایجاد یک Context برای لودینگ
const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

// Provider که حالت لودینگ را مدیریت می‌کند
export const LoadingProvider = ({children}) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};