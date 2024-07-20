'use client';

import {useEffect, useState} from "react";
import {getMainArticle, SERVER_URL} from "@/app/components/services/ServerConnection.jsx";
import Image from "next/image";
import Link from "next/link";

const NewsArticles = () => {


    const [article, setArticle] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data: dataSlider} = await getMainArticle();
                setArticle(dataSlider['content'])
            } catch (err) {
                // console.log(err.message())
            }
        }
        fetchData().then(r => r);
    }, []);

    return (
        <div className="my-5 " id="news">
            <div className="d-flex justify-content-between">
                <h6 className="fw-bold">اخبار و مقالات</h6>
                <div className="d-flex justify-content-end align-items-center">
                    <Link href="/showAllArticle" target={'_blank'} className="d-flex text-decoration-none link-secondary">
                        <h6 className="me-2">مشاهده</h6>
                        <span className="fa fa-arrow-left fs-6"/>
                    </Link>
                </div>
            </div>

            <div className="container p-0 m-0 mt-3">
                <div className="row">
                    {
                        article.map((item, index) =>
                            <div className="col-sm-12 col-md-6 col-lg-3 my-2" key={index}>
                                <Link href={`/article/${item?.title}`} className="card text-decoration-none link-secondary">
                                    <Image
                                        src={SERVER_URL + 'img/' + item.image}
                                        width={200}
                                        height={200}
                                        className="card-img-top" alt="..."/>
                                    <div className="card-body" style={{height: '100px', overflow: 'hidden'}}>
                                        <h6 className="card-title text-dark fw-bold" style={{fontSize:'14px'}}>{item.title}</h6>
                                        <p className="card-text fw-bold text-justify"
                                           style={{fontSize: '12px', textAlign: "justify", textJustify: "inter-word"}}>
                                            {item?.description}
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default NewsArticles;