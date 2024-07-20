// utils/metadata.js

export function generateMetadata(customTitle, customDescription) {
    const defaultTitle = "موبایل گاندی";
    const defaultDescription = "فروشگاه آنلاین فروش موبایل";

    return {
        title: customTitle ? decodeURIComponent(customTitle) : defaultTitle,
        description: customDescription ? decodeURIComponent(customDescription) : defaultDescription,
    };
}
