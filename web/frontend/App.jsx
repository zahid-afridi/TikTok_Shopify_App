import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import  { Toaster } from 'react-hot-toast'
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";
import { createContext, useEffect, useState } from "react";

export const StoreConext=createContext()
export default function App() {
  const [loader,setLoader]=useState(false)
  const [storeInfo, setStoreInfo] = useState(null);

  // console.log('loader form appp',loader)
  useEffect(()=>{
  const storeInfo=async()=>{
    setLoader(true)
    try {
      const response = await fetch('/api/store/info',{
        method:'GET'
      })
      const data= await response.json()
      setStoreInfo(data)
      // console.log('storeInfo from app',data)
      setLoader(false)
    } catch (error) {
      setLoader(false)
      console.log('error',error)
    }
  }
  storeInfo()

  },[])

  const { t } = useTranslation();
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", { eager: true });
  
  return (
    <PolarisProvider>
      <BrowserRouter>
        <Toaster />
        {loader ? (
          <h1 style={{color:"red"}}>Loading</h1>
        ) : (
          <StoreConext.Provider value={storeInfo}>
          <QueryProvider>
            <NavMenu>
              <a href="/" rel="home" />
              {/* <a href="/pagename">{t("NavigationMenu.pageName")}</a> */}
              <a href="/TiktokVideos">Tiktok Videos</a>
              <a href="/Pricing">Pricing</a>
            </NavMenu>
            <Routes pages={pages} />
          </QueryProvider>
          </StoreConext.Provider>
        )}
      </BrowserRouter>
    </PolarisProvider>
  );
  
}
