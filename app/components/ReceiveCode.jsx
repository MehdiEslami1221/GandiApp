'use client';

import React, { useContext, useEffect, useState } from "react";
import iconLogin from "@/public/assets/images/login.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAuth, setLogin } from "@/app/components/services/ServerConnection";
import './CountdownTimer.css';
import { ShopContext } from "../context/ShopContext";

const ReceiveCode = (data) => {
    const router = useRouter();

    const { setIsLogin } = useContext(ShopContext);

    const [mobile, setMobile] = useState("0");
    const [staging, setStaging] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isActive, setIsActive] = useState(true);
    const [showTimer, setShowTimer] = useState(true);
    const [codeData, setCodeData] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedMobile = localStorage.getItem('mobile');
            const storedStaging = localStorage.getItem('staging');
            setMobile(storedMobile !== null ? JSON.parse(storedMobile) : "0");
            setStaging(storedStaging !== null ? JSON.parse(storedStaging) : false);
        }
    }, []);

    useEffect(() => {
        let intervalId;

        if (isActive && timeLeft > 0) {
            intervalId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setShowTimer(false);
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isActive, timeLeft]);

    const resetTimer = async () => {
        setTimeLeft(60);
        setIsActive(true);
        setShowTimer(true);
        await setLogin(mobile);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return [minutes, seconds]
            .map(v => v < 10 ? '0' + v : v)
            .join(':');
    };

    const handleChange = (event) => {
        setCodeData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (codeData.length < 4) {
            setErrors(["کد وارد شده معتبر نمی باشد"]);
        } else {
            setErrors([]);
            try {
                const { data: response } = await setAuth(mobile, codeData);
                setIsLogin(true);
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('mobile');
                }
                if (staging) {
                    router.push("/gandiCart", { replace: true });
                } else {
                    router.push("/", { replace: true });
                }
            } catch (error) {
                setErrors(["خطایی در تایید کد رخ داده است"]);
            }
        }
    };

    return (
        <div className="container my-3">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3">
                    <div className="my-5">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <span className="fw-bold my-2" style={{ fontSize: '14px' }}>
                                کد تایید را وارد کنید
                            </span>
                            <span className="fw-bold" style={{ fontSize: '14px' }}>
                                کد تایید برای شماره {mobile} ارسال شد
                            </span>
                        </div>

                        <form action="" onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <input
                                    type="tel"
                                    className="form-control text-center fw-bold"
                                    maxLength="20"
                                    onChange={handleChange}
                                />
                            </div>

                            {errors.map((error, index) => (
                                error === "" ? (
                                    <span key={index} className="d-none" />
                                ) : (
                                    <div key={index} className="alert alert-danger" role="alert">
                                        <span>{error}</span>
                                    </div>
                                )
                            ))}

                            <input
                                className="btn text-white w-100"
                                style={{ backgroundColor: "#023375" }}
                                type="submit"
                                value="تایید"
                            />
                        </form>

                        <div className="w-100 my-3 d-flex justify-content-center">
                            {showTimer && (
                                <div>
                                    <span className="fw-bold" style={{ fontSize: '16px', color: "#484747" }}>ارسال مجدد کد تا </span>
                                    <span style={{ fontSize: '16px', color: "#ee1b6d" }} className="timer fw-bold">{formatTime(timeLeft)}</span>
                                    <span className="fw-bold" style={{ fontSize: '16px', color: "#484747" }}> دیگر</span>
                                </div>
                            )}
                            {!showTimer && (
                                <button className="btn text-white w-100" style={{ backgroundColor: "#ee1b6d" }} onClick={resetTimer}>
                                    ارسال مجدد کد
                                </button>
                            )}
                        </div>

                        <div className="text-center my-2">
                            <span className="mt-2 text-dark fw-light" style={{ fontSize: '12px' }}>
                                ثبت نام شما به معنای پذیرش قوانین موبایل گاندی است
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-9 d-none d-lg-flex justify-content-center">
                    <Image src={iconLogin} className="w-50" alt="login" width={500} height={500} />
                </div>
            </div>
        </div>
    );
};

export default ReceiveCode;
