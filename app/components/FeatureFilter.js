'use client';

import apiService from "@/app/components/ApiService/ApiService";
import { ToastError } from "../components/utility/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FeatureFilter = () => {
    const [amountBox, setTagAmountBox] = useState([]);

    const tagAmountBox = async () => {
        try {
            await apiService?.getTagAmountBox()
                .then(response => {
                    setTagAmountBox(response.data);
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (error) {
            console.error('خطا در حذف مورد از سبد خرید:', error);
        }
    };

    useEffect(() => {
        const asyncFn = async () => {
            await tagAmountBox();
        };
        asyncFn().then(r => r);
    }, []);

    const router = useRouter();

    const handleClick = (objectToSend) => {
        window.scrollTo(0, 0);
        let params = {
            ato: objectToSend?.attributeOption || 0,
            amount: objectToSend?.amount || 0,
            ptype: objectToSend?.productType || 0,
            Tag: objectToSend?.tag || 0,
            sortByPrice: 0,
            sortByNewerProduct: 0,
            sortByMostDiscount: 0,
            sortByAvailableProduct: 0,
            amazingOffer: 0,
            page: 0
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        router.push('/productItems?' + queryString);
    };

    return (
        <div>
            <div className="row my-2">
                <div className="col-sm-12 my-2 col-md-6">
                    <div className="flex-column rounded-3 bg-light p-3 m-1">
                        <span>گوشی بر اساس قیمت</span>
                        <div className="row g-2 my-3">
                            {amountBox?.filter(filter => filter?.box === 1)?.map(item => (
                                <div
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClick({
                                        "amount": item?.amount,
                                        "productType": item?.productType?.id,
                                        "tag": item?.productTag?.id,
                                        "attributeOption": 0
                                    })}
                                    className="col-4 text-decoration-none link-secondary"
                                >
                                    <div className="p-2 border bg-light rounded text-center bg-white">
                                        <span className="fw-bold" style={{ fontSize: '12px' }}>{item?.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 my-2 col-md-6">
                    <div className="flex-column rounded-3 bg-light p-3 m-1">
                        <span>گوشی بر اساس ویژگی</span>
                        <div className="row g-2 my-3">
                            {amountBox?.filter(filter => filter?.box === 2)?.map(item => (
                                <div
                                    key={item.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClick({
                                        "amount": item?.amount,
                                        "productType": item?.productType?.id,
                                        "tag": item?.productTag?.id,
                                        "attributeOption": 0
                                    })}
                                    className="col-4 text-decoration-none link-secondary"
                                >
                                    <div className="p-2 border bg-light rounded text-center bg-white">
                                        <span className="fw-bold" style={{ fontSize: '12px' }}>{item?.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureFilter;
