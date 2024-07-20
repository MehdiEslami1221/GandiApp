'use client';

import LogoGandiMobile from '@/public/assets/images/logo-gandi.png';
import React, { useEffect, useState } from "react";
import { getCategoryMenu } from "@/app/components/services/ServerConnection";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Offcanvas = () => {
    const [categoryMenu, setCategoryMenu] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await getCategoryMenu();
                setCategoryMenu(result);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, []);

    const handleClick = (objectToSend) => {
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

        window?.location?.reload();
    };

    return (
        <div className="d-sm-flex d-lg-none ">
            <span type="button" data-bs-toggle="offcanvas"
                  className="fa fa-reorder px-3 py-2" style={{ fontSize: '25px' }}
                  data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" />

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample"
                 aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        <a className="navbar-brand" href="/">
                            <Image src={LogoGandiMobile} width={80} height={80} alt="Logo Gandi Mobile" />
                        </a>
                    </h5>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            {categoryMenu?.map(item => (
                                <div className="accordion-item" key={item?.id}>
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#MenuItem${item?.id}`}
                                                aria-expanded="false"
                                                aria-controls="flush-collapseOne">
                                            {item?.name}
                                        </button>
                                    </h2>
                                    <div id={`MenuItem${item?.id}`} className="accordion-collapse collapse"
                                         data-bs-parent="#accordionFlushExample">
                                        {item?.subMenuResponses?.map(sub => (
                                            <ul className="list-group my-3" key={sub?.id}>
                                                <li className="list-group-item active">{sub?.name}</li>
                                                {sub?.subMenuResponses?.map(product => (
                                                    <li className="list-group-item" key={product?.id}>
                                                        <div
                                                            style={{ cursor: 'pointer' }}
                                                            className="text-decoration-none"
                                                            onClick={() => handleClick({
                                                                "amount": product?.amount,
                                                                "productType": product?.productType?.id,
                                                                "tag": product?.productTag?.id,
                                                                "attributeOption": product?.attributeOption?.id
                                                            })}>
                                                            {product?.name}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Offcanvas;
