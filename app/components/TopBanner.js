'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SERVER_URL } from "@/app/components/services/ServerConnection";
import apiService from "@/app/components/ApiService/ApiService";

const TopBanner = () => {
    const [cover, setCover] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                apiService?.getCoverByPosition(0)
                    .then(response => {
                        setCover(response?.data)
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    function handleClick(objectToSend) {
        if (router.pathname !== "/productItems") {
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
        }
    }

    return (
        <div className="container-fluid m-0 p-0">
            <div
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    handleClick({
                        "amount": cover[0]?.amount,
                        "productType": cover[0]?.productType?.id,
                        "tag": cover[0]?.productTag?.id,
                        "attributeOption": cover[0]?.attributeOption?.id
                    })}
                className="col">
                {cover[0] && (
                    <Image
                        src={`${SERVER_URL}img/${cover[0].image}`}
                        alt="Cover Image"
                        className="img-fluid w-100"
                        style={{ objectFit: 'cover' }}
                        width={1200}
                        height={400}
                    />
                )}
            </div>
        </div>
    );
}

export default TopBanner;
