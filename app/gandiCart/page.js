import GandiCart from "@/app/components/GandiCart";

export const generateMetadata = () => {
    return {
        title: `سبد خرید - موبایل گاندی `,
        description: `وب سایت موبایل گاندی`,
    };
};

export default function GandiCartPage() {
    return <GandiCart />
}