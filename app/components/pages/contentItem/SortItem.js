import React from "react";

const SortItem=()=>{
    return (
        <div className="d-flex flex-column flex-lg-row align-items-lg-center my-3 mx-3">
            <div className="align-items-lg-center">
                <span className="mx-2 fa fa-sort-amount-asc" style={{fontSize: '12px'}}/>
                <span className="mx-2 fw-bold" style={{fontSize: '12px'}}>مرتب سازی:</span>
            </div>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none pointer-event mx-2 text-secondary"
               style={{fontSize: '12px'}}>پرفروش
                ترین</a>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
               style={{fontSize: '12px'}}>مرتبط
                ترین</a>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
               style={{fontSize: '12px'}}>پربازدیدترین</a>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
               style={{fontSize: '12px'}}>شگفت انگیز</a>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
               style={{fontSize: '12px'}}>ارزان
                ترین</a>
            <a href="#"
               className="link-dark my-2 my-lg-0 rounded-3 p-2 bg-light link-opacity-50 text-decoration-none mx-2 text-secondary"
               style={{fontSize: '12px'}}>گران
                ترین</a>
        </div>
    )
}
export default SortItem