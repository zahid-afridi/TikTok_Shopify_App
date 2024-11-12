import React, { useState, useRef , useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function Index() {
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [DataAvatar, setAvatar] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(''); // State for the download URL
  const [urlToPlay , setUrlToPlay] = useState('');
  const [btnloading,setBtnloading]=useState(false)
  const modalRef = useRef(null);






  const [storeInfo, setStoreInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch store information from the backend API
    const fetchStoreInfo = async () => {
      try {
        const response = await fetch('/api/store/info');
        
        if (!response.ok) {
          throw new Error('Failed to fetch store info');
        }
        
        const data = await response.json();
        setStoreInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreInfo();
  }, []);
  
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;


  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  const modalClose = () => {

    //alert("close");

    // Close the modal upon successful update
    const modalElement = modalRef.current;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();

  }

  async function InsertData() {




    console.log(url)
    
    try {
      setBtnloading(true)
      const response = await fetch('/api/tiktokvideo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log(url); // Logs the URL to the console

    setUrlToPlay(url);


      const result = await response.json();
      console.log('Data saved successfully:', result);

      console.log("mm checking");
      console.log(result.data.embed_url);
      console.log(result.data.avatar);
      console.log(result.data.username);

      //now work start here for inserting product
      //insertAsProduct(result.data.embed_url , result.data.avatar , result.data.username);



      setUrl('');
      setBtnloading(false)
      // Destructure the download_url from the result
      const { data } = result;
      const newDownloadUrl = data.download_url;
      const avatar = data.avatar;
      const embed_url = data.embed_url;
      // Extract the download_url
      console.log('Download URL:', newDownloadUrl); // Log the download_url
      console.log('Avatar:', avatar); 
      // Set the video URL from the API response
      setVideoUrl(embed_url);
      setDownloadUrl(newDownloadUrl); // Set the download URL
      setAvatar(avatar)

      //setShowButton(true);
      

      // Show modal on successful submission
      const modal = new window.bootstrap.Modal(modalRef.current);
      modal.show();
      

    } catch (error) {
      console.error('Error saving data:', error.message);
      setBtnloading(false)
    }
  }


  //for stopping video
  const stopVideo = () => {
    setVideoUrl(''); // Clear the src to stop the video
  };

  // const insertAsProduct = (embed_url , avatar , username) =>{

  //   console.log("this is in function "+embed_url+" "+avatar+" "+username);

  //   //starting api call

    
  //   const makingIframe = `<iframe 
  //   src="${embed_url}" 
  //   width="100%" 
  //   height="600" 
  //   frameborder="0" 
  //   scrolling="no" 
  //   allow="autoplay; encrypted-media" 
  //   allowfullscreen></iframe>`;



  //   fetch('/api/prdIns', {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({title:username,description:makingIframe, image:[avatar]})
  //   })
  //    .then(response => {
  //     response.json()
  //    })
  //    .then(response => console.log(JSON.stringify(response)))








  //   //ending api call

  // }


  const insertAsProduct = (embed_url, avatar, username) => {
    console.log("this is in function " + embed_url + " " + avatar + " " + username);

    // Create the iframe HTML
    const makingIframe = `<iframe 
        src="${embed_url}" 
        width="100%" 
        height="600" 
        frameborder="0" 
        scrolling="no" 
        allow="autoplay; encrypted-media" 
        allowfullscreen></iframe>`;

    // Return a promise that resolves when the insertion completes
    return fetch('/api/prdIns', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: username,
            description: makingIframe,
            image: [avatar]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    })
    .then(response => {
        console.log("Insert response:", JSON.stringify(response));
        return response; // Resolve with response data if needed
    })
    .catch(error => {
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
      //setProduct(json.prd.data)
      // console.log(json.prd.data[0].title);
      // console.log(json.prd.data[0].id);
      // console.log(json.prd.data[0].images[0].src);
      // console.log(json.prd.data[0].body_html);
      // console.log(json[0].name)


      const data = json.prd.data;

      if (Array.isArray(data) && data.length > 0) {
        const lastProduct = data[data.length - 1];
        console.log("last product ",lastProduct);
        // setProduct(lastProduct); // Uncomment if you want to save the last product to state
    } else {
        console.log("No products found.");
    }











      // const products = json.prd.data.map(product => ({
      //   id: product.id,
      //   title: product.title,
      //   description: product.body_html,
      //   imageUrl: product.images?.[0]?.src || '', // Use optional chaining for nested data
      //   price: product.variants?.[0]?.price || "0.00", // Default to "0.00" if no price is found
      //   createdAt: product.created_at,
      //   vendor: product.vendor
      // }));
  
      // console.log(products);





      
    } catch (error) {
      console.error(error.message);
    }
  }


  //




const addToShopify = async () => {
  //alert("working!");

  let lastProductId; // Define outside to retain scope
  let dbId;
  let embed_url;
  let username;
  let avatar;

  // First request to get the _id from your database
  try {
      const response2 = await fetch('/api/tiktokLastRow');
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
     updateProductInDatabase(dbId, lastProductId);

      
  
    // Close the modal upon successful update
    const modalElement = modalRef.current;
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
  

  

  } else {
      console.error("Failed to retrieve necessary IDs for updating the database.");
  }
 




};




  //chatgpt function for update 
  // Function to update the product in the database
const updateProductInDatabase = async (dbId, shopifyProductId) => {
  try {
      const response = await fetch("/api/addtoShopify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: dbId, shopify_product_id: shopifyProductId }),
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




  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100 body">

      {/* <div>
       <h1>Store Information</h1>
      {storeInfo ? (
        <div>
          <p><strong>Store Name:</strong> {storeInfo.storeName}</p>
          <p><strong>Domain:</strong> {storeInfo.domain}</p>
          <p><strong>Country:</strong> {storeInfo.country}</p>
          <p><strong>Store ID:</strong> {storeInfo.Store_Id}</p>
        </div>
      ) : (
        <p>Store information not found.</p>
      )} 
    </div> */}

        <div className="container box-info">
          <div className="row mb-3 text-center">
            <div className="col-md-6 themed-grid-col d-flex justify-content-center align-items-center">
              <div className="row justify-content-center">
                <p>You have products  remaining!</p>
                {/* <button onClick={getPrd}>Products Fetch</button> */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                      <g fill="none">
                        {/* SVG Path elements here */}
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="col-md-12 w-100 d-flex justify-content-center align-items-center">
                  <button className="button" disabled={btnloading}   onClick={InsertData}>
                    <span className="text" >{ btnloading ?  'loading...': 'Import TikTok Link'}</span>
                    <div className="overlay">
                      <svg fill="#000000" width={24} height={24} viewBox="0 0 24 24" id="download-3" xmlns="http://www.w3.org/2000/svg" className="icon line" stroke="#000000">
                        <g id="SVGRepo_iconCarrier">
                          <polyline id="primary" points="15 18 12 21 9 18" style={{ fill: "none", stroke: "#ffffff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }}></polyline>
                          <path id="primary-2" data-name="primary" d="M12,21V7M8,14H5a1,1,0,0,1-1-1V4A1,1,0,0,1,5,3H19a1,1,0,0,1,1,1v9a1,1,0,0,1-1,1H16" style={{ fill: "none", stroke: "#ffffff", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "1.5" }}></path>
                        </g>
                      </svg>
                    </div>
                  </button>
                </div>

                
              </div>
            </div>

            <div className="col-md-6">
              <img src="../assets/img/side.webp" alt="" className="side-img img-fluid" />
            </div>
          </div>




        </div>
      </div>

      {/* Modal Structure */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Success</h5>
              <button type="button" onClick={stopVideo}  className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>TikTok Link imported successfully!</p>
              {videoUrl && (
                
               
            

          <iframe 
    src={videoUrl} 
    width="100%" 
    height="400"  
    frameborder="0" 
    scrolling="no" 
    allow="autoplay; encrypted-media" 
    allowfullscreen 
    autoplay
    mute></iframe>


              )}
            </div>
            <div className="modal-footer">
            {/* <button className="btn btn-primary" onClick={handleButtonClick}>
                      Play on Tiktok
                    </button> */}
                   
              {/* <button type="button" className="btn btn-secondary" onClick={stopVideo} data-bs-dismiss="modal">Close</button> */}
              <a href={urlToPlay} onClick={modalClose} className="btn btn-secondary" target="_blank"> View On Tiktok </a>
              <a href="#" onClick={addToShopify} className="btn btn-secondary">Add to shopify</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
