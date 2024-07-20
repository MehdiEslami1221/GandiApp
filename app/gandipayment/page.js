import GandiPayment from "@/app/components/GandiPayment";
import {Suspense} from "react";

export const generateMetadata = () => {
    return {
        title: `پرداخت - موبایل گاندی `,
        description: `وب سایت موبایل گاندی`,
    };
};
export default function GandiPaymentPage() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <GandiPayment />
        </Suspense>
    );
}