'use client';

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import BreadCrumb from "../BreadCrumb";
import Item from "./contentItem/Item";
import FullPageLoader from "./contentItem/FullPageLoader";
import SortItem from "./contentItem/SortItem";
import FilterItem from "./contentItem/FilterItem";

export default function ShowAllProducts() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true); // اضافه کردن state برای نمایش لودینگ

    const fetchMoreData = useCallback(async () => {
        setLoading(true); // فعال کردن لودینگ
        try {
            const response = await axios.post(`https://gandimobile.ir:8443/api/pcount/findAmazingOffer/${page}`);
            if (response?.data?.productCountResponses && response?.data?.productCountResponses?.length > 0) {
                setItems(prevItems => prevItems.concat(response.data?.productCountResponses));
                setPage(prevPage => prevPage + 1);
                setLoading(false); // غیرفعال کردن لودینگ پس از بارگذاری داده‌ها
            } else {
                setHasMore(false);
                setLoading(false); // غیرفعال کردن لودینگ اگر داده‌ای نباشد
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false); // غیرفعال کردن لودینگ در صورت خطا
        }
    }, [page]);

    useEffect(() => {
        fetchMoreData();
    }, [fetchMoreData]);

    return (
        <div className="col-12 col-lg-12 d-flex flex-column">
            {loading && <FullPageLoader />}

            <SortItem />

            <BreadCrumb id={items[0]?.product?.productType?.id} />

            <div className="d-flex">
                <FilterItem />

                <div className="col-10">
                    <div className="py-2">
                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<span />}
                            endMessage={<span />}>
                            <div className="container overflow-hidden">
                                <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                                    {items.map((item, index) => (
                                        <div key={index}>
                                            <Item item={item} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
}
