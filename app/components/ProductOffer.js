'use client';

import React, { useEffect, useState } from "react";
import { getProductSuggestion, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";
import Link from "next/link";
import iconMugHotSolid from '@/public/assets/icons/mug-hot-solid.svg';
import "./ProductOffer.css";

export default function ProductOffer() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataSlider } = await getProductSuggestion();
                setProduct(dataSlider['content']);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    return (
        <div className="container">
            <div className="row border rounded-3 mt-5">
                <div className="d-flex flex-row mt-4">
                    <div className="col d-flex justify-content-center align-items-center fw-bold">
                        <Image src={iconMugHotSolid} width={20} height={20} alt="Icon" />
                        <span className="ms-2">پیشنهاد موبایل گاندی</span>
                    </div>
                </div>

                <div className="d-none d-lg-flex row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                    {product.slice(0, 12).map((item, index) => (
                        <Link
                            className="text-decoration-none product-card"
                            key={item.id}
                            href={`/product/${item?.productCount?.product?.id}/${item?.productCount?.product?.name}`}
                            target="_blank"
                        >
                            <div className="col d-flex flex-column">
                                <div className="d-flex flex-row align-items-center">
                                    <div>
                                        <Image
                                            src={`${SERVER_URL}img/${item['productCount']?.productImage?.img}`}
                                            width={80}
                                            height={80}
                                            alt={item['productCount']?.product?.name}
                                        />
                                    </div>
                                    <div className="mx-2 fw-bold" style={{ fontSize: '26px', color: "rgb(25,191,211)" }}>{index + 1}</div>
                                    <div className="fw-light fw-bold ms-2" style={{ fontSize: '12px' }}>{item['productCount']?.product?.name}</div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <hr className="w-50" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="d-flex flex-column col-12 d-lg-none mt-4 mt-lg-0">
                    {product.slice(0, 12).map((item, index) => (
                        <div key={item.id}>
                            <Link
                                className="text-decoration-none product-card"
                                href={`/product/${item?.productCount?.product?.id}/${item?.productCount?.product?.name}`}
                                target="_blank"
                            >
                                <div className="col d-flex flex-column">
                                    <div className="d-flex flex-row align-items-center">
                                        <div>
                                            <Image
                                                src={`${SERVER_URL}img/${item?.productCount?.productImage?.img}`}
                                                width={80}
                                                height={80}
                                                alt={item['productCount']?.product?.name}
                                            />
                                        </div>
                                        <div className="mx-2 fw-bold" style={{ fontSize: '26px', color: "rgb(25,191,211)" }}>{index + 1}</div>
                                        <div className="fw-light fw-bold ms-2" style={{ fontSize: '12px' }}>{item?.productCount?.product?.name}</div>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <hr className="w-50" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
