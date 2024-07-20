// ApiService.js
import axios from 'axios';

class ApiService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://www.gandimobile.ir:8443/api/',
            withCredentials: true,
        });

        this.axiosInstance.interceptors.response.use(response => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            return response;
        }, error => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            if (error.response && error.response.status === 408) {
                this.refreshToken();
            }
            return Promise.reject(error);
        });
    }


    refreshToken() {
        return this.axiosInstance.post('auth/refreshtoken')
            .then(res => {
                // ToastSuccess('ok 408')
            })
            .catch(error => {
                if (error?.response?.data?.statusCode === 20) {
                    window.localStorage.clear()
                    window.location.replace('/');
                }
            });
    }

    updateCart(idProductCount, count, cartId, warranty) {
        return this.axiosInstance.post('cart/editCart', {
            "list": [
                {
                    "productCountId": idProductCount,
                    "count": count,
                    "cartId": cartId,
                    "warranty": warranty,
                }
            ]
        });
    }

    deleteCart(id) {
        return this.axiosInstance.post('cart/delete/' + id);
    }


    getAllShipment() {
        return this.axiosInstance.post('shipment/getAll', {});
    }

    getPayRequest() {
        return this.axiosInstance.post('payment/payRequest', {});
    }

    getAllAddress() {
        return this.axiosInstance.post('address/getAddresses', {});
    }

    calculateCart() {
        const data = localStorage.getItem("products")
        const result = JSON.parse(data) ? JSON.parse(data) : []
        return this.axiosInstance.post('cart/calculate', {
            "list": result.filter((item) => item.count > 0)
        });
    }


    addCarts() {
        const data = localStorage.getItem("products")
        const result = JSON.parse(data) ? JSON.parse(data) : []
        return this.axiosInstance.post('cart/add', {
            "list": result
        });
    }


    getWarranty(id) {
        return this.axiosInstance.post('warranty/getByProductId/' + id);
    }


    getAllCart(productData) {
        return this.axiosInstance.post('cart/getAll', productData);
    }

    SearchProduct(productType, page) {
        return this.axiosInstance.post('pcount/searchProduct/' + page, productType);
    }


    GetAllFavorites() {
        return this.axiosInstance.post('fp/findAll');
    }

    addByIdFavorite(dataObject) {
        return this.axiosInstance.post('fp/add', dataObject);
    }

    getByIdFavorite(id) {
        return this.axiosInstance.post(`fp/getById/${id}`);
    }

    DeleteByIdFavorites(id) {
        return this.axiosInstance.delete(`fp/deleteById/${id}`);
    }


    getTagAmountBox() {
        return this.axiosInstance.post('TagAmountBox/getAll');
    }


    getAllProvince() {
        return this.axiosInstance.post('province/all');
    }


    getFooterMenu() {
        return this.axiosInstance.get('footerMenu/getAll');
    }

    getFooterSubMenu() {
        return this.axiosInstance.post('footerSubMenu/getAll');
    }


    getArticle(id) {
        return this.axiosInstance.post('article/article/' + id);
    }

    getBreadCrumb(id) {
        return this.axiosInstance.post(`ptype/getAllType/${id}`);
    }


    getByIdProduct(id) {
        return this.axiosInstance.post(`pcount/getByProductId/${id}`);
    }


    deleteAddress(id) {
        return this.axiosInstance.delete(`address/delete/${id}`);
    }

    addAddress(city, province, area, postalCode, address, no, unit) {
        return this.axiosInstance.post("address/add", {
            "city": city,
            "province": province,
            "area": area,
            "postalCode": postalCode,
            "address": address,
            "no": no,
            "unit": unit
        });
    }


    addProfile(name, family, nationalCode, mobile) {
        return this.axiosInstance.post("auth/fillUserInfo", {
            "name": name,
            "family": family,
            "nationalCode": nationalCode,
            "mobile": mobile
        });
    }

    getUserInfo() {
        return this.axiosInstance.post("auth/getUserInfo");
    }


    getCoverByPosition(position) {
        return this.axiosInstance.post(`cover/getByPosition/${position}`);
    }

    searchByProductName(productName) {
        return this.axiosInstance.post('pcount/getProductByWords', {
            "name": productName
        });
    }

    getArticleByTitle(name) {
        return this.axiosInstance.post('article/getArticleByTitle', {
            "name": name
        });
    }


    bankCard(dataObject) {
        return this.axiosInstance.post('bankCard/add', dataObject);
    }

    deleteBankCard(id) {
        return this.axiosInstance.delete('bankCard/deleteById/' + id);
    }

    getBankCard() {
        return this.axiosInstance.post('bankCard/getAll');
    }

    getCity(provinceId) {
        return this.axiosInstance.post('city/' + provinceId + '/');
    }

    updateFactor(factorData) {
        return this.axiosInstance.put('factor/update', factorData);
    }

    cancelMyFactor(id) {
        return this.axiosInstance.put('factor/cancelMyFactor/' + id);
    }


    getAllMyWares() {
        return this.axiosInstance.post('cart/getAllMyWares');
    }

    getFooterSubMenuByName(name) {
        return this.axiosInstance.post('footerSubMenu/getFooterSubMenuByName', {name: name});
    }

    searchProductsList(params) {
        return this.axiosInstance.get('pcount/searchProduct', {     params: {
                ato: params?.ato.toString(),
                amount: params?.amount,
                ptype: params?.ptype,
                Tag: 0,
                sortByPrice: params?.sortByPrice,
                sortByNewerProduct: params?.sortByNewerProduct,
                sortByMostDiscount: params?.sortByMostDiscount,
                sortByAvailableProduct: params?.sortByAvailableProduct,
                amazingOffer: params?.amazingOffer,
                page: params?.page
            } });
    }

    getAllProductType() {
        return this.axiosInstance.post('ptype/getAll');
    }

    getAttributeOption(productType) {
        return this.axiosInstance.post('attributeOption/findAttributeOptions/' + productType);
    }

}


// ایجاد یک instance از کلاس ApiService و export کردن آن
const apiService = new ApiService();
export default apiService;