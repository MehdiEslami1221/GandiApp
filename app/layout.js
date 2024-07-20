import "./globals.css";
import localFont from "next/font/local";
import 'bootstrap/dist/css/bootstrap.rtl.css';
import AddBootstrap from "@/app/components/AddBootstrap";
import "jalaali-react-date-picker/lib/styles/index.css";
import 'font-awesome/css/font-awesome.min.css';
import Footer from "@/app/components/Footer";
import {LoadingProvider} from "@/app/context/LoadingContext";
import {ModalProvider} from "@/app/context/ModalProvider";
import {ShopContextProvider} from "@/app/context/ShopContext";
import {ToastContainer} from "react-toastify";
import TopBanner from "@/app/components/TopBanner";
import OffCanvas from "@/app/components/Offcanvas";
import SearchBar from "@/app/components/SearchBar";
import CategoryMenu from "@/app/components/CategoryMenu";


const iranSans = localFont({
    src: '../public/assets/fonts/IRANSansXFaNum-Regular.woff2'
});

export default function RootLayout({children}) {
    return (
        <html lang="IR-fa" dir='rtl'>
        <head>
            <meta name="theme-color" content="#000000"/>
            <meta name="enamad" content="119402"/>
            <meta name="robots" content="index, follow"/>
            <meta name="revisit-after" content="1 days"/>
            <meta name="author" content="gandimobile"/>
        </head>
        <body className={`${iranSans.className}`}>
        <AddBootstrap/>
        <LoadingProvider>
            <ModalProvider>
                <ShopContextProvider>
                    <main>
                        <div className="container-fluid d-flex flex-column min-vh-100 p-0">
                            <div className="flex-grow-1">
                                <ToastContainer limit={1} closeOnClick={true} newestOnTop={true}/>
                                <TopBanner />
                                <OffCanvas />
                                <SearchBar />
                                <CategoryMenu />
                                {children}
                            </div>
                            <div className="mt-auto">
                                <Footer/>
                            </div>
                        </div>
                    </main>
                </ShopContextProvider>
            </ModalProvider>
        </LoadingProvider>
        </body>
        </html>
    );
}
