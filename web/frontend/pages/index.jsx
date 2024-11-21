import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

export default function Index() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  console.log('video url form state',videoUrl)

  const [urlToPlay, setUrlToPlay] = useState("");
  const [btnloading, setBtnloading] = useState(false);
  const modalRef = useRef(null);

  const [storeInfo, setStoreInfo] = useState(null);

  const [hasExecuted, setHasExecuted] = useState(false);

  const [remPrd, setRemPrd] = useState('');
  const [loading, setLoading] = useState(true);
   console.log('reomve',remPrd)
  useLayoutEffect(() => {
    const datafun = async () => {
      try {
        await fetchStoreInfo(); // Fetch store info
        await fetchProductNumbers(); // Fetch product numbers
      } catch (error) {
        console.error("Error in data fetching sequence:", error);
      }
    };
  
    datafun();
  }, []);
  
  useEffect(() => {
    // Check if remPrd has been updated
    if (remPrd !== '') {
      setLoading(false); // Stop the loader when remPrd is updated
    }
  }, [remPrd]); // Dependency on remPrd
  
  const fetchStoreInfo = async () => {
    try {
      const response = await fetch("/api/store/info");
      if (!response.ok) {
        throw new Error("Failed to fetch store info");
      }
  
      const data = await response.json();
      setStoreInfo(data); // Update storeInfo state
      console.log("Store Info Fetched:", data);
    } catch (err) {
      console.error("Error fetching store info:", err.message);
    }
  };
  
  const fetchProductNumbers = async () => {
    if (!storeInfo) {
      console.warn("Store info not available yet, skipping product number fetch.");
      return;
    }
  
    try {
      const response = await fetch(
        `/api/billing/ticktokPrdNums?StoreId=${storeInfo.Store_Id}`
      );
  
      const data = await response.json();
      console.log("TikTok Product Numbers:", data);
  
      const TotalRemaining = data.p_num[0].tiktokProductNumber;
      setRemPrd(TotalRemaining); // Update remPrd state
      console.log("Total Remaining TikTok Products:", TotalRemaining);
    } catch (error) {
      console.error("Error fetching TikTok product numbers:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!storeInfo || hasExecuted) return; // Exit if storeInfo is not set or already executed

      console.log("Store info fetched, executing second effect");

      const currentUrl = window.location.href;
      const urlObj = new URL(currentUrl);
      const chargeId = urlObj.searchParams.get("charge_id");

      if (chargeId) {
        console.log("Charge ID found:", chargeId);

        const paymentResponse = await checkpaymentdata(chargeId);
        console.log("Payment Response:", paymentResponse);

        if (paymentResponse) {
          console.log(
            "Fetching TikTok product numbers after payment response..."
          );
          const tick = await getTicktokProductNumber();
          console.log("TikTok product numbers fetched:", tick);
        }
      } else {
        console.log(
          "No charge ID found, fetching TikTok product numbers directly..."
        );
        const tick = await getTicktokProductNumber();
        console.log("TikTok product numbers fetched without charge ID:", tick);
      }

      setHasExecuted(true); // Mark as executed
    };

    fetchData();
  }, [storeInfo, hasExecuted]); // Executes when storeInfo changes and hasn't executed yet

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const modalClose = () => {
    //alert("close");
    stopVideo();

    const modalElement = modalRef.current;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
  };

  const redirectPricing = () => {
    navigate("/Pricing");
  };

  async function getTicktokProductNumber() {
    try {
      console.log(storeInfo.Store_Id);

      const response = await fetch(
        `/api/billing/ticktokPrdNums?StoreId=${storeInfo.Store_Id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch billing store data!");
      }

      const data = await response.json();
      console.log(data);

      var TotalRemaining = data.p_num[0].tiktokProductNumber;

      setRemPrd(TotalRemaining);
      return TotalRemaining;
    } catch (error) {
      console.error("error fetching data", error);
      throw error;
    }
  }

  async function decrementPrdNum() {
    try {
      const response = await fetch(
        `/api/billing/decremenrPrdNums?storeId=${storeInfo.Store_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product number");
      }

      const data = await response.json();
      console.log("Product number updated successfully:", data);

      return data;
    } catch (error) {
      console.error("Error updating product number:", error);
    }
  }

  async function InsertData() {
    if (remPrd === 0) {
      alert("Your Limits Are Over. Subscribe our plan!");
      return;
    }
    let store_id = storeInfo.Store_Id;

    console.log(url);

    try {
      setBtnloading(true);
      const response = await fetch("/api/tiktokvideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, store_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      console.log(url); // Logs the URL to the console

      setUrlToPlay(url);

      const result = await response.json();
      console.log("Data saved successfully:", result);

      console.log("mm checking");
      console.log(result.data.embed_url);
      console.log(result.data.avatar);
      console.log(result.data.username);
      setUrl("");
      setBtnloading(false);
      //now when data saved succesfully TicktokProductnumber ko hum decrement kryngy store_billings table sey
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
      const decrement_data = await decrementPrdNum();
      console.log("decrement data ", decrement_data);

   
      // Destructure the download_url from the result
      const { data } = result;
      const newDownloadUrl = data.download_url;
      const avatar = data.avatar;
      const embed_url = data.embed_url;
      // Extract the download_url
      console.log("Download URL:", newDownloadUrl); // Log the download_url
      console.log("Avatar:", avatar);
      // Set the video URL from the API response
      setVideoUrl(embed_url);
      setDownloadUrl(newDownloadUrl); // Set the download URL
      setAvatar(avatar);

      
    } catch (error) {
      console.error("Error saving data:", error.message);
      setBtnloading(false);
    }
  }

  async function stopVideo() {
    setVideoUrl(""); // Clear the src to stop the video
    //window.location.reload();
    const resultmm = await getTicktokProductNumber();
    console.log(resultmm);
  }

  const insertAsProduct = (embed_url, avatar, username) => {
    console.log(
      "this is in function " + embed_url + " " + avatar + " " + username
    );

    // Create the iframe HTML
    const makingIframe = `<iframe 
        src="${embed_url}" 
        width="100%" 
        height="600" 
        frameBorder="0" 
        scrolling="no" 
        allow="autoplay; encrypted-media" 
        allowfullscreen
        muted></iframe>`;

    // Return a promise that resolves when the insertion completes
    return fetch("/api/prdIns", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: username,
        description: makingIframe,
        image: [avatar],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        console.log("Insert response:", JSON.stringify(response));
        return response; // Resolve with response data if needed
      })
      .catch((error) => {
        console.error("Error inserting product:", error.message);
        throw error; // Propagate error for handling in calling function
      });
  };

  async function getPrd() {
    const url = "/api/testprd";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      console.log(json.prd.data);

      const data = json.prd.data;

      if (Array.isArray(data) && data.length > 0) {
        const lastProduct = data[data.length - 1];
        console.log("last product ", lastProduct);
        // setProduct(lastProduct); // Uncomment if you want to save the last product to state
      } else {
        console.log("No products found.");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  //

  const addToShopify = async () => {
    //alert("working!");
    setBtnloading(true);

    let lastProductId; // Define outside to retain scope
    let dbId;
    let embed_url;
    let username;
    let avatar;

    // First request to get the _id from your database
    try {
      //setBtnloading(true);
      const response2 = await fetch("/api/tiktokLastRow");
      const result2 = await response2.json();
      console.log("Last Row ", result2);

      embed_url = result2.data.embed_url;
      username = result2.data.username;
      avatar = result2.data.avatar;

      if (response2.ok && result2.data) {
        dbId = result2.data._id;
        console.log("Database Product ID:", dbId);
      } else {
        console.error("Error Fetching Data", result2.message);
        return;
      }
    } catch (error2) {
      console.error("Error fetching database product data:", error2.message);
      return;
    }

    // Insert data into Shopify product
    try {
      await insertAsProduct(embed_url, avatar, username); // Wait for insertion to complete
    } catch (error) {
      console.error("Error inserting product into Shopify:", error.message);
      return;
    }

    // Second request to get the Shopify product ID
    const url = "/api/testprd";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      const data = json.prd.data;

      if (Array.isArray(data) && data.length > 0) {
        const lastProduct = data[data.length - 1];
        lastProductId = lastProduct.id;
        console.log("Shopify Product ID:", lastProductId);
      } else {
        console.log("No products found.");
      }
    } catch (error) {
      console.error("Error fetching Shopify product data:", error.message);
      return;
    }

    // Now we have both the IDs, proceed to update the product in the database
    if (dbId && lastProductId) {
      const finalResult = await updateProductInDatabase(dbId, lastProductId);
      console.log(finalResult);

      setBtnloading(false);

      toast.success("Added Succesfully!");

      //window.location.reload();

      const resultmm = await getTicktokProductNumber();
      console.log(resultmm);

      //Close the modal upon successful update
      const modalElement = modalRef.current;
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();

      //alert("Added Succesfully!");
    } else {
      console.error(
        "Failed to retrieve necessary IDs for updating the database."
      );
      //alert("error!");
      toast.error("error!");
    }
  };

  //chatgpt function for update
  // Function to update the product in the database
  const updateProductInDatabase = async (dbId, shopifyProductId) => {
    try {
      const response = await fetch("/api/addtoShopify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: dbId,
          shopify_product_id: shopifyProductId,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Product updated successfully:", result);
      } else {
        console.error("Error updating product:", result.message);
      }
    } catch (error) {
      console.error("Error in update request:", error.message);
    }
  };

  

  async function checkpaymentdata(chargeId) {
    try {
      const response = await fetch(`/api/usageChargeGet?charge_id=${chargeId}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.data);

      console.log(json.data.status);

      if (json.data.status == "active") {
        //call the increment function
        const final_result = await incrementPrdNum();
        console.log("fifty increment done ", final_result);
        return final_result;
      } else {
        //No icrement . payment denied!!
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  //increment 50
  async function incrementPrdNum() {
    //alert(storeInfo.Store_Id);
    //alert(c_status);

    try {
      const response = await fetch(
        `/api/billing/IncFifty?storeId=${storeInfo.Store_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to increment product number");
      }

      const data = await response.json();
      console.log("Product number increment updated successfully:", data);

      return data; // Return the response data if needed for further use
    } catch (error) {
      console.error("Error updating product number:", error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 body">
        <div className="container box-info">
          <div className="row mb-3 text-center">
            <div className="col-md-6 themed-grid-col d-flex justify-content-center align-items-center">
              <div className="row justify-content-center">
                {!remPrd
                  ? !loading && <p>You have reach your limit please upgrade</p>
                  : !loading && <p>You have products {remPrd} remaining!</p>}

                {/* <button onClick={getPrd}>Products Fetch</button> */}
                <div className="mainform col-md-12 w-100 d-flex justify-content-center align-items-center">
                  {loading ? (
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div> // Show loading indicator
                  ) :  remPrd > 0 ? (
                    <>
                      <div className="input-group mb-4">
                        <input
                          type="url"
                          className="form-control"
                          placeholder="Enter the Link"
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          value={url}
                          onChange={handleInputChange}
                        />
                        <div className="inputbtn bg-black rounded-5">
                          <svg
                            style={{ width: "50%" }}
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="512"
                            height="512"
                            x="0"
                            y="0"
                            viewBox="0 0 512 512"
                            style={{ enableBackground: "new 0 0 512 512" }}
                            className=""
                          >
                            <g>
                              <path
                                d="M480.32 128.39c-29.22 0-56.18-9.68-77.83-26.01-24.83-18.72-42.67-46.18-48.97-77.83A129.78 129.78 0 0 1 351.04.39h-83.47v228.08l-.1 124.93c0 33.4-21.75 61.72-51.9 71.68a75.905 75.905 0 0 1-28.04 3.72c-12.56-.69-24.33-4.48-34.56-10.6-21.77-13.02-36.53-36.64-36.93-63.66-.63-42.23 33.51-76.66 75.71-76.66 8.33 0 16.33 1.36 23.82 3.83v-84.75c-7.9-1.17-15.94-1.78-24.07-1.78-46.19 0-89.39 19.2-120.27 53.79-23.34 26.14-37.34 59.49-39.5 94.46-2.83 45.94 13.98 89.61 46.58 121.83 4.79 4.73 9.82 9.12 15.08 13.17 27.95 21.51 62.12 33.17 98.11 33.17 8.13 0 16.17-.6 24.07-1.77 33.62-4.98 64.64-20.37 89.12-44.57 30.08-29.73 46.7-69.2 46.88-111.21l-.43-186.56a210.864 210.864 0 0 0 46.88 27.34c26.19 11.05 53.96 16.65 82.54 16.64v-83.1c.02.02-.22.02-.24.02z"
                                fill="#ffffff"
                                opacity="1"
                                data-original="#000000"
                                className=""
                              ></path>
                            </g>
                          </svg>
                        </div>
                      </div>

                      <button
                        className="button"
                        disabled={btnloading}
                        onClick={InsertData}
                      >
                        <span className="text">
                          {btnloading ? "Loading..." : "Import TikTok Link"}
                        </span>
                        <div className="overlay">
                          <svg
                            fill="#000000"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            id="download-3"
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon line"
                            stroke="#000000"
                          >
                            <g id="SVGRepo_iconCarrier">
                              <polyline
                                id="primary"
                                points="15 18 12 21 9 18"
                                style={{
                                  fill: "none",
                                  stroke: "#ffffff",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "1.5",
                                }}
                              />
                              <path
                                id="primary-2"
                                data-name="primary"
                                d="M12,21V7M8,14H5a1,1,0,0,1-1-1V4A1,1,0,0,1,5,3H19a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H16"
                                style={{
                                  fill: "none",
                                  stroke: "#ffffff",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round",
                                  strokeWidth: "1.5",
                                }}
                              />
                            </g>
                          </svg>
                        </div>
                      </button>
                    </>
                  ) :  (
                    // "Subscribe Plan" button if product limit is reached
                    <button
                      className="button bg-danger p-0"
                      onClick={redirectPricing}
                    >
                      <span className="text text-center p-2">
                        Subscribe Plan
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <img
                src="../assets/img/side.webp"
                alt=""
                className="side-img img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Structure */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                TikTok Video
              </h5>
              <button
                type="button"
                onClick={stopVideo}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <p>TikTok Link imported successfully!</p> */}
              {videoUrl && (
                <iframe
                  src={videoUrl}
                  width="100%"
                  height="400"
                  frameborder="0"
                  scrolling="yes"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                  muted
                ></iframe>
              )}
            </div>
            <div className="modal-footer">
              <a
                href={urlToPlay}
                onClick={modalClose}
                className="btn btn-primary"
                target="_blank"
              >
                View On Tiktok
              </a>
              <button
                disabled={btnloading}
                onClick={addToShopify}
                className="btn btn-success"
              >
                {btnloading ? "Adding..." : "Add To Shopify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
