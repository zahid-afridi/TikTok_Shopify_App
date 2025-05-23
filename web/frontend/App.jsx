import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import  { Toaster } from 'react-hot-toast'
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  return (
    <PolarisProvider>
      <BrowserRouter>
      <Toaster></Toaster>
        <QueryProvider>
          <NavMenu>
            <a href="/" rel="home" />
            {/* <a href="/pagename">{t("NavigationMenu.pageName")}</a> */}
            <a href="/TiktokVideos">Tiktok Videos</a>
            <a href="/Pricing">Pricing</a>
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
