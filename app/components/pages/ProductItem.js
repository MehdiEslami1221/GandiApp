import React from "react";
import {SERVER_URL} from "../services/ServerConnection.jsx";
import Countdown from "react-countdown";
import {numberWithCommas} from "../../components/utility/utils"
import Image from "next/image";
import Link from "next/link";
import iconArrowLeft from "@/public/assets/icons/arrow-left.svg";

function ProductItem({product}) {
    return (
        <Link
            key={product?.product?.id}
            href={'/product/' + product?.product?.id + '/' + encodeURIComponent(product?.product?.name)}
            target="_blank"
            className="container-fluid text-decoration-none link-secondary"
            style={{height: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>


            {
                product['discount'] !== null ? (
                    <div className="w-100">
                        <div className="my-2 mx-2">
                            <div className="d-flex flex-row justify-content-between m-0 p-0">
                                <div>
                                    <span className="fw-bold"
                                          style={{fontSize: '12px', color: 'rgb(255,26,52)'}}>گاندی آف</span>
                                </div>

                                <div className="d-flex align-items-center"
                                     style={{fontSize: '12px', color: 'rgb(255,26,52)'}}>
                                    <Countdown className="fw-bold" date={product?.discount?.expire_at}/>
                                </div>
                            </div>

                            <div style={{
                                border: 'none',
                                height: '2px',
                                background: 'rgb(255,26,52)',
                                borderRadius: '5px'
                            }}/>
                        </div>
                    </div>
                ) : (
                    <div className="w-100" style={{visibility: 'hidden'}}>
                        <div className="my-2 mx-2">
                            <div className="d-flex flex-row d-flex justify-content-between justify-items-center">
                                <div><span className="fw-bold"
                                           style={{fontSize: '14px', color: 'rgb(255,26,52)'}}>گاندی آف</span>
                                </div>

                                <div style={{fontSize: '14px', color: 'rgb(255,26,52)'}}>
                                    <Countdown className="fw-bold" date={product?.discount?.expire_at}/>
                                </div>
                            </div>

                            <div style={{
                                border: 'none',
                                height: '3px',
                                background: 'rgb(255,26,52)',
                                borderRadius: '5px'
                            }}/>
                        </div>
                    </div>
                )
            }

            <div className="w-100 my-auto">
                <div className="d-flex flex-column align-items-center">


                    <Image
                        alt=""
                        src={SERVER_URL + 'upload/files/' + product?.productImage?.img}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{width: 'auto', height: '150px'}}
                    />

                    <dt className="col-10 text-truncate d-none text-dark d-none">{product?.title}</dt>
                    <div className="d-flex justify-content-start fw-bold mt-3">
                        <span className="text-dark" style={{fontSize: '12px'}}>{product?.product?.name}</span>
                    </div>
                </div>
            </div>


            <div className="w-100">

                {
                    product?.count === 0 ? (
                        <div className="d-flex flex-row align-items-center col-12 my-2">
                            <div className="d-flex flex-column col overflow-auto align-items-end">
                                <div className="col-12">
                                    <div
                                        className="d-flex justify-content-center align-items-center overflow-hidden">
                                        <span className="border  col-5"/>
                                        <span className="fw-bold mx-2 col"
                                              style={{fontSize: '12px', color: 'rgba(0,0,0,0.44)'}}>ناموجود</span>
                                        <span className="border  col-5"/>
                                    </div>
                                </div>

                                <div>
                                    <span style={{fontSize: '12px'}}
                                          className="text-secondary fw-bold opacity-50"/>
                                    <span style={{fontSize: '12px'}}
                                          className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1"/>
                                </div>
                            </div>
                        </div>


                    ) : (
                        <div>
                            {
                                product['discount'] !== null ? (
                                    <div className="d-flex flex-row align-items-center my-2 mx-3">
                    <span style={{fontSize: '10px', backgroundColor: 'rgb(255,26,52)'}}
                          className="badge fw-bold">
                        %{product?.discount?.discount}
                    </span>
                                        <div className="d-flex flex-column col overflow-auto align-items-end">
                                            <div>
                                    <span style={{fontSize: '12px', color: 'rgb(255,26,52)'}}
                                          className="fw-bold">{numberWithCommas(parseInt(product?.finalPrice))}</span>
                                                <span style={{fontSize: '12px', color: 'rgb(255,26,52)'}}
                                                      className="col-3 fw-bold align-items-start ms-1">تومان</span>
                                            </div>

                                            <div>
                                    <span style={{fontSize: '12px'}}
                                          className="text-secondary fw-bold opacity-50"><s>{numberWithCommas(parseInt(product?.price))}</s></span>
                                                <span style={{fontSize: '12px'}}
                                                      className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-row align-items-center my-2 mx-3">

                    <span style={{fontSize: '10px', backgroundColor: 'rgb(255,26,52)', visibility: 'hidden'}}
                          className="col-2 badge fw-bold">
                        %{product?.discount?.discount}
                    </span>

                                        <div className="d-flex flex-column col overflow-auto align-items-end">
                                            <div>
                                    <span style={{fontSize: '14px'}}
                                          className="fw-bold text-dark">{numberWithCommas(parseInt(product?.finalPrice))}</span>
                                                <span style={{fontSize: '12px'}}
                                                      className="col-3 fw-bold align-items-start ms-1 text-dark">تومان</span>
                                            </div>

                                            <div style={{visibility: 'hidden'}}>
                                    <span style={{fontSize: '12px'}}
                                          className="text-secondary fw-bold opacity-50"><s>{numberWithCommas(parseInt(product?.price))}</s></span>
                                                <span style={{fontSize: '12px'}}
                                                      className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }


            </div>
        </Link>
    )
}

export default ProductItem;