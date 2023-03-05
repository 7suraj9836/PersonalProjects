import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import routeNames from "../../../routes/routeName";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import { MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const CreateRequesterDepartment = ({
  mode,
  setCreationState,
  departmentData,
}) => {
  const location = useLocation();
  const [departmentID, setdepartmentID] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [bcNumber, setBCNumber] = useState("");
  const [gln, setGLN] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contact, setContact] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };
  useEffect(() => {
    mode = location.state.mode;
    departmentData = location.state.departmentData;
    setPageMode(mode);
    if (mode === Modes.edit) {
      setdepartmentID(departmentData.departmentID);
      setTitle(departmentData.title);
      setBCNumber(departmentData.bcNumber);
      setGLN(departmentData.gln);
      setAddress(departmentData.address);
      setAddress2(departmentData.address2);
      setCity(departmentData.city);
      setPostalCode(departmentData.postalCode);
      setCountryCode(departmentData.countryCode);
      setContact(departmentData.contact);
      setCustomerNumber(departmentData.customerNumber);
      setTelephone(departmentData.telephone);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("title is required");
    } else {
      setTitleError("");

      if (true) {
        let formData = new FormData();

        let fileArray = [];
        if (files !== null) {
          for (let index = 0; index < files.length; index++) {
            const element = files[index];
            fileArray.push(element);
          }
        }
        formData.append(`attachedFiles`, fileArray);
        formData.append(`departmentID`, departmentID);
        formData.append(`title`, title);
        formData.append(`bcNumber`, bcNumber);
        formData.append(`gln`, gln);
        formData.append(`address`, address);
        formData.append(`telephone`, telephone);
        formData.append(`address2`, address2);
        formData.append(`city`, city);
        formData.append(`postalCode`, postalCode);
        formData.append(`countryCode`, countryCode);
        formData.append(`contact`, contact);
        formData.append(`customerNumber`, customerNumber);
        formData.append(`telephone`, telephone);

        if (pageMode === Modes.create) {
          Axios.post(
            // formData

            `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/SaveRequesterDepartment`,
            formData
          )

            .then((response) => {
              console.log(response);
              Swal.fire(
                "Save",
                "Requester Department Saved Sucessfully",
                "success"
              );
              navigate(routeNames.REQUESTERDEPARTMENT);
              //   navigate("/REQUESTERDEPARTMENT");
              //   setCreationState(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          formData["departmentID"] = location.state.departmentData.departmentID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/SaveRequesterDepartment`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire(
                "Save",
                "Requester Department Updated Sucessfully",
                "success"
              );
              navigate(routeNames.REQUESTERDEPARTMENT);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  const handleEdit = () => {};
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>
          {pageMode === Modes.create ? "Add New" : "Edit"} RequesterDepartment
        </h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Title
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            BCNumber
          </label>
          <input
            type="email"
            value={bcNumber}
            onChange={(e) => setBCNumber(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            GLN
          </label>
          <input
            type="email"
            value={gln}
            onChange={(e) => setGLN(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Address
          </label>
          <input
            type="email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Address2
          </label>
          <input
            type="email"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            City
          </label>
          <input
            type="email"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            PostalCode
          </label>
          <input
            type="email"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            CountryCode
          </label>
          <input
            type="email"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact
          </label>
          <input
            type="email"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            CustomerNumber
          </label>
          <input
            type="text"
            value={customerNumber}
            onChange={(e) => setCustomerNumber(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Telephone
          </label>
          <input
            type="text"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label for="formFile" className="form-label">
            Attach file
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => handleFileChange(e)}
            multiple
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary A2"
        >
          {pageMode === Modes.create ? "Save" : "Update"}
        </button>{" "}
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.REQUESTERDEPARTMENT}
            style={{
              textDecoration: "none",
              color: "White",
              paddingBottom: "20px",
            }}
          >
            Cancel
          </Link>
        </button>
      </div>
    </div>
  );
};
export default CreateRequesterDepartment;
