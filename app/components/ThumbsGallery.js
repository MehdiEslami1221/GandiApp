import React from 'react';
import ThumbsGalleryContent from './ThumbsGalleryContent';
import axios from 'axios';
import { SERVER_URL } from "@/app/components/services/ServerConnection";



async function getSingleProduct(id) {

    const { data: { productCountResponses } } = await axios.post(`https://www.gandimobile.ir:8443/api/pcount/getByProductId/${id}`)

    return { productCountResponses }
}

async function getImageProduct(id) {

    const { data: dataImages  } = await axios.get(`${SERVER_URL}productImage/getByProductId/${id}`)

    return { dataImages }
}


const ThumbsGallery = async ({ id }) => {


    const { productCountResponses } = await getSingleProduct(id)
    const { dataImages } = await getImageProduct(id)



    const isProductAvailable = productCountResponses[0]?.count > 0 ? 'instock' : 'outofstock';


    return (
        <>
            <head>
                <meta name="product_id" content={productCountResponses[0]?.product?.id} />
                <meta name="product_name" content={productCountResponses[0]?.product?.name} />
                <meta property="og:image" content={`${SERVER_URL}img/${dataImages[0]?.img}`} />
                <meta name="product_price" content={productCountResponses[0]?.finalPrice} />
                <meta name="product_old_price" content={productCountResponses[0]?.price} />
                <meta name="availability" content={isProductAvailable} />
            </head>
            <ThumbsGalleryContent />
        </>
    );
}

export default ThumbsGallery;
