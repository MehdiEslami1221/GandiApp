'use client';

import React, { useContext, useEffect, useState, useCallback } from "react";
import { numberWithCommas, ToastError } from "../../components/utility/utils";
import apiService from "../../components/ApiService/ApiService";
import { ShopContext } from "../../context/ShopContext";
import { SERVER_URL } from "../../components/services/ServerConnection";
import { useRouter } from 'next/navigation';
import { useModal } from "../../context/ModalProvider";
import Image from "next/image";
import Link from "next/link";

const FavoriteProductsComponent = () => {
    const { showModal } = useModal();
    const navigate = useRouter();
    const { isLogin } = useContext(ShopContext);

    const [favoriteItems, setFavoriteItems] = useState([]);

    const AllFavorite = useCallback(async () => {
        if (isLogin) {
            try {
                const response = await apiService?.GetAllFavorites();
                setFavoriteItems(response?.data?.productCountResponses);
            } catch (error) {
                if (error.response.status === 408) {
                    try {
                        await apiService?.refreshToken();
                    } catch (error) {
                        if (error?.response?.data?.statusCode === 20) {
                            if (typeof window !== 'undefined') {
                                window.localStorage.clear();
                            }
                            navigate.push("/");
                            window.location.reload();
                        }
                    }
                }
                console.error('Error fetching data:', error);
            }
        }
    }, [isLogin, navigate]);

    const DeleteFavorites = useCallback(async (id) => {
        if (isLogin) {
            try {
                await apiService?.DeleteByIdFavorites(id);
                ToastError("آیتم مورد نظر با موفقیت حذف شد");
                await AllFavorite();
            } catch (error) {
                if (error.response.status === 408) {
                    try {
                        await apiService?.refreshToken();
                    } catch (error) {
                        if (error?.response?.data?.statusCode === 20) {
                            if (typeof window !== 'undefined') {
                                window.localStorage.clear();
                            }
                            navigate.push("/");
                            window.location.reload();
                        }
                    }
                }
                console.error('Error deleting item:', error);
            }
        }
    }, [isLogin, AllFavorite, navigate]);

    useEffect(() => {
        const asyncFn = async () => {
            await AllFavorite();
        };
        asyncFn();
    }, [AllFavorite]);

    const handleDelete = async (itemId) => {
        await DeleteFavorites(itemId);
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-lg-8 d-flex justify-content-between my-5">
                <span className="text-with-line fw-bold">کالا های مورد علاقه</span>
            </div>
            <div className="col">
            <div className="container overflow-hidden text-center">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-2 g-md-2 g-lg-3">
                        {favoriteItems.length > 0 ? (
                            favoriteItems.map((item, index) => (
                                <div key={index}>
                                    <div className="d-flex flex-row rounded-3 shadow align-items-center my-3 mx-2 py-3"
                                         style={{
                                             backgroundColor: 'rgb(248,250,252)',
                                             height: '200px'
                                         }}>
                                        <div className="d-flex col-8 flex-column">
                                            <Link
                                                href={'/product/' + item?.product?.id + '/' + encodeURIComponent(item?.product?.name)}
                                                target="_blank"
                                                className="text-decoration-none link-secondary link-opacity-100-hover mx-2 text-dark">
                                                <span className="fw-bold" style={{ fontSize: '14px' }}>{item?.product?.name}</span>
                                            </Link>
                                            <div className="mt-1 overflow-hidden">
                                                <span className="fw-bold text-secondary" style={{ fontSize: '12px' }}>{item?.product?.description}</span>
                                            </div>
                                            <div style={{ marginTop: '20px' }}>
                                                <span style={{ color: '#338f3e' }} className="fw-bold">{numberWithCommas(parseInt(item?.finalPrice || 0))}</span>
                                                <s className="mx-3 fw-bold">{numberWithCommas(parseInt(item?.price || 0))}</s>
                                                <span className="fw-bold" style={{ fontSize: '12px' }}>تومان</span>
                                            </div>
                                        </div>
                                        <div className="col-3 d-flex justify-content-center align-items-center">
                                            <Image
                                                src={SERVER_URL + 'img/' + item?.productImage?.img}
                                                className="img-fluid rounded-3"
                                                width={150} height={150} alt='' />
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <span style={{ fontSize: '24px', cursor: 'pointer' }}
                                                  className="fa fa-trash-o text-danger"
                                                  onClick={() => showModal('Are you sure you want to delete this item?', () => handleDelete(item?.fp_id))}></span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="fw-bold w-100 text-secondary"> لیست خالی می باشد.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteProductsComponent;
