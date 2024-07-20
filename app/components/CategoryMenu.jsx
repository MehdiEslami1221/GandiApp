'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import './navStyle.css';
import styles from './navStyle.module.css';
import iconArrowLeft from "@/public/assets/icons/arrow-left.svg";
import { getCategoryMenu, SERVER_URL } from "@/app/components/services/ServerConnection";
import { ReactSVG } from "react-svg";
import Image from "next/image";
import Link from "next/link";

function CategoryMenu() {
    const router = useRouter();

    function handleClick(objectToSend) {

        let params = {
            ato: objectToSend?.attributeOption || 0,
            amount: objectToSend?.amount || 0,
            ptype: objectToSend?.productType || 0,
            Tag: objectToSend?.tag || 0,
            sortByPrice: 0,
            sortByNewerProduct: 0,
            sortByMostDiscount: 0,
            sortByAvailableProduct: 0,
            amazingOffer: 0,
            page: 0
        };
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        router.push('/productItems?' + queryString);

    }

    const [categoryMenu, setCategoryMenu] = useState([]);
    const [subProduct, setSubProduct] = useState([]);
    const [subItemProduct, setSubItemProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: result} = await getCategoryMenu();
                setCategoryMenu(result)
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);


    const handleMouseOver = (result) => {
        if (result !== null)
            setSubProduct([])
        setSubProduct(result)
    };

    const handleMainMouseOver = (result) => {
        setSubItemProduct([])
        setSubProduct([])
        setSubItemProduct(result?.subMenuResponses[0].subMenuResponses)
    };

    const chunkedItems = [];
    if (subProduct?.length !== 0) {
        for (let i = 0; i < subProduct?.length; i += 10) {
            chunkedItems?.push(subProduct?.slice(i, i + 10));
        }
    } else {
        for (let i = 0; i < subItemProduct?.length; i += 10) {
            chunkedItems?.push(subItemProduct?.slice(i, i + 10));
        }
    }

    function calculateWidth(itemsLength) {
        if (itemsLength !== 0) {
            if (itemsLength <= 10) {
                return '300px';
            } else if (itemsLength <= 20) {
                return '500px';
            } else {
                return '700px';
            }
        } else {
            if (subItemProduct.length <= 10) {
                return '300px';
            } else if (subItemProduct.length <= 20) {
                return '500px';
            } else {
                return '700px';
            }
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light d-none d-lg-flex px-3" style={{zIndex: '10'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {
                        categoryMenu?.map((item,index) =>
                            <li className="nav-item dropdown" key={index}>
                                <Link className="nav-link dropdown-toggle fw-light" href={'#'}
                                   id="navbarDropdownMenuLink"
                                   style={{fontSize: '14px'}}
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                   key={item?.id} onMouseOver={() => handleMainMouseOver(item)}>
                                    {item?.name}
                                </Link>
                                <div className="dropdown-menu p-0 border-0 rounded-4 shadow"
                                     aria-labelledby="navbarDropdownMenuLink">
                                    <div className="d-flex flex-row p-0 border-0 rounded-4 shadow">
                                        <div className="d-flex flex-row m-0 p-0 align-items-center">

                                            <div className="d-flex col-10 flex-column rounded-start-4 h-100"
                                                 style={{width: '300px', backgroundColor: '#ffffff'}}>
                                                {
                                                    item?.subMenuResponses?.map(sub =>
                                                        <div
                                                            className="d-flex flex-row align-items-center link-dark my-4 mx-3"
                                                            key={sub.id}
                                                            onMouseOver={() => handleMouseOver(sub?.subMenuResponses)}
                                                        >
                                                            <ReactSVG
                                                                src={SERVER_URL + 'img/' + sub?.image}/>

                                                            <span className={styles.IconDiv} style={{
                                                                fontSize: '16px',
                                                                marginLeft: '10px',
                                                                marginRight: '10px',
                                                                width: '90%'
                                                            }}>
                                                                <span className="fw-bold">{sub?.name}</span>
                                                                </span>
                                                            <div className={styles.hide}>

                                                                <Image src={iconArrowLeft}
                                                                       width={40}
                                                                     style={{width: '80%'}}
                                                                     alt="ArrowCircleLeft"/>
                                                            </div>
                                                        </div>
                                                    )
                                                }

                                            </div>


                                            <div
                                                className="d-flex flex-column justify-content-start rounded-end-4 h-100"
                                                style={{backgroundColor: 'rgb(243,248,253)'}}>


                                                <div className="container">
                                                    <div className="row">
                                                        {chunkedItems.map((chunk, index) => (
                                                            <div key={index} className="col"
                                                                 style={{width: calculateWidth(subProduct.length)}}>
                                                                {chunk.map((item) => (
                                                                    <div
                                                                        style={{cursor: 'pointer'}}
                                                                        onClick={() =>
                                                                            handleClick({
                                                                                "amount": item?.amount,
                                                                                "productType": item?.productType?.id,
                                                                                "tag": item?.productTag?.id,
                                                                                "attributeOption": item?.attributeOption?.id
                                                                            })}
                                                                        className="my-3 text-decoration-none d-block"
                                                                        key={item?.id}>{item?.name}</div>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }

                </ul>
            </div>
        </nav>
    );
}

export default CategoryMenu;
