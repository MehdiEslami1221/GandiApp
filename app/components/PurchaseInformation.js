import React from "react";
import iconCard from '@/public/assets/icons/card.svg';
import iconMedal from '@/public/assets/icons/medal-star.svg';
import iconShopping from '@/public/assets/icons/shopping-cart.svg';
import iconCalendar from '@/public/assets/icons/calendar.svg';
import iconTruck from '@/public/assets/icons/truck-fast.svg';
import iconReceipt from '@/public/assets/icons/receipt-text.svg';
import Image from "next/image";


const PurchaseInformation = () => {
    return (
        <div className="my-5 ">
            <div className="rounded-4 shadow mx-lg-5">
                <div className="text-center">
                    <div className="row row-cols-2 row-cols-sm-2 row-cols-md-4 row-cols-lg-6">

                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold"
                                      style={{fontSize: '0.8rem'}}>خرید اقساطی</span>
                                <span className="row fw-normal" style={{fontSize: '0.8rem'}}>خرید در چند قسط</span>
                                <Image className="mt-2" src={iconCard} alt="Diagram"
                                       width={25}
                                       height={25}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold"
                                      style={{fontSize: '0.8rem'}}>تضمین اصالت کالا</span>
                                <span className="row" style={{fontSize: '0.8rem'}}>ازبرترین بدندها</span>
                                <Image className="mt-2" src={iconMedal} alt="Diagram"
                                       width={25}
                                       height={25}/>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold"
                                      style={{fontSize: '0.8rem'}}>خرید بی واسطه</span>
                                <span className="row" style={{fontSize: '0.8rem'}}>خرید آسان و سریع کالا</span>
                                <Image className="mt-2" src={iconShopping} alt="Diagram"
                                       width={25}
                                       height={25}/>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold" style={{fontSize: '0.8rem'}}>7روز ضمانت بازگشت</span>
                                <span className="row" style={{fontSize: '0.8rem'}}>در صورت عدم رضایت</span>
                                <Image className="mt-2" src={iconCalendar} alt="Diagram"
                                       width={25}
                                       height={25}/>
                            </div>
                        </div>

                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold" style={{fontSize: '0.8rem'}}>ارسال سریع و رایگان</span>
                                <span className="row" style={{fontSize: '0.8rem'}}>ارسال به سراسر کشور</span>
                                <Image className="mt-2" src={iconTruck} alt="Diagram"
                                       width={25}
                                       height={25}/>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex align-items-center flex-column p-4">
                                <span className="text-primary row fw-bold"
                                      style={{fontSize: '0.8rem'}}>راهنمای خرید</span>
                                <span className="row" style={{fontSize: '0.8rem'}}>اطلاعات کامل ازمحصول</span>
                                <Image className="mt-2" src={iconReceipt} alt="Diagram"
                                       width={25}
                                       height={25}/>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default PurchaseInformation;