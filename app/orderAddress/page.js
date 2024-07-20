import OrderAddress from "@/app/components/OrderAddress";

export const generateMetadata = () => {
    return {
        title: `ثبت آدرس سفارش - موبایل گاندی `,
        description: `وب سایت موبایل گاندی`,
    };
};
export default function OrderAddressPage() {
    return <OrderAddress />;
}