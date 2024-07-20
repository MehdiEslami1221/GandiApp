import ShowAllArticle from "@/app/components/pages/ShowAllArticle";

export const generateMetadata = () => {
    return {
        title: `وبلاگ - موبایل گاندی `,
        description: `مقالات وب سایت موبایل گاندی`,
    };
};

export default function AllArticlePage() {
    return <ShowAllArticle />
}