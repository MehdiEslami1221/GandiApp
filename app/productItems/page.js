import ProductsList from "@/app/components/pages/ProductsList";
import React, {Suspense} from "react";
import FullPageLoader from "@/app/components/pages/contentItem/FullPageLoader";

export const generateMetadata = () => {
    return {
        title: `محصولات - موبایل گاندی `,
        description: `محصولات وب سایت موبایل گاندی`,
    };
};
export default function ProductItemsPage() {
    return(
        <Suspense fallback={<FullPageLoader />}>
            <ProductsList />
        </Suspense>
    )
}