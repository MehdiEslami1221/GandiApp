'use client';

import { useEffect, useState } from "react";
import { getCoverByPosition, SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";
import { useRouter } from "next/navigation";

const OffersRow = () => {
    const [cover, setCover] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: result } = await getCoverByPosition(3);
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
        <div className="row mt-4 mb-3 mt-lg-5 mb-lg-4">
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => handleClick({
                    "amount": cover[0]?.amount,
                    "productType": cover[0]?.productType?.id,
                    "tag": cover[0]?.productTag?.id,
                    "attributeOption": cover[0]?.attributeOption?.id
                })}
                className="col"
            >
                {cover[0] && (
                    <Image
                        src={`${SERVER_URL}img/${cover[0]?.image}`}
                        alt="Cover Image"
                        className="img-fluid rounded-3"
                        width={1300}
                        height={300}
                    />
                )}
            </div>
        </div>
    );
}

export default OffersRow;
