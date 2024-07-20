import ShowAllProducts from "@/app/components/pages/ShowAllProducts";

export const generateMetadata = () => {
    return {
        title: `فروشگاه - موبایل گاندی `,
        description: `فروشگاه موبایل گاندی`,
    };
};
export default function AllProductPage() {
    return <ShowAllProducts />
}