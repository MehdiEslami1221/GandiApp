'use client';

import { numberWithCommas, ToastError, ToastSuccess } from "../components/utility/utils";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { SERVER_URL } from "@/app/components/services/ServerConnection";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import iconLocation from '@/public/assets/icons/icon-location.svg';
import iconArrowLeft from "@/public/assets/icons/arrow-left.svg";
import iconDelivery from "@/public/assets/images/shipment_dl.png";
import iconSendToAddress from "@/public/assets/images/sendToAddress.png";
import { ShopContext } from "../context/ShopContext";
import apiService from "@/app/components/ApiService/ApiService";
import Image from "next/image";

const OrderAddress = () => {
    const navigate = useRouter();

    const [idShipment, setIdShipment] = useState(0);
    const [address, setAddress] = useState([]);
    const [shipment, setShipment] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});

    const [cartItem, setCart] = useState([]);
    const [price, setPrice] = useState({});

    const [addressStatus, setAddressStatus] = useState(false);

    const { isLogin } = useContext(ShopContext);

    const getAllCarts = useCallback(async (id) => {
        try {
            if (isLogin) {
                await apiService?.getAllAddress()
                    .then(response => {
                        setAddress(response.data);
                        setSelectedAddress(response.data[0]);

                        if (response.data.length > 0) {
                            setAddressStatus(true);
                        } else {
                            setAddressStatus(false);
                        }
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });

                await apiService?.getAllShipment()
                    .then(response => {
                        setShipment(response.data);
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });

                apiService?.getAllCart({ "id": id })
                    .then(response => {
                        setCart(response.data.list);
                        setPrice(response?.data);
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } else {
                navigate.push(-1, { replace: true });
            }
        } catch (err) {
            ToastError('ارتباط برقرار نشد!');
        }
    }, [isLogin, navigate]);

    const setFactor = async (address, shipment) => {
        try {
            if (isLogin) {
                apiService?.updateFactor({
                    "address": {
                        "id": address
                    },
                    "shipment": {
                        "id": shipment
                    }
                })
                    .then(response => {
                        navigate.push('/gandipayment', {
                            state: {
                                "idShipment": idShipment,
                                "idAddress": selectedAddress?.id,
                            },
                            replace: true
                        });
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } else {
                ToastError('خطای احراز هویت!');
            }
        } catch (err) {
            ToastError('ارتباط برقرار نشد!');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const asyncFn = async () => {
            await getAllCarts();
        };
        asyncFn().then(r => r);
    }, [getAllCarts]);

    return (

        <div className="container my-5 user-select-none">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-12 pe-3 col-md-9">

                    <div className="d-flex flex-row align-items-center justify-content-between mx-4">

                        <div className="d-flex flex-row my-2">
                            <span className="fw-bold text-dark" style={{fontSize: '16px'}}>آدرس تحویل</span>
                        </div>

                    </div>

                    <div className="d-flex flex-column justify-content-center my-2">


                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                             data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                             aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 style={{fontSize: '14px'}} className="modal-title fw-bold text-dark"
                                            id="staticBackdropLabel">انتخاب آدرس</h1>
                                        <button style={{fontSize: '10px'}} type="button" className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {
                                            address.map((item, index) =>
                                                <Link
                                                    key={index}
                                                    data-bs-dismiss="modal"
                                                    href='' onClick={() =>
                                                    setSelectedAddress(item)
                                                }
                                                    className="d-flex align-items-center bg-light text-decoration-none shadow-sm rounded-3 my-2">

                                                    <div className="d-flex flex-column p-3 col">
                                                        <div className="d-flex align-items-center my-2">
                                                            <h5 className="fw-bold"
                                                                style={{fontSize: '14px'}}>آدرس:</h5>
                                                            <h5 style={{fontSize: '14px'}}
                                                                className="ms-2 fw-bold">{item?.address}</h5>
                                                        </div>
                                                        <div className="d-flex justify-content-between mx-5">
                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>استان:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.province?.name}</h5>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>شهر:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.city?.name}</h5>
                                                            </div>

                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>منطقه:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.area}</h5>
                                                            </div>

                                                        </div>
                                                        <div className="d-flex justify-content-between mx-5">

                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>کد پستی:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.postalCode}</h5>
                                                            </div>

                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>پلاک:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.no}</h5>
                                                            </div>

                                                            <div className="d-flex align-items-center">
                                                                <h5 style={{fontSize: '14px'}}>واحد:</h5>
                                                                <h5 style={{fontSize: '14px'}}
                                                                    className="ms-2">{item?.unit}</h5>
                                                            </div>
                                                        </div>

                                                    </div>


                                                </Link>
                                            )
                                        }
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">بستن
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>


                    {
                        isLogin && addressStatus === false ? (

                            <div className="d-flex flex-column align-items-center rounded-3 shadow py-4 px-3 justify-content-center"
                                 style={{backgroundColor: 'rgba(246,213,223,0.56)'}}>


                                <span className="fw-bold" style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word',
                                    fontSize: '14px'}}> جهت ادامه مراحل خرید مشخصات فردی و آدرس سفارش خود را تکمیل کنید.</span>


                                <button className="btn mt-4 text-white m-2 shadow border-0" style={{fontSize: '14px',backgroundColor:'#b47ed9'}}
                                        onClick={() => {
                                            return navigate.push('/profile', {replace: true})
                                        }}>تکمیل آدرس و مشخصات فردی
                                </button>

                            </div>

                        ) : (
                            <div>
                                <div className="d-none d-lg-flex rounded-3 shadow py-4 px-3"
                                     style={{backgroundColor: 'rgba(213,235,246,0.56)'}}>


                                    <div className="d-flex flex-column col-10">
                            <span className="mx-1 fw-bold text-dark"
                                  style={{fontSize: '14px'}}>{selectedAddress?.users?.name + ' ' + selectedAddress?.users?.family}</span>

                                        <div className="d-flex align-items-end py-2">
                                            <Image src={iconLocation} width={25} height={25} alt='location'/>

                                            <div className="d-flex flex-column flex-lg-row ms-2">
                                                <span>{selectedAddress?.province?.name}</span>
                                                <span className="mx-1">،</span>
                                                <span>{selectedAddress?.city?.name}</span>
                                                <span className="mx-1">،</span>
                                                <span>{selectedAddress?.area}</span>
                                                <span className="mx-1">،</span>
                                                <span>{selectedAddress?.address}</span>
                                                <span className="mx-1">،</span>
                                                <div className="d-flex">
                                                    <span>کد پستی:</span>
                                                    <span>{selectedAddress?.postalCode}</span>
                                                </div>
                                                <span className="mx-1">-</span>
                                                <div className="d-flex">
                                                    <span>پلاک:</span>
                                                    <span>{selectedAddress?.no}</span>
                                                </div>
                                                <span className="mx-1">-</span>
                                                <div className="d-flex">
                                                    <span>واحد:</span>
                                                    <span>{selectedAddress?.unit}</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-2 d-flex justify-content-end align-items-center">
                            <span className="fw-bold text-dark" style={{cursor: 'pointer', fontSize: '14px'}}
                                  data-bs-toggle="modal" data-bs-target="#staticBackdrop">تغییر</span>
                                        <Image src={iconArrowLeft} width={20} height={20} style={{width: '10%'}} alt="ArrowCircleLeft"/>
                                    </div>


                                </div>


                                <div className="d-flex flex-column d-lg-none rounded-3 shadow py-4 px-3"
                                     style={{backgroundColor: 'rgba(243,243,229)'}}>

                                    <div className="d-flex flex-column col-12">
                                        <div className="d-flex flex-row justify-content-between">
                                <span className="mx-1 fw-bold text-dark"
                                      style={{fontSize: '14px'}}>{selectedAddress?.users?.name + ' ' + selectedAddress?.users?.family}</span>

                                            <div className="col-3 d-flex justify-content-end align-items-center">
                                    <span className="fw-bold"
                                          style={{cursor: 'pointer', fontSize: '14px', color: '#02091f'}}
                                          data-bs-toggle="modal" data-bs-target="#staticBackdrop">تغییر</span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center mt-3 mt-lg-0 py-2">
                                            <Image src={iconLocation} width={25} height={25} alt=''/>
                                            <div className="d-flex flex-column justify-content-center flex-lg-row ms-2">
                                                <div className="d-flex">
                                                    <span>{selectedAddress?.province?.name} ، {selectedAddress?.city?.name} ، {selectedAddress?.area} ، {selectedAddress?.address}</span>
                                                </div>

                                                <div className="d-flex">
                                                    <div className="d-flex">
                                                        <span>کد پستی:</span>
                                                        <span>{selectedAddress?.postalCode}</span>
                                                    </div>
                                                    <span className="mx-1">-</span>
                                                    <div className="d-flex">
                                                        <span>پلاک:</span>
                                                        <span>{selectedAddress?.no}</span>
                                                    </div>
                                                    <span className="mx-1">-</span>
                                                    <div className="d-flex">
                                                        <span>واحد:</span>
                                                        <span>{selectedAddress?.unit}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            </div>
                        )
                    }


                    <div>
                        <div className="d-flex flex-row align-items-center mx-4 my-4">
                            <span className="fw-bold text-dark" style={{fontSize: '16px'}}>شیوه دریافت</span>
                        </div>

                        <div
                            className="py-2 mx-2 col-12 col-lg-6 border border-success shadow-sm rounded-3 d-flex justify-content-between align-items-center"
                            style={{backgroundColor: 'rgb(230,243,229)', cursor: 'pointer'}}>
                            <div>

                                <Image className="ms-2" src={iconSendToAddress} alt='' width={25} height={25}/>
                                <span className="ms-2 fw-bold">تحویل بـــه آدرس</span>
                            </div>
                            <span className="fa fa-check me-3"/>
                        </div>
                    </div>

                    <div>
                        <div className="d-flex flex-row align-items-center mx-4 my-4">
                            <span className="fw-bold text-dark" style={{fontSize: '16px'}}>سبد خرید شما</span>
                            <span className="fw-bold text-secondary mx-2"
                                  style={{fontSize: '12px'}}>{cartItem.length.toString()} عدد کالا</span>
                        </div>


                        <div className="d-flex flex-row justify-content-start my-2 shadow-sm rounded-3 px-2 py-4 border"
                             style={{borderColor: '#d5f6c9'}}>
                            <div className="container text-center">
                                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">


                                    {
                                        cartItem.length > 0 ? (
                                            cartItem.map((item, index) => (
                                                <div className="col" key={index}>
                                                    <div className="d-flex flex-column mx-2">
                                                        <Image
                                                            src={SERVER_URL + 'img/' + item["productCountResponse"]?.productImage?.img}
                                                            className="img-fluid"
                                                            width={150}
                                                            height={150}
                                                            alt=''
                                                            style={{width: '150px'}}/>

                                                        <div className="d-flex flex-row justify-content-center my-3">
                                                            <span
                                                                className="rounded-3 border px-2 py-1">{item?.count}</span>

                                                            <div
                                                                className="d-flex justify-content-center align-items-center rounded-3 border px-2 py-1 ms-2">
                                                                     <span className="badge rounded-pill mx-2"
                                                                           style={{
                                                                               width: '15px',
                                                                               height: '15px',
                                                                               backgroundColor: `${item["productCountResponse"]?.colorHex}`
                                                                           }}> </span>

                                                                <span>مشکی</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="d-flex justify-content-center mt-5">
                                                <h5 className="text-secondary fw-bold">سبد خرید خالی می باشد</h5>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="border p-3 rounded-3 mt-3 shadow"
                         style={{borderColor: '#d5f6c9', backgroundColor: 'rgb(213,235,246,0.56)'}}>
                        <div className="d-flex flex-row align-items-center mx-4">
                            <span className="fw-bold text-dark" style={{fontSize: '16px'}}>شیوه و زمان ارسال را انتخاب کنید</span>
                        </div>

                        <div className="d-flex flex-column p-3">
                            {
                                shipment?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex flex-row align-items-center bg-light rounded-3 shadow my-3 p-2">
                                        <input style={{width: '20px', height: '20px'}} className="ms-2"
                                               type="radio"
                                               name="flexRadioDefault"
                                               onClick={() => {
                                                   setIdShipment(item?.id)
                                                   getAllCarts(item?.id).then(r => r)
                                               }}
                                               id={item?.id}/>
                                        <label className="d-flex flex-row col px-2 py-3" htmlFor={item?.id}
                                               onClick={() => {
                                                   setIdShipment(item?.id)
                                                   getAllCarts(item?.id).then(r => r)
                                               }}>
                                            <div
                                                className="d-flex flex-column flex-lg-row justify-content-between align-items-center col-12">

                                                <div className="d-flex align-items-center">
                                            <span className="fw-bold mx-2"
                                                  style={{fontSize: '14px'}}>{item?.name}</span>
                                                    <Image className="ms-2" src={iconDelivery} width={25} height={25} alt=''/>
                                                </div>


                                                <div className="d-flex align-items-center mt-2 mt-lg-0">
                                                    <span style={{fontSize: '14px'}}
                                                          className="fw-bold text-secondary me-3">هزینه ارسال:</span>
                                                    <div>
                                            <span style={{fontSize: '14px'}}
                                                  className="fw-bold mx-1">{numberWithCommas(item?.price)}</span>
                                                        <span style={{fontSize: '14px'}}
                                                              className="fw-bold">تومان</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </label>
                                    </div>
                                ))
                            }


                        </div>


                    </div>
                </div>

                <div className="col-12 col-md-3 my-3 my-md-0" style={{zIndex: '1'}}>
                    <h1 className="fw-bold mx-4" style={{fontSize: '14px'}}>صورتحساب</h1>

                    <div className="sticky-top" style={{top: '30px'}}>


                        <div className="d-flex flex-column shadow rounded-3 my-3 mx-2 py-3">
                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{fontSize: '14px'}}>قیمت محصولات</span>
                                <div>
                                <span className="text-secondary mx-1"
                                      style={{fontSize: '14px'}}>{numberWithCommas(parseInt(price?.totalMainPrice || 0))}</span>
                                    <span className="text-secondary" style={{fontSize: '14px'}}>تومان</span>
                                </div>
                            </div>

                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{fontSize: '14px'}}>سود شما از خرید</span>
                                <div>
                                <span className="text-secondary mx-1"
                                      style={{fontSize: '14px'}}>{numberWithCommas(parseInt(price?.totalDiscount || 0))}</span>
                                    <span className="text-secondary" style={{fontSize: '14px'}}>تومان</span>
                                </div>
                            </div>


                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{fontSize: '14px'}}>هزینه ارسال</span>
                                <div>
                                <span className="text-secondary mx-1"
                                      style={{fontSize: '14px'}}>{numberWithCommas(parseInt(price?.shipment || 0))}</span>
                                    <span className="text-secondary" style={{fontSize: '14px'}}>تومان</span>
                                </div>
                            </div>


                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="fw-bold text-dark" style={{fontSize: '14px'}}>جمع کل</span>
                                <div>
                                <span className="fw-bold text-dark mx-1"
                                      style={{fontSize: '14px'}}>{numberWithCommas(parseInt(price?.finalPrice || 0))}</span>
                                    <span className="fw-bold text-dark" style={{fontSize: '14px'}}>تومان</span>
                                </div>
                            </div>


                            {
                                isLogin && addressStatus === false && (


                                    <div className="d-flex border border-warning rounded-3 my-3 mx-2 py-2"
                                         style={{backgroundColor: 'rgba(202,126,246,0.23)'}}>

                                        <div className="d-flex flex-column ms-1">
                                            <span className="fa fa-warning text-warning"/>
                                        </div>

                                        <div className="d-flex flex-column mx-2">
                                            <span
                                                onClick={()=>{
                                                    return window.scrollTo(0, 0);
                                                }}
                                                style={{
                                                textAlign: 'justify',
                                                textJustify: 'inter-word',
                                                fontSize: '12px'
                                            }}> جهت ادامه مراحل خرید مشخصات فردی و آدرس سفارش خود را تکمیل کنید.</span>
                                        </div>
                                    </div>


                                )
                            }


                            {
                                isLogin ? (
                                    addressStatus ?
                                        <button className="btn btn-success text-white m-2" style={{fontSize: '14px'}}
                                                onClick={() => {
                                                    if (cartItem.length !== 0) {
                                                        if (idShipment !== 0) {
                                                           return  setFactor(selectedAddress?.id,idShipment)
                                                        } else {
                                                            return ToastError('نحوه ارسال خود را انتخاب کنید')
                                                        }
                                                    } else {
                                                        return ToastError('برای ادامه نیاز به ثبت محصول دارید')
                                                    }
                                                }}>ادامه خرید</button> : (<span></span>)
                                ) : (
                                    <button className="btn btn-success text-white m-2" style={{fontSize: '14px'}}
                                            onClick={() => {
                                                return navigate.push('/login', {replace: true})
                                            }}>ورود به حساب کاربری</button>
                                )
                            }

                        </div>

                        <div className="d-flex border border-warning rounded-3 my-3 mx-2 py-2"
                             style={{backgroundColor: 'rgba(246,231,126,0.23)'}}>

                            <div className="d-flex flex-column ms-1">
                                <span className="fa fa-warning text-warning"/>
                            </div>

                            <div className="d-flex flex-column mx-2">
                        <span style={{textAlign: 'justify', textJustify: 'inter-word', fontSize: '12px'}}>در صورتی که کالایی در سبد خرید ، <span
                            className="fw-bold">ناموجود</span> یا <span className="fw-bold">غیر فعال</span> شده است، با ادامه دادن به خرید ، کالا به صورت خودکار از سبد خرید شما حذف می‌شود.</span>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default OrderAddress;