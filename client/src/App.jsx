import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./components/OurStory";
import Feed from "./components/Feed";
import OurStoryHeader from "./components/OurStoryHeader";
import MemberShip from "./components/MemberShip";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderSwitcher />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/member" element={<MemberShip />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HeaderSwitcher() {
  const location = useLocation();

  if(location.pathname === "/feed"){
    return null
  }

  if(location.pathname === "/ourstory" || location.pathname === "/member"){
    return <OurStoryHeader />
  }

  return <Header />

  
  // return location.pathname === "/ourstory" ||
  //   location.pathname === "/member" ? (
  //   <OurStoryHeader />
  // ) : (
  //   <Header />
  // );
}

export default App;
