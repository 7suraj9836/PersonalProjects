import React from "react";
import { useState, useEffect } from "react";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import axios from "axios";
import { MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const CreateTheSubject = ({ mode, thesubjectData }) => {
  const locaction = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [subjectID, setSubjectID] = useState(0);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [installationAddressId, setInstallationAddressId] = useState(0);
  const [installationAddressError, setInstallationAddressError] = useState("");
  const [intallationAddressDData, setIntallationAddressDData] = useState([]);
  const [nameOfMainAreaId, setNameOfMainAreaId] = useState(0);
  const [nameOfMainAreaError, setNameOfMainAreaError] = useState("");
  const [nameOfMainAreaDData, setNameOfMainAreaDData] = useState([]);
  const [requesterId, setRequesterId] = useState(0);
  const [requesterError, setRequesterError] = useState("");
  const [ownerId, setOwnerId] = useState(0);
  const [ownerDData, setOwnerDData] = useState([]);
  const [latestInspectionResult, setLatestInspectionResult] = useState(null);
  const [scheduledInspectionDate, setScheduledInspectionDate] = useState(null);
  const [scheduledInspectionDateError, setScheduledInspectionDateError] =
    useState("");
  const [contactPersonal, setContactPersonal] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentDData, setDepartmentDData] = useState([]);
  const [mailToTheOwner, setMailToTheOwner] = useState("");
  const [mailToExpertCompany, setMailToExpertCompany] = useState("");
  const [elevatorFitterDuringDropTest, setElevatorFitterDuringDropTest] =
    useState("");
  const [lastInspectionDate, setLastInspectionDate] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleInstallationAddressChange = (event) => {
    setInstallationAddressId(event.target.value);
    setInstallationAddressError("");
  };
  const handleNameOfMainAreaChange = (event) => {
    setNameOfMainAreaId(event.target.value);
    setNameOfMainAreaError("");
  };
  const handleRequesterChange = (event) => {
    setRequesterId(event.target.value);
    setRequesterError("");
  };
  const handleOwnerChange = (event) => {
    setOwnerId(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentId(event.target.value);
  };

  const [requesterDData, setRequesterDData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}installationaddress/getallinstallationaddresses`
      )
      .then((res) => {
        console.log(res.data);
        setIntallationAddressDData(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}Requester/GetAllRequesters`)
      .then((res) => {
        console.log(res.data);
        setRequesterDData(res.data);
        setOwnerDData(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}Territory/getallTerritories`)
      .then((res) => {
        console.log(res.data);
        setNameOfMainAreaDData(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllDepartments`)
      .then((res) => {
        console.log(res.data);

        setDepartmentDData(res.data);
      });
  }, []);

  // useEffect(() => {
  //   console.log("installationAddressId", installationAddressId);
  // }, [installationAddressId]);

  useEffect(() => {
    console.log(locaction);
    mode = locaction.state.mode;
    thesubjectData = locaction.state?.thesubjectData;
    setPageMode(mode);
    if (mode == Modes.edit && thesubjectData) {
      setSubjectID(thesubjectData.subjectID);
      setTitle(thesubjectData.title);
      setInstallationAddressId(`${thesubjectData.installationAddressID}`);
      setNameOfMainAreaId(thesubjectData.nameOfMainAreaID);
      setRequesterId(thesubjectData.requesterID);
      setOwnerId(thesubjectData.ownerID);
      setLatestInspectionResult(thesubjectData.latestInspectionResult);
      setScheduledInspectionDate(thesubjectData.scheduledInspectionDate);
      setContactPersonal(thesubjectData.contactNo);
      setDepartmentId(thesubjectData.departmentID);
      setMailToTheOwner(thesubjectData.mailToTheOwner);
      setMailToExpertCompany(thesubjectData.mailToExpertCompany);
      setElevatorFitterDuringDropTest(
        thesubjectData.elevatorFitterDuringDropTest
      );
      setLastInspectionDate(thesubjectData.lastInspectionDate);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError("title is required");
    } else {
      setTitleError("");
    }
    if (installationAddressId === 0) {
      setInstallationAddressError("Installation address is required");
    } else {
      setInstallationAddressError("");
    }
    if (nameOfMainAreaId === 0) {
      setNameOfMainAreaError("Name of the Main Area is Required");
    } else {
      setNameOfMainAreaError("");
    }

    if (requesterId === 0) {
      setRequesterError("Requester is Required");
    } else {
      setRequesterError("");
      if (true) {
        const payload = {
          // subjectID: 0,
          title: title,
          installationAddressID: Number(installationAddressId),
          nameOfMainAreaID: Number(nameOfMainAreaId),
          requesterID: Number(requesterId),
          ownerID: Number(ownerId),
          latestInspectionResult: latestInspectionResult,
          scheduledInspectionDate: scheduledInspectionDate,
          contactNo: contactPersonal,
          departmentID: Number(departmentId),
          mailToTheOwner: mailToTheOwner,
          mailToExpertCompany: mailToExpertCompany,
          elevatorFitterDuringDropTest: elevatorFitterDuringDropTest,
          lastInspectionDate: lastInspectionDate,
        };

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}subject/savesubject`,
            payload
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Subject Saved Sucessfully", "success");
              navigate(routeNames.SUBJECT);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          console.log("edit part called");
          payload["subjectID"] = locaction.state.thesubjectData.subjectID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}subject/savesubject`,
            payload
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Subject Updated Sucessfully", "success");
              navigate(routeNames.SUBJECT);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  console.log(pageMode);
  // const handleEdit = () => {};
  return (
    <div>
      <div className="MainDiv">
        <ul className="nav A3"></ul>
        <div className="mb-3 A1">
          <form action="" onSubmit={handleSubmit} />
          <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Subject</h1>
          <label for="exampleFormControlInput1" className="form-label" required>
            Title
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
            Installation Address
          </label>
          {installationAddressError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{installationAddressError}
            </p>
          )}
          <Select
            value={installationAddressId}
            onChange={handleInstallationAddressChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {intallationAddressDData.map((ele) => {
              return (
                <MenuItem value={ele.installationAddressID}>
                  {ele.title}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
            value={nameOfMainAreaId}
          >
            Name Of Main Area
          </label>
          {nameOfMainAreaError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{nameOfMainAreaError}
            </p>
          )}
          <Select
            value={nameOfMainAreaId}
            onChange={handleNameOfMainAreaChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {nameOfMainAreaDData.map((ele) => {
              return (
                <MenuItem value={ele.territoryID}>{ele.listName}</MenuItem>
              );
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Requester
          </label>
          {requesterError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{requesterError}</p>
          )}
          <Select
            value={requesterId}
            onChange={handleRequesterChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {requesterDData.map((ele) => {
              return <MenuItem value={ele.requesterID}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
            value={ownerId}
          >
            Owner
          </label>
          <Select
            value={ownerId}
            onChange={handleOwnerChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {requesterDData.map((ele) => {
              return <MenuItem value={ele.requesterID}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Latest Inspection Result
          </label>
          <input
            type="email"
            value={latestInspectionResult}
            onChange={(e) => setLatestInspectionResult(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="row mb-3">
          <label
            for="inputEmail3"
            class="col-sm-2 col-form-label"
            style={{ paddingLeft: "74px" }}
          >
            Schedule Inspection Date
          </label>
          {scheduledInspectionDateError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{scheduledInspectionDateError}
            </p>
          )}
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={scheduledInspectionDate}
                onChange={(newValue) => {
                  setScheduledInspectionDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact Personal/Tel.
          </label>
          <input
            type="email"
            value={contactPersonal}
            onChange={(e) => setContactPersonal(e.target.value)}
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
            value={nameOfMainAreaId}
          >
            Department
          </label>
          <Select
            value={departmentId}
            onChange={handleDepartmentChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {departmentDData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Mail To The Owner/Responsible
          </label>
          <input
            type="email"
            value={mailToTheOwner}
            onChange={(e) => setMailToTheOwner(e.target.value)}
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
            Email To Expert Company
          </label>
          <input
            type="email"
            value={mailToExpertCompany}
            onChange={(e) => setMailToExpertCompany(e.target.value)}
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
            Elevator Fitter During Drop Test
          </label>
          <input
            type="email"
            value={elevatorFitterDuringDropTest}
            onChange={(e) => setElevatorFitterDuringDropTest(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="row mb-3">
          <label
            for="inputEmail3"
            class="col-sm-2 col-form-label"
            style={{ paddingLeft: "74px" }}
          >
            Last Inspection Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                orientation="landscape"
                openTo="day"
                value={lastInspectionDate}
                onChange={(newValue) => setLastInspectionDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-secondary A2"
        >
          {pageMode === Modes.create ? "Save" : "Update"}
        </button>
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.SUBJECT}
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
