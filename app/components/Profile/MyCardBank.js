import React, {useEffect, useState} from "react";
import {ToastError, ToastSuccess} from "../../components/utility/utils";
import apiService from "../../components/ApiService/ApiService";
import {useModal} from "../../context/ModalProvider";

const MyCardBank = () => {
    const {showModal} = useModal();
    const [bankInfo, setBankInfo] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [ibanNumber, setIbanNumber] = useState('');
    const [status, setStatus] = useState(false);


    function formatCardNumber(cardNumber) {
        return cardNumber.match(/.{1,4}/g).reverse().join(' ');
    }


    function formatIBAN(iban) {
        return iban.match(/.{1,4}/g).join(' ');
    }

    const validateName = (name) => {
        return /^[a-zA-Z\u0600-\u06FF ]+$/.test(name);
    };

    const validateCardNumber = (number) => {
        return /^(?:\d{4}){3}\d{4}$/.test(number);
    };

    const validateIbanNumber = (number) => {
        return /^IR\d{24}$/.test(number);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateName(firstName) || !validateName(lastName)) {
            ToastError('لطفا نام و نام خانوادگی معتبر وارد کنید.')
            return;
        }
        if (!validateCardNumber(cardNumber)) {
            ToastError('شماره کارت بانکی باید شامل 16 رقم باشد که چهار رقم چهار رقم جدا شده باشد.')
            return;
        }
        if (!validateIbanNumber(ibanNumber)) {
            ToastError('شماره شبا باید با IR شروع شود و شامل 24 رقم باشد.')
            return;
        }

        setStatus(true)

        await apiService?.bankCard({
            "name": firstName,
            "family": lastName,
            "cardNum": cardNumber,
            "shaba": ibanNumber
        })
            .then(response => {
                getAllBankInfo();
                ToastSuccess('کارت شما با موفقیت ثبت شده')
            })
            .catch(error => {
                ToastError('مشکلی در ارسال داده رخ داده')
            });
    };


    const handleDelete = async (itemId) => {
        await apiService?.deleteBankCard(itemId)
            .then(() => {
                getAllBankInfo();
                ToastSuccess("کارت مورد نظر با موفقیت حذف شد")
            })
            .catch(error => {});
    };

    async function getAllBankInfo() {
        await apiService?.getBankCard()
            .then(response => {
                setBankInfo(response?.data)
            })
            .catch(error => {
                ToastError('مشکلی در ارسال داده رخ داده')
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        const asyncFn = async () => {
            await getAllBankInfo()
        };
        asyncFn().then(r => r);
    }, []);

    return (
        <div className="d-flex flex-column align-items-center">


            <div className="col-12 col-lg-8 d-flex justify-content-between my-5">
                <span className="text-with-line fw-bold">اطلاعات حساب بانکی</span>
                <span style={{fontSize: '14px', cursor: 'pointer'}}
                      className="dotted-border-radius align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#CardBankModal">
                    <span className="fa fa-plus me-2 fw-lighter"/>
                    <span>ثبت اطلاعات حساب بانکی</span>
                </span>
            </div>


            <div className="modal fade" id="CardBankModal" tabIndex="-1" role="dialog"
                 aria-labelledby="AddressModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between">
                            <h5 className="modal-title fw-bold" style={{fontSize: '16px'}}
                                id="AddressModalLabel">اضافه کردن حساب بانکی جدید</h5>
                            <a type="button"
                               className="close link-secondary link-opacity-50-hover text-decoration-none"
                               data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="fa fa-close"/>
                            </a>
                        </div>

                        <div className="modal-body">

                            <div className="mb-3">
                                <form onSubmit={handleSubmit} className="card p-3 bg-light">
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px'}}
                                               className="form-label fw-bold">نام:</label>
                                        <input
                                            type="text"
                                            style={{fontSize: '12px'}}
                                            className="form-control"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e?.target?.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px'}} className="form-label fw-bold">نام
                                            خانوادگی:</label>
                                        <input
                                            type="text"
                                            style={{fontSize: '12px'}}
                                            className="form-control"
                                            value={lastName}
                                            onChange={(e) => setLastName(e?.target?.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px'}} className="form-label fw-bold">شماره کارت
                                            بانکی (xxxx xxxx xxxx xxxx):</label>
                                        <input
                                            type="text"
                                            style={{fontSize: '12px'}}
                                            className="form-control"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e?.target?.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label style={{fontSize: '14px'}} className="form-label fw-bold">شماره شبا
                                            (IRxx xxxx xxxx xxxx xxxx xxxx xx):</label>
                                        <input
                                            type="text"
                                            style={{fontSize: '12px'}}
                                            className="form-control"
                                            value={ibanNumber}
                                            onChange={(e) => setIbanNumber(e?.target?.value)}
                                        />
                                    </div>
                                    <button style={{fontSize: '14px'}} data-bs-dismiss={status === true ? "modal" : ""}
                                            type="submit"
                                            className="btn btn-primary fw-bold">ثبت اطلاعات
                                        حساب
                                    </button>
                                </form>
                            </div>


                        </div>
                    </div>
                </div>
            </div>


            <div className="col-12 col-lg-8 d-flex justify-content-center">

                <div className="d-flex flex-column col-12">

                    {
                        bankInfo?.map((item, index) => (

                            <div className="col-12 my-2 d-flex justify-content-center" key={index}>
                                <div className="card col-12">
                                    <div className="card-body">
                                        <p className="card-text fw-bold" style={{fontSize: '14px'}}>نام و نام
                                            خانوادگی: {item?.name + " " + item?.family}</p>
                                        <p className="card-text fw-bold" style={{fontSize: '14px'}}>شماره
                                            کارت: {formatCardNumber(item?.cardNum)}</p>
                                        <p className="card-text fw-bold" style={{fontSize: '14px'}}>شماره
                                            شبا: {formatIBAN(item?.shaba)}</p>
                                        <button className="btn btn-light fw-bold col-12" style={{fontSize: '14px'}}
                                                onClick={() => showModal('آیا از حذف این کارت بانکی اطمینان دارید؟', () => handleDelete(item?.id))}>حذف
                                            کارت
                                        </button>
                                    </div>
                                </div>


                            </div>
                        ))
                    }
                </div>

            </div>


        </div>
    )
}
export default MyCardBank