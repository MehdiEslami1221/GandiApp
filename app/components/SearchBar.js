'use client';

import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import iconcard from '@/public/assets/icons/shopping-cart.svg';
import LogoGandiMobile from '@/public/assets/images/logo-gandi.png';
import iconUser from '@/public/assets/icons/user-login.svg';
import iconLogout from '@/public/assets/icons/logout.svg';
import iconComment from '@/public/assets/icons/comment.svg';
import iconNotif from '@/public/assets/icons/notification.svg';
import iconShopingBag from '@/public/assets/icons/shopping-bag.svg';

import { SERVER_URL } from "@/app/components/services/ServerConnection";
import { ShopContext } from "../context/ShopContext";
import CartProductItem from "../components/pages/CartProductItem";

import "./SearchBox.css";
import apiService from "@/app/components/ApiService/ApiService";
import Link from "next/link";

export const SearchBar = () => {
    const [inputValue, setInputValue] = useState('');
    const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
    const wrapperRef = useRef(null);
    const [urlAddress, setUrlAddress] = useState('');
    const [cartItem, setCart] = useState([]);
    const [product, setProduct] = useState([]);
    const {
        isLogin,
        cartItems,
        valueBasket,
        incrementBasket,
    } = useContext(ShopContext);

    const router = useRouter();

    const getCalculateCart = useCallback(async () => {
        if (isLogin) {
            try {
                const response = await apiService?.getAllCart({ "id": 0 });
                incrementBasket(response?.data?.list?.length);
                setCart(response?.data?.list);
                localStorage.removeItem("products");
            } catch (error) {
                console.error('خطا در ارسال داده‌ها:', error);
            }
        } else {
            try {
                const response = await apiService?.calculateCart();
                incrementBasket(response?.data?.list?.length);
                setCart(response?.data?.list);
            } catch (error) {
                console.error('خطا در ارسال داده‌ها:', error);
            }
        }
    }, [isLogin, incrementBasket]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrlAddress(window.location.pathname);
            window.scrollTo(0, 0);
        }
        getCalculateCart();
    }, [getCalculateCart]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSuggestionsVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleChange = (event) => {
        const fetchData = async () => {
            try {
                const response = await apiService?.searchByProductName(event.target.value);
                setProduct(response?.data['productCountResponses']);
            } catch (error) {
                console.error('خطا در ارسال داده‌ها:', error);
            }
        }
        fetchData();
    };

    return (
        <nav className="navbar navbar-light justify-content-between mx-3 user-select-none">
            <div className="d-flex col-12 col-md-12 col-lg-8 justify-content-start align-items-center">
                <a className="navbar-brand col-md-1 d-none d-md-inline mx-3" href="/">
                    <Image src={LogoGandiMobile} width={80} height={38} className="d-inline-block align-top me-4" alt="Logo Gandi Mobile" />
                    <span className="mx-1 fs-6 visually-hidden">موبایل گاندی</span>
                </a>
                <div className="form-inline d-flex align-items-center col-12 col-md-8 my-2 my-lg-0">
                    <div className="col-12 position-relative">
                        <div ref={wrapperRef} className="search-wrapper">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="جستجو"
                                aria-label="Search"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    handleChange(e);
                                    setSuggestionsVisible(e.target.value.length > 0);
                                }}
                            />
                            {isSuggestionsVisible && (
                                <div className="suggestions-box">
                                    {product?.length > 0 ? (
                                        <div>
                                            {product?.slice(0, 5).map(item => (
                                                <Link
                                                    className="text-decoration-none text-dark"
                                                   href={`/product/${item?.product?.id}/${item?.product?.name}`}
                                                   target="_blank"
                                                   key={item?.id}>
                                                    <div className="d-flex bg-light p-2 m-2 rounded-2 flex-row align-items-center my-2">
                                                        <Image
                                                            style={{ width: '40px', height: '40px' }}
                                                            className="img-fluid"
                                                            src={`${SERVER_URL}img/${item?.productImage?.img}`}
                                                            alt={item?.product?.name}
                                                            width={40}
                                                            height={40}
                                                        />
                                                        <h5 className="fw-bold mx-2" style={{ fontSize: '14px' }}>{item?.product?.name}</h5>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>...</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex col-12 col-md-12 col-lg-4 d-md-inline-flex justify-content-lg-end justify-content-center align-items-center">
                {!isLogin ? (
                    <div className="d-flex border rounded-3 border-dark p-1">
                        <Link href={'/login'} className="link-dark link-opacity-75-hover text-decoration-none mx-2">ثبت نام</Link>
                        <span>|</span>
                        <Link href={'/login'} className="link-dark link-opacity-75-hover text-decoration-none mx-2">ورود</Link>
                    </div>
                ) : (
                    <div className="dropdown" style={{ zIndex: '15' }}>
                        <Link href="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <Image src={iconUser} alt="User Icon" width={20} height={20} />
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-lg-end">
                            <li>
                                <Link className="dropdown-item" href={'/profile'}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold" style={{ fontSize: '14px' }}>ناحیه کاربری</span>
                                        <Image src={iconUser} alt="User Icon" width={20} height={20} />
                                    </div>
                                </Link>
                            </li>
                            <hr className="mx-3" />
                            <li>
                                <Link className="dropdown-item my-2" href={'/gandiCart'}>
                                    <div className="d-flex align-items-center">
                                        <Image src={iconShopingBag} alt="Shopping Bag Icon" width={20} height={20} />
                                        <span style={{ fontSize: '12px' }} className="ms-2 fw-bold">سبد خرید</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item my-2" href="#">
                                    <div className="d-flex align-items-center">
                                        <Image src={iconComment} alt="Comment Icon" width={20} height={20} />
                                        <span style={{ fontSize: '12px' }} className="ms-2 fw-bold">دیدگاه ها</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item my-2" href="#">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Image src={iconNotif} alt="Notification Icon" width={20} height={20} />
                                            <span style={{ fontSize: '12px' }} className="ms-2 fw-bold">پیغام ها</span>
                                        </div>
                                        <span className="badge text-light text-bg-danger">0</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item my-2" href="#">
                                    <div className="d-flex align-items-center">
                                        <Image src={iconLogout} alt="Logout Icon" width={20} height={20} />
                                        <span
                                            style={{ fontSize: '12px' }}
                                            className="ms-2 fw-bold"
                                            onClick={() => {
                                                window.localStorage.clear();
                                                router.push("/");
                                                window.location.reload();
                                            }}
                                        >خروج از حساب کاربری</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}

                <button type="button" className="btn btn-light ms-2 p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getCalculateCart}>
                    سبد خرید
                    <Image className="mx-2" src={iconcard} alt="Shopping Cart Icon" width={20} height={20} />
                    {valueBasket > 0 && <span className="badge rounded-pill bg-danger text-bg-secondary">{valueBasket}</span>}
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" style={{ zIndex: '9999999999' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between">
                                <h5 className="modal-title" id="exampleModalLabel">سبد خرید</h5>
                                <Link href={''} type="button" className="close link-secondary link-opacity-50-hover text-decoration-none" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="fa fa-close" />
                                </Link>
                            </div>
                            <div className="modal-body">
                                {cartItem.length > 0 ? (
                                    cartItem.map(item => (
                                        <CartProductItem key={item.id} product={item} />
                                    ))
                                ) : (
                                    <div className="fw-bold text-dark">سبد خرید شما خالی است!</div>
                                )}
                            </div>
                            <div className="modal-footer">
                                {cartItem.length !== 0 ? (
                                    isLogin ? (
                                        <Link href={'/gandiCart'} className="btn btn-success text-white">سبد خرید</Link>
                                    ) : (
                                        <Link href={'/gandiCart'} className="btn btn-success text-white">ورود و ثبت سفارش</Link>
                                    )
                                ) : (
                                    <span />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default SearchBar;
