import React, {useState} from 'react';

import "./SideBarStyle.css"

function Sidebar({setActiveComponent}) {
    const [active, setActive] = useState('personalInformation');


    const handleItemClick = (name) => {
        setActive(name);
    };


    return (
        <div className="sidebar">

            <div className="sidebar-menu">
                <a href="#" className={`menu-item ${active === 'personalInformation' ? 'active' : ''}`}
                   onClick={() => {
                       handleItemClick('personalInformation')
                       setActiveComponent('personalInformation')
                   }}>
                    <i className={`fa fa-user ${active === 'personalInformation' ? 'active-icon' : ''}`}></i>
                    <span className="text">مشخصات فردی</span>
                </a>
                <a href="#" className={`menu-item ${active === 'myAddresses' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myAddresses')
                    setActiveComponent('myAddresses')
                }}>
                    <i className={`fa fa-address-card ${active === 'myAddresses' ? 'active-icon' : ''}`}></i>
                    <span className="text">آدرس های من</span>
                </a>
                <a href="#" className={`menu-item ${active === 'myOrders' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myOrders')
                    setActiveComponent('myOrders')
                }}>
                    <i className={`fa fa-envelope ${active === 'myOrders' ? 'active-icon' : ''}`}></i>
                    <span className="text">سفارش های من</span>
                </a>
                <a href="#" className={`menu-item ${active === 'myViews' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('myViews')
                    setActiveComponent('myViews')
                }}>
                    <i className={`fa fa-credit-card ${active === 'myViews' ? 'active-icon' : ''}`}></i>
                    <span className="text">اطلاعات حساب بانکی</span>
                </a>

                <a href="#" className={`menu-item ${active === 'favoriteProducts' ? 'active' : ''}`} onClick={() => {
                    handleItemClick('favoriteProducts')
                    setActiveComponent('favoriteProducts')
                }}>
                    <i className={`fa fa-heart ${active === 'favoriteProducts' ? 'active-icon' : ''}`}></i>
                    <span className="text">کالا های مورد علاقه</span>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
