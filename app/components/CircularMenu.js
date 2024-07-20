'use client';

import { useEffect, useState } from "react";
import { getAllMainWare, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CircularMenu = () => {
    const [productType, setProductType] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await getAllMainWare();
                setProductType(result);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    function handleClick(objectToSend) {
        window.scrollTo(0, 0);

        let params = {
            ato: 0,
            amount: 0,
            ptype: objectToSend || 0,
            Tag: 0,
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

    return (
        <div className="container text-center my-5">
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {productType?.slice(0, 5)?.map((item, index) => (
                    <div className="text-decoration-none link-secondary link-opacity-25-hover" key={index}>
                        <div className="col">
                            <Image
                                src={SERVER_URL + 'img/' + item?.img}
                                width={150}
                                height={121}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleClick(item?.productType?.id)}
                                alt={item?.name || "Product Image"}
                                className="w-50"
                            />
                            <h6 className="mt-2 fw-bold text-dark" style={{ fontSize: '12px' }}>{item?.name}</h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CircularMenu;
