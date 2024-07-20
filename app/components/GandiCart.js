'use client';

import { numberWithCommas, ToastError } from "../components/utility/utils";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from 'next/navigation';
import { ShopContext } from "../context/ShopContext";
import apiService from "@/app/components/ApiService/ApiService";
import '../Loader.css';
import { deleteAllCart, deleteCart, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";

const GandiCart = () => {
    const navigate = useRouter();
    const [cartItem, setCart] = useState([]);
    const [price, setPrice] = useState({});
    const [loadingItems, setLoadingItems] = useState(false);

    const {
        isLogin,
        addToCart,
        removeFromCart,
        findCountById,
        incrementBasket,
        removeAllProducts,
    } = useContext(ShopContext);

    const getCalculateCart = useCallback(async () => {
        setLoadingItems(true);
        try {
            if (isLogin) {
                apiService?.addCarts()
                    .then(() => {
                        apiService?.getAllCart({"id": 0})
                            .then(response => {
                                incrementBasket(response?.data?.list?.length)
                                setCart(response?.data?.list)
                                setPrice(response?.data)
                                localStorage.removeItem("products")
                                setLoadingItems(false);
                            })
                            .catch(error => {
                                console.error('خطا در ارسال داده‌ها:', error);
                                setLoadingItems(false);
                            });
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } else {
                apiService?.calculateCart()
                    .then(response => {
                        setCart(response?.data?.list);
                        setPrice(response?.data);
                        setLoadingItems(false);
                    })
                    .catch(error => {
                        console.error('خطا در ارسال داده‌ها:', error);
                        setLoadingItems(false);
                    });
            }
        } catch (err) {
            ToastError('ارتباط برقرار نشد!');
            setLoadingItems(false);
        }
    }, [isLogin, incrementBasket]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const asyncFn = async () => {
            await getCalculateCart();
        };
        asyncFn().then(r => r);
    }, [getCalculateCart]);

    const counterI = async (idProductCount, count, cartId, maxCount, warrantyId) => {
        if (isLogin) {
            await apiService?.updateCart(idProductCount, count, cartId, warrantyId)
                .then(() => {
                    getCalculateCart();
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } else {
            console.log("warrantyId=" + warrantyId);
            try {
                await addToCart(idProductCount, maxCount, warrantyId);
                await getCalculateCart();
            } catch (error) {
                console.error('خطا هنگام اضافه کردن به سبد خرید:', error);
            }
        }
    };

    const counterD = async (idProductCount, count, cartId, maxCount, warrantyId) => {
        if (isLogin) {
            if (count === 0) {
                await deleteItem(cartId);
            } else {
                try {
                    await apiService?.updateCart(idProductCount, count, cartId, warrantyId)
                        .then(() => {
                            getCalculateCart();
                        })
                        .catch(error => {
                            console.error('خطا در ارسال داده‌ها:', error);
                        });
                } catch (err) {
                    ToastError('ارتباط برقرار نشد!');
                }
            }
        } else {
            try {
                await removeFromCart(idProductCount);
                await getCalculateCart();
            } catch (error) {
                console.error('خطا هنگام اضافه کردن به سبد خرید:', error);
            }
        }
    };

    const deleteItem = async (cartId) => {
        try {
            await apiService?.deleteCart(cartId)
                .then(() => {
                    getCalculateCart();
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (error) {
            console.error('خطا در حذف مورد از سبد خرید:', error);
        }
    };

    const countItem = (itemId, count) => {
        if (isLogin) {
            return count;
        } else {
            return findCountById(itemId);
        }
    };

    return (
        <div className="container my-5">
            <div className="d-flex flex-column flex-md-row">
                <div className="col-12 col-md-9">

                    <div className="d-flex flex-row align-items-center justify-content-between mx-4">


                        <div className="d-flex flex-row">
                            <span className="fw-bold text-dark" style={{fontSize: '16px'}}>سبد خرید شما</span>
                            <div className="d-flex ms-2 align-items-center">
                                <span style={{fontSize: '14px'}}
                                      className="text-secondary fw-bold me-1">{cartItem?.length}</span>
                                {
                                    incrementBasket(cartItem?.length)
                                }
                                <span style={{fontSize: '14px'}} className="text-secondary fw-bold">عدد کالا</span>
                            </div>
                        </div>

                        <span style={{cursor: 'pointer'}}
                              className="d-flex fw-bold text-decoration-none link-secondary link-opacity-100-hover align-items-center">
                            <span className="text-secondary" style={{fontSize: '14px'}}
                                  onClick={() => {

                                      const fetchData = async () => {
                                          try {
                                              if (isLogin) {
                                                  await deleteAllCart()
                                                  incrementBasket(0)
                                                  await getCalculateCart()
                                              } else {
                                                  removeAllProducts()
                                                  incrementBasket(0)
                                                  await getCalculateCart()
                                              }
                                          } catch (err) {
                                              ToastError('ارتباط برقرار نشد!')
                                          }
                                      }
                                      fetchData().then(r => r);


                                  }}
                            >حذف کل سبد خرید</span>
                            <span className="fa fa-remove ms-2 text-secondary"/>
                        </span>
                    </div>

                    <div>
                        {
                            cartItem.length > 0 ? (
                                cartItem.map((item,index) => (
                                    <div className="d-flex flex-row my-3 shadow rounded-3 align-items-center" key={index}>
                                        <div className="col-9 p-3">
                                            <a
                                                href={'/product/' + item?.productCountResponse?.product?.id+'/'+item?.productCountResponse?.product?.name}
                                                target="_blank"
                                               className="text-decoration-none link-secondary link-opacity-100-hover">
                                            <span
                                                className="fw-bold"
                                                style={{fontSize: '14px'}}>{item["productCountResponse"]?.product?.name}</span>
                                            </a>


                                            <div className="d-flex align-items-center my-3">
                                                <div className="d-flex justify-content-center align-items-center rounded-3 px-3 py-1"
                                                style={{backgroundColor:'rgba(217,213,213,0.25)'}}>
                                                    <span className="text-secondary"
                                                          style={{fontSize: '14px'}}>رنگ کالا:</span>

                                                    <div className="rounded-5 mx-2"
                                                         style={{
                                                             width: '15px',
                                                             height: '15px',
                                                             backgroundColor: `${item?.productCountResponse?.colorHex}`
                                                         }}/>
                                                </div>

                                            </div>


                                            <div className="d-flex my-3 align-items-center d-none">
                                                <span style={{fontSize: '14px'}}
                                                      className="text-secondary">کد محصول:</span>
                                                <span style={{fontSize: '14px'}}
                                                      className="text-dark mx-2">7826464</span>
                                            </div>


                                            <div className="d-flex my-3">
                                                <div className="d-flex justify-content-start align-items-center">
                                                    <div
                                                        style={{cursor: 'pointer', height: '30px', width: '100px'}}
                                                        className="border d-flex rounded-3 justify-content-center align-items-center">
                                                         <span style={{fontSize: '14px'}}
                                                               className="fa fa-plus text-danger" onClick={() => {
                                                             return counterI(
                                                                 item?.productCountResponse?.id,
                                                                 item?.count + 1,
                                                                 item?.cartId,
                                                                 item?.productCountResponse?.count,
                                                                 item?.warranty?.id,
                                                             ).then(r => r)
                                                         }}/>
                                                        <span style={{fontSize: '14px'}}
                                                              className="mx-3 d-flex justify-content-center align-items-center fw-bold text-danger">

                                                            <span>
                                                                        {
                                                                            countItem(item["productCountResponse"]?.id, item?.count)
                                                                        }
                                                                    </span>
                                                        </span>

                                                        {
                                                            countItem(item["productCountResponse"]?.id, item?.count) === 1 ? (
                                                                <span
                                                                    style={{cursor: 'pointer', fontSize: '14px'}}
                                                                    className="fa fa-remove text-danger"
                                                                    onClick={() => {
                                                                        counterD(
                                                                            item['productCountResponse']?.id,
                                                                            item?.count - 1,
                                                                            item?.cartId,
                                                                            item["productCountResponse"]?.count,
                                                                            item?.warranty?.id,
                                                                        ).then(r => r)
                                                                    }}/>
                                                            ) : (
                                                                <span
                                                                    style={{cursor: 'pointer', fontSize: '14px'}}
                                                                    className="fa fa-minus text-danger"
                                                                    onClick={() => {
                                                                        counterD(
                                                                            item['productCountResponse']?.id,
                                                                            item?.count - 1,
                                                                            item?.cartId,
                                                                            item["productCountResponse"]?.count,
                                                                            item?.warranty['regWarranty']?.id,
                                                                        ).then(r => r)
                                                                    }}/>
                                                            )
                                                        }

                                                    </div>

                                                    <div className="ms-3">
                                                            <span className="fw-bold"
                                                                  style={{fontSize: '14px'}}>{numberWithCommas(parseInt(item["productCountResponse"]?.finalPrice))}</span>
                                                        <span className="fw-bold"
                                                              style={{fontSize: '14px'}}>تومان</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                item['warranty']?.regWarranty !== null && <div className="d-flex my-2">
                                                <span className="text-secondary"
                                                      style={{fontSize: '14px'}}>گارانتی:</span>
                                                    <span className="text-dark mx-2"
                                                          style={{fontSize: '14px'}}>{item['warranty']?.regWarranty?.companyName}</span>
                                                </div>
                                            }

                                        </div>
                                        <div className="col-3 d-flex justify-content-center ">
                                            <Image
                                                src={SERVER_URL + 'img/' + item["productCountResponse"]?.productImage?.img}
                                                className="img-fluid"
                                                width={150}
                                                height={150}
                                                alt=''
                                                style={{width: '150px'}}/>

                                            <div className="d-flex flex-row justify-content-end text-decoration-none">
                                            <span style={{cursor: 'pointer'}} onClick={() => {
                                                return deleteCart(item["productCountResponse"]?.id);
                                            }} className="fa fa-remove my-2 mx-2 d-none"/>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                <div className="d-flex justify-content-center mt-5">
                                    <h5 className="text-secondary fw-bold">سبد خرید خالی می باشد</h5>
                                </div>
                            )
                        }

                    </div>
                </div>


                <div className="col-12 col-md-3" style={{zIndex: '1'}}>


                    <h1 className="fw-bold mx-4" style={{fontSize: '14px'}}>صورتحساب</h1>

                    <div className="sticky-top" style={{top: '30px'}}>

                        {
                            loadingItems ? (
                                <div className="d-flex flex-column shadow rounded-3 my-3 mx-2 py-3">
                                    <div className="card border-0" aria-hidden="true">
                                        <div className="card-body">
                                            <h5 className="card-title d-flex justify-content-between placeholder-glow">
                                                <span className="placeholder col-5"></span>
                                                <span className="placeholder col-5"></span>
                                            </h5>
                                            <h5 className="card-title d-flex justify-content-between placeholder-glow mt-3">
                                                <span className="placeholder col-5"></span>
                                                <span className="placeholder col-5"></span>
                                            </h5>
                                            <h5 className="card-title d-flex justify-content-between placeholder-glow mt-3">
                                                <span className="placeholder col-5"></span>
                                                <span className="placeholder col-5"></span>
                                            </h5>
                                            <h5 className="card-title d-flex justify-content-between placeholder-glow mt-3">
                                                <span className="placeholder col-5"></span>
                                                <span className="placeholder col-5"></span>
                                            </h5>
                                            <a className="btn btn-success disabled placeholder col-12 mt-4"
                                               aria-disabled="true"></a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
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
                                        <span className="text-secondary"
                                              style={{fontSize: '14px'}}>سود شما از خرید</span>
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
                                      style={{fontSize: '14px'}}>{numberWithCommas(parseInt(price?.finalPrice) || 0)}</span>
                                            <span className="fw-bold text-dark" style={{fontSize: '14px'}}>تومان</span>
                                        </div>
                                    </div>


                                    {
                                        isLogin === true ?
                                            (
                                                <button className="btn btn-success m-2" style={{fontSize: '14px'}}
                                                        onClick={() => {
                                                            if (cartItem.length > 0) {
                                                                return navigate.push('/orderAddress', {replace: false})
                                                            } else {
                                                                return ToastError('برای ادامه نیاز به ثبت محصول دارید')
                                                            }
                                                        }}>ادامه خرید</button>
                                            ) :
                                            <button className="btn btn-success m-2" style={{fontSize: '14px'}}
                                                    onClick={() => {
                                                        localStorage.setItem("staging", JSON.parse(true))
                                                        return navigate.push('/login')
                                                    }}>ورود به حساب کاربری</button>
                                    }

                                </div>
                            )
                        }


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

export default GandiCart;