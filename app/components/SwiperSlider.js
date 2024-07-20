'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import { getAllSlider, SERVER_URL } from '@/app/components/services/ServerConnection';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const SwiperSlider = () => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataSlider } = await getAllSlider();
                setSlider(dataSlider);
            } catch (err) {
                // console.log(err.message())
            }
        };
        fetchData().then(r => r);
    }, []);

    const router = useRouter();

    function handleClick(objectToSend) {
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
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, A11y, Autoplay]}
            className="user-select-none"
            centeredSlides={true}
            slidesPerView={1}
            navigation={false}
            style={{ height: 'auto' }}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            dir="rtl"
            pagination={{ clickable: true }}
        >
            {slider?.length > 0
                ? slider?.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        style={{ backgroundColor: "#023375", height: 'auto' }}
                        className="d-flex justify-content-center align-items-center overflow-hidden"
                    >
                        <Image
                            onClick={() =>
                                handleClick({
                                    "amount": item?.amount,
                                    "productType": item?.productType?.id,
                                    "tag": item?.productTag?.id,
                                    "attributeOption": item?.attributeOption?.id
                                })}
                            alt=""
                            className="card-img w-100 h-100"
                            src={SERVER_URL + 'img/' + item?.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{width: '100%', height: 'auto',objectFit: "cover", cursor: 'pointer'}}
                        />

                    </SwiperSlide>
                ))
                : (
                    <span></span>
                )}
        </Swiper>
    );
}

export default SwiperSlider;
