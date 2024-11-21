
import React, { useState, useEffect , useRef} from "react";
import tikokImage from "../assets/img/side.webp";
import toast from "react-hot-toast";
const EmployeeTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //edit work
  const [isEditing, setIsEditing] = useState(false); // Track if the update form is open
  const [currentItem, setCurrentItem] = useState(null);
  //end
  const modalRef = useRef(null);

  const [buttonLoading, setButtonLoading] = useState({}); // Object to track loading state for each row



  const [storeInfo, setStoreInfo] = useState(null);
  const [storeloading, setStoreLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storedata, setStoreData] = useState(null);



  useEffect(() => {
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


   // Fetch TikTok data after storeInfo is set
   useEffect(() => {
    if (storeInfo) {
      fetchData();
    }
  }, [storeInfo]);



  const fetchData = async () => {
    try {
       
      
      //alert(storeInfo.Store_Id);
      
      // Store_Id should now be available here
      const response = await fetch(`/api/tiktokdata?storeId=${storeInfo.Store_Id}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setData(result.data);
      } else {
        console.error("Error Fetching Data", result.message);
      }
    } catch (error) {
      console.error("error ", error);
    } finally {
      setLoading(false);
    }
  };


  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;





  //update function
  // Triggered when the update button is clicked
  const handleUpdateClick = (item) => {
    setCurrentItem(item); // Set the item to be edited
    setIsEditing(true); // Open the edit form
    // Show modal on successful submission
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({ ...currentItem, [name]: value }); // Update the current item state
  };


  
  // Handle form submission (sending update request to backend)
  const handleUpdateSubmit = async (e) => {


    e.preventDefault(); // Prevent the default form submission
      // alert(currentItem.shopify_product_id);
      // alert(currentItem.username);
      // alert(currentItem.description);
      let s_id = currentItem.shopify_product_id;
      let title = currentItem.username;
      //let body_html = currentItem.description;
    const response = await fetch(`/api/tiktokedit/${currentItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentItem), // Send updated data
    });

    if (response.ok) {
      const result = await response.json();
      // console.log('Row updated successfully:', result.data);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === currentItem._id ? { ...item, ...currentItem } : item
        )
      );
      setIsEditing(false); // Close the update form
    } else {
      const result = await response.json();
      console.error('Error updating row:', result.message);
    }

    //now we will update from shopify

    try {
      const response = await fetch(`/api/prdUpd/${s_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
  
      } else {
        console.error("Failed to update product:", result.message);
        // Optionally, show an error message on the UI
      }
    } catch (error) {
      console.error("Error updating product:", error.message);
  
    }










  };

  //delete function


  const deleteRow = async (id , s_id) => {
   // alert("wrking"+id);
   

   

    try {
      const response = await fetch(`/api/tiktokdelete/${id}`, {
        method: "DELETE",
      });
      // console.log(response);

      if (response.ok) {
        setData(data.filter((item) => item._id !== id)); // Update the state by removing the deleted item
        // console.log("Row deleted successfully!");
        toast.success("Product Deleted succesfully!");
      } else {
        const result = await response.json();
        console.error("Error deleting row: ", result.message);
      }
    } catch (error) {
      console.error("Error deleting row: ", error);
      //alert("error"+error);
      toast.error("Error deleting product: ", error);
    }

    //now we will delete from shopify db product delete api


    //if there is no shopify id stop this 

    if(s_id==null){
      return;
    }

    try {
      const response = await fetch("/api/delprd", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ s_id }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        //console.log("Product deleted successfully:", result.message);
        toast.success("Product deleted successfully:", result.message);
        // Optionally, update the UI to reflect the deleted product or reload the page
        //window.location.reload();
      } else {
        console.error("Failed to delete product:", result.message);
        toast.error("Failed to delete product:", result.message);
        // Optionally, show an error message on the UI
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Error deleting product:", error.message);
      // Optionally, show an error message on the UI
    }



  };


  //now working with update functionaly that if user clicks on add to shopify. that update the database

  const insertAsProduct = (embed_url, avatar, username) => {
    //console.log("this is in function " + embed_url + " " + avatar + " " + username);

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
       // console.log("Insert response:", JSON.stringify(response));
        return response; // Resolve with response data if needed
    })
    .catch(error => {
        console.error("Error inserting product:", error.message);
        throw error; // Propagate error for handling in calling function
    });
};






  
  const addToShopify = async (cid) => {
    setButtonLoading((prev) => ({ ...prev, [cid]: true }));
  
    let lastProductId;
    let dbId = cid;
    let embed_url;
    let username;
    let avatar;
    let current_id = cid;
  
    try {
      // First request to get the row of current_id from the database
      const response2 = await fetch(`/api/addtoShopifyfromlisting/${current_id}`);
      const result2 = await response2.json();
     // console.log("Row to edit", result2);
  
      embed_url = result2.data.embed_url;
      username = result2.data.username;
      avatar = result2.data.avatar;
    } catch (error2) {
      console.error("Error fetching database product data:", error2.message);
      alert("Error fetching database product data:");
      setButtonLoading((prev) => ({ ...prev, [cid]: false }));
      return;
    }
  
    try {
      // Insert data into Shopify product
      await insertAsProduct(embed_url, avatar, username);
    } catch (error) {
      console.error("Error inserting product into Shopify:", error.message);
      alert("Error inserting product into Shopify:");
      setButtonLoading((prev) => ({ ...prev, [cid]: false }));
      return;
    }
  
    try {
      // Second request to get the Shopify product ID
      const response = await fetch("/api/testprd");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      //console.log(json);
  
      const data = json.prd.data;
  
      if (Array.isArray(data) && data.length > 0) {
        const lastProduct = data[data.length - 1];
        lastProductId = lastProduct.id;
        //console.log("Shopify Product ID:", lastProductId);
      } else {
        //console.log("No products found.");
        alert("No products found in Shopify!");
        setButtonLoading((prev) => ({ ...prev, [cid]: false }));
        return;
      }
    } catch (error) {
      console.error("Error fetching Shopify product data:", error.message);
      setButtonLoading((prev) => ({ ...prev, [cid]: false }));
      return;
    }
  
    if (dbId && lastProductId) {
      try {
        await updateProductInDatabase(dbId, lastProductId);
  
        //this one error solved for deleting 

        fetchData();
  
        toast.success("Product uploaded successfully!");
      } catch (error) {
        console.error("Error updating product in database:", error.message);
        alert("Error updating product in database.");
      }
    } else {
      console.error("Failed to retrieve necessary IDs for updating the database.");
      alert("Failed to retrieve necessary IDs for updating the database.");
    }
  
    setButtonLoading((prev) => ({ ...prev, [cid]: false })); // Reset loading state for the row
  };
  
 
 
 
 
 
  const updateProductInDatabase = async (dbId, shopifyProductId) => {
    try {
        const response = await fetch("/api/addtoShopify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: dbId, shopify_product_id: shopifyProductId }),
        });
  
        const result = await response.json();
        if (response.ok) {


        } else {
            console.error("Error updating product:", result.message);
        }
    } catch (error) {
        console.error("Error in update request:", error.message);
    }
  };

  
  return (
    <>
      <div className="container m-auto my-5">















        <p>{loading}</p>





        <div className="table-box-info">
          <div className="form d-flex position-relative" style={{ width: "35%" }}>
            <input
              style={{ padding: "10px 18px",backgroundColor: "#E9ECEF", boxShadow: "none"}}
              type="search"
              className="form-control w-30 my-3"
              id="datatable-search-input"
              control-id="ControlID-34"
              placeholder="Search here..."
            />
            <button
              className="bg-light rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "35px",
                height: "35px",
                margin: "12px",
                position: "absolute",
                right: "15px",
                top: "11%",
              }}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="17px"
                height="17px"
                viewBox="0 0 612.01 612.01"
                style={{ enableBackground: "new 0 0 512 512" }}
              >
                <g>
                  <path
                    d="M606.209 578.714L448.198 423.228C489.576 378.272 515 318.817 515 253.393 514.98 113.439 399.704 0 257.493 0S.006 113.439.006 253.393s115.276 253.393 257.487 253.393c61.445 0 117.801-21.253 162.068-56.586l158.624 156.099c7.729 7.614 20.277 7.614 28.006 0a19.291 19.291 0 0 0 .018-27.585zM257.493 467.8c-120.326 0-217.869-95.993-217.869-214.407S137.167 38.986 257.493 38.986c120.327 0 217.869 95.993 217.869 214.407S377.82 467.8 257.493 467.8z"
                    fill="#000000"
                    opacity="1"
                  />
                </g>
              </svg>
            </button>
          </div>
          <table className="table table-responsive">
            <thead>
              <tr>     <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Username</th>
              {/* <th scope="col">Description</th> */}
              <th scope="col">Created Date</th>
              
              

              <th scope="col">Edit</th>
              <th scope="col">View</th>
              <th scope="col">Delete</th>
              <th scope="col">AddToShopify</th>
              
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center"> <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div> </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={item.avatar || tikokImage}
                        width={"50px"}
                        height={"50px"}
                        className="rounded-circle"
                        alt="Avatar"
                      />
                    </td>
                    <td>{item.username}</td>
                   
                    {/* <td>{item.description}</td> */}
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  
                    



                    <td>
                  <button  onClick={() => handleUpdateClick(item)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="50px"
                      height="50px"
                      x="0"
                      y="0"
                      viewBox="0 0 32 32"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g transform="matrix(0.4999999999999998,0,0,0.4999999999999998,8.007463353686033,7.999841094017027)">
                        <path
                          d="m29.589 9.366-9.969 9.97c-.874.873-2.409 2.017-3.496 2.604l-2.041 1.102c-.451.244-.852.362-1.223.362-.507 0-.945-.23-1.201-.632-.323-.507-.3-1.164.068-1.952l1.036-2.216c.529-1.134 1.638-2.717 2.524-3.603l9.969-9.97zm1.452-1.451.056-.056a3.076 3.076 0 0 0 .01-4.345c-1.154-1.155-3.185-1.149-4.344.011l-.056.055zM25.07 28.327a1.027 1.027 0 0 0-1.022-1.031l-23.017-.107h-.004a1.027 1.027 0 0 0-.005 2.053l23.017.106h.005a1.024 1.024 0 0 0 1.026-1.021z"
                          fill="#00e012"
                          opacity="1"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </button>
                </td>
                <td>
                <a href={item.embed_url} target="_blank" rel="noopener noreferrer">
                  <button style={{ marginTop: "13px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="28px"
                      height="28px"
                      x="0"
                      y="0"
                      viewBox="0 0 98 98"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <linearGradient
                          id="a"
                          x1="49"
                          x2="49"
                          y1="22"
                          y2="80"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" style={{ stopColor: "#00EFD1" }} />
                          <stop offset="1" style={{ stopColor: "#00ACEA" }} />
                        </linearGradient>
                        <path
                          d="M93.9 49.2c-.2-.2-5-6.8-12.9-13.5C70.4 26.7 59.3 22 49 22 24.3 22 4.9 48.1 4.1 49.2c-.8 1.1-.8 2.5 0 3.5.2.3 5 6.9 12.9 13.6C27.6 75.3 38.7 80 49 80c24.7 0 44.1-26.1 44.9-27.2.8-1.1.8-2.5 0-3.6zM49 74c-18.2 0-34-17.3-38.7-23C15 45.3 30.7 28 49 28c18.2 0 34 17.3 38.7 23C83 56.7 67.3 74 49 74z"
                          style={{ fill: "url(#a)" }}
                        />
                        <linearGradient
                          id="b"
                          x1="49"
                          x2="49"
                          y1="33"
                          y2="69"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" style={{ stopColor: "#00EFD1" }} />
                          <stop offset="1" style={{ stopColor: "#00ACEA" }} />
                        </linearGradient>
                        <path
                          d="M49 33c-9.9 0-18 8.1-18 18s8.1 18 18 18 18-8.1 18-18-8.1-18-18-18zm0 30c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12z"
                          style={{ fill: "url(#b)" }}
                        />
                      </g>
                    </svg>
                  </button>
                  </a>
                </td>
                <td>
                  <button  onClick={() => deleteRow(item._id , item.shopify_product_id)} style={{ marginTop: "13px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="24px"
                      height="24px"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512"
                      style={{ enableBackground: "new 0 0 512 512" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M436 60h-75V45c0-24.813-20.187-45-45-45H196c-24.813 0-45 20.187-45 45v15H76c-24.813 0-45 20.187-45 45 0 19.928 13.025 36.861 31.005 42.761L88.76 470.736C90.687 493.875 110.385 512 133.604 512h244.792c23.22 0 42.918-18.125 44.846-41.271l26.753-322.969C467.975 141.861 481 124.928 481 105c0-24.813-20.187-45-45-45zM181 45c0-8.271 6.729-15 15-15h120c8.271 0 15 6.729 15 15v15H181V45zm212.344 423.246c-.643 7.712-7.208 13.754-14.948 13.754H133.604c-7.739 0-14.305-6.042-14.946-13.747L92.294 150h327.412l-26.362 318.246zM436 120H76c-8.271 0-15-6.729-15-15s6.729-15 15-15h360c8.271 0 15 6.729 15 15s-6.729 15-15 15z"
                          fill="#ff4949"
                          opacity="1"
                          data-original="#000000"
                        />
                        <path
                          d="m195.971 436.071-15-242c-.513-8.269-7.67-14.558-15.899-14.043-8.269.513-14.556 7.631-14.044 15.899l15 242.001c.493 7.953 7.097 14.072 14.957 14.072 8.687 0 15.519-7.316 14.986-15.929zM256 180c-8.284 0-15 6.716-15 15v242c0 8.284 6.716 15 15 15s15-6.716 15-15V195c0-8.284-6.716-15-15-15zM346.927 180.029c-8.25-.513-15.387 5.774-15.899 14.043l-15 242c-.511 8.268 5.776 15.386 14.044 15.899 8.273.512 15.387-5.778 15.899-14.043l15-242c.512-8.269-5.775-15.387-14.044-15.899z"
                          fill="#ff4949"
                          opacity="1"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                  </button>
                </td>


<td>
  {item.is_shopify === 1 ? (
    <button className="shopify_btn btn bg-success text-white display-6" disabled>
      Uploaded!
    </button>
  ) : (
    <button
      className="shopify_btn btn bg-success text-white display-6"
      disabled={buttonLoading[item._id]}
      onClick={() => addToShopify(item._id)}
    >
      {buttonLoading[item._id] ? "Loading..." : "Add to Shopify"}
    </button>
  )}
</td>




                  </tr>
                ))
              ) : (
                <tr>
                  
                </tr>
              )}
            </tbody>

            
          </table>
          <div className="d-flex justify-content-end">
            <div className="w-25">
              <nav aria-label="Page navigation example  ">
                <ul className="pagination justify-content-center rounded-circle">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" tabIndex="-1" style={{borderRadius: "50px 0 0 50px"}}>
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width="24px"
  height="20px"
  viewBox="0 0 64 64"
  style={{ enableBackground: "new 0 0 512 512" }}
  xmlSpace="preserve"
>
  <g>
    <path
      d="M60 30H8.83l8.58-8.59a2 2 0 0 0-2.82-2.82l-12 12a2.06 2.06 0 0 0-.59 1.8 2.16 2.16 0 0 0 .55 1l12 12a2 2 0 1 0 2.82-2.82L8.83 34H60a2 2 0 0 0 0-4z"
      data-name="Layer 27"
      fill="#000000"
      opacity="1"
      data-original="#000000"
    />
  </g>
</svg>

                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-dark" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-dark" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-dark" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-dark" href="#" style={{borderRadius: "0 50px 50px 0"}}>
                    <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  width="24px"
  height="20px"
  viewBox="0 0 512.009 512.009"
  style={{ enableBackground: "new 0 0 512 512" }}
  xmlSpace="preserve"
>
  <g>
    <path
      d="M508.625 247.801L392.262 131.437c-4.18-4.881-11.526-5.45-16.407-1.269-4.881 4.18-5.45 11.526-1.269 16.407.39.455.814.88 1.269 1.269l96.465 96.582H11.636C5.21 244.426 0 249.636 0 256.063s5.21 11.636 11.636 11.636H472.32l-96.465 96.465c-4.881 4.18-5.45 11.526-1.269 16.407s11.526 5.45 16.407 1.269c.455-.39.88-.814 1.269-1.269l116.364-116.364c4.511-4.537 4.511-11.867-.001-16.406z"
      fill="#000000"
      opacity="1"
      data-original="#000000"
    />
  </g>
</svg>

                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>




        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <form onSubmit={handleUpdateSubmit} className="edit-form">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Data!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
           

              {/* edit starts */}
            {isEditing && (
        <div>
          
        
          <div className="mb-3">
          <input
            type="text"
            name="username"
            value={currentItem.username}
            onChange={handleInputChange}
            placeholder="User Name"
            className="form-control"
          />
        </div>
     
            
         
        </div>
      )}
     
              
            </div>
            <div className="modal-footer">
            
                   
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-secondary" type="submit">Update</button>
           
            </div>
          </div>
        </div>
        </form>
      </div>




      </div>
    </>
  );
};

export default EmployeeTable;
