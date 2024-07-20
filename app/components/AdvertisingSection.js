'use client';

import { useEffect, useState } from "react";
import { getCoverByPosition, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AdvertisingSection = () => {
    const [cover, setCover] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await getCoverByPosition(2);
                setCover(result);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    const handleClick = (objectToSend) => {
        window.scrollTo(0, 0);
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

    return (
        <div>
            <div className="row p-0 my-4 ">
                {cover.slice(0, 4).map((item, index) => (
                    <div
                        key={index}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleClick({
                            "amount": item?.amount,
                            "productType": item?.productType?.id,
                            "tag": item?.productTag?.id,
                            "attributeOption": item?.attributeOption?.id
                        })}
                        className={`col-12 col-lg-3 ${index < 3 ? 'mb-4 mb-lg-0' : 'mb-0 mb-lg-0'}`}
                    >
                        {item && (
                            <Image
                                src={`${SERVER_URL}img/${item?.image}`}
                                alt="Advertising Image"
                                className="img-fluid w-100 rounded-3"
                                width={300}
                                height={200}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdvertisingSection;
