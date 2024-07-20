'use client';

import "./SideBarStyle.css"
import React, {useState} from "react";
import Sidebar from "./Sidebar";
import PersonalInformationComponent from "./PersonalInformationComponent";
import MyAddressesComponent from "./MyAddressesComponent";
import MyOrdersComponent from "./MyOrdersComponent";
import MyCardBank from "./MyCardBank";
import FavoriteProductsComponent from "./FavoriteProductsComponent";
import SidebarMobile from "./SidebarMobile";

const SideBarManu = () => {
    const [activeComponent, setActiveComponent] = useState('personalInformation');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'personalInformation':
                return <PersonalInformationComponent/>;
            case 'myAddresses':
                return <MyAddressesComponent/>;
            case 'myOrders':
                return <MyOrdersComponent/>;
            case 'myViews':
                return <MyCardBank/>;
            case 'favoriteProducts':
                return <FavoriteProductsComponent/>;
            default:
                return <PersonalInformationComponent/>;
        }
    };

    return (
        <div className="d-flex flex-column bg-light">
            <hr className="m-0 p-0 opacity-25"/>
            <div className="app-container align-items-start">
                <div className="sticky-top d-flex d-lg-none" style={{top: '30px', zIndex: '1'}}>
                    <SidebarMobile setActiveComponent={setActiveComponent}/>
                </div>
                <div className="sticky-top d-none d-lg-flex" style={{top: '30px', zIndex: '1'}}>
                    <Sidebar setActiveComponent={setActiveComponent}/>
                </div>
                <div className="container h-100">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );

}

export default SideBarManu
