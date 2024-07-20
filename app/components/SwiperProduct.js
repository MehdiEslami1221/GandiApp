'use client';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import ProductItem from "@/app/components/pages/ProductItem";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import imgShegeftangiz from "@/public/assets/images/shegeftangiz.png";
import iconArrowCircleLeft from '@/public/assets/icons/arrow-circle-left.svg';
import iconArrowLeftWhite from '@/public/assets/icons/arrow-left-white.svg';
import { useEffect, useState } from "react";
import {getAmazingOffer, SERVER_URL} from "@/app/components/services/ServerConnection";
import { useRouter } from 'next/navigation';

export default function SwiperProduct() {
    const router = useRouter();

    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataOffer } = await getAmazingOffer();
                setProduct(dataOffer["productCountResponses"]);
            } catch (err) {
                // console.log(err.message())
            }
        };
        fetchData().then(r => r);
    }, []);

    const handleClick = (params) => {
        window.scrollTo(0, 0);
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        router.push('/productItems?' + queryString, { replace: false });
    };

    return (
        <Swiper
            slidesPerView={2}
            spaceBetween={1}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 1,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 1,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 1,
                },
            }}
            className="rounded-3 mb-4 shadow bg-light user-select-none" style={{ height: '320px' }}
        >
            <SwiperSlide>
                <div className="col shadow-sm rounded-0 rounded-start-4 d-flex align-items-center text-center"
                     style={{ backgroundColor: "#023375", height: '320px' }}>
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-start ps-5">
                            <span className="fw-bold fs-4 text-light">پیشنهاد</span>
                            <span className="fw-bold fs-4 text-light">شگفت انگیر</span>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">

                            <Image
                                alt=""
                                src={imgShegeftangiz}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '120px', height: '120px'}}
                            />


                        </div>
                        <div
                            onClick={() => handleClick({
                                ato: 0,
                                amount: 0,
                                ptype: 1,
                                Tag: 0,
                                sortByPrice: 0,
                                sortByNewerProduct: 0,
                                sortByMostDiscount: 0,
                                sortByAvailableProduct: 0,
                                amazingOffer: 1,
                                page: 0
                            })}
                            style={{ cursor: 'pointer' }}
                            className="d-flex justify-content-center align-items-center mt-3 text-decoration-none link-light link-opacity-75-hover"
                        >
                            <span className="fs-6 me-2">مشاهده همه</span>

                            <Image
                                alt=""
                                src={iconArrowLeftWhite}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '20px', height: '20px'}}/>

                        </div>
                    </div>
                </div>
            </SwiperSlide>

            {product.map((item) => (
                <SwiperSlide key={item.id}>
                    <ProductItem product={item} />
                </SwiperSlide>
            ))}

            <SwiperSlide>
                <div className="col shadow-sm rounded-0 rounded-end-4 bg-white d-flex align-items-center text-center"
                     style={{ height: '320px' }}>
                    <div className="card-body">
                        <div
                            onClick={() => handleClick({
                                ato: 0,
                                amount: 0,
                                ptype: 1,
                                Tag: 0,
                                sortByPrice: 0,
                                sortByNewerProduct: 0,
                                sortByMostDiscount: 0,
                                sortByAvailableProduct: 0,
                                amazingOffer: 1,
                                page: 0
                            })}
                            className="d-flex flex-column align-items-center text-decoration-none">

                            <Image
                                alt=""
                                src={iconArrowCircleLeft}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '50px', height: '50px'}}/>

                            <span className="text-black mt-3 fw-bold link-dark link-opacity-75-hover" style={{ fontSize: '16px' }}>مشاهده همه</span>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
