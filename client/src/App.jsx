import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import OurStory from "./components/OurStory";
import Feed from "./components/Feed";
import OurStoryHeader from "./components/OurStoryHeader";
import MemberShip from "./components/MemberShip";
import Write from "./components/write";
import CardDetails from "./components/cardDetails";

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
          <Route path="/write" element={<Write />} />
          <Route path="/card-details/:id" element={<CardDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function HeaderSwitcher() {
  const location = useLocation();

  if (
    location.pathname === "/feed" ||
    location.pathname === "/write" ||
    location.pathname.startsWith("/card-details/")
  ) {
    return null;
  }

  if (location.pathname === "/ourstory" || location.pathname === "/member") {
    return <OurStoryHeader />;
  }

  return <Header />;
}


export default App;
