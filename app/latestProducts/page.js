import ShowAllLatestProducts from "@/app/components/pages/ShowAllLatestProducts";

export const generateMetadata = () => {
    return {
        title: `آخرین محصولات دیده شده - موبایل گاندی `,
        description: `آخرین محصولات دیده شده در وب سایت موبایل گاندی`,
    };
};
export default function LatestProductPage() {
    return <ShowAllLatestProducts />;
}