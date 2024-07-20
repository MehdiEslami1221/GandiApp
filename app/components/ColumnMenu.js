'use client';

import {useEffect, useState} from "react";
import {getCoverByPosition, SERVER_URL} from "@/app/components/services/ServerConnection";
import Image from "next/image";
import {useRouter} from "next/navigation";

const ColumnMenu = () => {
    const [cover, setCover] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: result} = await getCoverByPosition(1);
                setCover(result);
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    function handleClick(objectToSend) {
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
            <div className="container-fluid overflow-hidden text-center">
                <div className="row">
                    <div
                        style={{cursor: 'pointer'}}
                        onClick={() =>
                            handleClick({
                                "amount": cover[0]?.amount,
                                "productType": cover[0]?.productType?.id,
                                "tag": cover[0]?.productTag?.id,
                                "attributeOption": cover[0]?.attributeOption?.id
                            })}
                        className="col-12 mt-4 mb-2 my-lg-4 col-lg-6 m-0 pe-lg-2 p-0">
                        {cover[0] && (

                            <Image
                                className="img-fluid m-0 p-0 rounded-4"
                                alt=""
                                src={`${SERVER_URL}upload/files/${cover[0]?.image}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '100%', height: 'auto'}}
                            />
                        )}
                    </div>

                    <div
                        style={{cursor: 'pointer'}}
                        onClick={() =>
                            handleClick({
                                "amount": cover[1]?.amount,
                                "productType": cover[1]?.productType?.id,
                                "tag": cover[1]?.productTag?.id,
                                "attributeOption": cover[1]?.attributeOption?.id
                            })}
                        className="col-12 mt-2 mb-4 my-lg-4 col-lg-6 m-0 ps-lg-2 p-0">
                        {cover[1] && (

                            <Image
                                className="img-fluid m-0 p-0 rounded-4"
                                alt=""
                                src={`${SERVER_URL}upload/files/${cover[1]?.image}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{width: '100%', height: 'auto'}}
                            />

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ColumnMenu;
