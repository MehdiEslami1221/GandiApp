// app/product/[id]/[name]/page.jsx

import ThumbsGallery from "@/app/components/ThumbsGallery";

export const generateMetadata = ({ params }) => {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - موبایل گاندی `,
        description: `${decodedName}`,
    };
};
export default function ProductPage({params}) {

    const pId = params.id

    return <ThumbsGallery id={pId}/>
}