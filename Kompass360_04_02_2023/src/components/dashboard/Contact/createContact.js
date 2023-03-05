import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { MenuItem, TextField, Select } from "@mui/material";
import NewSelect from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const CreateContact = ({ mode, setCreationState, contactData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [title, setTitle] = useState("");
  const [bcNumber, setBcNumber] = useState();

  const [contactTypeId, setContactTypeId] = useState(0);
  const [contactId, setContactId] = useState(0);
  const [contactTypeDropdownData, setContactTypeDropdownData] = useState([]);

  const [requesterId, setRequesterId] = useState(0);
  const [requesterDropdownData, setRequesterDropdownData] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [FileAttachmentError, setFileAttachmentError] = useState(null);

  const [telephone, setTelephone] = useState();
  const [mobile, setMobile] = useState(0);
  const [email, setEmail] = useState("");
  const [industryArea, setIndustryArea] = useState("");

  const [subIndustryArea, setSubIndustryArea] = useState("");

  const [willRecieveNewsLetters, setWillRecieveNewsLetters] = useState(false);
  const [completeCourseCatalogId, setCompleteCourseCatalogId] = useState(0);
  const [
    completeCourseCatalogDropdownData,
    setCompleteCourseCatalogDropdownData,
  ] = useState([]);

  /* attach file*/

  const [files, setFiles] = useState(null);

  const handleMobile = (e) => {
 

    setMobile(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  const handleRequesterChange = (event) => {
    setRequesterId(event.target.value);
  };

  const handleContactTypeChange = (event) => {
    setContactTypeId(event.target.value);
  };

  const handleCompleteCourseCatalogueChange = (event) => {
    setCompleteCourseCatalogId(event.target.value);
  };

  const completeCourse = [
    { id: 1, name: "YES" },
    { id: 2, name: "NO" },
  ];

  useEffect(() => {
    async function GetRequester() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Requester/getallRequesters`
      );
      setRequesterDropdownData(result.data);
    }
    GetRequester();
    setCompleteCourseCatalogDropdownData(completeCourse);

    async function GetContactType() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllContactTypes`
      );
      setContactTypeDropdownData(result.data);
    }
    GetContactType();

    console.log(location);
    mode = location.state.mode;
    contactData = location.state.contactData;
    console.log(contactData);
    setPageMode(mode);
    if (mode == Modes.edit) {
      console.log(mode);
      console.log(contactData);
      setContactId(contactData.contactID);
      setTitle(contactData.title);
      setBcNumber(contactData.bcNumber);
      setContactTypeId(contactData.contactTypeID);
      setRequesterId(contactData.requesterID);
      setTelephone(contactData.telephone);
      setMobile(contactData.mobile);
      setEmail(contactData.email);
      setIndustryArea(contactData.industryArea);
      setSubIndustryArea(contactData.subIndustryArea);
      setWillRecieveNewsLetters(contactData.willRecieveNewsletters);
      setCompleteCourseCatalogId(contactData.completeCourseCatalogue);
    }
  }, []);
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!regex.test(email)) {
      setEmailError("Invalid Email");
      console.log(email);
    } else {
      setEmailError("");
    }
    if (title === "") {
      setTitleError("Title is required");
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
        formData.append(`contactID`, contactId);
        formData.append(`title`, title);
        formData.append(`bcNumber`, bcNumber);
        formData.append(`contactTypeID`, Number(contactTypeId));
        formData.append(`telephone`, telephone);
        formData.append(`requesterID`, Number(requesterId));
        formData.append(`mobile`, mobile);
        formData.append(`email`, email);
        formData.append(`industryArea`, industryArea);
        formData.append(`subIndustryArea`, subIndustryArea);
        formData.append(`willRecieveNewsLetters`, willRecieveNewsLetters);
        formData.append(
          `completeCourseCatalogue`,
          Number(completeCourseCatalogId)
        );

        // const validation = () => {
        //   formData.getAll("title") !== "" ? "" : "This Field is Required";
        //   console.log(formData.getAll("title"));
        // };

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Contact/SaveContact`,
            formData
          )

            .then((response) => {
              console.log(response);
              Swal.fire("Save", "Contact Saved Sucessfully", "success");
              navigate(routeNames.CONTACT);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          // formData["contactID"] = location.state.contactData.contactID;
          formData.append(`contactID`, contactId);
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Contact/SaveContact`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Contact Updated Sucessfully", "success");
              navigate(routeNames.CONTACT);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  const handleWillRecieveNewsLetters = (e) => {
    setWillRecieveNewsLetters(e.target.checked);

    console.log(e.target.checked);
  };

  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Contact</h1>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Title
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}

          <input
            type="text"
            required
            class="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Complete Course Catalogue
          </label>
          <Select
            value={completeCourseCatalogId}
            onChange={handleCompleteCourseCatalogueChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {completeCourseCatalogDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Contact Type
          </label>

          <Select
            value={contactTypeId}
            onChange={handleContactTypeChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {contactTypeDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Telephone
          </label>

          <input
            type="number"
            class="form-control"
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Mobile
          </label>

          <input
            type="number"
            class="form-control"
            required
            value={mobile}
            onChange={handleMobile}
          />
        </div>
        <div class="mb-3 A1">
          {EmailError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{EmailError}</p>
          )}

          <label for="inputEmail3" class="form-label">
            Email
          </label>

          <input
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            class="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Industry Area
          </label>

          <input
            type="text"
            class="form-control"
            required
            value={industryArea}
            onChange={(e) => setIndustryArea(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Sub Industry Area
          </label>

          <input
            type="text"
            class="form-control"
            required
            value={subIndustryArea}
            onChange={(e) => setSubIndustryArea(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Requester
          </label>
          <Select
            value={requesterId}
            onChange={handleRequesterChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {requesterDropdownData.map((ele) => {
              return <MenuItem value={ele.requesterID}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            BC Number
          </label>

          <input
            type="number"
            class="form-control"
            id="inputEmail3"
            value={bcNumber}
            onChange={(e) => setBcNumber(e.target.value)}
          />
        </div>
        <div className="form-check">
          <label htmlFor="" className="form-label">
            Will Recieve Newsletters
          </label>
          &nbsp;
          <input
            type="checkbox"
            name=""
            id=""
            checked={willRecieveNewsLetters}
            onChange={(e) => handleWillRecieveNewsLetters(e)}
          />
        </div>
        <div className="mb-3 A1">
          {/* {FileAttachmentError && (
            <p style={{ color: "red", fontSize: "12px" }}>
              *{FileAttachmentError}
            </p>
          )} */}
          <label for="formFile" className="form-label">
            Attach file
          </label>
          {FileAttachmentError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{FileAttachmentError}
            </p>
          )}

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
            to={routeNames.CONTACT}
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

export default CreateContact;
