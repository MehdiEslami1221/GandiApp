'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {SERVER_URL} from "@/app/components/services/ServerConnection";
import {numberWithCommas, ToastError, ToastSuccess} from "../components/utility/utils";
import React, {useContext, useEffect, useState} from "react";


import iconPaymentMellat from "@/public/assets/images/paymentmellat.png";
import iconDelivery from "@/public/assets/images/shipment_dl.png";

import iconShopingBag from '@/public/assets/icons/shopping-bag.svg';
import {ShopContext} from "../context/ShopContext";
import apiService from "@/app/components/ApiService/ApiService";
import Image from "next/image";

const GandiPayment = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [cartItem, setCart] = useState([]);
    const [price, setPrice] = useState({});

    const shipmentId = parseInt(searchParams.get('idShipment')) || 0;
    const addressId = parseInt(searchParams.get('idAddress')) || 0;
    const [statusNotif, setStatusNotif] = useState(false);

    const { isLogin } = useContext(ShopContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                if (isLogin) {
                    apiService?.getAllCart({ id: shipmentId })
                        .then(response => {
                            setCart(response?.data?.list);
                            setPrice(response?.data);
                        })
                        .catch(error => {
                            console.error('خطا در ارسال داده‌ها:', error);
                        });
                } else {
                    router.push('/login');
                }
            } catch (err) {
                ToastError('ارتباط برقرار نشد!');
            }
        };
        fetchData();
    }, [isLogin, router, shipmentId]);

    const payRequest = async () => {
        try {
            if (isLogin) {
                apiService?.getPayRequest()
                    .then(response => {
                        if (response.status === 200) {
                            const form = document.createElement('form');
                            form.method = 'POST';
                            form.action = 'https://bpm.shaparak.ir/pgwchannel/startpay.mellat';
                            form.target = '_blank';

                            const refIdInput = document.createElement('input');
                            refIdInput.type = 'hidden';
                            refIdInput.name = 'RefId';
                            refIdInput.value = response.data.authority;
                            form.appendChild(refIdInput);

                            const mobileNoInput = document.createElement('input');
                            mobileNoInput.type = 'hidden';
                            mobileNoInput.name = 'MobileNo';
                            mobileNoInput.value = '989121231111';
                            form.appendChild(mobileNoInput);

                            document.body.appendChild(form);
                            form.submit();
                        }
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

    return (
        <div className="container my-5 user-select-none">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-12 pe-lg-3 col-md-9">
                    <div className="">
                        <div className="d-flex flex-row">
                            <span className="fw-bold text-dark my-3" style={{ fontSize: '16px' }}>انتخاب شیوه پرداخت</span>
                        </div>
                        <div className="d-flex align-items-center col rounded-3 shadow-sm p-2" style={{ borderColor: '#d5f6c9', backgroundColor: 'rgba(196,144,160,0.31)', cursor: 'pointer' }}>
                            <input style={{ width: '20px', height: '20px', cursor: 'pointer' }} className="ms-2" type="radio" name="flexRadioDefault" id="1" />
                            <label className="d-flex flex-row align-items-center col" htmlFor="1" style={{ cursor: 'pointer' }}>
                                <Image src={iconPaymentMellat} width={80} height={80} alt='Melat' />
                                <div className="d-flex flex-column">
                                    <span className="fw-bold text-dark">پرداخت آنلاین ( درگاه بانک ملت )</span>
                                    <span style={{ fontSize: '12px' }} className="fw-bold text-secondary mt-2">پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-between shadow rounded-3 px-3" style={{ borderColor: '#d5f6c9', backgroundColor: 'rgba(175,239,149,0.17)', cursor: 'pointer' }}>
                            <span className="fw-bold text-dark my-3" style={{ fontSize: '16px' }}>سفارش در یک نگاه</span>
                            <div className="mt-2 mt-lg-0">
                                <span className="fw-bold text-secondary">(</span>
                                <span className="fw-bold text-secondary" style={{ fontSize: '14px' }}>{cartItem.length.toString()} عدد کالا</span>
                                <span className="fw-bold text-secondary">)</span>
                            </div>
                            <div className="mt-2 mt-lg-0">
                                <Image className="me-2" src={iconDelivery} width={25} height={25} alt='delivery'/>
                                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>ارسال رایگان گاندی موبایل</span>
                            </div>
                            <div className="d-flex flex-row align-items-center mt-2 mt-lg-0 mb-3 mb-lg-0">
                                <Image src={iconShopingBag} className="me-2" alt='' width={20} height={20}/>
                                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>مجموع مبلغ محصولات :</span>
                                <span className="fw-bold text-dark mx-1" style={{ fontSize: '14px' }}>{numberWithCommas(parseInt(price?.totalMainPrice))}</span>
                                <span className="fw-bold text-dark">تومان</span>
                            </div>
                        </div>

                        <div className="d-flex flex-row justify-content-start my-2 shadow-sm rounded-3 px-2 py-4 border" style={{ borderColor: '#d5f6c9' }}>
                            <div className="container text-center">
                                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                                    {cartItem.length > 0 ? (
                                        cartItem.map(item => (
                                            <div className="col" key={item.id}>
                                                <div className="d-flex flex-column mx-2">
                                                    <Image alt='' height={50} width={50} src={`${SERVER_URL}img/${item["productCountResponse"]?.productImage?.img}`} className="img-fluid" style={{ width: '150px' }} />
                                                    <div className="d-flex flex-row justify-content-center my-3">
                                                        <span className="rounded-3 border px-2 py-1">{item?.count}</span>
                                                        <div className="d-flex justify-content-center align-items-center rounded-3 border px-2 py-1 ms-2">
                                                            <span className="badge rounded-pill mx-2" style={{ width: '15px', height: '15px', backgroundColor: `${item["productCountResponse"]?.colorHex}` }}></span>
                                                            <span>مشکی</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="d-flex justify-content-center mt-5">
                                            <h5 className="text-secondary fw-bold" style={{ fontSize: '12px' }}>سبد خرید خالی می باشد</h5>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3 my-3 my-md-0" style={{ zIndex: '1' }}>
                    <h1 className="fw-bold mx-4" style={{ fontSize: '14px' }}>صورتحساب</h1>
                    <div className="sticky-top" style={{ top: '30px' }}>
                        <div className="d-flex flex-column shadow rounded-3 my-3 mx-2 py-3">
                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{ fontSize: '14px' }}>قیمت محصولات</span>
                                <div>
                                    <span className="text-secondary mx-1" style={{ fontSize: '14px' }}>{numberWithCommas(parseInt(price?.totalMainPrice || 0))}</span>
                                    <span className="text-secondary" style={{ fontSize: '14px' }}>تومان</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{ fontSize: '14px' }}>سود شما از خرید</span>
                                <div>
                                    <span className="text-secondary mx-1" style={{ fontSize: '14px' }}>{numberWithCommas(parseInt(price?.totalDiscount || 0))}</span>
                                    <span className="text-secondary" style={{ fontSize: '14px' }}>تومان</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="text-secondary" style={{ fontSize: '14px' }}>هزینه ارسال</span>
                                <div>
                                    <span className="text-secondary mx-1" style={{ fontSize: '14px' }}>{numberWithCommas(parseInt(price?.shipment || 0))}</span>
                                    <span className="text-secondary" style={{ fontSize: '14px' }}>تومان</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row justify-content-between px-4 my-2">
                                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>جمع کل</span>
                                <div>
                                    <span className="fw-bold text-dark mx-1" style={{ fontSize: '14px' }}>{numberWithCommas(parseInt(price?.finalPrice || 0))}</span>
                                    <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>تومان</span>
                                </div>
                            </div>
                            {isLogin ? (
                                <button className="btn text-white btn-success m-2" style={{ fontSize: '14px' }}
                                        onClick={() => {
                                            if (cartItem.length !== 0) {
                                                return payRequest();
                                            } else {
                                                return ToastError('برای ادامه نیاز به ثبت محصول دارید');
                                            }
                                        }}>پرداخت</button>
                            ) : (
                                <button className="btn btn-success text-white m-2" style={{ fontSize: '14px' }}
                                        onClick={() => {
                                            return router.push('/login');
                                        }}>ورود به حساب کاربری</button>
                            )}
                            {statusNotif && (
                                <div className="d-flex border border-success rounded-3 my-3 mx-2 py-2" style={{ backgroundColor: 'rgba(160,246,126,0.23)' }}>
                                    <div className="d-flex flex-column ms-1">
                                        <span className="fa fa-info text-success" />
                                    </div>
                                    <div className="d-flex flex-column mx-2">
                                        <span style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: '12px' }}>
                                            محصول شما با موفقیت ثبت شده است جهت پیگیری محصول به بخش <span className="fw-bold" style={{ cursor: 'pointer' }} onClick={() => { return router.push('/profile'); }}>ناحیه کاربری ، سفارش های من</span> مراجعه کنید
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex border border-warning rounded-3 my-3 mx-2 py-2" style={{ backgroundColor: 'rgba(246,231,126,0.23)' }}>
                            <div className="d-flex flex-column ms-1">
                                <span className="fa fa-warning text-warning" />
                            </div>
                            <div className="d-flex flex-column mx-2">
                                <span style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: '12px' }}>
                                    در صورتی که کالایی در سبد خرید ، <span className="fw-bold">ناموجود</span> یا <span className="fw-bold">غیر فعال</span> شده است، با ادامه دادن به خرید ، کالا به صورت خودکار از سبد خرید شما حذف می‌شود.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GandiPayment