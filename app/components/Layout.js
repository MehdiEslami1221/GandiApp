import SwiperSlider from "@/app/components/SwiperSlider";
import PurchaseInformation from "@/app/components/PurchaseInformation";
import CircularMenu from "@/app/components/CircularMenu";
import SwiperProduct from "@/app/components/SwiperProduct";
import ColumnMenu from "@/app/components/ColumnMenu";
import LatestProducts from "@/app/components/LatestProducts";
import GroupMenu from "@/app/components/GroupMenu";
import AdvertisingSection from "@/app/components/AdvertisingSection";
import ProductOffer from "@/app/components/ProductOffer";
import OffersRow from "@/app/components/OffersRow";
import FeatureFilter from "@/app/components/FeatureFilter";
import NewsArticles from "@/app/components/NewsArticles";


const
    Layout = () => {
        return (

            <div className="container-fluid m-0 p-0">
                <SwiperSlider/>
                <div className="container">
                    <PurchaseInformation/>
                    <CircularMenu/>
                    <SwiperProduct/>
                    <ColumnMenu/>
                    <LatestProducts />
                    <GroupMenu />
                    <AdvertisingSection />
                    <ProductOffer />
                    <OffersRow />
                    <FeatureFilter />
                    <NewsArticles />
                </div>
            </div>
        )
    };

export default Layout;