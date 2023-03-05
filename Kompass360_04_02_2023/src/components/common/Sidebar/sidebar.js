import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import "./sidebar1.css";
import { RiHome2Line } from "react-icons/ri";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Cases, Dashboard, Policy, Subject } from "@mui/icons-material";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import InsightsIcon from "@mui/icons-material/Insights";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <ul
        className="navbar-nav bg-black sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Kompass 360</div>
        </Link>
        <li className="nav-item ">
          <Link to="/" className="nav-link px-0 align-middle">
            <Dashboard />
            <span className="ms-1 d-none d-sm-inline">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/case" className="nav-link px-0 align-middle">
            <Cases />
            <span className="ms-1 d-none d-sm-inline">Case</span>
          </Link>
        </li>
        <li>
          <Link to="/subject" className="nav-link px-0 align-middle">
            <Subject />
            <span className="ms-1 d-none d-sm-inline">The Subject</span>
          </Link>
        </li>
        <li>
          <Link to="/inspection" className="nav-link px-0 align-middle">
            <InsertChartIcon />
            <span className="ms-1 d-none d-sm-inline">Inspection</span>
          </Link>
        </li>

        <li>
          <Link to="/territory" className="nav-link px-0 align-middle">
            <RiHome2Line />
            <span className="ms-1 d-none d-sm-inline">Territory</span>
          </Link>
        </li>

        <li>
          <Link to="/subjecttype" className="nav-link px-0 align-middle">
            <Policy />

            <span className="ms-1 d-none d-sm-inline">SubjectType</span>
          </Link>
        </li>
        <li>
          <Link to="/specifictopic" className="nav-link px-0 align-middle">
            <ImageAspectRatioIcon />
            <span className="ms-1 d-none d-sm-inline">Specific Topic</span>
          </Link>
        </li>

        <li>
          <Link
            to="/installationaddress"
            className="nav-link px-0 align-middle"
          >
            <ArchiveIcon />
            <span className="ms-1 d-none d-sm-inline">
              Installation Address
            </span>
          </Link>
        </li>

        <li>
          <Link to="/requester" className="nav-link px-0 align-middle">
            <RequestPageIcon />
            <span className="ms-1 d-none d-sm-inline">Requester</span>
          </Link>
        </li>

        <li>
          <Link to="/inspectiontype" className="nav-link px-0 align-middle">
            <InsightsIcon />
            <span className="ms-1 d-none d-sm-inline">Inspection Type</span>
          </Link>
        </li>
        <li>
          <Link
            to="/requesterdepartment"
            className="nav-link px-0 align-middle"
          >
            <RiHome2Line />
            <span className="ms-1 d-none d-sm-inline">
              Requester Department
            </span>
          </Link>
        </li>
        <li>
          <Link to="/employee" className="nav-link px-0 align-middle">
            <Policy />
            <span className="ms-1 d-none d-sm-inline">Employee</span>
          </Link>
        </li>
        <li>
          <Link to="/contact" className="nav-link px-0 align-middle">
            <RiHome2Line />
            <span className="ms-1 d-none d-sm-inline">Contact</span>
          </Link>
        </li>

        {/*<li>
          <Link to="/usermodule" className="nav-link px-0 align-middle">
            <RiHome2Line />
            <span className="ms-1 d-none d-sm-inline">User</span>
          </Link>
        </li>
       <li>
          <Link
            to="/inspectionCertificate"
            className="nav-link px-0 align-middle"
          >
            <RiHome2Line />
            <span className="ms-1 d-none d-sm-inline">
              Inspection Certificate
            </span>
          </Link>
  </li>*/}
      </ul>
    </div>
  );
}
