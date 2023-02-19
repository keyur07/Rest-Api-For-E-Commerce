import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import productData from "../mock/productData";

export default function Product() {
  let productsData = localStorage.getItem("productData");
  productsData = productsData
    ? JSON.parse(productsData)
    : localStorage.setItem("productData", JSON.stringify(productData));
  const [products, setProducts] = useState(productsData || []);
  const navigate = useNavigate();
  const onChangeQuntityProduct = (event, id) => {
    if (event.target.value !== "0") {
      let findIndex = products?.findIndex((e) => e.id === id);
      if (findIndex !== -1) {
        products[findIndex].quntity = Number(event.target.value);
      }
      setProducts([...products]);
    }
  };
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const onClickProductDetails = (id) => {
    let data = products.find((e) => e.id === id);
    localStorage.setItem("singleProductDetails", JSON.stringify(data));
    navigate(`/product-details/${id}`);
  };

  const onAddCart = (id) => {
    let data = products.find((e) => e.id === id);
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
  return (
    <React.Fragment>
      <main>
        <div className="small-container">
          <div className="row row-2">
            <h2>All Products</h2>
            <select>
              <option>Default Shorting</option>
              <option>Short by price</option>
            </select>
          </div>

          <div className="row grid-item">
            {products?.map((data, index) => {
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
                        onChange={(event) =>
                          onChangeQuntityProduct(event, data.id)
                        }
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
          <div className="page-btn">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>&#8594;</span>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
