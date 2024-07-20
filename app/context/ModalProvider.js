'use client';

import React, {createContext, useContext, useState} from 'react';

// ایجاد یک Context برای مدیریت وضعیت مدال
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({children}) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [onConfirmDelete, setOnConfirmDelete] = useState(() => {});

    const showModal = (content, onConfirm) => {
        setModalContent(content);
        setOnConfirmDelete(() => onConfirm);
        setModalShow(true);
    };

    const hideModal = () => {
        setModalShow(false);
    };

    const confirmDelete = () => {
        onConfirmDelete();
        hideModal();
    };

    return (
        <ModalContext.Provider value={{showModal, hideModal}}>
            {children}
            <DeleteModal show={modalShow} onHide={hideModal} onConfirm={confirmDelete} content={modalContent}/>
        </ModalContext.Provider>
    );
};

// مدال دیالوگ حذف با محتوای داینامیک
const DeleteModal = ({show, onHide, onConfirm,title, content}) => {
    return (
        <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" style={{display: show ? 'block' : 'none'}}
             data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-title" style={{fontSize: '14px'}}>{title}</span>
                        <span className="btn-close" style={{fontSize: '14px'}} onClick={onHide}></span>
                    </div>
                    <div className="modal-body">
                        <span className="fw-bold" style={{fontSize: '16px'}}>{content}</span>
                    </div>
                    <div className="modal-footer">
                        <button style={{fontSize: '14px'}} type="button" className="btn btn-secondary" onClick={onHide}>
                            لغو
                        </button>
                        <button style={{fontSize: '14px'}} type="button" className="btn btn-danger" onClick={onConfirm}>
                            تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};