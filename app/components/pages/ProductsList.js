'use client';

import React, {useEffect, useState} from "react";
import {useRouter, useSearchParams} from 'next/navigation';
import BreadCrumb from "../../components/BreadCrumb";
import Item from "./contentItem/Item";
import apiService from "../ApiService/ApiService";
import "./ProductsList.css";
import {Loader} from "@/app/loading/Loader";
import {useLoading} from "@/app/context/LoadingContext";


export default function ProductsList() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const {isLoading, setLoading} = useLoading();

    const router = useRouter();
    const query = useSearchParams();

    const [filters, setFilters] = useState({
        ato: query.get('ato') ? query.get('ato').split(',').map(Number) : [],
        amount: Number(query.get('amount')) || 0,
        ptype: Number(query.get('ptype')) || 0,
        tag: Number(query.get('tag')) || 0,
        sortByPrice: Number(query.get('sortByPrice')) || 0,
        sortByNewerProduct: Number(query.get('sortByNewerProduct')) || 0,
        sortByMostDiscount: Number(query.get('sortByMostDiscount')) || 0,
        sortByAvailableProduct: Number(query.get('sortByAvailableProduct')) || 0,
        amazingOffer: Number(query.get('amazingOffer')) || 0,
        page: Number(query.get('page')) || 0,
    });

    console.log("filters=" + filters.ptype)


    const sendParamsToWebService = () => {
        getAttributeOption(filters?.ptype)
        applyFilters(filters)
    };


    const applyFilters = async (objects) => {
        setLoading(true);
        apiService?.searchProductsList(objects)
            .then((response) => {
                setItems(response.data?.productCountResponses);
                setPage(page + 1);
                setLoading(false); // غیرفعال کردن لودینگ پس از بارگذاری داده‌ها
            })
            .catch((error) => {
                setLoading(false); // غیرفعال کردن لودینگ در صورت خطا
            });
    };


    useEffect(() => {
        // const url = buildUrl();
        // router.push(url);
        sendParamsToWebService()
    }, [filters, router]);


    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);

    const [value, setValue] = useState(500000);
    const formatCurrency = (value) => {
        // تبدیل عدد به رشته و جداسازی هر سه رقم با کاما
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
    };


    const [attributes, setAttributes] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const getAttributeOption = async (productType) => {
        setLoading(true);
        try {
            const response = await apiService?.getAttributeOption(productType)
            const sortedAttributes = response.data?.propertylist.sort((a, b) => a.item.sort - b.item.sort);
            setAttributes(sortedAttributes);
            setLoading(false);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };


    // تابعی برای کلیک روی دکمه
    const handleButtonClick = async (newFilters) => {
        const updatedFilters = {...filters, ...newFilters};
        setFilters(updatedFilters);
    };


    const handleClick = (id, attributeOption) => {
        if (selectedItems.some(item => item.id === id)) {
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        } else {
            setSelectedItems([...selectedItems, {id, attributeOption}]);
        }
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
        } else {
            const ids = selectedItems?.map(item => item?.id) || 0;
            handleButtonClick({
                ato: ids,
            })
        }
    }, [selectedItems])
    const isSelected = (id) => {
        return selectedItems.some(item => item.id === id);


    };

    return (
        <div className="col-12 col-lg-12 d-flex flex-column">
            {isLoading && <Loader/>}

            <BreadCrumb id={filters.ptype || 1}/>
            <div>
            </div>

            <div className="d-flex flex-column flex-lg-row align-items-lg-center my-3 mx-3">
                <div className="align-items-lg-center">
                    <span className="mx-2 fa fa-sort-amount-asc" style={{fontSize: '12px'}}/>
                    <span className="mx-2 fw-bold" style={{fontSize: '12px'}}>مرتب سازی:</span>
                </div>
                <a
                    className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none pointer-event mx-2 text-secondary"
                    style={{fontSize: '12px', cursor: 'pointer'}}
                    onClick={() => {
                        handleButtonClick({
                            sortByPrice: 2,
                            sortByNewerProduct: 0,
                            sortByMostDiscount: 0,
                        })
                    }}>بیشترین
                    قیمت</a>
                <a
                    className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                    style={{fontSize: '12px', cursor: 'pointer'}}
                    onClick={() => {
                        handleButtonClick({
                            sortByPrice: 1,
                            sortByNewerProduct: 0,
                            sortByMostDiscount: 0,
                        })
                    }}>کمترین قیمت</a>
                <a
                    className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                    style={{fontSize: '12px', cursor: 'pointer'}}
                    onClick={() => {
                        handleButtonClick({
                            sortByPrice: 0,
                            sortByNewerProduct: 1,
                            sortByMostDiscount: 0,
                        })
                    }}>جدیدترین</a>
                <a
                    className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
                    style={{fontSize: '12px', cursor: 'pointer'}}
                    onClick={() => {
                        handleButtonClick({
                            sortByPrice: 0,
                            sortByNewerProduct: 0,
                            sortByMostDiscount: 1,
                        })
                    }}>بیشترین تخفیف</a>

            </div>


            <div className="mx-3 mx-lg-0">
                <div className="col-12 d-flex flex-column d-lg-none" style={{zIndex: '1'}}>

                    <div className="shadow-sm border rounded-3 my-2 mx-2 user-select-none">


                        {
                            selectedItems.length > 0 && (
                                <div>
                                    <div className="d-flex flex-column mx-3 my-3">
                                        <span className="fw-bold" style={{fontSize: '12px'}}>فیلتر‌های اعمال شده:</span>
                                        <span className="d-flex">
                          <div className="col-auto">
                                        {selectedItems.map(item => (
                                            <div
                                                onClick={() => {
                                                    handleClick(item.id, item.attributeOption)
                                                }}
                                                key={item.id}
                                                className="d-flex py-2 px-2 col align-items-center w-auto my-2 rounded-1 px-2 py-1"
                                                style={{
                                                    fontSize: '10px',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#11296c',
                                                    color: '#fff'
                                                }}>
                                        <span style={{fontSize: '10px'}}
                                              className="col">{item?.filterName ? item.filterName : item?.attributeOption}</span>
                                                <span
                                                    className="fa fa-close mx-1" style={{fontSize: '8px'}}/>
                                            </div>

                                        ))}
                          </div>
                                </span>
                                    </div>

                                    <hr className="my-3 mx-3"/>

                                </div>

                            )
                        }

                        <div
                            className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                            <label className="form-check-label fw-bold" style={{fontSize: '12px'}}
                                   htmlFor="AvailableGoods">فقط کالاهای موجود</label>
                            <input className="form-check-input" type="checkbox"
                                   id="AvailableGoods"
                                   onClick={(e) => {
                                       const newValue = e.target?.checked ? 1 : 0;
                                       handleButtonClick({
                                           sortByPrice: 0,
                                           sortByNewerProduct: 0,
                                           sortByMostDiscount: 0,
                                           sortByAvailableProduct: newValue,
                                       })
                                   }}/>
                        </div>

                        <hr className="my-3 mx-3"/>


                        <div>
                            <div
                                className="mx-3 my-3 d-flex flex-column justify-content-center align-items-center">
                                                <span className="w-100 fw-bold"
                                                      style={{fontSize: '12px'}}>محدوده قیمت:</span>
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
                                        handleButtonClick({amount: newValue})
                                    }}
                                />
                                <div className="fw-bold"
                                     style={{fontSize: '14px'}}>{formatCurrency(value)}</div>
                            </div>
                        </div>

                        <hr className="my-3 mx-3"/>

                        <div
                            className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                            <label className="form-check-label fw-bold" style={{fontSize: '12px'}}
                                   htmlFor="AmazingGoods">کالا های شگفت
                                انگیز</label>
                            <input className="form-check-input" type="checkbox"
                                // checked={filters.amazingOffer}
                                   id="AmazingGoods" onClick={(e) => {
                                const newValue = e.target?.checked ? 1 : 0;
                                handleButtonClick({
                                    sortByPrice: 0,
                                    sortByNewerProduct: 0,
                                    sortByMostDiscount: 0,
                                    amazingOffer: newValue
                                })
                            }}/>
                        </div>

                        <hr className="my-3 mx-3"/>


                        <div>
                            <div className="accordion" id="attributeAccordion">
                                {attributes.map(attribute => (
                                    <div className="accordion-item" key={attribute.item.id}>
                                        <h2 className="accordion-header" id={`heading${attribute.item.id}`}>
                                            <button className="accordion-button" type="button"
                                                    data-bs-toggle="collapse"
                                                    style={{backgroundColor: '#ffffff'}}
                                                    data-bs-target={`#collapse${attribute.item.id}`}
                                                    aria-expanded="true"
                                                    aria-controls={`collapse${attribute.item.id}`}>
                                                    <span className="fw-bold"
                                                          style={{fontSize: '12px'}}>{attribute.item.attributeType}</span>
                                            </button>
                                        </h2>
                                        <div id={`collapse${attribute.item.id}`}
                                             className="accordion-collapse collapse"
                                             aria-labelledby={`heading${attribute.item.id}`}
                                             data-bs-parent="#attributeAccordion">
                                            <div>
                                                <div className="container text-center">
                                                    <div className="row row-cols-auto">

                                                        {attribute.list.map(option => (
                                                            <div className="col" key={option.id}>
                                                                <div
                                                                    className={`my-2 px-2 py-1 rounded-1 ${isSelected(option.id) ? 'selected-item' : 'unselected-item'}`}
                                                                    style={{cursor: 'pointer'}}
                                                                    onClick={() => {
                                                                        handleClick(option.id, option?.filterName ? option.filterName : option?.attributeOption)
                                                                    }}>
                                                                   <span style={{fontSize: '12px'}}
                                                                         className="fw-bold">{option?.filterName ? option.filterName : option?.attributeOption}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>


                </div>

            </div>

            <div className="d-flex mx-3">

                <div className="d-none d-lg-flex flex-lg-column col-lg-2" style={{zIndex: '1'}}>

                    <div className="sticky-top" style={{top: '30px'}}>

                        <div className="shadow-sm border rounded-3 my-2 mx-2 user-select-none">


                            {
                                selectedItems.length > 0 && (
                                    <div>
                                        <div className="d-flex flex-column mx-3 my-3">
                                            <span className="fw-bold" style={{fontSize: '12px'}}>فیلتر‌های اعمال شده:</span>
                                            <span className="d-flex">
                          <div className="col-auto">
                                        {selectedItems.map(item => (


                                            <div
                                                onClick={() => {
                                                    handleClick(item.id, item.attributeOption)
                                                }}
                                                key={item.id}
                                                className="d-flex py-2 px-2 col align-items-center w-auto my-2 rounded-1 px-2 py-1"
                                                style={{
                                                    fontSize: '10px',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#11296c',
                                                    color: '#fff'
                                                }}>

                                                <span style={{fontSize: '10px'}}
                                                      className="col">{item?.attributeOption}</span>
                                                <span className="fa fa-close mx-1" style={{fontSize: '8px'}}/>
                                            </div>

                                        ))}
                          </div>
                                </span>
                                        </div>

                                        <hr className="my-3 mx-3"/>

                                    </div>

                                )
                            }

                            <div
                                className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                                <label className="form-check-label fw-bold" style={{fontSize: '12px'}}
                                       htmlFor="AvailableGoods">فقط کالاهای موجود</label>
                                <input className="form-check-input" type="checkbox"
                                    // checked={!filters.sortByAvailableProduct}
                                       id="AvailableGoods"
                                       onClick={(e) => {
                                           const newValue = e.target?.checked ? 1 : 0;
                                           handleButtonClick({
                                               sortByPrice: 0,
                                               sortByNewerProduct: 0,
                                               sortByMostDiscount: 0,
                                               sortByAvailableProduct: newValue,
                                           })
                                       }}/>
                            </div>

                            <hr className="my-3 mx-3"/>


                            <div>
                                <div
                                    className="mx-3 my-3 d-flex flex-column justify-content-center align-items-center">
                                                <span className="w-100 fw-bold"
                                                      style={{fontSize: '12px'}}>محدوده قیمت:</span>
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
                                            handleButtonClick({amount: newValue})
                                        }}
                                    />
                                    <div className="fw-bold"
                                         style={{fontSize: '14px'}}>{formatCurrency(value)}</div>
                                </div>
                            </div>

                            <hr className="my-3 mx-3"/>

                            <div
                                className="form-check form-switch p-0 mx-3 my-3 d-flex justify-content-between align-items-center">
                                <label className="form-check-label fw-bold" style={{fontSize: '12px'}}
                                       htmlFor="AmazingGoods">کالا های شگفت
                                    انگیز</label>
                                <input className="form-check-input" type="checkbox"
                                    // checked={!!filters.amazingOffer}
                                       id="AmazingGoods" onClick={(e) => {

                                    const newValue = e.target?.checked ? 1 : 0;
                                    handleButtonClick({
                                        sortByPrice: 0,
                                        sortByNewerProduct: 0,
                                        sortByMostDiscount: 0,
                                        amazingOffer: newValue
                                    })
                                }}/>
                            </div>

                            <hr className="my-3 mx-3"/>


                            <div>
                                <div className="accordion" id="attributeAccordion">
                                    {attributes.map(attribute => (
                                        <div className="accordion-item" key={attribute.item.id}>
                                            <h2 className="accordion-header" id={`heading${attribute.item.id}`}>
                                                <button className="accordion-button" type="button"
                                                        data-bs-toggle="collapse"
                                                        style={{backgroundColor: '#ffffff'}}
                                                        data-bs-target={`#collapse${attribute.item.id}`}
                                                        aria-expanded="true"
                                                        aria-controls={`collapse${attribute.item.id}`}>
                                                    <span className="fw-bold"
                                                          style={{fontSize: '12px'}}>{attribute.item.attributeType}</span>
                                                </button>
                                            </h2>
                                            <div id={`collapse${attribute.item.id}`}
                                                 className="accordion-collapse collapse"
                                                 aria-labelledby={`heading${attribute.item.id}`}
                                                 data-bs-parent="#attributeAccordion">
                                                <div>
                                                    <div className="container text-center">
                                                        <div className="row row-cols-auto">

                                                            {attribute.list.map(option => (
                                                                <div className="col" key={option.id}>
                                                                    <div
                                                                        key={option.id}
                                                                        className={`my-2 px-2 py-1 rounded-1 ${isSelected(option.id) ? 'selected-item' : 'unselected-item'}`}
                                                                        style={{cursor: 'pointer'}}
                                                                        onClick={() => handleClick(option?.id, option?.filterName ? option.filterName : option?.attributeOption)}>
                                                                        <span style={{fontSize: '12px'}}
                                                                              className="fw-bold">{option?.filterName ? option.filterName : option?.attributeOption}</span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>


                <div className="col-12 col-lg-10">
                    <div className="py-2">

                        <div className="container overflow-hidden">


                            <div>

                                {
                                    items?.length > 0 ? (
                                        <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                                            {items?.map((item, index) => (
                                                <div key={index}>
                                                    <Item item={item}/>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            className="d-flex flex-column justify-content-center align-items-center">
                                            <span>محصولی یافت نشد</span>
                                        </div>
                                    )
                                }


                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}