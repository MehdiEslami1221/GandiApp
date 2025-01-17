'use client';

import React, { useEffect, useState } from "react";
import { getByProductType, SERVER_URL } from "../services/ServerConnection";
import { useParams } from "next/navigation";
import Link from "next/link";
import Countdown from "react-countdown";
import Image from "next/image";

export default function ShowAllProductsCircularMenu() {
    const param = useParams();
    const idProduct = parseInt(param.id);

    const [product, setProduct] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const { data: dataProduct } = await getByProductType(idProduct);
                setProduct(dataProduct['productCountResponses']);
            } catch (err) {
                console.log(err.message());
            }
        };
        fetchData();
    }, [idProduct]);

    return (
        <div className="col-12 col-lg-12 d-flex flex-column">
            <div className="d-flex flex-column flex-lg-row align-items-lg-center my-3">
                <div className="align-items-lg-center">
                    <span className="mx-2 fa fa-sort-amount-asc" style={{ fontSize: '12px' }} />
                    <span className="mx-2 fw-bold" style={{ fontSize: '12px' }}>مرتب سازی:</span>
                </div>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none pointer-event mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>پرفروش
                    ترین</a>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>مرتبط
                    ترین</a>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>پربازدیدترین</a>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>جدیدترین</a>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>ارزان
                    ترین</a>
                <a href="#"
                   className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                   style={{ fontSize: '12px' }}>گران
                    ترین</a>
            </div>

            <div>
                <div className="py-2">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                            {product.map((item, index) => (
                                <div className="col" key={index}>
                                    <Link
                                        href={'/product/' + item.product.id + '/' + item.product.name}
                                        target="_blank"
                                        className="text-decoration-none link-secondary"
                                        style={{ height: '300px' }}>
                                        <div className="card">
                                            <div
                                                className="card-body d-flex flex-column align-items-start justify-content-end">
                                                <Image
                                                    src={SERVER_URL + 'upload/files/' + item.productImage.img}
                                                    alt="Shegeftangiz" className="img-fluid" width={50} />

                                                <span className="fw-bold my-2" style={{ fontSize: '14px' }}>
                                                    {item.product.name}
                                                </span>

                                                <div className="d-flex flex-row w-100">
                                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                                        <span className="badge bg-danger p-2" style={{ fontSize: '12px' }}>%{item.discount.discountVal}</span>
                                                    </div>

                                                    <div className="col-8 d-flex m-0 pe-lg-1 flex-column align-items-end justify-content-center">
                                                        <span>{item.finalPrice}</span>
                                                        <s className="text-secondary opacity-50">{item.price}</s>
                                                    </div>

                                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                                        <span className="text-secondary opacity-75" style={{ fontSize: '12px' }}>تومان</span>
                                                    </div>
                                                </div>
                                                <div className="d-flex w-100 justify-content-center">
                                                    <span className="text-danger fw-bold mt-2" style={{ fontSize: '14px' }}>
                                                        <Countdown date={new Date(item.discount.expire_at)} />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
