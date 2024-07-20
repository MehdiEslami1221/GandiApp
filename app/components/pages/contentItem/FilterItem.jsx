import React, { useEffect, useState, useCallback } from "react";
import './FilterItem.css';
import apiService from "@/app/components/ApiService/ApiService";

const FilterItem = ({ parentCallback }) => {
    const [searchProduct, setSearchProduct] = useState([]);
    const [productType, setProductType] = useState([]);
    const [tag, setTag] = useState([]);
    const [value, setValue] = useState(500000);

    const ProductsList = useCallback(async () => {
        try {
            await apiService?.SearchProductsList(0, {
                "amount": 5200000,
                "productType": 10,
                "attributeOption": 0,
                "Tag": 0,
                "sortByPrice": 0,
                "sortByNewerProduct": 0,
                "sortByMostDiscount": 0,
                "sortByAvailableProduct": 0,
                "amazingOffer": 1
            })
                .then(response => {
                    setSearchProduct(response?.data?.productCountResponses);
                    parentCallback(searchProduct);
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (error) {
            console.error('خطا در حذف مورد از سبد خرید:', error);
        }
    }, [parentCallback, searchProduct]);

    const AllProductType = useCallback(async () => {
        try {
            await apiService?.getAllProductType()
                .then(response => {
                    setProductType(response?.data);
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (error) {
            console.error('خطا در حذف مورد از سبد خرید:', error);
        }
    }, []);

    const AllTag = useCallback(async () => {
        try {
            await apiService?.getAllTag()
                .then(response => {
                    setTag(response.data);
                })
                .catch(error => {
                    console.error('خطا در ارسال داده‌ها:', error);
                });
        } catch (error) {
            console.error('خطا در حذف مورد از سبد خرید:', error);
        }
    }, []);

    useEffect(() => {
        const asyncFn = async () => {
            await ProductsList();
            await AllTag();
            await AllProductType();
        };
        asyncFn().then(r => r);
    }, [ProductsList, AllTag, AllProductType]);

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
    };

    return (
        <div className="col">
            <div className="sticky-top" style={{ top: '30px' }}>
                <div className="shadow-sm border rounded-3 my-2 mx-2 user-select-none">
                    <div className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                        <label className="form-check-label fw-bold" style={{ fontSize: '12px' }} htmlFor="AvailableGoods">فقط کالاهای موجود</label>
                        <input className="form-check-input" type="checkbox" id="AvailableGoods" />
                    </div>
                    <hr className="my-3 mx-3" />
                    <div>
                        <div className="mx-3 my-3 d-flex flex-column justify-content-center align-items-center">
                            <span className="w-100 fw-bold" style={{ fontSize: '12px' }}>محدوده قیمت:</span>
                            <input
                                type="range"
                                className="form-range my-2"
                                min="500000"
                                max="100000000"
                                value={value}
                                step="500000"
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    setValue(newValue);
                                }}
                                onClick={(e) => {
                                    const newValue = e.target.value;
                                    console.log(formatCurrency(newValue));
                                }}
                            />
                            <div className="fw-bold" style={{ fontSize: '14px' }}>{formatCurrency(value)}</div>
                        </div>
                    </div>
                    <hr className="my-3 mx-3" />
                    <div className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                        <label className="form-check-label fw-bold" style={{ fontSize: '12px' }} htmlFor="AmazingGoods">کالا های شگفت انگیز</label>
                        <input className="form-check-input" type="checkbox" id="AmazingGoods" />
                    </div>
                    <hr className="my-3 mx-3" />
                    <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-productType" aria-expanded="false" aria-controls="flush-productType">
                                    <span className="fw-bold" style={{ fontSize: '12px' }}>جستجو بر اساس نوع کالا</span>
                                </button>
                            </h2>
                            <div id="flush-productType" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    {
                                        productType.map((item, index) => (
                                            <div className="d-flex flex-row my-3" key={index}>
                                                <input type="radio" id={index} name="fav_language" value={index} />
                                                <label htmlFor={index} className="fw-bold ms-2" style={{ fontSize: '12px' }}>{item?.name}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item rounded-3">
                            <span style={{ fontSize: '12px' }} className="accordion-header">
                                <button style={{ fontSize: '12px' }} className="accordion-button accordion-flush collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-tag" aria-expanded="false" aria-controls="flush-tag">
                                    <span className="fw-bold" style={{ fontSize: '12px' }}>جستجو بر اساس برچسب</span>
                                </button>
                            </span>
                            <div style={{ fontSize: '12px' }} id="flush-tag" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <span className="fw-bold" style={{ fontSize: '12px' }}>جستجو بر اساس برچسب</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterItem;
