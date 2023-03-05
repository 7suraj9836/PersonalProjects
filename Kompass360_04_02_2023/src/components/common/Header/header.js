import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./scss/header.scss";

export default function Header() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="header-main">
      <div id="content-wrapper" className="d-flex flex-column admin">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-dark bg-dark topbar static-top">
            {/* Sidebar Toggle (Topbar) */}
           
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-lg-none rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>
            {/* Topbar Search */}
            <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              
            </div>
            <Button style={{ color: "white" }} onClick={Logout}>
              LOGOUT
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
