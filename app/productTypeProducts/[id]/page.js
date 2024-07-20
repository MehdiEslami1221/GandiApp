import ShowAllProductsCircularMenu from "@/app/components/pages/ShowAllProductsCircularMenu";

export const generateMetadata = () => {
    return {
        title: `فروشگاه - موبایل گاندی `,
        description: `موبایل گاندی فروشگاه آنلاین فروش موبایل`,
    };
};
export default function ProductTypeProductsPage() {
    return <ShowAllProductsCircularMenu />;
}