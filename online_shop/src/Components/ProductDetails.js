import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import productData from "../mock/productData";
import Avatar from "react-avatar";
import StarRating from "./StarRating";

export default function ProductDetails() {
  let productsData = localStorage.getItem("productData");
  productsData = productsData
    ? JSON.parse(productsData)
    : localStorage.setItem("productData", JSON.stringify(productData));
  let signleItem = localStorage.getItem("singleProductDetails");
  let userData = localStorage.getItem("userData");
  userData = userData && JSON.parse(userData);
  const [products, setProducts] = useState(productsData || []);
  const navigate = useNavigate();
  const [commit, setCommit] = useState("");
  const [rating, setRating] = useState(0);

  const handleChange = (value) => {
    setRating(value);
  };
  const [item, setItem] = useState(
    (signleItem && JSON.parse(signleItem)) || {}
  );

  const onChangeQuntityProduct = (event, id) => {
    if (event.target.value !== "0") {
      item.quntity = Number(event.target.value);
      localStorage.setItem("singleProductDetails", JSON.stringify(item));
      setItem({ ...item });
    }
  };
  const imgClick = (i) => {
    document.getElementById(
      "ProductImg"
    ).src = require(`../Assets/${item?.images[i]}`);
  };

  const onClickProductDetails = (id) => {
    let data = products.find((e) => e.id === id);
    localStorage.setItem("singleProductDetails", JSON.stringify(data));
    navigate(`/product-details/${id}`);
  };

  const onAddCart = (id) => {
    let data = productsData.find((e) => e.id === id);
    data.quntity = data.quntity ? data.quntity : 1;
    let cartData = localStorage.getItem("cartData");
    cartData = cartData ? JSON.parse(cartData) : [];
    if (cartData.length) {
      let index = cartData.findIndex((e) => e.id === data.id);
      if (index === -1) {
        cartData.push(data);
      } else {
        cartData[index] = data;
      }
    } else {
      cartData.push(data);
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));
    navigate(`/cart`);
    toast.success("Successfully added in cart.");
  };
  const onChangeQuntity = (event, id) => {
    if (event.target.value !== "0") {
      let findIndex = products?.findIndex((e) => e.id === id);
      if (findIndex !== -1) {
        products[findIndex].quntity = Number(event.target.value);
      }
      setProducts([...products]);
    }
  };

  const onSubmitComment = (e) => {
    e?.preventDefault();
    if (commit === "") {
      toast.error("Please enter comment.");
    } else {
      const newItem = { ...item };
      newItem.comment.push({
        id: userData.id,
        email: userData.email,
        username: userData.username,
        rating: rating,
        comment: commit,
      });
      let findIndex = products.findIndex((e) => e.id === item.id);
      products[findIndex].comment = newItem.comment;
      localStorage.setItem("singleProductDetails", JSON.stringify(newItem));
      localStorage.setItem("productData", JSON.stringify(products));
      setProducts(products);
      setCommit("");
      setRating(0);
    }
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitComment(e);
    }
  };
  return (
    <React.Fragment>
      <div className="small-container single-product">
        <div className="row">
          <div className="col-2">
            <img
              src={require(`../Assets/${item?.thumbnail}`)}
              alt=""
              className="ProductImg-small-img"
              id="ProductImg"
            />
            <div className="small-img-row">
              {item?.images?.map((record, i) => {
                return (
                  <div className="small-img-col" onClick={() => imgClick(i)}>
                    <img
                      src={require(`../Assets/${item?.images[i]}`)}
                      alt=""
                      className="small-img"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-2">
            <p>Home / {item?.category}</p>
            <h1>{item?.title}</h1>
            <h4>${item?.price}.00</h4>
            <input
              type="number"
              min="1"
              id="quntity-${item?.id}"
              name="quntity"
              value={item?.quntity}
              onChange={(event) => onChangeQuntityProduct(event, item?.id)}
            />
            <button
              type="submit"
              className="btn"
              onClick="onAddCart(${item?.id})"
            >
              Buy Now
            </button>
            <h3>
              Product Details <i className="fa fa-indent"></i>
            </h3>
            <br />
            <p>{item?.description}</p>
          </div>
        </div>
      </div>

      <div className="small-container">
        <div className="row">
          <h2>Comments</h2>
        </div>
        <div className="comment-item">
          {item?.comment?.map((record) => {
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
          })}
        </div>
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

      <div className="small-container">
        <div className="row row-2">
          <h2>Related Products</h2>
          <Link to="/product">
            <p>View more</p>
          </Link>
        </div>
      </div>

      <div className="small-container">
        <div className="row grid-item" id="rProduct">
          {products?.slice(5, 9)?.map((data, index) => {
            return (
              <div className="col-4 card-product">
                <img
                  className="img-alignment"
                  onClick={() => onClickProductDetails(data.id)}
                  src={require(`../Assets/${data.thumbnail}`)}
                  alt={`product-${index}`}
                />
                <div className="product-alignment">
                  <div className="product-title">
                    <h4>{data.title}</h4>
                    <p>${data.price}.00</p>
                  </div>
                  <div className="input-quntity">
                    <label for={`quntity-${data.id}`}>Quntity </label>
                    <input
                      type="number"
                      min="1"
                      id={`quntity-${data.id}`}
                      name="quntity"
                      value={data.quntity}
                      onChange={(event) => onChangeQuntity(event, data.id)}
                    />
                  </div>
                </div>
                <div className="button-alignment">
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => onAddCart(data.id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
}
