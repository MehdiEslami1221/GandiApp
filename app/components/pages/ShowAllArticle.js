'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import LogoGandiMobile from "@/public/assets/images/logo-gandi.png";
import { SERVER_URL } from "@/app/components/services/ServerConnection";
import Image from "next/image";

const FullPageLoader = () => (
    <div className="loader-container">
        <div
            className="d-flex flex-row justify-content-center align-items-center bg-light py-5 shadow rounded-3"
            style={{ width: '300px' }}>
            <div>
                <Image src={LogoGandiMobile} width={100} height={100}
                       className="d-inline-block align-top me-4" alt="" />
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="loader" />
                <span className="text-dark mt-3 fw-bold"
                      style={{ fontSize: '14px' }}>کمی صبر کنید...</span>
            </div>
        </div>
    </div>
);

const ShowAllArticle = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true); // اضافه کردن state برای نمایش لودینگ

    const fetchMoreData = useCallback(async () => {
        setLoading(true); // فعال کردن لودینگ
        try {
            const response = await axios.post(`https://gandimobile.ir:8443/api/article/getAll/${page}`);
            if (response?.data?.content && response?.data?.content?.length > 0) {
                setArticles(prevArticles => prevArticles.concat(response.data?.content));
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
        <>
            {loading && <FullPageLoader />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<span />}
                endMessage={<span />}>
                <div className="container text-center py-5">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 g-md-2 g-lg-3">

                        {articles.map((article, index) => (
                            <div key={index} className="col">
                                <a href={`/article/${article?.title}`}
                                   className="card text-decoration-none link-secondary">
                                    <Image
                                        width={200}
                                        height={200}
                                        src={SERVER_URL + 'img/' + article?.image}
                                        style={{ height: '200px' }}
                                        className="card-img-top" alt="..." />
                                    <div className="card-body" style={{ height: '100px', overflow: 'hidden' }}>
                                        <h6 className="card-title text-dark fw-bold">{article?.title}</h6>
                                        <p className="card-text fw-bold text-justify"
                                           style={{
                                               fontSize: '12px',
                                               textAlign: "justify",
                                               textJustify: "inter-word"
                                           }}>
                                            {article?.description}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

export default ShowAllArticle;
