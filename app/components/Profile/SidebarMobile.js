import React, {useState} from 'react';

import "./SideBarStyle.css"
import LogoGandiMobile from "@/public/assets/images/logo-gandi.png";

function SidebarMobile({setActiveComponent}) {
    const [active, setActive] = useState('personalInformation');


    const handleItemClick = (name) => {
        setActive(name);
    };


    return (
        <div className="sidebar">

            <div className="sidebar-menu d-flex flex-column">
                <a href="#" className={`menu-item ${active === 'personalInformation' ? 'active' : ''}`}
                   onClick={() => {
                       handleItemClick('personalInformation')
                       setActiveComponent('personalInformation')
                   }}>
                    <i className={`fa fa-user ${active === 'personalInformation' ? 'active-icon' : ''}`}></i>
                </a>
                <a href="#" className={`menu-item ${active === 'myAddresses' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myAddresses')
                    setActiveComponent('myAddresses')
                }}>
                    <i className={`fa fa-address-card ${active === 'myAddresses' ? 'active-icon' : ''}`}></i>
                </a>
                <a href="#" className={`menu-item ${active === 'myOrders' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myOrders')
                    setActiveComponent('myOrders')
                }}>
                    <i className={`fa fa-envelope ${active === 'myOrders' ? 'active-icon' : ''}`}></i>
                </a>
                <a href="#" className={`menu-item ${active === 'myViews' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myViews')
                    setActiveComponent('myViews')
                }}>
                    <i className={`fa fa-credit-card ${active === 'myViews' ? 'active-icon' : ''}`}></i>
                </a>

                <a href="#" className={`menu-item ${active === 'favoriteProducts' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('favoriteProducts')
                    setActiveComponent('favoriteProducts')
                }}>
                    <i className={`fa fa-heart ${active === 'favoriteProducts' ? 'active-icon' : ''}`}></i>
                </a>
            </div>
        </div>
    );
}

export default SidebarMobile;
