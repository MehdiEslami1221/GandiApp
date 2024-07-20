'use client';

import { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import apiService from '@/app/components/ApiService/ApiService';

const InternalFooterContent = ({ title }) => {
    const [items, setItems] = useState(null);

    const RedirectContent = async (name) => {
        try {
            const response = await apiService?.getFooterSubMenuByName(name);
            setItems(response?.data);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        if (title) {
            RedirectContent(title);
        }
    }, [title]);

    return (
        <div className="d-flex">
            <div className="col p-4">
                {items?.content && <div className="mt-4">{parse(items?.content)}</div>}
            </div>
        </div>
    );
};

export default InternalFooterContent;
