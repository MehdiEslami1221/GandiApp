import React, {useEffect, useState} from "react";
import iconTruck from "@/public/assets/icons/truck-fast.svg";
import apiService from "../../components/ApiService/ApiService";
import {numberWithCommas, ToastError, ToastSuccess} from "../../components/utility/utils";
import {SERVER_URL} from "@/app/components/services/ServerConnection";

import './MyOrdersComponent.css';
import {useModal} from "../../context/ModalProvider";
import Image from "next/image";


const orderStatuses = [
    {id: 'SHIPMENT', label: 'در انتظار پرداخت'},
    {id: 'SHIPMENT_ACCEPT', label: 'تایید پرداخت'},
    {id: 'SHIPMENT_FACTOR', label: 'فاکتور شد'},
    {id: 'SHIPMENT_PACKING', label: 'در حال بسته بندی'},
    {id: 'SHIPMENT_SEND', label: 'ارسال شد'},
    {id: 'SHIPMENT_CANCEL' || 'SHIPMENT_RETURN', label: 'لغو شده و معلق'},
];

const MyOrdersComponent = () => {
    const {showModal} = useModal();
    const [activeStatus, setActiveStatus] = useState(orderStatuses[0].id);

    const handleStatusChange = (id) => {
        setActiveStatus(id);
    };


    const [wares, setWares] = useState([]);

    const getWares = async () => {
        try {
            apiService?.getAllMyWares()
                .then(response => {
                    setWares(response?.data?.factorResponseList)
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (err) {
            // console.log(err.message())
        }
    }

    useEffect(() => {
        getWares().then(r => r);
    }, []);


    const handleDelete = async (itemId) => {
        await apiService?.cancelMyFactor(itemId)
            .then(function (response) {
                if (response.data === false) {
                    ToastError("جهت لغو سفارش ابتدا بخش اطلاعات حساب بانکی خود را تکمیل کنید.")
                } else {
                    ToastSuccess("سفارش شما با موفقیت لغو شد")
                    getWares()
                }
            })
            .catch(error => {
            });
    };

    return (
        <div className="d-flex flex-column align-items-center">

            <div className="col-12 col-lg-8 d-flex justify-content-between my-5">
                <span className="text-with-line fw-bold">سفارش های من</span>
                <span style={{fontSize: '14px', cursor: 'pointer'}}
                      className="dotted-border-radius d-none align-items-center"
                      data-toggle="modal"
                      data-target="#AddAddressModal">
                    <span className="fa fa-plus me-2 fw-lighter"/>
                    <span>افزودن آدرس جدید</span>
                </span>
            </div>


            <div className="col-12 col-lg-8 d-flex justify-content-center">


                <div className="menu-container">
                    <ul className="horizontal-menu">
                        {orderStatuses.map((status) => (
                            <li
                                key={status.id}
                                className={`menu-item ${activeStatus === status.id ? 'active' : ''}`}
                                onClick={() => handleStatusChange(status.id)}
                            >
                                {status.label}
                            </li>
                        ))}
                    </ul>
                    <div className="component-container">
                        {orderStatuses.map((status) => (
                            <div
                                key={status.id}
                                className={`component ${activeStatus === status.id ? 'show' : 'hide'}`}
                            >
                            </div>
                        ))}
                    </div>


                    <div>


                        {
                            wares?.filter(item => item?.cartList?.some(cart => cart?.factor?.shipmentStatus[0]?.name === activeStatus)).map((item) => (
                                <div
                                    key={item?.cartList[0]?.factor?.id}
                                    className="d-flex flex-column rounded-3 shadow-sm px-3 py-3 my-3"
                                    style={{backgroundColor: 'rgba(126,126,128,0.16)'}}>
                                    <div className="d-flex justify-content-between">
                                            <span className="fw-bold rounded py-1 px-2 bg-light"
                                                  style={{fontSize: '12px'}}>{item?.cartList[0]?.factor?.create_at}</span>
                                    </div>

                                    <div className="my-3">
                                        <span className="fw-bold" style={{fontSize: '14px'}}>مبلغ کل:</span>
                                        <span className="fw-bold mx-1"
                                              style={{fontSize: '14px'}}>{numberWithCommas(parseInt(item?.result || 0))}</span>
                                        <span className="fw-bold"
                                              style={{fontSize: '14px'}}>تومان</span>
                                    </div>


                                    <hr/>

                                    <div className="d-flex justify-content-between">


                                        <div className="d-flex align-items-center mt-2">
                                            <Image src={iconTruck} alt="Diagram"
                                                   width={20}
                                                   height={20}/>
                                            <span className="fw-bold mx-2"
                                                  style={{fontSize: '12px'}}>مرسوله</span>
                                        </div>


                                        {
                                            item?.cartList[0]?.factor?.shipmentStatus[0]?.name === 'SHIPMENT_CANCEL' ? (
                                                <span/>
                                            ) : (
                                                <div>
                                                    <button
                                                        style={{fontSize: '14px', cursor: 'pointer'}}
                                                        className="dotted-border-radius d-flex align-items-center"
                                                        onClick={() => showModal('آیا از لغو این سفارش اطمینان دارید؟', () => handleDelete(item?.cartList[0]?.factor?.id))}
                                                        type="button">
                                                        <span className="fa fa-times-circle me-2 fw-lighter"/>
                                                        <span className="fw-bold"
                                                              style={{fontSize: '12px'}}>لغو سفارش</span>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </div>


                                    <div className="mt-4 d-flex flex-column">
                                        {
                                            item?.cartList?.map((items, index) => (
                                                <div
                                                    key={items?.productCount?.id}
                                                    className="d-flex flex-row mx-2 my-2">
                                                    <Image
                                                        src={SERVER_URL + 'img/' + items?.productCount?.productImage?.img}
                                                        width={100}
                                                        height={100}
                                                        alt={''}
                                                        className="rounded-1"/>

                                                    <span
                                                        className="fw-bold rounded-1 w-100 mx-2 py-2 px-2 text-center d-flex flex-column"
                                                        style={{
                                                            fontSize: '12px',
                                                            backgroundColor: 'rgba(10,10,10,0.06)'
                                                        }}>


                                                                    <div className="rounded-1" style={{
                                                                        fontSize: '10px',
                                                                        backgroundColor: 'rgba(239,238,238,0.45)'
                                                                    }}>
                                                                        <span>{numberWithCommas(parseInt(items?.productCount?.price || 0))}</span>
                                                                        <span className="ms-1">تومان</span>
                                                                    </div>


                                                                    <div className="d-flex my-2"
                                                                         style={{fontSize: '10px'}}>
                                                                        <span>{items?.productCount?.product?.name}</span>
                                                                    </div>

                                                                      <div className="d-flex align-items-center my-1">
                                                                         <span className="me-1"
                                                                               style={{fontSize: '10px'}}>رنگ:</span>
                                                                          <div className="rounded-5 mx-2"
                                                                               style={{
                                                                                   width: '8px',
                                                                                   height: '8px',
                                                                                   backgroundColor: `${items?.productCount?.colorHex}`
                                                                               }}/>
                                                                      </div>



                                                                    <div className="d-flex" style={{fontSize: '10px'}}>
                                                                        <span>تعداد:</span>
                                                                        <span className="mx-1">{items?.count}</span>
                                                                        <span>عدد</span>
                                                                    </div>
                                                                </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>))}
                    </div>

                </div>


            </div>
        </div>
    )
}
export default MyOrdersComponent