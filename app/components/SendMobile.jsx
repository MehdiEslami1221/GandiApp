'use client';

import iconLogin from "@/public/assets/images/login.png";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import validator from 'validator';
import { useRouter } from "next/navigation";
import { setLogin } from "@/app/components/services/ServerConnection";

const SendMobile = () => {
    const [isChecked, setChecked] = useState(false);
    const router = useRouter();
    const [mobileData, setMobileData] = useState("");
    const [errors, setErrors] = useState([]);

    const handleChange = (event) => {
        setMobileData(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validator?.isMobilePhone(mobileData, 'fa-IR')) {
            setErrors(["شماره وارد شده معتبر نمی باشد"]);
        } else {
            setErrors([""]);
            const { data: response } = await setLogin(mobileData);
            if (response) {
                window.localStorage.setItem("mobile", JSON.stringify(mobileData));
                router.push("/receiveCode", { replace: true });
            } else {
                setErrors(["خطا در برقراری ارتباط"]);
            }
        }
    }

    return (
        <div className="container my-3">
            <div className="d-flex flex-column flex-lg-row">
                <div className="col-12 col-lg-3">
                    <div className="my-5">
                        <span className="fw-bold my-2" style={{ fontSize: '14px' }}>
                            شماره موبایل را وارد کنید
                        </span>

                        <form action="" onSubmit={handleSubmit} className="text-center">
                            <div className="form-group my-3">
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="09123456789"
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
                                disabled={!isChecked}
                                className="btn text-white w-100"
                                style={{ backgroundColor: "#023375" }}
                                type="submit"
                                value="ورود"
                            />
                        </form>

                        <div className="text-center my-2">
                            <span className="mt-2 text-dark fw-light d-flex justify-content-center align-items-center" style={{ fontSize: '12px' }}>
                                <span className="form-check d-flex justify-content-center align-items-center">
                                    <input
                                        style={{ width: '20px', height: '20px' }}
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => setChecked(e.target.checked)}
                                        id="flexCheckDefault"
                                    />
                                    <span style={{ fontSize: '10px' }} className="mx-4 fw-bold">
                                        ثبت نام شما به معنای پذیرش&nbsp;
                                        <span className="fw-bold">
                                            <Link href="/content/قوانین و مقررات" style={{ color: '#2445e8' }} className="text-decoration-none">
                                                قوانین موبایل گاندی
                                            </Link>
                                        </span> است
                                    </span>
                                </span>
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
}

export default SendMobile;
