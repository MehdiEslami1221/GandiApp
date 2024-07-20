import Link from "next/link";
import Countdown from "react-countdown";
import {SERVER_URL} from "@/app/components/services/ServerConnection";
import {numberWithCommas} from "@/app/components/utility/utils";
import React from "react";
import Image from "next/image";

const Item = ({item}) => {
    return (
        <div className="col shadow-sm">


            <Link
                key={item?.id}
                href={'/product/' + item?.product?.id + '/' + encodeURIComponent(item?.product?.name)}
                target="_blank"
                className="text-decoration-none link-secondary">

                <div className="card" style={{height: '400px'}}>
                    <div
                        className="card-body d-flex flex-column align-items-start justify-content-end">
                        {
                            item?.discount !== null ? (
                                <div className="w-100">
                                    <div className="my-2 mx-2">
                                        <div
                                            className="d-flex flex-row justify-content-between m-0 p-0">
                                            <div>


                                                                                   <span className="fw-bold"
                                                                                         style={{
                                                                                             fontSize: '12px',
                                                                                             color: 'rgb(255,26,52)'
                                                                                         }}>گاندی آف</span>
                                            </div>

                                            <div
                                                className="d-flex align-items-center"
                                                style={{
                                                    fontSize: '12px',
                                                    color: 'rgb(255,26,52)'
                                                }}>
                                                <Countdown className="fw-bold"
                                                           date={item?.discount?.expire_at}/>
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
                                <div className="w-100"
                                     style={{visibility: 'hidden'}}>
                                    <div className="my-2 mx-2">
                                        <div
                                            className="d-flex flex-row d-flex justify-content-between justify-items-center">
                                            <div><span className="fw-bold"
                                                       style={{
                                                           fontSize: '14px',
                                                           color: 'rgb(255,26,52)'
                                                       }}>گاندی آف</span>
                                            </div>

                                            <div style={{
                                                fontSize: '14px',
                                                color: 'rgb(255,26,52)'
                                            }}>
                                                <Countdown className="fw-bold"
                                                           date={item?.discount?.expire_at}/>
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
                                <div className="d-flex flex-row col-12">
                                    <div className="col-11 d-flex justify-content-center">
                                        <Image
                                            src={SERVER_URL + 'upload/files/' + item?.productImage?.img}
                                            width={150}
                                            height={150}
                                            alt=''
                                            style={{
                                                width: '150px',
                                                height: '150px'
                                            }}/>
                                    </div>

                                    <div className="col-1 d-flex flex-column">

                                        {
                                            item?.colorList?.map((item, index) => (
                                                <div className="rounded-5 my-1" key={index} style={{
                                                    width: '15px',
                                                    height: '15px',
                                                    backgroundColor: item,
                                                }}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <dt className="col-10 text-truncate d-none text-dark d-none">{item?.title}</dt>
                                <div
                                    className="d-flex justify-content-center w-100 fw-bold mt-3"
                                    style={{height: 'auto'}}>

                                    <div className="text-dark"
                                         style={{
                                             fontSize: '12px',

                                         }}>{item?.product?.name}</div>
                                </div>


                            </div>
                        </div>
                        <div className="w-100">

                            {
                                item?.count === 0 ? (
                                    <div
                                        className="d-flex flex-row my-2 overflow-hidden">


                                        <div
                                            className="d-flex flex-column col-12 text-center">
                                            <div className="col-12">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <span className="border border-secondary col-7"/>
                                                    <span className="fw-bold mx-2 col text-secondary"
                                                          style={{fontSize: '12px'}}>ناموجود</span>
                                                    <span className="border border-secondary col-2"/>
                                                </div>
                                            </div>

                                            <div style={{visibility: 'hidden'}}>
                                                                                    <span style={{fontSize: '12px'}}
                                                                                          className="text-secondary fw-bold opacity-50"/>
                                                <span style={{fontSize: '12px'}}
                                                      className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1"/>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <di>
                                        {
                                            item?.discount !== null ? (
                                                <div
                                                    className="d-flex flex-row align-items-center my-2 mx-3"> <span
                                                    style={{
                                                        fontSize: '10px',
                                                        backgroundColor: 'rgb(255,26,52)'
                                                    }}
                                                    className="badge fw-bold">%{item?.discount?.discount}</span>
                                                    <div
                                                        className="d-flex flex-column col overflow-auto align-items-end">
                                                        <div>
                                                                                 <span style={{
                                                                                     fontSize: '12px',
                                                                                     color: 'rgb(255,26,52)'
                                                                                 }}
                                                                                       className="fw-bold">{numberWithCommas(parseInt(item?.finalPrice))}</span>
                                                            <span style={{
                                                                fontSize: '12px',
                                                                color: 'rgb(255,26,52)'
                                                            }}
                                                                  className="col-3 fw-bold align-items-start ms-1">تومان</span>
                                                        </div>

                                                        <div>
                                                                                    <span style={{fontSize: '12px'}}
                                                                                          className="text-secondary fw-bold opacity-50"><s>{numberWithCommas(parseInt(item?.price))}</s></span>
                                                            <span style={{fontSize: '12px'}}
                                                                  className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1">تومان</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className="d-flex flex-row align-items-center my-2 mx-3">

                                                                  <span style={{
                                                                      fontSize: '10px',
                                                                      backgroundColor: 'rgb(255,26,52)',
                                                                      visibility: 'hidden'
                                                                  }}
                                                                        className="col-2 badge fw-bold">%{item?.discount?.discount}</span>
                                                    <div
                                                        className="d-flex flex-column col overflow-auto align-items-end">
                                                        <div><span style={{fontSize: '14px'}}
                                                                   className="fw-bold text-dark">{numberWithCommas(parseInt(item?.finalPrice))}</span>
                                                            <span style={{fontSize: '12px'}}
                                                                  className="col-3 fw-bold align-items-start ms-1 text-dark">تومان</span>
                                                        </div>

                                                        <div style={{visibility: 'hidden'}}>
                                                                                    <span style={{fontSize: '12px'}}
                                                                                          className="text-secondary fw-bold opacity-50"><s>{numberWithCommas(parseInt(item?.price))}</s></span>
                                                            <span style={{fontSize: '12px'}}
                                                                  className="col-3 fw-bold text-secondary opacity-50 align-items-start ms-1">تومان</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </di>
                                )
                            }


                        </div>


                    </div>
                </div>
            </Link>
        </div>
    );
}
export default Item