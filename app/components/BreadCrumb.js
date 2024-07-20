import React, { useEffect, useState } from 'react';
import styles from './BreadCrumb.module.css';
import apiService from "@/app/components/ApiService/ApiService";
import { useRouter } from 'next/navigation';

const BreadCrumb = ({ id }) => {
    const [breadCrumb, setBreadCrumb] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBreadCrumbData = async () => {
            try {
                await apiService?.getBreadCrumb(id)
                    .then(response => {
                        let breadCrumbData = [];
                        let currentType = response.data;

                        while (currentType) {
                            breadCrumbData.unshift({
                                id: currentType.id,
                                name: currentType.name
                            });
                            currentType = currentType?.parentProductType;
                        }

                        setBreadCrumb(breadCrumbData);
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } catch (error) {
                setError('مشکلی در دریافت اطلاعات رخ داده است.');
            }
        };

        fetchBreadCrumbData();
    }, [id]);

    const router = useRouter(); // Initialize useRouter
    const handleClick = (crumbId) => {
        let params = {
            ato: 0,
            amount: 0,
            ptype: crumbId,
            Tag: 0,
            sortByPrice: 0,
            sortByNewerProduct: 0,
            sortByMostDiscount: 0,
            sortByAvailableProduct: 0,
            amazingOffer: 1,
            page: 0
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        router.push('/productItems?' + queryString);

    };

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className="user-select-none my-3 mx-3">
            <nav className={styles.breadCrumb}>
                {breadCrumb.map((crumb, index) => (
                    <span key={crumb.id} style={{ cursor: 'pointer' }} className={styles.crumb}
                          onClick={() => handleClick(crumb.id)}>
                        {crumb.name}
                        {index < breadCrumb.length - 1 && <span className={styles.separator}></span>}
                    </span>
                ))}
            </nav>
        </div>
    );
};

export default BreadCrumb;
