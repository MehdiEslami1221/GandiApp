'use client';

import { createContext, useCallback, useEffect, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [valueBasket, setValueBasket] = useState(0);
    const incrementBasket = useCallback((item) => {
        setValueBasket(item);
    }, []);

    // Ensure local storage is accessed only in the browser environment
    const isBrowser = typeof window !== 'undefined';

    const [isLogin, setIsLogin] = useState(() => {
        if (isBrowser) {
            const storedValue = localStorage.getItem('isLogin');
            return storedValue !== null ? JSON.parse(storedValue) : false;
        }
        return false;
    });

    useEffect(() => {
        if (isBrowser) {
            localStorage.setItem('isLogin', JSON.stringify(isLogin));
        }
    }, [isLogin, isBrowser]);

    const [cartItems, setCartItems] = useState(() => {
        if (isBrowser) {
            const storedCartItems = localStorage.getItem('products');
            return storedCartItems ? JSON.parse(storedCartItems) : [];
        }
        return [];
    });

    useEffect(() => {
        if (isBrowser && cartItems !== undefined) {
            localStorage.setItem('products', JSON.stringify(cartItems));
        }
    }, [cartItems, isBrowser]);

    const addToCart = (productCountId, count, warranty) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(item => item.productCountId === productCountId);
            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    count: newItems[existingItemIndex].count + count,
                    warranty: warranty,
                };
                return newItems;
            }
            return [...prevItems, { productCountId, count, warranty }];
        });
    };

    const findCountById = (id) => {
        const item = cartItems.find(item => item.productCountId === id);
        return item ? item.count : 0;
    };

    const removeFromCart = (itemId) => {
        const quantity = findCountById(itemId);
        if (quantity === 1) {
            removeItemIfLast(itemId);
        } else {
            setCartItems((prevItems) => prevItems.map((item) =>
                item.productCountId === itemId ? { ...item, count: Math.max(item.count - 1, 0) } : item
            ));
        }
    };

    const removeItemIfLast = (itemId) => {
        const updatedProducts = cartItems.filter(product => product.productCountId !== itemId);
        setCartItems(updatedProducts);
        if (updatedProducts.length === 0) {
            localStorage.removeItem('products');
        }
    };

    const deleteFromCart = (id) => {
        const updatedItems = cartItems.filter(item => item.productCountId !== id);
        setCartItems(updatedItems);
    };

    const removeItemFromCart = (itemId) => {
        const newList = cartItems.filter(item => item.productCountId !== itemId);
        setCartItems(newList);
        if (newList.length === 0) {
            localStorage.removeItem('products');
        }
    };

    const removeAllProducts = () => {
        localStorage.removeItem('products');
        setCartItems([]);
    };

    const contextValue = {
        isLogin, setIsLogin,
        valueBasket,
        incrementBasket,
        cartItems,
        addToCart,
        removeFromCart,
        removeItemFromCart,
        findCountById,
        removeAllProducts
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
