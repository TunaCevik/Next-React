import React from "react";
import MainHeader from "../components/MainHeader";
import { Outlet } from "react-router-dom"; // childrenlar nereye yazılsın ona kara veriyor
function RootLayout() {
  return (
    <>
      <MainHeader></MainHeader>
      <Outlet></Outlet>
    </>
  );
}

export default RootLayout;
