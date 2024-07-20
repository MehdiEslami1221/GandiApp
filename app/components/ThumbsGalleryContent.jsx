'use client';

import React, { useContext, useEffect, useState, useCallback } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ThumbsGallery.css';

import iconStar from '@/public/assets/icons/icon-star-pages.svg';
import iconShop from '@/public/assets/icons/icon-shop-pages.svg';
import 'react-toastify/dist/ReactToastify.css';

import PurchaseInformation from "./PurchaseInformation";
import { getImageProduct, getProductConfig, SERVER_URL } from "@/app/components/services/ServerConnection";
import { useRouter, useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import iconFavoriteHeartNull from '@/public/assets/icons/like_favorite_heart_null.ico';
import iconFavoriteHeartFull from '@/public/assets/icons/like_favorite_heart_full.ico';
import iconShare from '@/public/assets/icons/icon-share-pages.svg';
import iconNotif from '@/public/assets/icons/icon-notif-pages.svg';
import iconChart from '@/public/assets/icons/icon-chart-pages.svg';
import iconMoghayese from '@/public/assets/icons/icon-moghayese-pages.svg';
import { numberWithCommas, ToastError, ToastSuccess } from "../components/utility/utils";
import { ShopContext } from "../context/ShopContext";
import ProductByProductType from "./ProductByProductType";
import apiService from "@/app/components/ApiService/ApiService";
import { useLoading } from "../context/LoadingContext";
import { Loader } from "@/app/loading/Loader";
import BreadCrumb from "./BreadCrumb";
import Image from 'next/image';

const ThumbsGalleryContent = () => {
    const router = useRouter();
    const params = useParams();
    const idProduct = parseInt(params.id);

    const [productTypeId, setProductTypeId] = useState();
    const { setLoading } = useLoading();
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [productWarranty, setProductWarranty] = useState([]);
    const [warrantyId, setWarrantyId] = useState(0);
    const [productCon, setProductConfig] = useState([]);
    const [findById, setFindById] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { isLogin, addToCart, incrementBasket } = useContext(ShopContext);
    const [cartItem, setCart] = useState([]);

    const findByIdFavorite = useCallback(async (id) => {
        if (isLogin) {
            try {
                const response = await apiService?.getByIdFavorite(id);
                setFindById(response?.data);
            } catch (error) {
                console.error('Error fetching favorite by ID:', error);
                if (error.response) {
                    ToastError(`Error: ${error.response.status} - ${error.response.data}`);
                } else if (error.request) {
                    ToastError('Request failed: No response received from server.');
                } else {
                    ToastError(`Error: ${error.message}`);
                }
            }
        }
    }, [isLogin]);

    const getCalculateCart = useCallback(async (fasBuy = false) => {
        try {
            if (isLogin) {
                await apiService?.addCarts();
                const response = await apiService?.getAllCart({ "id": 0 });
                incrementBasket(response?.data?.list?.length);
                setCart(response?.data?.list);
                localStorage.removeItem("products");
                if (fasBuy) {
                    router.push("/gandiCart");
                }
            } else {
                const response = await apiService?.calculateCart();
                setCart(response?.data?.list);
                incrementBasket(response?.data?.list?.length);
                if (fasBuy) {
                    router.push("/gandiCart");
                }
            }
        } catch (err) {
            ToastError('ارتباط برقرار نشد!');
        }
    }, [isLogin, incrementBasket, router]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiService?.getByIdProduct(idProduct);
                const productCountResponses = response?.data?.productCountResponses.sort((a, b) => {
                    if (a.count > 0 && b.count <= 0) {
                        return -1;
                    }
                    if (b.count > 0 && a.count <= 0) {
                        return 1;
                    }
                    return 0;
                });

                if (productCountResponses && productCountResponses.length > 0) {
                    const firstProduct = productCountResponses[0];
                    setProducts(productCountResponses);
                    findByIdFavorite(firstProduct.id);
                    setCurrentProduct(firstProduct);
                    setProductTypeId(firstProduct.product.productType.id);
                }

                const warrantyResponse = await apiService?.getWarranty(idProduct);
                setProductWarranty(warrantyResponse?.data);
                setWarrantyId(warrantyResponse?.data[0]?.id);

                const { data: dataImages } = await getImageProduct(idProduct);
                setProductImages(dataImages);

                const { data: dataConfig } = await getProductConfig(idProduct);
                setProductConfig(dataConfig);

                setLoading(false);
            } catch (error) {
                console.error('خطا در دریافت داده‌ها:', error);
            }
        };
        fetchData();
    }, [idProduct, findByIdFavorite, setLoading]);

    useEffect(() => {
        if (productTypeId) {
            console.log('Product Type ID:', productTypeId);
        }
    }, [productTypeId]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getCalculateCart();
    }, [getCalculateCart]);

    const switchProduct = (colorHex) => {
        const product = products.find(p => p.colorHex === colorHex);
        if (product) {
            setCurrentProduct(product);
        }
    };

    const addByIdFavorite = async (id) => {
        if (isLogin) {
            await apiService?.addByIdFavorite({ "productCount": { "id": id } });
            ToastSuccess("این کالا به علاقه مندی های شما اضافه شد.");
            findByIdFavorite(id);
        }
    }


    return (
        <>
            <div className="user-select-none container py-4" >
                <Loader />

                <div  className="d-flex justify-content-center flex-column flex-lg-row">
                    <div className="modal fade" id="ShareModal" tabIndex="-1" role="dialog" aria-labelledby="ShareModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-heade d-flex justify-content-between mx-3 my-3">
                                    <span style={{ fontSize: '16px' }} className="modal-title fw-bold" id="ShareModalLabel">اشتراک گذاری</span>
                                    <span style={{ fontSize: '16px' }} type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                        <span className="fa fa-close text-danger" />
                                    </span>
                                </div>
                                <div className="modal-body">
                                    <span className="fw-bold d-flex justify-content-center" style={{ fontSize: '16px' }}>این محصول را با دوستان خود به اشتراک بگذارید</span>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={() => {
                                                navigator.clipboard.writeText("https://www.gandimobile.ir/product/" + idProduct + '/' + currentProduct?.product?.name).then(r => r)
                                            }}
                                            className="btn btn-primary">کپی لینک
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="d-flex flex-row">
                            <div className="col-2 d-flex flex-column align-items-center">
                                <Image onClick={() => isLogin ? addByIdFavorite(products[0].id) : router.push("/login")} className="my-3"
                                       style={{ width: '25px',height:'25px', cursor: 'pointer' }}
                                       src={findById === true ? iconFavoriteHeartFull : iconFavoriteHeartNull}
                                       alt="Favorite" width={0} height={0} sizes="100vm"
                                />
                                <Image data-bs-toggle="modal" data-bs-target="#ShareModal" className="my-3"
                                       style={{ width: '25px',height:'25px', cursor: 'pointer' }}
                                       src={iconShare} alt="Share"
                                       width={0} height={0} sizes="100vm" />

                                <Image className="my-3 d-none" style={{ width: '30%' }} src={iconNotif} alt="Notification" width={30} height={30} />
                                <Image className="my-3 d-none" style={{ width: '30%' }} src={iconMoghayese} alt="Compare" width={30} height={30} />
                                <Image className="my-3 d-none" style={{ width: '30%' }} src={iconChart} alt="Chart" width={30} height={30} />
                            </div>
                            <div className="col-10">
                                <div className="rounded-3 shadow py-4">
                                    <Swiper spaceBetween={1} navigation={false} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs, Zoom]} className="mySwiper2">
                                        {productImages?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <Image src={SERVER_URL + 'img/' + item.img} alt="Product Image" width={500} height={500} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                <div className="rounded-3 shadow-sm p-2 my-2">
                                    <Swiper onSwiper={setThumbsSwiper} spaceBetween={1} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper">
                                        {productImages?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <Image src={SERVER_URL + 'img/' + item.img} alt="Thumbnail" width={100} height={100} />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-5 my-3 px-3 my-lg-0">
                        <div>
                            <BreadCrumb id={productTypeId} />
                        </div>

                        <div className="my-1">
                            <h5 className="fw-bold" style={{ fontSize: '14px' }}>{currentProduct?.product?.name}</h5>
                        </div>

                        <div>
                            <span className="text-secondary" style={{ fontSize: '12px' }}>{currentProduct?.product?.description}</span>
                        </div>

                        <div className="mt-3 mb-2 d-none">
                            <Image src={iconStar} alt="Star" width={20} height={20} />
                            <span className="mx-1">4.5</span>
                            <span className="mx-2">|</span>
                            <span className="mx-1">56 نظرات کاربران</span>
                        </div>

                        <div className="my-3">
                            <span className="fw-bold" style={{ fontSize: '14px' }}>رنگ :</span>
                            <span className="mx-1 text-secondary fw-bold" style={{ fontSize: '14px' }}>{currentProduct?.color}</span>
                        </div>

                        <div className="my-3">
                            <form className="d-flex flex-row align-items-center justify-items-center justify-content-start">
                                <div className="container">
                                    <div className="row row-cols-2">
                                        {products.map((product) => (
                                            <div className="col my-2" key={product.id}>
                                                <div className="rounded-3 bg-light px-2 py-2">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="productColor"
                                                            style={{ width: '20px', height: '20px', backgroundColor: product?.colorHex }}
                                                            className="form-check-input mx-2"
                                                            value={product?.colorHex}
                                                            checked={currentProduct.id === product?.id}
                                                            onChange={() => switchProduct(product?.colorHex)}
                                                        />
                                                        <span className="mx-1 text-dark fw-bold" style={{ fontSize: '12px' }}>{product.color}</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="mt-3">
                            <span className="fw-bold" style={{ fontSize: '14px' }}>گارانتی :</span>
                            {productWarranty.map((item) => (
                                <div key={item.id} className="d-flex flex-row align-items-center bg-light rounded-3 shadow-sm my-3 p-2">
                                    <input style={{ width: '20px', height: '20px' }} className="ms-2" type="radio" name="flexRadioDefault" onClick={() => setWarrantyId(item?.id)} id={item?.id} checked={warrantyId === item?.id} readOnly />
                                    <label className="d-flex flex-row col px-2 py-3" htmlFor={item?.id} onClick={() => setWarrantyId(item?.id)}>
                                        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center col-12">
                                            <div className="d-flex align-items-center">
                                                <span className="fw-bold mx-2" style={{ fontSize: '14px' }}>{item?.regWarranty?.companyName}</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex mt-4 d-none">
                            <span className="">حافظه :</span>
                            <span className="mx-1 card px-2 text-secondary">128GB</span>
                        </div>

                        <div className="d-flex flex-column mt-4">
                            <span className="fw-bold mx-1">ویژگی ها</span>
                            <ul>
                                {productCon.slice(0, 5).map((item, index) => (
                                    <li className="my-1" key={index}>
                                        <span className="fw-bold" style={{ fontSize: '12px' }}>{item?.attributeOption?.attributeType?.attributeType}</span><span className="mx-1">:</span><span className="fw-bold" style={{ fontSize: '12px' }}>{item?.attributeOption?.attributeOption}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-lg-3 my-3 my-lg-0" style={{ zIndex: '2' }}>
                        <div className="sticky-top" style={{ top: '30px' }}>
                            <div className="shadow rounded-3 p-3">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <Image src={iconShop} alt="Shop Icon" width={30} height={30} />
                                        <span className="fw-bold mx-1" style={{ fontSize: '14px' }}>موبایل گاندی</span>
                                    </div>
                                </div>
                                <hr className="bg-secondary d-none" />
                                <hr className="bg-secondary" />
                                <div className="d-flex flex-column">
                                    <div>
                                        {currentProduct?.discount === null ? (
                                            <div className="d-flex flex-row justify-content-end justify-items-center align-items-center">
                                                <span style={{ fontSize: '16px' }} className="mx-2 fw-bold">{numberWithCommas(parseInt(currentProduct?.finalPrice) || 0)}</span>
                                                <span style={{ fontSize: '14px' }} className="fw-bold">تومان</span>
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-row justify-content-end justify-items-center align-items-center">
                                                <s style={{ fontSize: '16px' }} className="text-secondary fw-bold opacity-50">{numberWithCommas(parseInt(currentProduct?.price) || 0)}</s>
                                                <span style={{ fontSize: '16px' }} className="mx-2 fw-bold">{numberWithCommas(parseInt(currentProduct?.finalPrice) || 0)}</span>
                                                <span style={{ fontSize: '14px' }} className="fw-bold">تومان</span>
                                            </div>
                                        )}
                                    </div>

                                    {currentProduct?.count === 0 ? (
                                        <div>
                                            <div className="d-flex justify-content-center align-items-center border rounded-3 py-2 px-3 my-3">
                                                <span className="border col-5" />
                                                <span className="fw-bold mx-2 col text-secondary" style={{ fontSize: '12px' }}>ناموجود</span>
                                                <span className="border col-5" />
                                            </div>
                                            <span style={{ fontSize: '12px' }}>این محصول در حال حاضر موجود نیست. می‌توانید از <span className="fw-bold">کالاهای مشابه</span> در پایین صفحه دیدن نمایید.</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="my-2 d-flex flex-row">
                                                {cartItem.map((item) => item['productCountResponse']?.product?.id === idProduct && (
                                                    <span key={item.id} className="btn btn-link text-decoration-none fw-bold text-danger me-2 col-2">
                                                        <span className="fa fa-check text-success" />
                                                    </span>
                                                ))}
                                                <button type="button" onClick={() => {
                                                    const fetchData = async () => {
                                                        try {
                                                            if (warrantyId !== 0) {
                                                                await addToCart(currentProduct?.id, 1, warrantyId);
                                                                await getCalculateCart();
                                                            } else {
                                                                ToastError("گارانتی انتخاب نشده");
                                                            }
                                                        } catch (err) {
                                                            ToastError('ارتباط برقرار نشد!');
                                                        }
                                                    }
                                                    fetchData();
                                                }} className="btn btn-success col">افزودن به سبد خرید</button>
                                            </div>
                                            <button onClick={() => {
                                                const fetchData = async () => {
                                                    try {
                                                        if (warrantyId !== 0) {
                                                            await addToCart(currentProduct?.id, 1, warrantyId);
                                                            await getCalculateCart(true);
                                                        } else {
                                                            ToastError("گارانتی انتخاب نشده");
                                                        }
                                                    } catch (err) {
                                                        ToastError('ارتباط برقرار نشد!');
                                                    }
                                                }
                                                fetchData();
                                            }} type="button" className="btn btn-success w-100 my-2">هم اکنون خریداری کنید</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <PurchaseInformation />
                </div>

                <div className="mx-0 mx-lg-5">
                    <ProductByProductType id={productTypeId} />
                </div>

                <div className="mx-0 mx-lg-5 mt-5">
                    <span className="fw-bold">معرفی</span>
                    <p className="fw-bold" style={{ fontSize: '12px' }}>{products[0]?.product?.intro}</p>
                </div>

                <div className="mx-0 mx-lg-5">
                    <span className="fw-bold">مشخصات فنی</span>
                    <div className="d-flex flex-column">
                        {productCon.map((item, index) => (
                            <div key={index} className="border d-flex flex-column ps-4 py-3 my-2 rounded-3 bg-light">
                                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>{item?.attributeOption?.attributeType?.attributeType}:</span>
                                <span className="fw-bold text-secondary mt-2" style={{ fontSize: '12px' }}>{item?.attributeOption?.attributeOption}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThumbsGalleryContent;
