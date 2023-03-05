import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const CreateInstallationAddress = ({ mode, installationAddressData }) => {
  const location1 = useLocation();
  const [installationAddressID, setInstallationAddressID] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [addressName, setAddressName] = useState("");
  const [location, setLocation] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    console.log(location1);
    mode = location1.state.mode;
    setPageMode(mode);
    installationAddressData = location1.state.installationAddressData;
    if (mode == Modes.edit) {
      console.log(installationAddressData);
      setInstallationAddressID(installationAddressData.installationAddressID);
      setTitle(installationAddressData.title);
      setLatitude(installationAddressData.latitude);
      setLongitude(installationAddressData.longitude);
      setDescription(installationAddressData.description);
      setZipCode(installationAddressData.zipcode);

      setTown(installationAddressData.town);
      setCountry(installationAddressData.country);
      setAddressName(installationAddressData.addressName);
      setLocation(installationAddressData.location);
      setCountryCode(installationAddressData.countryCode);
    }
  }, []);

  const [files, setFiles] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("Title is required");
    } else {
      setTitleError("");
      let formData = new FormData();

      let fileArray = [];
      if (files !== null) {
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          fileArray.push(element);
        }
      }
      formData.append(`attachedFiles`, fileArray);
      formData.append(`installationAddressID`, installationAddressID);
      formData.append(`title`, title);
      formData.append(`latitude`, latitude);
      formData.append(`longitude`, longitude);
      formData.append(`description`, description);
      formData.append(`zipcode`, zipcode);
      formData.append(`town`, town);
      formData.append(`country`, country);
      formData.append(`addressName`, addressName);
      formData.append(`location`, location);
      formData.append(`countryCode`, countryCode);

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}InstallationAddress/SaveInstallationAddress`,
          formData
        )
          .then((response) => {
            console.log(response.data);
            Swal.fire(
              "Save",
              "Installation Address  Saved Sucessfully",
              "success"
            );
            navigate(routeNames.INSTALLATIONADDRESS);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        formData["installationAddressID"] =
          location1.state.installationAddressData.installationAddressID;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}InstallationAddress/SaveInstallationAddress`,
          formData
        )
          .then((response) => {
            console.log(response.data);
            Swal.fire(
              "Save",
              "Installation Address Updated Sucessfully",
              "success"
            );
            navigate(routeNames.INSTALLATIONADDRESS);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  const handleEdit = () => {};

  return (
    <div className="Container">
      <div className="MainDiv">
        <hr />
        <h1>
          {pageMode === Modes.create ? "Add New" : "Edit"} InstallationAddress
        </h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            {" "}
            Title{" "}
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}
          <input
            type="email"
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
            Latitude
          </label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
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
            Longitude
          </label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
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
            Description
          </label>
          <textarea
            type="email"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Enter value here"
          ></textarea>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            ZIP Code
          </label>
          <input
            type="email"
            value={zipcode}
            onChange={(e) => setZipCode(e.target.value)}
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
            Town
          </label>
          <input
            type="email"
            value={town}
            onChange={(e) => setTown(e.target.value)}
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
            Country
          </label>
          <input
            type="email"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
            AddressName
          </label>
          <input
            type="email"
            value={addressName}
            onChange={(e) => setAddressName(e.target.value)}
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
            Location
          </label>
          <input
            type="email"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            Country Code
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
            to={routeNames.INSTALLATIONADDRESS}
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

export default CreateInstallationAddress;
