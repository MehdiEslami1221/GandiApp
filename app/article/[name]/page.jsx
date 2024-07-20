// app/article/[name]/page.js

import InternalArticle from "@/app/components/Blog/InternalArticle";

export const generateMetadata = ({ params }) => {
    const { name } = params;
    const decodedName = decodeURIComponent(name);
    return {
        title: `${decodedName} - موبایل گاندی `,
        description: `${decodedName}`,
    };
};

export default function ArticlePage({ params }) {
    return <InternalArticle name={decodeURIComponent(params.name)} />;
}
