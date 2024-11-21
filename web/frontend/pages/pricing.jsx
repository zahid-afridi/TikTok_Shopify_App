import React, { useState , useEffect } from "react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

export default function pricing() {

//const [price , setPrice] = useState(null);

//const [pkgName , setPkgName] = useState(null);

const [imporRequests , setImportRequests] = useState(null);


const [storeInfo, setStoreInfo] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


//pkgdata     desc ,  name  ,  price , productNumbers

const [packages , setPackages] = useState([]);




useEffect(() => {
  // Fetch store information from the backend API
  const fetchStoreInfo = async () => {
    try {
      const response = await fetch('/api/store/info');
      
      if (!response.ok) {
        throw new Error('Failed to fetch store info');
      }
      
      const data = await response.json();
      console.log("store data",data);
      setStoreInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchStoreInfo();
}, []);





useEffect(() => {
  
  async function getPackages() {
    try {
     
  
      const response = await fetch('/api/pkg/fetchpkgs',{
        method:"GET"
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch pkg data!");
      }
  
      const data = await response.json();
      console.log('package',data);
  
      setPackages(data.packages);
  
     
    } catch (error) {
      console.error("error fetching data", error);
   
    }
  }

 getPackages();
}, []);




// useEffect(() => {
//   if (storeInfo) {
//     staticData();
//   }
// }, [storeInfo]);



  
  // const staticData = async () => {
    
  //   setPrice(45);
  //   setPkgName("Super Duper Plan");
  //   setImportRequests(50);

  // };






async function billingApi(prds , pkgn , price) {


  //taking url
  //alert(prds+pkgn+price);
  //alert(storeInfo.domain);

  


  let pkg_prd = prds;
  let name = pkgn;
  let pkg_price = price;
  let url = `https://${storeInfo.domain}/admin/apps/89a6c2bf533bdfdfc64d037e5fbbde9d`;
  //let  url ='https://admin.shopify.com/store/mubashir12121/apps/tiktokapp-6';
  //toast.success(url);


  try {
    const response = await fetch("/api/paymentCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify({ name, pkg_price, url }), // Send package data
    });

    const mydata = await response.json();
    console.log("Payment API response MMK:", mydata);
      // data.status;
      // data.price;
      // data.name; //pkg name
      // data.id; //billing id

      let cm_status = mydata.recurring_application_charge.status;
      let cm_price = mydata.recurring_application_charge.price;
      let cm_pkg_name = mydata.recurring_application_charge.name;
      let cm_billing_id = mydata.recurring_application_charge.id;


      
     

    if (response.ok) {

      //this data is getting from billing api which i am passing through function

      const increment_result = await incrementPrdNum(cm_status, cm_price , cm_pkg_name , cm_billing_id , pkg_prd);
      console.log(increment_result);

      // Redirect to the confirmation URL if provided
      //console.log()
      window.open(mydata.recurring_application_charge.confirmation_url);




    }
  } catch (error) {
    console.error("Error in payment API:", error.message);
  }

}




async function incrementPrdNum(c_status , c_price , c_pkg_name , c_billing_id , c_pkg_prd) {
  //alert(storeInfo.Store_Id);
  //alert(c_status);
    
  try {
    const response = await fetch(`/api/billing/IncPrdNums?storeId=${storeInfo.Store_Id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ c_status, c_price, c_pkg_name , c_billing_id , c_pkg_prd }), // Send data

      
      
    });

    if (!response.ok) {
      throw new Error('Failed to increment product number');
    }

    const data = await response.json();
    console.log('Product number increment updated successfully:', data);

    return data; // Return the response data if needed for further use

  } catch (error) {
    console.error('Error updating product number:', error);
  }
}



//pkgs data 



if(loading){
  return <Spinner/>
}




  return (
    <>
{packages.length==0 ? (
  <>
  
  <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center p-4 bg-white rounded shadow">
        <h1 className="text-dark fw-bold">
          No Packages Found
        </h1>
        <p className="text-muted">
          If you are the admin of the app, please add packages.
        </p>
      </div>
    </div> <h1>NO PACKAGES FOUND IF YOUR ADMIN OF THE APP PLEASE ADD PACKAGES</h1>
  
  
  </>
):(
  <>
  <section id="pricing" className="pricing-area bg-gray">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="site-heading text-center">
          <h2>
            Pricing <span>Plan</span>
          </h2>
          <h4>List of our pricing packages</h4>
          {/* <button onClick={getPackages}>Pkgs data</button> */}
        </div>
      </div>
    </div>
    <div className="row pricing pricing-simple text-center">
    {packages.map((pkg, index) => (
      <div className="col-md-4" key="index">
        <div className="pricing-item rounded-4 active">
          <ul>
            <li className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="60px"
                height="60px"
                x="0"
                y="0"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    d="M416.4 431.8C307.1 312.6 237.5 227.5 197.8 164.1c-24.8-39.5-38.3-70.9-41.2-96.7-19.1 34.4-29.6 72.7-30.7 112.6-.4 14.8 11.4 49 70.1 127.8 40.9 54.9 91.9 114.7 129.1 158.4 15.8 18.6 29.1 34.1 38.6 45.8zm-171.5-34.1c-20.5 24.7-40.3 48-57.8 68.5-15.8 18.6-29.1 34.1-38.6 45.8l-52.8-80.2c36.4-39.9 52.7-59.8 81.4-94.7 3.2-3.9 6.6-8 10.1-12.3 17.4 23.2 37 47.7 57.7 72.9zM256 92.5c-23.8 0-47.3 7.2-67.1 20.3-15.5-32.9-19.4-57.6-12-76.3C196.7 13.3 225.4 0 256 0s59.3 13.3 79.1 36.5c4.4 11.8 2.8 33.5-16.9 73.2C299.4 98.4 278 92.5 256 92.5zm7.6 134.9c35.3-48.1 60.6-88.7 75.1-120.7 7.5-16.5 12.3-30.9 14.4-43.5 20.6 35.4 32 75.3 33.1 116.9.4 14.2-10.5 46.5-64 119.5-22.2-26.3-41.7-50.3-58.6-72.2z"
                    clipRule="evenodd"
                    fill="#ffffff"
                    opacity="1"
                    data-original="#000000"
                  />
                </g>
              </svg>
              <i className="fas fa-ribbon"></i>
            </li>
            <li className="pricing-header rounded-4">
              <h4>   {pkg.packageName}   </h4>
              <h2>
                <sup>$</sup> {pkg.packagePrice} <sub>/ Year</sub>
              </h2>
            </li>
            <li>Import Tiktok Video {pkg.packageTikTokImportNumber} Number requests!</li>
            <li>
              {/* Update{" "}
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Only for extended licence"
              >
                <i className="fas fa-info-circle"></i>
              </span> */}
            </li>
            
              <li>{pkg.packageDesc}</li>
            {/* <li>Commercial use</li>
            <li>
              Support{" "}
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Only for extended licence"
              >
                <i className="fas fa-info-circle"></i>
              </span>
            </li>
            <li>5 database</li>
            <li>Documentation</li> */}
            <li className="footer">
              <a className="btn btn-theme effect btn-sm rounded-5" href="#" onClick={() => billingApi(pkg.packageTikTokImportNumber, pkg.packageName , pkg.packagePrice)}>
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div>
      ))}
      {/* <div className="col-md-4">
        <div className="pricing-item rounded-4">
          <ul>
            <li className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="60px"
                height="60px"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 24 24" }}
                xmlSpace="preserve"
              >
                <g>
                  <path
                    d="M23.508.003c-4.685-.084-10.028 2.365-13.41 6.164A12.69 12.69 0 0 0 1.402 9.87a.5.5 0 0 0 .28.851l3.854.552-.476.533a.5.5 0 0 0 .02.687l6.427 6.427a.499.499 0 0 0 .687.019l.533-.476.552 3.854c.027.188.175.326.354.386a.46.46 0 0 0 .143.022.565.565 0 0 0 .387-.161c2.285-2.285 3.61-5.432 3.671-8.664 3.803-3.389 6.272-8.73 6.163-13.409a.502.502 0 0 0-.489-.488zM18.9 8.635c-.487.487-1.127.731-1.768.731s-1.281-.244-1.768-.731a2.505 2.505 0 0 1 0-3.536c.975-.975 2.561-.975 3.536 0s.975 2.562 0 3.536zM2.724 16.905c-1.07 1.07-2.539 5.904-2.703 6.451a.502.502 0 0 0 .623.623c.547-.164 5.381-1.633 6.451-2.703a3.094 3.094 0 0 0 0-4.371 3.095 3.095 0 0 0-4.371 0z"
                    fill="#A020F0"
                    opacity="1"
                    data-original="#000000"
                  />
                </g>
              </svg>
            </li>
            <li className="pricing-header">
              <h4>Extended Version</h4>
              <h2>
                <sup>$</sup>99 <sub>/ Year</sub>
              </h2>
            </li>
            <li>Demo file</li>
            <li>Update</li>
            <li>File compressed</li>
            <li>Commercial use</li>
            <li>
              Support{" "}
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Available on pro version"
              >
                <i className="fas fa-info-circle"></i>
              </span>
            </li>
            <li>10 database</li>
            <li>
              Documentation{" "}
              <span
                data-toggle="tooltip"
                data-placement="top"
                title="Available on pro version"
              >
                <i className="fas fa-info-circle"></i>
              </span>
            </li>
            <li className="footer">
            <a className="btn btn-theme effect btn-sm rounded-5" href="#" onClick={() => billingApi(100, 'Super Duper Plan' , 90)}>
                Get Started
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  </div>
</section>
  </>
)}

    </>
  );
}
