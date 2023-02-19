import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import productData from "../mock/productData";
import StarRating from "./StarRating";

export default function Invoice() {
  const { invoiceNo } = useParams();
  let orderlist = localStorage.getItem("orderlist");
  orderlist = orderlist ? JSON.parse(orderlist) : [];
  let orderInfo1 = orderlist?.find(
    (obj) => Number(obj?.invoiceNo) === Number(invoiceNo)
  );
  const [orderInfo, setOrderInfo] = useState(orderInfo1);
  let userData = localStorage.getItem("userData");
  userData = userData && JSON.parse(userData);
  let productsData = localStorage.getItem("productData");
  productsData = productsData
    ? JSON.parse(productsData)
    : localStorage.setItem("productData", JSON.stringify(productData));
  const [commit, setCommit] = useState("");
  const [rating, setRating] = useState(0);

  const handleChange = (value) => {
    setRating(value);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (orderInfo && !Object.keys(orderInfo)?.length) {
      navigate("/");
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onSubmitComment = (e) => {
    e?.preventDefault();
    if (commit === "") {
      toast.error("Please enter comment.");
    } else {
      const data = { ...orderInfo };
      for (let i in data.order) {
        data.order[i].comment.push({
          id: userData.id,
          email: userData.email,
          username: userData.username,
          rating: rating,
          comment: commit,
        });
        let findIndex = productsData.findIndex(
          (e) => e.id === data.order[i].id
        );
        productsData[findIndex].comment = data.order[i].comment;
        localStorage.setItem("productData", JSON.stringify(productsData));
      }
      let indexOrder = orderlist?.findIndex(
        (obj) => Number(obj?.invoiceNo) === Number(invoiceNo)
      );
      if (indexOrder !== -1) {
        console.log(orderlist[indexOrder]);
        orderlist[indexOrder] = data;
        localStorage.setItem("orderlist", JSON.stringify(orderlist));
      }
      setOrderInfo(data);
      toast.success("Success.");
      setCommit("");
      setRating(0);
    }
  };
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitComment(e);
    }
  };
  return (
    <React.Fragment>
      <main>
        <div className="invoice-box">
          <table>
            <tr class="top">
              <td colspan="4">
                <table>
                  <tr>
                    <td class="title">Jack's Wholesale</td>
                    <td></td>
                    <td></td>
                    <td>
                      Invoice #: {orderInfo.invoiceNo}
                      <br />
                      Created : {new Date(orderInfo.createDate).getDate()}/
                      {new Date(orderInfo.createDate).getMonth()}/
                      {new Date(orderInfo.createDate).getFullYear()}
                      <br />
                      Due : {new Date(orderInfo.dueDate).getDate()}/$
                      {new Date(orderInfo.dueDate).getMonth()}/
                      {new Date(orderInfo.dueDate).getFullYear()}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information ">
              <td colspan="4">
                <table>
                  <tr>
                    <td>
                      <b>Address : </b>
                      <br />
                      {orderInfo.addre}, {orderInfo.city}.<br />
                      {orderInfo.province}, {orderInfo.postco}
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      {orderInfo.na}.<br />
                      {orderInfo.ema}
                      <br />
                      {orderInfo.pho}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>
              <td></td>
              <td></td>
              <td>Check #</td>
            </tr>

            <tr class="details">
              <td>Credit Card</td>
              <td></td>
              <td></td>
              <td>Success</td>
            </tr>

            <tr class="heading">
              <td>Item</td>
              <td>Quntity</td>
              <td>Unit Price</td>
              <td>Total Price</td>
            </tr>
            {orderInfo.order?.map((item) => {
              return (
                <tr class="item">
                  <td class="item-invoice">
                    <img src={require(`../Assets/${item.thumbnail}`)} alt="" />
                    <p>{item.title}</p>
                  </td>
                  <td>{item.quntity}</td>
                  <td>${item.price}</td>
                  <td>${item.price * Number(item.quntity)}.00</td>
                </tr>
              );
            })}
            <tr class="total">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Sub Total: </b>&nbsp;&nbsp;&nbsp;${orderInfo.subtotal}.00
              </td>
            </tr>

            <tr class="total">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Tax: </b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$
                {orderInfo.totalTax}.00
              </td>
            </tr>

            <tr class="total">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Total: </b>&nbsp;&nbsp;&nbsp;${orderInfo.total}.00
              </td>
            </tr>
          </table>
          <div className="small-container">
            <div className="row comment-title">
              <h2>Comments</h2>
            </div>
            {orderInfo.order?.map((item) => {
              return (
                <div className="comment-box">
                  <div className="product-title">
                    <h4>
                      <u>{item.title}</u>
                    </h4>
                  </div>
                  <div className="comment-item">
                    {item?.comment?.length > 0 ? (
                      item?.comment?.map((record) => {
                        return (
                          <div className="comment-items">
                            <div className="username-icon">
                              <Avatar
                                name={record.username}
                                size={"32px"}
                                color="linear-gradient(106.18deg, #AE4294 3.6%, #6D55DF 98.55%)"
                                round
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            <div className="comment-text">
                              <h4>{record?.username}</h4>
                              <span>{record?.comment}</span>
                              <StarRating
                                count={5}
                                size={40}
                                value={record?.rating}
                                activeColor={"rgb(202, 179, 7)"}
                                inactiveColor={"#ddd"}
                                // onChange={handleChange}
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <span className="no-comment">No Comment Found.</span>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="comment-box">
              <div className="comment-alignment">
                <input
                  type="text"
                  name="commit"
                  value={commit}
                  onChange={(e) => setCommit(e.target.value)}
                  onKeyDown={(e) => onEnter(e)}
                  placeholder="Comment..."
                />
                <StarRating
                  count={5}
                  size={40}
                  value={rating}
                  activeColor={"rgb(202, 179, 7)"}
                  inactiveColor={"#ddd"}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group-btn-commit">
                <button
                  className="btn btn-default"
                  onClick={(event) => onSubmitComment(event)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
