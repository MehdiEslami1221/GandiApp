'use client';

import React, { useEffect, useState, useCallback } from "react";
import { useModal } from "../../context/ModalProvider";
import apiService from "@/app/components/ApiService/ApiService";
import { useRouter } from 'next/navigation';
import { ToastError, ToastSuccess } from "../../components/utility/utils";
import validator from "validator";

const MyAddressesComponent = () => {
    const { showModal } = useModal();
    const navigate = useRouter();

    const [login, setLogin] = useState(false);

    const [areaInput, setAreaInput] = useState('');
    const [postalCodeInput, setPostalCodeInput] = useState('');
    const [addressInput, setAddressInput] = useState('');
    const [noInput, setNoInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [errors, setErrors] = useState({});

    const [provinces, setProvinces] = useState([]); // لیست استان‌ها
    const [selectedProvince, setSelectedProvince] = useState(''); // استان انتخابی
    const [cities, setCities] = useState([]); // لیست شهرها
    const [selectedCity, setSelectedCity] = useState(''); // شهر انتخابی

    const [addressResult, setAddress] = useState([]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedLogin = JSON.parse(localStorage.getItem('isLogin'));
            setLogin(storedLogin || false);
        }
    }, []);

    useEffect(() => {
        // دریافت لیست استان‌ها
        apiService?.getAllProvince()
            .then(response => {
                setProvinces(response.data);
                setSelectedProvince(response.data[0].id.toString()); // انتخاب اولین استان به صورت پیش‌فرض
            })
            .catch(error => {
                console.error('خطا در دریافت استان‌ها:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            // دریافت لیست شهرها بر اساس استان انتخابی
            apiService?.getCity(selectedProvince)
                .then(response => {
                    setCities(response.data);
                    setSelectedCity(response.data[0].id.toString()); // انتخاب اولین شهر به صورت پیش‌فرض
                })
                .catch(error => {
                    console.error('خطا در دریافت شهرها:', error);
                });
        }
    }, [selectedProvince]);

    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;

        if (!validator?.isLength(areaInput, { min: 3, max: 50 })) {
            formIsValid = false;
            tempErrors['areaInput'] = 'مقدار محله باید حداقل 3 کاراکتر و حداکثر 50 کاراکتر باشد.';
        }
        if (!validator.isPostalCode(postalCodeInput, "IR")) {
            formIsValid = false;
            tempErrors['postalCodeInput'] = 'کد پستی اشتباه می باشد';
        }

        if (!validator.isLength(addressInput, { min: 3, max: 200 })) {
            formIsValid = false;
            tempErrors['addressInput'] = 'مقدار آدرس باید حداقل 3 کاراکتر و حداکثر 200 کاراکتر باشد.';
        }

        if (!validator.isLength(noInput, { min: 1, max: 20 })) {
            formIsValid = false;
            tempErrors['noInput'] = 'پلاک خود را وارد کنید.';
        }

        if (!validator.isLength(unitInput, { min: 1, max: 20 })) {
            formIsValid = false;
            tempErrors['unitInput'] = 'واحد خود را وارد کنید';
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                apiService?.addAddress(selectedCity, selectedProvince, areaInput, postalCodeInput, addressInput, noInput, unitInput)
                    .then(() => {
                        ToastSuccess("آدرس با موفقیت اضافه شد.");
                        getResultAllAddress();
                    })
                    .catch(error => {
                        if (error.response.status === 408) {
                            apiService?.refreshToken()
                                .then(() => { })
                                .catch(error => {
                                    if (error?.response?.data?.statusCode === 20) {
                                        if (typeof window !== 'undefined') {
                                            window.localStorage.clear();
                                        }
                                        navigate.push("/");
                                        window.location.reload();
                                    }
                                });
                        }
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            } catch (err) {
                console.error('خطا در ارسال داده‌ها:', err);
            }
        } else {
            ToastError("خطا در ورودی‌ها وجود دارد");
        }
    };

    const getResultAllAddress = useCallback(async () => {
        try {
            if (login) {
                await apiService?.getAllAddress()
                    .then(response => {
                        setAddress(response?.data);
                    })
                    .catch(error => {
                        if (error.response.status === 408) {
                            apiService?.refreshToken()
                                .then(() => { })
                                .catch(error => {
                                    if (error?.response?.data?.statusCode === 20) {
                                        if (typeof window !== 'undefined') {
                                            window.localStorage.clear();
                                        }
                                        navigate.push("/");
                                        window.location.reload();
                                    }
                                });
                        }
                        console.error('خطا در ارسال داده‌ها:', error);
                    });
            }
        } catch (err) {
            console.error('خطا در دریافت آدرس‌ها:', err);
        }
    }, [login, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getResultAllAddress();
    }, [getResultAllAddress]);

    const handleDelete = async (itemId) => {
        await apiService?.deleteAddress(itemId)
            .then(() => {
                ToastError("آدرس مورد نظر با موفقیت حذف شد.");
                getResultAllAddress();
            })
            .catch(error => {
                console.error('خطا در حذف آدرس:', error);
            });
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="col-12 col-lg-8 d-flex justify-content-between my-5">
                <span className="text-with-line fw-bold">آدرس های من</span>
                <button
                    style={{ fontSize: '14px', cursor: 'pointer' }}
                    className="dotted-border-radius d-flex align-items-center"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#AddAddressModal">
                    <span className="fa fa-plus me-2 fw-lighter" />
                    <span>افزودن آدرس جدید</span>
                </button>
            </div>

            <div className="modal fade" id="AddAddressModal" tabIndex="-1" role="dialog"
                 aria-labelledby="AddressModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title fw-bold" style={{ fontSize: '16px' }}
                                id="AddressModalLabel">اضافه کردن آدرس جدید</h5>
                            <a type="button"
                               className="close link-secondary link-opacity-50-hover text-decoration-none"
                               data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="fa fa-close" />
                            </a>
                        </div>
                        <form onSubmit={handleSubmit} className="d-flex flex-column">
                            <div className="modal-body">
                                <span className="fw-bold" style={{ fontSize: '14px' }}>آدرس گیرنده را وارد کنید</span>
                                <div className="d-flex flex-row my-3">
                                    <select
                                        className="form-select mx-1"
                                        value={selectedProvince}
                                        onChange={(e) => {
                                            setSelectedProvince(e.target.value);
                                            setSelectedCity(''); // ریست شهرها هنگام تغییر استان
                                        }}
                                    >
                                        {provinces.map(province => (
                                            <option key={province.id} value={province.id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className="form-select mx-1"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        disabled={!cities.length}
                                    >
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group mt-2">
                                    <input type="text" placeholder="محله"
                                           className="form-control mx-1 text-start"
                                           name="areaInput"
                                           value={areaInput}
                                           onChange={(e) => setAreaInput(e?.target?.value)}
                                    />
                                    <input type="text" placeholder="کد پستی"
                                           className="form-control mx-1 text-start"
                                           name="postalCodeInput"
                                           value={postalCodeInput}
                                           onChange={(e) => setPostalCodeInput(e?.target?.value)} />
                                </div>
                                <div className="my-3 mx-1">
                                    <textarea className="form-control"
                                              placeholder="آدرس پستی"
                                              name="addressInput"
                                              value={addressInput}
                                              onChange={(event) => setAddressInput(event?.target.value)} />
                                </div>
                                <div className="input-group mt-2">
                                    <input placeholder="پلاک"
                                           className="form-control mx-1 text-start"
                                           name="noInput"
                                           value={noInput}
                                           onChange={(event) => setNoInput(event?.target.value)} />
                                    <input placeholder="واحد"
                                           className="form-control mx-1 text-start"
                                           name="unitInput"
                                           value={unitInput}
                                           onChange={(event) => setUnitInput(event?.target.value)} />
                                </div>
                                {errors.areaInput &&
                                    <div className="alert alert-danger my-2">{errors.areaInput}</div>}
                                {errors.postalCodeInput &&
                                    <div className="alert alert-danger my-2">{errors.postalCodeInput}</div>}
                                {errors.addressInput &&
                                    <div className="alert alert-danger my-2">{errors.addressInput}</div>}
                                {errors.noInput && <div className="alert alert-danger my-2">{errors.noInput}</div>}
                                {errors.unitInput &&
                                    <div className="alert alert-danger my-2">{errors.unitInput}</div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">بستن
                                </button>
                                <button style={{ backgroundColor: "#023375" }} type="submit"
                                        className="btn btn-primary">ثبت آدرس
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {addressResult.length > 0 ? (
                addressResult.map((item, index) => (
                    <div className="d-flex flex-column col-12 col-lg-8 user-select-none" key={index}>
                        <div key={item.id} className="bg px-2 rounded-3">
                            <div className="d-flex align-items-center flex-row my-2">
                                <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}
                                      className="fa fa-home fs-5" />
                                <span className="mx-2 fw-bold text-secondary"
                                      style={{ fontSize: '14px' }}>آدرس:</span>
                                <span className="fw-bold text-secondary"
                                      style={{ fontSize: '14px' }}>{item.address}</span>
                            </div>
                            <div className="d-flex align-items-center flex-row my-2">
                                <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}
                                      className="fa fa-location-arrow fs-5" />
                                <span className="mx-2" style={{ fontSize: '14px' }}>منطقه</span>
                                <span style={{ fontSize: '14px' }}>{item?.area}</span>
                            </div>
                            <div className="d-flex flex-column flex-lg-row justify-content-center align-items-lg-center justify-content-lg-between my-2">
                                <div className="d-flex flex-row align-items-center my-2 my-lg-0">
                                    <span className="fa fa-building-o me-2 fs-5"
                                          style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }} />
                                    <span style={{ fontSize: '14px' }}>{item?.province?.name}</span>
                                    <span className="mx-1" style={{ fontSize: '14px' }}>،</span>
                                    <span style={{ fontSize: '14px' }}>{item?.city?.name}</span>
                                </div>
                                <div className="d-flex flex-row align-items-center  my-2 my-lg-0">
                                    <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}
                                          className="fa fa-envelope-o fs-5" />
                                    <span className="mx-2" style={{ fontSize: '14px' }}>کد پستی:</span>
                                    <span style={{ fontSize: '14px' }}>{item?.postalCode}</span>
                                </div>
                                <div className="d-flex flex-row align-items-center  my-2 my-lg-0">
                                    <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}
                                          className="fa fa-tags fs-5" />
                                    <span className="mx-2" style={{ fontSize: '14px' }}>پلاک:</span>
                                    <span style={{ fontSize: '14px' }}>{item?.no}</span>
                                </div>
                                <div className="d-flex flex-row align-items-center  my-2 my-lg-0">
                                    <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.55)' }}
                                          className="fa fa-building fs-5" />
                                    <span className="mx-2" style={{ fontSize: '14px' }}>واحد:</span>
                                    <span style={{ fontSize: '14px' }}>{item?.unit}</span>
                                </div>
                                <div className="d-flex align-items-center my-2 my-lg-0 justify-content-center">
                                    <span className="fa fa-edit mx-4 mx-lg-3  fs-5 d-none"
                                          style={{ color: '#2535de' }}></span>
                                    <span className="fa fa-trash-o mx-4 mx-lg-3 fs-5 delete-item"
                                          onClick={() => showModal('آیا از حذف این آدرس اطمینان دارید؟', () => handleDelete(item?.id))}></span>
                                </div>
                            </div>
                        </div>
                        <hr className="dotted" />
                    </div>
                ))
            ) : (
                <span className="fw-bold text-secondary">آدرسی یافت نشد.</span>
            )}
        </div>
    );
};

export default MyAddressesComponent;
