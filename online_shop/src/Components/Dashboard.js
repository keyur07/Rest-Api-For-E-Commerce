import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productData from "../mock/productData";

export default function Dashboard() {
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
  };
  return (
    <React.Fragment>
      <header className="header2">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <h1>Start selling online</h1>
              <p>
                Success isn't always about greatness, It's about consistency.
                Consistent
                <br />
                hard work gains success. Greatness will come.
              </p>
              <Link to="/product" className="btn">
                Explore Now &#8594;
              </Link>
            </div>
            <div className="col-2">
              <img
                src={require("../Assets/img/online-store.png")}
                alt="image1"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="categories">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <img
                  src={require("../Assets/img/category-1.png")}
                  alt="categories"
                />
              </div>
              <div className="col-3">
                <img
                  src={require("../Assets/img/laptop-1.png")}
                  alt="categories"
                />
              </div>
              <div className="col-3">
                <img
                  src={require("../Assets/img/category-2.png")}
                  alt="categories"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="small-container">
          <h2 className="title">Featured Product</h2>
          <div className="row grid-item">
            {products?.slice(0, 4)?.map((data, index) => {
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
        </section>

        <section className="small-container">
          <h2 className="title">Latest Product</h2>
          <div className="row grid-item">
            {products?.slice(5, 13)?.map((data, index) => {
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
        </section>

        <section className="testimonial">
          <div className="small-container">
            <div className="row">
              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  I am unable to contact their customer care , neither any book
                  delivered. App simply shows scheduled for delivery . after few
                  days,
                </p>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <img src={require("../Assets/img/user-1.png")} alt="user-1" />
                <h3>Sean Parker</h3>
              </div>
              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  Best book store all books are available shopkeeper are very
                  humble we can easily access all books without any problem.
                </p>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <img src={require("../Assets/img/user-2.png")} alt="user-1" />
                <h3>Kor Parker</h3>
              </div>
              <div className="col-3">
                <i className="fa fa-quote-left"></i>
                <p>
                  Way of talking of shopkeeper is very bad.. he is such a
                  nonsense person.. he give me old book in a new book price ..
                  not recommended for anyone
                </p>
                <div className="rating">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-o"></i>
                </div>
                <img src={require("../Assets/img/user-3.png")} alt="user-1" />
                <h3>Mabel Parker</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
