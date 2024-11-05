import React from "react";
import tikokImage from "../assets/img/side.webp";
const EmployeeTable = () => {
  return (
    <>
      <div className="container m-auto my-5">
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
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Edit</th>
                <th scope="col">View</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">
                  <p className="mt-3">1</p>
                </th>
                <td>
                  <img
                    src={tikokImage}
                    width={"50px"}
                    height={"50px"}
                    className="rounded-circle object-fit-cover"
                    alt=""
                  />
                </td>
                <td>
                  <p className="mt-3">LifeStyle groming</p>
                </td>
                <td>
                  <button>
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
                </td>
                <td>
                  <button style={{ marginTop: "13px" }}>
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
              </tr>


              <tr>
                <th scope="row">
                  <p className="mt-3">1</p>
                </th>
                <td>
                  <img
                    src={tikokImage}
                    width={"50px"}
                    height={"50px"}
                    className="rounded-circle object-fit-cover"
                    alt=""
                  />
                </td>
                <td>
                  <p className="mt-3">LifeStyle groming</p>
                </td>
                <td>
                  <button>
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
                </td>
                <td>
                  <button style={{ marginTop: "13px" }}>
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
              </tr>


              <tr>
                <th scope="row">
                  <p className="mt-3">1</p>
                </th>
                <td>
                  <img
                    src={tikokImage}
                    width={"50px"}
                    height={"50px"}
                    className="rounded-circle object-fit-cover"
                    alt=""
                  />
                </td>
                <td>
                  <p className="mt-3">LifeStyle groming</p>
                </td>
                <td>
                  <button>
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
                </td>
                <td>
                  <button style={{ marginTop: "13px" }}>
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
              </tr>
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
      </div>
    </>
  );
};

export default EmployeeTable;
