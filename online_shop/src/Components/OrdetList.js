import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export default function OrderList() {
  let orderlist = localStorage.getItem("orderlist");
  orderlist = orderlist ? JSON.parse(orderlist) : [];
  let userData = localStorage.getItem("userData");
  userData = userData ? JSON.parse(userData) : [];
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onInvoiceClick = (invoiceNo) => {
    navigate(`/invoice/${invoiceNo}`);
  };
  return (
    <React.Fragment>
      <main class="contact-us">
        <section class="footer_get_touch_outer">
          <div class="container">
            <div class="footer_get_touch_inner">
              <div class="colmun-70 get_form">
                <div class="get_form_inner">
                  <div class="get_form_inner_text">
                    <h3>Order List</h3>
                  </div>
                  {orderlist?.filter(
                    (record) => Number(record?.userId) === Number(userData?.id)
                  )?.length > 0 ? (
                    <table class="content-table">
                      <thead>
                        <tr>
                          <th>InvoiceNo</th>
                          <th>Image</th>
                          <th>Product</th>
                          <th>Quntity</th>
                          <th>Price</th>
                          <th>Tax</th>
                          <th>Ratting</th>
                          <th>Payment</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderlist
                          ?.filter(
                            (record) =>
                              Number(record?.userId) === Number(userData?.id)
                          )
                          ?.map((record, idx) => {
                            return (
                              <>
                                {record?.order?.map((obj, i) => {
                                  var stars = obj.comment.map((e1) =>
                                      Number(e1?.rating || 0)
                                    ),
                                    count = 0,
                                    sum = stars.reduce(function (
                                      sum,
                                      item,
                                      index
                                    ) {
                                      count += item;
                                      return sum + item * (index + 1);
                                    },
                                    0);
                                  return (
                                    <>
                                      <tr
                                        onClick={() =>
                                          onInvoiceClick(record?.invoiceNo)
                                        }
                                        className={
                                          i % 2 == 0 ? "" : "active-row"
                                        }
                                      >
                                        <td>{record?.invoiceNo}</td>
                                        <td>
                                          <img
                                            src={require(`../Assets/${obj.thumbnail}`)}
                                            alt=""
                                          />
                                        </td>
                                        <td>{obj?.title}</td>
                                        <td>{obj?.quntity}</td>
                                        <td>${obj?.price}</td>
                                        <td>$13</td>
                                        <td>
                                          <StarRating
                                            count={5}
                                            size={40}
                                            value={sum / count}
                                            activeColor={"rgb(202, 179, 7)"}
                                            inactiveColor={"#ddd"}
                                            // onChange={handleChange}
                                          />
                                        </td>
                                        <td className="success">SUCCESS</td>
                                        <td>
                                          <i className="fa fa-eye" />
                                        </td>
                                      </tr>
                                    </>
                                  );
                                })}
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <div className="no-data">No Data Found</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
