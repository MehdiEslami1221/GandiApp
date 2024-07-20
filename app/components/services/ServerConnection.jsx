import axios from "axios";



export const SERVER_URL = "https://www.gandimobile.ir:8443/api/";


export const setLogin = (mobile) => {
    const url = `${SERVER_URL}auth/signin`;
    return axios.post(url, {
        "mobile": mobile,
    }, {withCredentials: true})
}


export const setAuth = (mobile, otp) => {
    const url = `${SERVER_URL}auth/signup`;
    return axios.post(url, {
        "mobile": mobile,
        "otp": otp,
    }, {withCredentials: true})
}


export const getCategoryMenu = () => {
    const url = `${SERVER_URL}subcategory/getAllMenu`;
    return axios.post(url,
            {})
}


export const deleteAllCart = () => {
    const url = `${SERVER_URL}factor/delete`;
    return axios.delete(url, {
        withCredentials: true
    })
}


export const deleteCart = (id) => {
    const url = `${SERVER_URL}cart/delete/` + id;
    return axios.post(url, null, {
        withCredentials: true
    })
}

// end basket Api


export const getWebInfo = () => {
    const url = `${SERVER_URL}webInfo/getById/1`;
    return axios.post(url)
}


export const getAllSlider = () => {
    const url = `${SERVER_URL}slider/getAll`;
    return axios.post(url)
}

export const getAllProduct = () => {
    const url = `${SERVER_URL}pcount/getAll`;
    return axios.post(url)
}

export const getAmazingOffer = (page = 0) => {
    const url = `${SERVER_URL}pcount/findAmazingOffer/${page}`;
    return axios.post(url)
}
export const getProductBox = () => {
    const url = `${SERVER_URL}pbox/getAll`;
    return axios.post(url)
}

export const getImageProduct = (productId) => {
    const url = `${SERVER_URL}productImage/getByProductId/${productId}`;
    return axios.get(url)
}


export const getAllCategory = () => {
    const url = `${SERVER_URL}subcategory/getmain`;
    return axios.post(url, {
        "isMain": 1,
        "isActive": 1
    })
}


export const addAddress = (city, province, area, postalCode, address, no, unit) => {
    const url = `${SERVER_URL}address/add`;
    return axios.post(url, {
        "city": city,
        "province": province,
        "area": area,
        "postalCode": postalCode,
        "address": address,
        "no": no,
        "unit": unit
    }, {
        withCredentials: true

    })
}

export const SearchByProductName = (productName) => {
    const url = `${SERVER_URL}pcount/getProductByWords`;
    return axios.post(url, {
        "name": productName
    })
}


export const getAllMainWare = () => {
    const url = `${SERVER_URL}mainWare/main`;
    return axios.post(url)
}

export const getCoverByPosition = (position) => {
    const url = `${SERVER_URL}cover/getByPosition/${position}`;
    return axios.post(url)
}


export const getByProductType = (productTypeId, pageNumber = 0) => {
    const url = `${SERVER_URL}pcount/getByProductType/${productTypeId}/${pageNumber}`;
    return axios.post(url)
}

export const getNewProduct = () => {
    const url = `${SERVER_URL}pcount/getNewProduct/0`;
    return axios.post(url)
}

export const getProductConfig = (productId) => {
    const url = `${SERVER_URL}pconfig/getByProductid/${productId}`;
    return axios.post(url)
}


export const getProductSuggestion = () => {
    const url = `${SERVER_URL}psug/getAll/0`;
    return axios.post(url)
}


export const getMainArticle = () => {
    const url = `${SERVER_URL}article/mainArticle/`;
    return axios.post(url)
}

