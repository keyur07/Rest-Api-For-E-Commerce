import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  let cartData = localStorage.getItem("cartData");
  cartData = cartData ? JSON.parse(cartData) : [];
  let userData = localStorage.getItem("userData");
  userData = userData ? JSON.parse(userData) : [];
  let orderlist = localStorage.getItem("orderlist");
  orderlist = orderlist ? JSON.parse(orderlist) : [];

  const [modal, setModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [purchaseInput, setPurchaseInput] = useState();
  const [cartItem, setCart] = useState(cartData || []);
  const navigate = useNavigate();

  const onClickProductDetails = (id) => {
    let data = cartData.find((e) => e.id === id);
    localStorage.setItem("singleProductDetails", JSON.stringify(data));
    navigate(`/product-details/${id}`);
  };

  const remove = (id) => {
    let cartDataList = [...cartItem];
    cartDataList = cartDataList.filter((e) => Number(e.id) !== Number(id));
    localStorage.setItem("cartData", JSON.stringify(cartDataList));
    setCart(cartDataList);
    toast.error("Item remove Successfully.");
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onChangeQuntity = (event, id) => {
    if (event.target.value !== "0") {
      let findIndex = cartItem?.findIndex((e) => e.id === id);
      if (findIndex !== -1) {
        cartItem[findIndex].quntity = Number(event.target.value);
      }
      let cartData = localStorage.getItem(`cartData`);
      cartData = cartData ? JSON.parse(cartData) : [];
      let index = cartData.findIndex((e) => Number(e.id) === Number(id));
      if (index !== -1) {
        cartData[index].quntity =
          Number(event.target.value) > 0 ? event.target.value : 0;
      }
      localStorage.setItem("cartData", JSON.stringify(cartData));
      setCart([...cartItem]);
    }
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPurchaseInput({
      ...purchaseInput,
      [name]: value,
    });
  };

  const validateFrom = () => {
    let error = {};
    const min = 3,
      max = 25;
    const isBetween = (length, min, max) =>
      length < min || length > max ? false : true;
    const isPhoneValid = (p) => {
      var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
      var digits = p.replace(/\D/g, "");
      return phoneRe.test(digits);
    };

    const isCreditCardNumberValid = (card_number) => {
      var cc =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;

      return cc.test(card_number);
    };

    const isEmailValid = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };
    if (!purchaseInput?.na) {
      error["na"] = "Name cannot be blank.";
    } else if (!isBetween(purchaseInput?.na.length, min, max)) {
      error["na"] = `Name must be between ${min} and ${max} characters.`;
    }
    if (!purchaseInput?.addre) {
      error["addre"] = "Address cannot be blank.";
    } else if (!isBetween(purchaseInput?.addre.length, min, max)) {
      error["addre"] = `Address must be between ${min} and ${max} characters.`;
    }
    if (!purchaseInput?.postco) {
      error["postco"] = "Postcode cannot be blank.";
    }
    if (!purchaseInput?.expMonth) {
      error["expMonth"] = "Expiration Mpnth cannot be blank.";
    }
    if (!purchaseInput?.expYear) {
      error["expYear"] = "Expiration Year cannot be blank.";
    }
    if (!purchaseInput?.cardNumber) {
      error["cardNumber"] = "Card Number cannot be blank.";
    } else if (
      !isCreditCardNumberValid(purchaseInput?.cardNumber.replace(/\s/g, ""))
    ) {
      error["cardNumber"] = "Card Number is not valid. ";
    }
    if (!purchaseInput?.city) {
      error["city"] = "City cannot be blank.";
    }
    if (!purchaseInput?.province) {
      error["province"] = "Province cannot be blank.";
    }
    if (!purchaseInput?.cvv) {
      error["cvv"] = "CVV cannot be blank.";
    }
    if (!purchaseInput?.owner) {
      error["owner"] = "Owner cannot be blank.";
    }
    if (!purchaseInput?.pho) {
      error["pho"] = "phone cannot be blank.";
    } else if (!isPhoneValid(purchaseInput?.pho)) {
      error["pho"] = "Phone is not valid.";
    }
    if (!purchaseInput?.ema) {
      error["ema"] = "email cannot be blank.";
    } else if (!isEmailValid(purchaseInput?.ema)) {
      error["ema"] = "email is not valid.";
    }

    if (Object.keys(error)?.length) {
      setErrors(error);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const onPurchase = (e) => {
    e.preventDefault();
    if (validateFrom()) {
      let subtotal = 0;
      let total = 0;
      subtotal = cartItem.reduce((accumulator, object) => {
        return accumulator + object.price * object.quntity;
      }, 0);
      let totalTax = cartItem?.length ? 13 : 0;
      total = subtotal + totalTax;
      var duedate = new Date();
      duedate.setDate(duedate.getDate() + 2);
      let userInfo = {
        ...purchaseInput,
        order: cartItem,
        subtotal: subtotal,
        userId: userData?.id,
        total: total,
        totalTax: totalTax,
        createDate: new Date(),
        invoiceNo: +new Date(),
        dueDate: duedate,
      };
      orderlist.push(userInfo);
      localStorage.setItem("orderlist", JSON.stringify(orderlist));
      localStorage.setItem("orderInfo", JSON.stringify(userInfo));
      localStorage.removeItem("cartData");
      localStorage.removeItem("singleProductDetails");
      toast.success("Order Successfully Created.");
      navigate(`/invoice/${userInfo.invoiceNo}`);
    }
  };

  const onKeyDown = (event) => {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  };

  const handleCardChange = (e) => {
    var cardNumber = e.target.value;

    // Do not allow users to write invalid characters
    var formattedCardNumber = cardNumber.replace(/[^\d]/g, "");
    formattedCardNumber = formattedCardNumber.substring(0, 16);

    // Split the card number is groups of 4
    var cardNumberSections = formattedCardNumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null) {
      formattedCardNumber = cardNumberSections.join(" ");
    }

    setPurchaseInput({
      ...purchaseInput,
      [e.target.name]: formattedCardNumber,
    });
  };

  return (
    <React.Fragment>
      <main className="small-container cart-page main-container">
        <section>
          {cartItem?.length > 0 ? (
            <table>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Quntity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
              {cartItem?.map((record, i) => {
                return (
                  <tr>
                    <td>
                      {" "}
                      <span
                        className="close-cart"
                        onClick={() => remove(record.id)}
                      >
                        &times;
                      </span>
                    </td>
                    <td>
                      <div className="cart-info">
                        <img
                          src={require(`../Assets/${record.thumbnail}`)}
                          onClick={() => onClickProductDetails(record.id)}
                        />
                        <div>
                          <p>${record.title}</p>
                          <small id={`small-price-${record.id}`}>
                            Price: ${record.price * record.quntity}.00
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        id={`quntity-${record.id}`}
                        name="quntity"
                        value={record.quntity}
                        onChange={(event) => onChangeQuntity(event, record.id)}
                      />
                    </td>
                    <td>${record.price}.00</td>
                    <td id={`price-${record.id}`}>
                      ${record.price * record.quntity}.00
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <div>
              <div className="no-data">No Data Found</div>
            </div>
          )}
        </section>
        <section>
          <div className="total-price">
            {cartItem?.length > 0 && (
              <table>
                <tr>
                  <td>Subtotal</td>
                  <td>
                    $
                    {cartItem?.reduce((accumulator, object) => {
                      return accumulator + object.price * object.quntity;
                    }, 0)}
                    .00
                  </td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>$13.00</td>
                </tr>
                <tr>
                  <td>Sales Total</td>
                  <td>
                    $
                    {cartItem.reduce((accumulator, object) => {
                      return accumulator + object.price * object.quntity;
                    }, 0) + (cartData?.length ? 13 : 0)}
                    .00
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <button className="btn" onClick={() => showModal()}>
                      Check-out
                    </button>
                  </td>
                </tr>
              </table>
            )}
          </div>
        </section>
      </main>

      {modal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => hideModal()}>
              &times;
            </span>
            <div className="heading">
              <h1>Confirm Purchase</h1>
            </div>
            <div className="creditCardForm">
              <div className="payment">
                <form>
                  <div
                    className={
                      errors["na"] ? "error form-group name" : "form-group name"
                    }
                  >
                    <label for="name">
                      Name <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="na"
                      value={purchaseInput?.na}
                      onChange={handleChange}
                      placeholder="Enter Your Name..."
                    />
                    <small>{errors["na"]}</small>
                  </div>

                  <div
                    className={
                      errors["pho"]
                        ? "error form-group phone"
                        : "form-group phone"
                    }
                  >
                    <label for="phone">
                      Phone <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      onKeyPress={(e) => onKeyDown(e)}
                      name="pho"
                      value={purchaseInput?.pho}
                      onChange={handleChange}
                      placeholder="Enter Your Phone..."
                    />
                    <small>{errors["pho"]}</small>
                  </div>
                  <div
                    className={
                      errors["ema"]
                        ? "error form-group email"
                        : "form-group email"
                    }
                  >
                    <label for="email">
                      Email <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="ema"
                      value={purchaseInput?.ema}
                      onChange={handleChange}
                      placeholder="Enter Your Email..."
                    />
                    <small>{errors["ema"]}</small>
                  </div>
                  <div
                    className={
                      errors["addre"]
                        ? "error form-group name"
                        : "form-group name"
                    }
                  >
                    <label for="Address">
                      Address <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Address"
                      name="addre"
                      value={purchaseInput?.addre}
                      onChange={handleChange}
                      placeholder="Enter Your Address..."
                    />
                    <small>{errors["addre"]}</small>
                  </div>
                  <div
                    className={
                      errors["postco"]
                        ? "error form-group phone"
                        : "form-group phone"
                    }
                  >
                    <label for="Postcode">
                      Postcode <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Postcode"
                      name="postco"
                      value={purchaseInput?.postco}
                      onChange={handleChange}
                      placeholder="Enter Your Postcode..."
                    />
                    <small>{errors["postco"]}</small>
                  </div>
                  <div
                    className={
                      errors["city"]
                        ? "error form-group name"
                        : "form-group name"
                    }
                  >
                    <label for="City">
                      City <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="City"
                      value={purchaseInput?.city}
                      name="city"
                      onChange={handleChange}
                      placeholder="Enter Your City..."
                    />
                    <small>{errors["city"]}</small>
                  </div>
                  <div
                    className={
                      errors["province"]
                        ? "error form-group phone"
                        : "form-group phone"
                    }
                  >
                    <label for="Province">
                      Province <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="Province"
                      value={purchaseInput?.province}
                      name="province"
                      onChange={handleChange}
                      placeholder="Enter Your Province..."
                    />
                    <small>{errors["province"]}</small>
                  </div>
                  <div
                    className={
                      errors["owner"]
                        ? "error form-group owner"
                        : "form-group owner"
                    }
                  >
                    <label for="owner">
                      Owner <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="owner"
                      name="owner"
                      value={purchaseInput?.owner}
                      onChange={handleChange}
                      placeholder="Enter Your Owner..."
                    />
                    <small>{errors["owner"]}</small>
                  </div>
                  <div
                    className={
                      errors["cvv"] ? "error form-group CVV" : "form-group CVV"
                    }
                  >
                    <label for="cvv">
                      CVV <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      onKeyPress={(e) => onKeyDown(e)}
                      value={purchaseInput?.cvv}
                      onChange={handleChange}
                      placeholder="Enter Your CVV..."
                    />
                    <small>{errors["cvv"]}</small>
                  </div>
                  <div
                    className={
                      errors["cardNumber"] ? "error form-group " : "form-group "
                    }
                    id="card-number-field"
                  >
                    <label for="cardNumber">
                      Card Number <span className="madatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      onKeyPress={(e) => onKeyDown(e)}
                      name="cardNumber"
                      value={purchaseInput?.cardNumber}
                      onChange={handleCardChange}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                    <small>{errors["cardNumber"]}</small>
                  </div>
                  <div
                    className={
                      errors["expMonth"] || errors["expYear"]
                        ? "error form-group "
                        : "form-group "
                    }
                  >
                    <label>
                      Expiration Date <span className="madatory">*</span>
                    </label>
                    <select
                      id="expiration-month"
                      name="expMonth"
                      value={purchaseInput?.expMonth}
                      onChange={handleChange}
                    >
                      <option value="" selected>
                        MM
                      </option>
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                    <select
                      id="expiration-year"
                      name="expYear"
                      value={purchaseInput?.expYear}
                      onChange={handleChange}
                    >
                      <option value="" selected>
                        YYYY
                      </option>
                      <option value="16">2016</option>
                      <option value="17">2017</option>
                      <option value="18">2018</option>
                      <option value="19">2019</option>
                      <option value="20">2020</option>
                      <option value="21">2021</option>
                      <option value="21">2022</option>
                      <option value="21">2023</option>
                      <option value="21">2024</option>
                      <option value="21">2025</option>
                    </select>
                    <small>{errors["expMonth"] || errors["expYear"]}</small>
                  </div>
                  <div className="form-group" id="credit_cards">
                    <img src={require("../Assets/img/visa.jpg")} id="visa" />
                    <img
                      src={require("../Assets/img/mastercard.jpg")}
                      id="mastercard"
                    />
                    <img src={require("../Assets/img/amex.jpg")} id="amex" />
                  </div>
                </form>
              </div>
            </div>
            <div className="form-group-btn" id="pay-now">
              <button
                type="submit"
                className="btn btn-default"
                id="confirm-purchase"
                onClick={(event) => onPurchase(event)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
