import { React, useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";
const Createrequester = ({ mode, requesterData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
  const [contact, setContact] = useState("");
  const [telephone, setTelephone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [bookkeepingEmail, setBookkeepingEmail] = useState("");
  const [billingNumber, setBillingNumber] = useState("");
  const [bcNumber, setBcNumber] = useState("");
  const [customerTypeID, setCustomerTypeID] = useState(0);
  const [customerTypeDropdownData, setCustomerTypeDropdownData] = useState([]);
  const [billingMethodID, setBillingMethodID] = useState(0);
  const [billingDropdownData, setBillingDropdownData] = useState([]);
  const [customerLibraryUrl, setCustomerLibraryUrl] = useState("");
  const [customerLibraryText, setCustomerLibraryText] = useState("");
  const [customerGroupID, setCustomerGroupID] = useState("");
  const [reportNameLogic, setReportNameLogic] = useState("");
  const [internalMessage, setInternalMessage] = useState("");
  const [notificationLetterTemplateUrl, setNotificationLetterTemplateUrl] =
    useState("");
  const [notificationLetterTemplateText, setNotificationLetterTemplateText] =
    useState("");
  const [agreementWithCustomer, setAgreementWithCustomer] = useState("");
  const [requesterID, setRequesterID] = useState(0);
  //code for file attach
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };
  const Swal = require("sweetalert2");
  //HandleChange

  const handleBillingMethodChange = (event) => {
    setBillingMethodID(event.target.value);
    // console.log(event.target.value, billingMethodDropdownData);
  };
  const handleCustomerTypeChange = (event) => {
    setCustomerTypeID(event.target.value);
  };
  //call Api
  const getAllBillingMethod = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllBillingMethod`
    );
    setBillingDropdownData(result.data);
  };
  const customerType = [
    { id: 1, name: "AEN" },
    { id: 2, name: "AGJ" },
    { id: 3, name: "AH" },
    { id: 4, name: "AMD" },
  ];

  useEffect(() => {
    getAllBillingMethod();
    setCustomerTypeDropdownData(customerType);
  }, []);

  useEffect(() => {
    mode = location.state.mode;
    requesterData = location.state.requesterData;
    console.log(requesterData);
    setPageMode(mode);
    if (mode == Modes.edit) {
      // console.log(requesterData);
      setRequesterID(requesterData.requesterID);
      setName(requesterData.name);
      setAddress(requesterData.address);
      setTown(requesterData.town);
      setContact(requesterData.contact);
      setTelephone(requesterData.telephone);
      setZipcode(requesterData.zipcode);
      setCountry(requesterData.country);
      setBookkeepingEmail(requesterData.bookkeepingEmail);
      setBillingNumber(requesterData.billingNumber);
      setBcNumber(requesterData.bcNumber);
      setCustomerTypeID(requesterData.customerTypeID);
      // setCustomerTypeName(requesterData.customerTypeName);
      setBillingMethodID(requesterData.billingMethodID);
      // setTitle(requesterData.billingMethodName);
      setCustomerLibraryUrl(requesterData.customerLibraryUrl);
      setCustomerLibraryText(requesterData.customerLibraryText);
      setCustomerGroupID(requesterData.customerGroupID);
      setReportNameLogic(requesterData.reportNameLogic);
      setInternalMessage(requesterData.internalMessage);
      setNotificationLetterTemplateUrl(
        requesterData.notificationLetterTemplateUrl
      );
      setNotificationLetterTemplateText(
        requesterData.notificationLetterTemplateText
      );
      setAgreementWithCustomer(requesterData.agreementWithCustomer);
      // setAttachedFiles(requesterData.attachedFiles);
    }
  }, []);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError("Name is required");
    } else {
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
        formData.append(`requesterID`, requesterID);
        formData.append(`name`, name);
        formData.append(`address`, address);
        formData.append(`town`, town);
        formData.append(`contact`, contact);
        formData.append(`telephone`, telephone);
        formData.append(`zipcode`, zipcode);
        formData.append(`country`, country);
        formData.append(`bookkeepingEmail`, bookkeepingEmail);
        formData.append(`billingNumber`, billingNumber);
        formData.append(`bcNumber`, bcNumber);
        formData.append(`customerTypeID`, customerTypeID);
        formData.append(`billingMethodID`, billingMethodID);
        formData.append(`customerLibraryUrl`, customerLibraryUrl);
        formData.append(`customerLibraryText`, customerLibraryText);
        formData.append(`customerGroupID`, customerGroupID);

        formData.append(`reportNameLogic`, reportNameLogic);
        formData.append(`internalMessage`, internalMessage);
        formData.append(
          `notificationLetterTemplateUrl`,
          notificationLetterTemplateUrl
        );
        formData.append(
          `notificationLetterTemplateText`,
          notificationLetterTemplateText
        );
        formData.append(`agreementWithCustomer`, agreementWithCustomer);

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Requester/SaveRequester`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Requester Saved Sucessfully", "success");
              navigate(routeNames.REQUESTER);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          formData["requesterID"] = location.state.requesterData.requeaterID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Requester/SaveRequester`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Requester Updated Sucessfully", "success");
              navigate(routeNames.REQUESTER);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Requester</h1>
        <div className="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Name
          </label>
          {nameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{nameError}</p>
          )}

          <input
            placeholder="enter value here"
            type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError("");
            }}
          />
        </div>
        <div className="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Address
          </label>

          <input
            placeholder="enter value here"
            type="text"
            required
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" className="form-label">
            Town
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            required
            className="form-control"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Contact
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Telephone
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            ZIP Code
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Country
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            E-mail-Bookkeeping
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={bookkeepingEmail}
            onChange={(e) => setBookkeepingEmail(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Billing Number
          </label>

          <input
            placeholder="enter number here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={billingNumber}
            onChange={(e) => setBillingNumber(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            BC Number
          </label>

          <input
            placeholder="enter number here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={bcNumber}
            onChange={(e) => setBcNumber(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label class="col-sm-2 col-form-label" for="inputGroupSelect03">
            Customer Type
          </label>
          <Select
            className="form-control"
            value={customerTypeID}
            onChange={handleCustomerTypeChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            {customerTypeDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label class="col-sm-2 col-form-label" for="inputGroupSelect03">
            Billing Method
          </label>
          <Select
            value={billingMethodID}
            onChange={handleBillingMethodChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {billingDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Customer Library
          </label>

          <input
            placeholder="enter URL here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={customerLibraryUrl}
            onChange={(e) => setCustomerLibraryUrl(e.target.value)}
          />
          <br />
          <input
            placeholder="enter Text here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={customerLibraryText}
            onChange={(e) => setCustomerLibraryText(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Customer Group ID
          </label>

          <input
            placeholder="enter number here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={customerGroupID}
            onChange={(e) => setCustomerGroupID(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Report Name Logic
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={reportNameLogic}
            onChange={(e) => setReportNameLogic(e.target.value)}
          />
        </div>
        <label for="inputEmail3">Internal Message For Office</label>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="enter value here"
            id="floatingTextarea"
            name="comment"
            form="usrform"
            value={internalMessage}
            onChange={(e) => {
              setInternalMessage(e.target.value);
            }}
          ></textarea>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Notification Letter Template
          </label>

          <input
            placeholder="enter URL here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={notificationLetterTemplateUrl}
            onChange={(e) => setNotificationLetterTemplateUrl(e.target.value)}
          />
          <br />
          <input
            placeholder="enter text here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={notificationLetterTemplateText}
            onChange={(e) => setNotificationLetterTemplateText(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Aggrement With Customer
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={agreementWithCustomer}
            onChange={(e) => setAgreementWithCustomer(e.target.value)}
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
        </button>
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.REQUESTER}
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

export default Createrequester;
