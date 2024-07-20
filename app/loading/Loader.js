import {useLoading} from "../context/LoadingContext";
import '../Loader.css'
import LogoGandiMobile from "@/public/assets/images/logo-gandi.png";
import React from "react";
import Image from "next/image";

export const Loader = () => {
    const {isLoading} = useLoading();

    return isLoading ? (
        <div className="loader-container">
            <div
                className="d-flex flex-row justify-content-center align-items-center bg-light py-5 shadow rounded-3"
                style={{width: '300px'}}>
                <div>
                    <Image src={LogoGandiMobile} width={0} height={0}
                           style={{width:'auto',height:'50px'}}
                           sizes="100vm"
                         className="d-inline-block align-top me-4" alt=""/>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="loader"/>
                    <span className="text-dark mt-3 fw-bold"
                          style={{fontSize: '14px'}}>کمی صبر کنید...</span>
                </div>

            </div>
        </div>
    ) : null;
};
