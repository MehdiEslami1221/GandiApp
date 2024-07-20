'use client';

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import iconWhatsAppFooter from '/public/assets/icons/whatsapp-footer.svg';
import iconTelegramFooter from '/public/assets/icons/telegram-footer.svg';
import iconFacebookFooter from '/public/assets/icons/facebook-footer.svg';
import iconInstagramFooter from '/public/assets/icons/instagram-footer.svg';
import eNamadLogo from '/public/assets/images/enamad.png';
import { getWebInfo } from "@/app/components/services/ServerConnection";
import apiService from "@/app/components/ApiService/ApiService";
import './Footer.css';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Footer = () => {
    const [footerSubMenu, setfooterSubMenu] = useState([]);
    const [webInfo, setWebInfo] = useState({});
    const router = useRouter();

    async function getFooter() {
        await apiService?.getFooterSubMenu()
            .then(response => {
                setfooterSubMenu(response?.data?.content);
            })
            .catch(error => {
                console.error('خطا در ارسال داده‌ها:', error);
            });
    }

    const groupedItems = footerSubMenu?.reduce((acc, item) => {
        const col = item?.footerMenu?.col;
        if (col === undefined) {
            console.error("col is not defined for item", item);
            return acc;
        }
        if (!acc[col]) {
            acc[col] = [];
        }
        acc[col].push(item);
        return acc;
    }, {});

    useEffect(() => {
        const asyncFn = async () => {
            await getFooter();
        };
        asyncFn().then(r => r);

        const fetchData = async () => {
            try {
                const { data: webInfoData } = await getWebInfo();
                setWebInfo(webInfoData);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchData().then(r => r);
    }, []);

    function handleClick(objectToSend) {
        if (objectToSend?.content != null) {
            router.push('/content/' + objectToSend?.name);
        } else {
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
    }

    return (
        <div className="py-5 px-5 overflow-hidden m-0 p-0" style={{ backgroundColor: "#023375", left: '0', bottom: '0', right: '0' }}>
            <div className="my-2">
                <div className="d-flex flex-column col-12 my-2">
                    <div className="col-12">
                        <span className="text-light">تلفن:</span>
                        <span className="text-light mx-2" style={{ direction: 'rtl' }}>{webInfo.tell}</span>
                    </div>
                    <div className="col-12 mt-3">
                        <span className="text-light">ایمیل:</span>
                        <span className="text-light mx-2">{webInfo.email}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <div className="row text-white">
                    {Object.entries(groupedItems).map(([col, items]) => (
                        <div key={col} className="col-sm-12 col-md mt-5 mt-lg-0">
                            <h3 className="fw-bold" style={{ fontSize: '16px' }}>{items[0]?.footerMenu?.name}</h3>
                            <ul className="list-unstyled mt-4">
                                {items?.map((item) => (
                                    <li className="my-3" style={{ fontSize: '12px', cursor: 'pointer' }} key={item?.id}>
                                        <div className="text-decoration-none link-light"
                                             onClick={() =>
                                                 handleClick({
                                                     "name": item?.name,
                                                     "content": item?.content,
                                                     "amount": item?.amount,
                                                     "productType": item?.productType?.id,
                                                     "tag": item?.productTag?.id,
                                                     "attributeOption": item?.attributeOption?.id
                                                 })}>{item?.name}</div>
                                    </li >
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row mt-5">
                <div className="col-12 col-lg-5 mx-0  mx-lg-2 my-2 my-lg-0">
                    <div className="d-flex flex-column align-items-start">
                        <h5 className="text-white">موبایل گاندی</h5>
                        <span className="text-white">فروشگاه موبایل گاندی وابسته به شرکت پارس همراه صباحی وارد کننده رسمی انواع تلفن های همراه</span>
                        <p className="text-white fw-light mt-4" style={{ textAlign: "justify", textJustify: "inter-word", fontSize: '14px' }}>
                            {webInfo.aboutUs}
                        </p>
                    </div>
                </div>
                <div className="col-12 col-lg-4 mx-0  mx-lg-2 my-2 my-lg-0">
                    <div className="d-flex flex-column align-items-center d-none">
                        <h5 className="text-white">عضویت در خبرنامه</h5>
                    </div>
                    <div className="d-flex mt-3 flex-column align-items-center d-none">
                        <div className="form-group col-12 px-0 px-lg-5">
                            <input type="text" className="form-control text-end" placeholder="sample@mail.com" />
                            <input type="text" className="form-control text-end mt-2" placeholder="09123456789" />
                            <button className="btn btn-success col-12 mt-2">عضویت</button>
                        </div>
                    </div>
                    <div className="text-white d-flex flex-row justify-content-center align-items-center mt-3">
                        <Link referrerPolicy='origin' target='_blank' className="mx-2" href='https://trustseal.enamad.ir/?id=464373&Code=QVr8965NgLyyjTLcLVaGhfq70GxctnbB'>
                            <Image referrerPolicy='origin' src={eNamadLogo} alt='' width={150} height={150} style={{ cursor: 'pointer' }} Code='QVr8965NgLyyjTLcLVaGhfq70GxctnbB' />
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-lg-3 mx-0  mx-lg-2 my-2 my-lg-0">
                    <div className="d-flex flex-column align-items-start">
                        <h5 className="text-white">اطلاعات تماس</h5>
                        <ul className="text-white d-flex flex-column align-items-start">
                            <li style={{fontSize: '14px'}} className="my-1">
                                <span className="me-2">تلفن:</span>
                                <span>{webInfo.tell}</span>
                            </li>
                            <li style={{fontSize: '14px'}} className="my-1">
                                <span className="me-2">ایمیل:</span>
                                <span>{webInfo.email}</span>
                            </li>
                            <li style={{fontSize: '14px'}} className="my-1">
                                <span className="me-2">ساعت کاری:</span>
                                <span>{webInfo.workTime}</span>
                            </li>
                            <li style={{fontSize: '14px'}} className="my-1">
                                <span className="me-2">ما را در شبکه های اجتماعی دنبال کنید</span>
                            </li>
                        </ul>



                        <div className="d-flex flex-row align-items-center">


                            <Link
                                target={'_blank'}
                                href={"https://wa.me/" + webInfo?.whatsApp}
                                className="text-decoration-none link-secondary mx-2">
                                <Image src={iconWhatsAppFooter} alt="Whats" width={24} height={24}/>
                            </Link>

                            <Link
                                target={'_blank'}
                                href={"https://t.me/" + webInfo?.telegram}
                                className="text-decoration-none link-secondary mx-2">
                                <Image src={iconTelegramFooter} alt="Telegram" width={24} height={24}/>
                            </Link>


                            <Link
                                target={'_blank'}
                                href="#" className="text-decoration-none d-none link-secondary mx-2">
                                <Image src={iconFacebookFooter} alt="Facebook" width={24} height={24}/>
                            </Link>

                            <Link
                                target={'_blank'}
                                href={'https://www.instagram.com/' + webInfo.instagram}
                                className="text-decoration-none link-secondary mx-2">
                                <Image src={iconInstagramFooter} alt="Instagram" width={24} height={24}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
