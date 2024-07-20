'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import { ToastSuccess } from "../../components/utility/utils";
import apiService from "@/app/components/ApiService/ApiService";

const PersonalInformationComponent = () => {
    const navigate = useRouter();
    const [login, setLogin] = useState(false);

    const [nameInput, setNameInput] = useState('');
    const [familyInput, setFamilyInput] = useState('');
    const [nationalCodeInput, setNationalCodeInput] = useState('');
    const [mobileInput, setMobileInput] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLogin = JSON.parse(localStorage.getItem('isLogin'));
            setLogin(storedLogin || false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (login) {
                    apiService?.getUserInfo()
                        .then(response => {
                            setNameInput(response?.data?.name);
                            setFamilyInput(response?.data?.family);
                            setMobileInput(response?.data?.mobile);
                            setNationalCodeInput(response?.data?.nationalCode);
                        })
                        .catch(error => {
                            console.error('خطا در ارسال داده‌ها:', error);
                        });
                }
            } catch (err) {
                console.error('خطا در دریافت داده‌ها:', err);
            }
        };
        fetchData();
    }, [login]);

    const handleSubmit = () => {
        apiService?.addProfile(nameInput, familyInput, nationalCodeInput, mobileInput)
            .then(() => {
                ToastSuccess('عملیات با موفقیت انجام شد!');
            })
            .catch(error => {
                console.error('خطا در ارسال داده‌ها:', error);
            });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-lg-8 d-flex justify-content-between my-5">
                <span className="text-with-line fw-bold">مشخصات فردی</span>
                <span
                    style={{ fontSize: '14px', cursor: 'pointer' }}
                    className="dotted-border-radius d-none align-items-center"
                    data-toggle="modal"
                    data-target="#AddAddressModal"
                >
                    <span className="fa fa-plus me-2 fw-lighter" />
                    <span>افزودن آدرس جدید</span>
                </span>
            </div>
            <div className="col-12 col-lg-8">
                <div className="input-group my-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text rounded rounded-end-0" id="inputGroup-sizing-default">نام</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={nameInput}
                        onChange={(event) => setNameInput(event?.target?.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text rounded rounded-end-0" id="inputGroup-sizing-default">نام خانوادگی</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={familyInput}
                        onChange={(event) => setFamilyInput(event?.target?.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text rounded rounded-end-0" id="inputGroup-sizing-default">کد ملی</span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={nationalCodeInput}
                        onChange={(event) => setNationalCodeInput(event.target.value)}
                    />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-append">
                        <span className="input-group-text rounded rounded-end-0" id="inputGroup-sizing-default">شماره همراه</span>
                    </div>
                    <input
                        disabled
                        type="text"
                        className="form-control"
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        value={mobileInput}
                    />
                </div>
                <div className="d-flex justify-content-end mb-5 mt-3">
                    <button
                        className="btn text-white"
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#023375" }}
                    >
                        ثبت تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PersonalInformationComponent;
