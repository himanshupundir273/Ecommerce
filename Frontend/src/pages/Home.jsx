import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <Header/>
      <CategoryList />
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches "}/>
      <VerticalCardProduct category={"mobiles"} heading={"Popular's Mobiles "}/>
      <VerticalCardProduct category={"Mouse"} heading={"Popular's Mouse "}/>
      <VerticalCardProduct category={"camera"} heading={"Popular's Camera "}/>
      <VerticalCardProduct category={"printers"} heading={"Popular's Printers "}/>
      <VerticalCardProduct category={"processor"} heading={"Popular's Processor "}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Popular's Refrigerator "}/>
      <VerticalCardProduct category={"speakers"} heading={"Popular's Speakers "}/>
      <VerticalCardProduct category={"televisions"} heading={"Popular's Televisions "}/>
      <VerticalCardProduct category={"trimmers"} heading={"Popular's Trimmers "}/>
    </div>
  );
}

export default Home;
