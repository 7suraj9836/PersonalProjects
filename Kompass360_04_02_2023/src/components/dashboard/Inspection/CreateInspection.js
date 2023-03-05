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

const CreateInspection = ({ mode, inspectionData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [serialNumber, setSerialNumber] = useState("");
  const [caseID, setCaseID] = useState("");
  const [caseError, setCaseError] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [inspectionType, setInspectionType] = useState("");
  const [inspectionTypeError, setInspectionTypeError] = useState("");
  const [inspectionResultID, setInspectionResultID] = useState("");
  const [inspectionResultError, setInspectionResultError] = useState("");
  const [inspectionDate, setInspectionDate] = useState(null);
  const [inspectionDateError, setInspectionDateError] = useState("");
  const [inspectionResponsible, setInspectionResponsible] = useState("");
  const [inspectionResponsibleError, setInspectionResponsibleError] =
    useState("");
  const [inspectionResponsibleID, setInspectionResponsibleID] = useState(0);
  const [additionalNo, setAdditionalNo] = useState();
  const [scheduledInspectionDate, setScheduledInspectionDate] = useState(null);
  const [inspectionReportSentTo, setInspectionReportSentTo] = useState("");

  const [
    notificationLetterSendToCustomer,
    setNotificationLetterSendToCustomer,
  ] = useState(false);
  const [notificationLetterStatusName, setNotificationLetterStatusName] =
    useState("");
  const [notificationLetterStatusID, setNotificationLetterStatusID] =
    useState(0);
  const [noticeLetterIssuedDate, setNoticeLetterIssuedDate] = useState(null);
  const [installationAddress, setInstallationAddress] = useState("");
  const [casesDropdownData, setCasesDropdownData] = useState([]);
  const [subjectsDropdownData, setSubjectsDropdownData] = useState([]);
  const [inspectionResultsDropdownData, setInspectionResultsDropdownData] =
    useState([]);
  const [
    inspectionResponsiblesDropdownData,
    setInspectionResponsiblesDropdownData,
  ] = useState([]);
  const [
    notificationLetterStatusesDropdownData,
    setNotificationLetterStatusesDropdownData,
  ] = useState([]);
  const [billingDropdownData, setBillingDropdownData] = useState([]);
  const [billingMethodId, setBillingMethodId] = useState("");
  const [billingMethodError, setBillingMethodError] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setCaseID(event.target.value);
    setCaseError("");
  };

  // const handleValidation = () => {
  //   let error = {};
  //   let serial_number = serialNumber?.trim();
  //   if (!serial_number) {
  //     error = { ...error, serialNumber: "Serial number is required" };
  //   }
  //   console.log(Object.keys(error).length, "error count");
  //   if (Object.keys(error).length) {
  //     setError(error);
  //     return false;
  //   } else {
  //     setError({});
  //     return true;
  //   }
  // };

  const handleSubjectNumberChange = (event) => {
    setSubjectID(event.target.value);
    setSubjectError("");
  };
  const handleInspectionResultChange = (event) => {
    setInspectionResultID(event.target.value);
    setInspectionResultError("");
  };
  const handleInspectionResponsibleChange = (event) => {
    setInspectionResponsibleID(event.target.value);
  };
  const handleBillingMethodChange = (event) => {
    setBillingMethodId(event.target.value);
    setBillingMethodError("");
  };
  const handleNotificationLetterStatusChange = (event) => {
    setNotificationLetterStatusID(event.target.value);
  };

  const getAllBillingMethod = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllBillingMethod`
    );
    setBillingDropdownData(result.data);
  };

  const getAllSubjects = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllSubjects`
    );
    setSubjectsDropdownData(result.data);
  };

  const getAllCases = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllCases`
    );
    setCasesDropdownData(result.data);
  };

  const getAllInspectionResults = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllInspectionResults`
    );
    setInspectionResultsDropdownData(result.data);
  };

  const getAllNotificationLetterStatus = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllNotificationLetterStatus`
    );
    setNotificationLetterStatusesDropdownData(result.data);
  };

  const inspectionResponsibles = [
    { id: 1, name: "AEN" },
    { id: 2, name: "AGJ" },
    { id: 3, name: "AH" },
    { id: 4, name: "AMD" },
  ];

  useEffect(() => {
    getAllBillingMethod();
    getAllCases();
    getAllInspectionResults();
    getAllSubjects();
    getAllNotificationLetterStatus();
    setInspectionResponsiblesDropdownData(inspectionResponsibles);
  }, []);

  useEffect(() => {
    mode = location.state.mode;
    inspectionData = location.state.caseData;
    setPageMode(mode);
    if (mode === Modes.edit) {
      setSerialNumber(inspectionData.serialNumber);
      setCaseID(inspectionData.caseID);
      setSubjectID(inspectionData.subjectID);
      setInspectionType(inspectionData.inspectionType);
      setInspectionResultID(inspectionData.inspectionResultID);
      setInspectionDate(inspectionData.inspectionDate);
      setInspectionResponsibleID(inspectionData.inspectionResponsibleID);
      setAdditionalNo(inspectionData.additionalNo);
      setScheduledInspectionDate(inspectionData.scheduledInspectionDate);
      setBillingMethodId(inspectionData.billingMethodID);
      setInspectionReportSentTo(inspectionData.inspectionReportSentTo);
      setNotificationLetterSendToCustomer(
        inspectionData.notificationLetterSendToCustomer
      );
      setNotificationLetterStatusID(inspectionData.notificationLetterStatusID);
      setNoticeLetterIssuedDate(inspectionData.noticeLetterIssuedDate);
      setInstallationAddress(inspectionData.installationAddress);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caseID === "") {
      setCaseError("Case is required");
    } else {
      setCaseError("");
    }
    if (subjectID === "") {
      setSubjectError("SubjectID is required");
    } else {
      setSubjectError("");
    }
    if (inspectionType === "") {
      setInspectionTypeError("InspectionType is required");
    } else {
      setInspectionTypeError("");
    }
    if (inspectionResultID === "") {
      setInspectionResultError("Inspection Result is required");
    } else {
      setInspectionResultError("");
    }

    if (billingMethodId === "") {
      setBillingMethodError("Billing Method is required");
    } else {
      setBillingMethodError("");

      if (true) {
        const payload = {
          serialNumber: serialNumber,
          caseID: caseID,
          subjectID: subjectID,
          inspectionType: inspectionType,
          inspectionResultID: inspectionResultID,
          inspectionDate: inspectionDate,
          inspectionResponsibleID: inspectionResponsibleID,
          additionalNo: additionalNo,
          scheduledInspectionDate: scheduledInspectionDate,
          billingMethodID: billingMethodId,
          inspectionReportSentTo: inspectionReportSentTo,
          notificationLetterSendToCustomer: notificationLetterSendToCustomer,
          notificationLetterStatusID: notificationLetterStatusID,
          noticeLetterIssuedDate: noticeLetterIssuedDate,
          installationAddress: installationAddress,
        };
        console.log("submit ran", "mode", mode);

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}inspection/saveinspection`,
            payload
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Inspection Saved Sucessfully", "success");
              navigate(routeNames.INSPECTION);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          payload["inspectionID"] = location.state.caseData.inspectionID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}inspection/saveinspection`,
            payload
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Inspection Updated Sucessfully", "success");
              navigate(routeNames.INSPECTION);
            })
            .catch((error) => {
              console.log(error);
            });
        }

        console.log("payload", payload);
        console.log(error, "error");
      }
    }
  };
  const handleEdit = () => {};
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Inspection</h1>
        <div className="mb-3 A1">
          <label for="inputEmail3" className="form-label" required>
            Serial Number
          </label>
          <input
            type="email"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
          {error && <span className="text-danger">{error?.serialNumber}</span>}
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Case
          </label>
          {caseError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{caseError}</p>
          )}
          <Select
            value={caseID}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {casesDropdownData.map((ele) => {
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
            Subject Id Number
          </label>
          {subjectError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{subjectError}</p>
          )}
          <Select
            value={subjectID}
            onChange={handleSubjectNumberChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {subjectsDropdownData.map((ele) => {
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
            Inspection Type
          </label>
          {inspectionTypeError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{inspectionTypeError}
            </p>
          )}
          <input
            type="email"
            value={inspectionType}
            onChange={(e) => {
              setInspectionType(e.target.value);
              setInspectionTypeError("");
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
            Inspection Result
          </label>
          {inspectionResultError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{inspectionResultError}
            </p>
          )}
          <Select
            value={inspectionResultID}
            onChange={handleInspectionResultChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {inspectionResultsDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Inspection Date
          </label>
          {inspectionDateError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{inspectionDateError}
            </p>
          )}

          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={inspectionDate}
                onChange={(newValue) => {
                  setInspectionDate(newValue);
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
            Inspection Responsible
          </label>
          <Select
            value={inspectionResponsibleID}
            onChange={handleInspectionResponsibleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {inspectionResponsiblesDropdownData.map((ele) => {
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
            Additional Number
          </label>
          <input
            type="text"
            value={additionalNo}
            onChange={(e) => setAdditionalNo(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="col-form-label">
            Schedule Inspection Date
          </label>
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
        <div class="mb-3 A1">
          <label class="col-sm-2 col-form-label" for="inputGroupSelect03">
            Billing Method
          </label>
          {billingMethodError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{billingMethodError}
            </p>
          )}
          <Select
            value={billingMethodId}
            onChange={handleBillingMethodChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {billingDropdownData.map((ele) => {
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
            Inspection Report Sent To
          </label>
          <input
            type="text"
            value={inspectionReportSentTo}
            onChange={(e) => setInspectionReportSentTo(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            checked={notificationLetterSendToCustomer}
            onChange={(e) =>
              setNotificationLetterSendToCustomer(e.target.checked)
            }
            value={notificationLetterSendToCustomer}
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            Notification Letter - send to customer
          </label>
        </div>
        <div class="mb-3 A1">
          <label class="col-form-label" for="inputGroupSelect03">
            Notification letter-Status
          </label>
          <Select
            value={notificationLetterStatusID}
            onChange={handleNotificationLetterStatusChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {notificationLetterStatusesDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="col-form-label">
            Notice Letter-Issue Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                orientation="landscape"
                openTo="day"
                value={noticeLetterIssuedDate}
                onChange={(newValue) => {
                  setNoticeLetterIssuedDate(newValue);
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
            Installation Address
          </label>
          <input
            type="email"
            value={installationAddress}
            onChange={(e) => setInstallationAddress(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
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
            to={routeNames.INSPECTION}
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

export default CreateInspection;
