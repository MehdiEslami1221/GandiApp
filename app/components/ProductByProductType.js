import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import imgShegeftangiz from "@/public/assets/images/shegeftangiz.png";
import iconArrowCircleLeft from '@/public/assets/icons/arrow-circle-left.svg';
import iconArrowLeft from '@/public/assets/icons/arrow-left.svg';
import { getByProductType } from "@/app/components/services/ServerConnection";
import ProductItem from "@/app/components/pages/ProductItem";
import { useRouter } from 'next/navigation';
import iconArrowLeftWhite from "@/public/assets/icons/arrow-left-white.svg";

const ProductByProductType = ({ id }) => {
    const router = useRouter();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: dataSlider } = await getByProductType(id, 0);
                setProduct(dataSlider['productCountResponses']);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, [id]);

    const handleNavigation = (id) => {
        let params = {
            ato: 0,
            amount: 0,
            ptype: id || 0,
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
            className="rounded-3 shadow bg-light user-select-none" style={{ height: '320px' }}
        >
            <SwiperSlide>
                <div className="col shadow-sm rounded-0 rounded-start-4 bg-light d-flex align-items-center text-center" style={{ height: '320px' }}>
                    <div className="card-body">
                        <div className="d-flex flex-column align-items-center">
                            <span className="fw-bold fs-5 text-dark">کالاهای</span>
                            <span className="fw-bold fs-5 text-dark">مشابه</span>
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
                            onClick={() => handleNavigation(id)}
                            style={{ cursor: 'pointer' }}
                            className="d-flex justify-content-center align-items-center mt-3 text-decoration-none link-dark link-opacity-75-hover">
                            <span className="fs-6 fw-bold me-2">مشاهده همه</span>

                            <Image
                                alt=""
                                src={iconArrowLeft}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '20px', height: '20px'}}/>

                        </div>
                    </div>
                </div>
            </SwiperSlide>

            {product?.map((item) => (
                <SwiperSlide key={item.id}>
                    <ProductItem product={item} />
                </SwiperSlide>
            ))}

            <SwiperSlide>
                <div className="col shadow-sm rounded-0 rounded-end-4 bg-white d-flex align-items-center text-center" style={{ height: '320px' }}>
                    <div className="card-body">
                        <div
                            onClick={() => handleNavigation(id)}
                            style={{ cursor: 'pointer' }}
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
export default ProductByProductType;
