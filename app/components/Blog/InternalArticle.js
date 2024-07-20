'use client';

import { useParams } from 'next/navigation';
import {useEffect, useState} from "react";
import apiService from "@/app/components/ApiService/ApiService";
import parse from 'html-react-parser';
import {getMainArticle, SERVER_URL} from "@/app/components/services/ServerConnection";
import Image from "next/image";

const InternalArticle = () => {
    const { name } = useParams();

    const [article, setArticle] = useState(null);
    const [articles, setArticles] = useState([]);

    const fetchArticle = async (title) => {
        try {
            const response = await apiService.getArticleByTitle(title);
            setArticle(response.data);
        } catch (error) {
            console.error("An error occurred while fetching the article:", error.response?.data || error.message);
        }
    };

    const fetchArticles = async () => {
        try {
            const { data: dataSlider } = await getMainArticle();
            setArticles(dataSlider.content);
        } catch (error) {
            console.error('Error fetching main articles:', error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (name) {
            fetchArticle(decodeURIComponent(name));
        }
        fetchArticles();
    }, [name]);

    return (
        <div className="d-flex">
            <div className="col col-lg-9">
                {article ? (
                    <div className="d-flex flex-column m-4">
                        <span className="fw-bold text-dark" style={{fontSize: '16px'}}>{article.title}</span>
                        <span className="text-secondary mt-4" style={{fontSize: '14px'}}>{article.description}</span>
                        <div className="mt-4">{parse(article.content)}</div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="col col-lg-3 d-none d-lg-flex flex-lg-column">
                <span className="fw-bold text-dark mt-4" style={{fontSize: '16px'}}>مقالات پیشنهادی</span>
                <div>
                    {articles.slice(0, 4).map((item, index) => (
                        <div className="col-10 my-3 mx-2" key={index}>
                            <a href={`/article/${item.title}`} className="card text-decoration-none link-secondary">
                                <Image
                                    src={`${SERVER_URL}img/${item.image}`}
                                    width={150}
                                    height={150}
                                    className="card-img-top" alt="..."
                                />
                                <div className="card-body" style={{height: '100px', overflow: 'hidden'}}>
                                    <h6 className="card-title text-dark fw-bold"
                                        style={{fontSize: '12px'}}>{item.title}</h6>
                                    <p className="card-text fw-bold text-justify"
                                       style={{fontSize: '10px', textAlign: "justify", textJustify: "inter-word"}}>
                                        {item.description}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InternalArticle