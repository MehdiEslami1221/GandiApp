// app/content/[title]/page.jsx

import InternalFooterContent from "@/app/components/Blog/InternalFooterContent";

export const generateMetadata = ({ params }) => {
    const { title } = params;
    const decodedName = decodeURIComponent(title);
    return {
        title: `${decodedName} - موبایل گاندی `,
        description: `${decodedName}`,
    };
};

export default function ContentPage({ params }) {
    const { title } = params;
    return <InternalFooterContent title={decodeURIComponent(title)} />;
}