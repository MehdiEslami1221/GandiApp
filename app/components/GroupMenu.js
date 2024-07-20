'use client';

import React, { useEffect, useState } from "react";
import { getProductBox, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const GroupMenu = () => {
    const [productBox, setProductBox] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await getProductBox();
                setProductBox(result['content']);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    const handleClick = (objectToSend) => {
        window.scrollTo(0, 0);
        let params = {
            ato: 0,
            amount: 0,
            ptype: objectToSend?.productType || 0,
            Tag: 0,
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
        <div className="mt-5">
            <div className="row">
                {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="col-12 col-md-3 mb-3">
                        <div className="card m-0 p-0">
                            <div className="mt-3 mx-2">
                                <h6 className="fw-bold" style={{ fontSize: '14px' }}>
                                    {productBox.filter(itemFilter => itemFilter['boxNum'] === i + 1)[i]?.productCount?.product?.brand?.name}
                                </h6>
                                <span style={{ fontSize: '12px' }}> بر اساس بازدیدهای شما</span>
                            </div>

                            <div className="row no-gutters">
                                {productBox.filter(itemFilter => itemFilter['boxNum'] === i + 1).map((items, index) => (
                                    <div key={index} className="col-6 col-md-6 text-center">
                                        <Link href={`/product/${items?.productCount?.product?.id}/${items?.productCount?.product?.name}`} target="_blank">
                                            <Image
                                                src={`${SERVER_URL}img/${items.productCount?.productImage?.img}`}
                                                alt={items.productCount?.product?.name}
                                                className="card-img my-3"
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{width:'auto',height:'100px'}}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            <div
                                onClick={() => handleClick({
                                    "amount": 0,
                                    "productType": productBox[i]?.productCount?.product?.productType?.id,
                                    "tag": 0,
                                    "attributeOption": 0
                                })}
                                style={{ cursor: 'pointer' }}
                                className="d-flex justify-content-center align-items-center text-decoration-none link-info mb-3"
                            >
                                <span className="fs-6 me-2">مشاهده</span>
                                <span className="fs-6 fa fa-arrow-left"></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GroupMenu;
