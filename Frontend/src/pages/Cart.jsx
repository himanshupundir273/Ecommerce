import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom"; // Add this import
import Context from "../context";
import { MdDelete } from "react-icons/md";
import displayCurrency from "../helpers/displayCurrency";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast"; // Add this import

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const navigate = useNavigate(); // Add this hook

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    try {
      const response = await fetch(SummaryApi.createorder.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice * 100, // Razorpay expects amount in paise
          currency: "INR",
        }),
        withCredentials: true,
        credentials: "include",
      });
      const order = await response.json();
      return order;
    } catch (err) {
      console.error("Error creating order:", err);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      // First delete all items from cart using deleteCartProduct
      const deletePromises = data.map((item) => deleteCartProduct(item._id));

      await Promise.all(deletePromises);

      // Then clear local state
      setData([]);

      // Update cart count in context
      if (context.fetchUserAddToCart) {
        await context.fetchUserAddToCart();
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // Add function to handle payment
  const handlePayment = async () => {
    try {
      const res = await initializeRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      const order = await createOrder();
      console.log("Order created:", order); // Add this to debug

      const options = {
        key: "rzp_test_Gej5qgBQm4Kzcm",
        amount: totalPrice * 100,
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase Description",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            console.log("Payment response:", response); // Add this to debug

            const verifyResponse = await fetch(SummaryApi.verifypayment.url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
              withCredentials: true,
              credentials: "include",
            });

            const verification = await verifyResponse.json();
            console.log("Verification response:", verification); // Add this to debug

            if (verification.success) {
              // Clear cart and show success message
              await clearCart(); // Clear the cart

              toast.success("Payment successful!");
              navigate("/", { replace: true });
            }
          } catch (err) {
            console.error("Verification error:", err); // Add this to debug
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "customer_contact",
        },
        theme: {
          color: "#2563EB",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed");
    }
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addtoCartProductView.url, {
      method: SummaryApi.addtoCartProductView.method,
      withCredentials: true,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log("cart response", responseData);

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      withCredentials: true,
      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        withCredentials: true,
        credentials: "include",

        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      withCredentials: true,
      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      await fetchData();
      await context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.selling,
    0
  );
  return (
    <div className="container mx-auto">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Customize toast styles
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "green",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "red",
            },
          },
        }}
      />
      <Header />

      <div className="text-center text-lg my-3 pt-16">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayCurrency(product?.productId?.selling)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayCurrency(
                            product?.productId?.selling * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayCurrency(totalPrice)}</p>
              </div>

              <button
                className="bg-blue-600 p-2 text-white w-full mt-2 hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                onClick={handlePayment}
                disabled={totalQty === 0}
              >
                Pay Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
