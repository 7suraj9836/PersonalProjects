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

const CreateCase = ({ mode, caseData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [number, setNumber] = useState("");

  const [requesterID, setRequesterID] = useState(0);
  const [requesterError, setRequesterError] = useState("");
  const [requesterDropdownData, setRequesterDropdownData] = useState([]);
  const [agreement, setAggrement] = useState("");

  const [departmentByPayer, setDepartmentByPayer] = useState("");
  // const [departmentByPayerDropdownData, setDepartmentByPayerDropdownData] =
  //   useState([]);

  const [externalAttachmentNo, setExternalAttachementNo] = useState("");

  const [aggrementWithCustomer, setAggrementWithCustomer] = useState(false);
  const [isInvoiced, setIsInvoiced] = useState(false);

  const [orderedBy, setOrderedBy] = useState("");

  // const [contactNoMatter, setContactNoMatter] = useState("");
  // const [contactNoMatterID, setContactNoMatterID] = useState("");
  // const [contactNoMattersDropdownData, setContactNoMattersDropdownData] =
  //   useState([]);

  const [contactNoMatter, setContactNoMatter] = useState("");

  const [caseMangaerDropdownData, setCaseManagerDropdownData] = useState([]);
  const [caseManagerID, setCaseManagerID] = useState(0);
  const [caseManagerError, setCaseManagerError] = useState("");

  const [contactNoWarning, setContactNoWarning] = useState("");
  // const [contactNoWarningDropdownData, setContactNoWarningDropdownData] =
  //   useState([]);

  const [invoiceText, setInvoiceText] = useState();
  const [otherDescription, setOtherDescription] = useState("");
  const [plannedInspectionDate, setPlannedInspectionDate] = useState(null);
  const [workDescription, setWorkDescription] = useState("");
  const [bookkeepingMessage, setBookkeepingMessage] = useState("");
  const [reportEmail, setReportEmail] = useState("");
  const [topicsInCase, setTopicsInCase] = useState("");
  const [contactNoReports, setContactNoReports] = useState("");

  const [paysID, setPaysID] = useState(0);
  const [paysDropdownData, setPaysDropdownData] = useState([]);

  const [statusID, setStatusID] = useState(0);
  const [statusDropdownData, setStatusDropdownData] = useState([]);
  const [accountingStatusID, setAccountingStatusID] = useState(0);
  const [accountingStatusDropdownData, setAccountingStatusDropdownData] =
    useState([]);
  // const [contactNoReportsID, setContactNoReportsID] = useState(0);
  // const [contactNoReportsDropdownData, setContactNoReportsDropdownData] =
  //   useState([]);
  const [billingMethodID, setBillingMethodID] = useState(0);
  const [billingMethodDropdownData, setBillingMethodDropdownData] = useState(
    []
  );

  const navigate = useNavigate();

  //handle the dropdown

  const handlePaysChange = (event) => {
    setPaysID(event.target.value);
  };
  // const handleDepartmentByPayerChange = (event) => {
  //   setDepartmentByPayerID(event.target.value);
  // };

  const handleBillingMethodChange = (event) => {
    setBillingMethodID(event.target.value);
    console.log(event.target.value, billingMethodDropdownData);
  };

  const handleCaseManagerChange = (event) => {
    setCaseManagerID(event.target.value);
    setCaseManagerError("");
  };
  // const handleContactNoMatterChange = (event) => {
  //   setContactNoMatterID(event.target.value);
  // };
  // const handleContactNoWarningChange = (event) => {
  //   setContactNoWarningID(event.target.value);
  // };
  // const handleContactNoReportsChange = (event) => {
  //   setContactNoReportsID(event.target.value);
  // };

  const handleStatusChange = (event) => {
    setStatusID(event.target.value);
  };
  const handleRequesterChange = (event) => {
    setRequesterID(event.target.value);
    setRequesterError("");
  };
  const handleAccountingStatusChange = (event) => {
    setAccountingStatusID(event.target.value);
  };
  const handleChange = (e) => {
    setIsInvoiced(e.target.checked);
  };

  //api call

  const getAllBillingMethod = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllBillingMethod`
    );
    setBillingMethodDropdownData(result.data);
  };

  const GetAllCaseManager = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Employee/GetAllEmployees`
    );
    setCaseManagerDropdownData(result.data);
    setCaseManagerDropdownData(result.data);
  };

  const getAllRequester = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Requester/GetAllRequesters`
    );
    setRequesterDropdownData(result.data);
  };

  const getAllPays = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Requester/GetAllRequesters`
    );
    setPaysDropdownData(result.data);
  };

  const getAllAccountingStatus = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllAccountingStatus`
    );
    setAccountingStatusDropdownData(result.data);
  };
  const getAllStatus = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllStatus`
    );
    setStatusDropdownData(result.data);
  };

  // const departmentByPayer = [
  //   { id: 1, name: "departmentByPayer One" },
  //   { id: 2, name: "departmentByPayer Two" },
  //   { id: 3, name: "departmentByPayer Three" },
  //   { id: 4, name: "departmentByPayer Four" },
  // ];

  // const contactNoMatters = [
  //   { id: 1, name: "contactNoMatter One" },
  //   { id: 2, name: "contactNoMatter Two" },
  //   { id: 3, name: "contactNoMatter Three" },
  //   { id: 4, name: "contactNoMatter Four" },
  // ];
  // const contactNoWarning = [
  //   { id: 1, name: "contactNoWarning One" },
  //   { id: 2, name: "contactNoWarning Two" },
  //   { id: 3, name: "contactNoWarning Three" },
  //   { id: 4, name: "contactNoWarning Four" },
  // ];
  // const contactNoReports = [
  //   { id: 1, name: "contactNoReport One" },
  //   { id: 2, name: "contactNoReport Two" },
  //   { id: 3, name: "contactNoReport Three" },
  //   { id: 4, name: "contactNoReport Four" },
  // ];

  useEffect(() => {
    getAllBillingMethod();
    getAllRequester();
    getAllPays();

    GetAllCaseManager();
    getAllAccountingStatus();
    getAllStatus();
    // setDepartmentByPayerDropdownData(departmentByPayer);
    // setContactNoWarningDropdownData(contactNoWarning);
    // setContactNoMattersDropdownData(contactNoMatters);
    // setContactNoReportsDropdownData(contactNoReports);
    // setStatusDropdownData(status);
  }, []);
  useEffect(() => {
    console.log(requesterID, "requesterID");
  }, [requesterID]);

  useEffect(() => {
    mode = location.state.mode;
    caseData = location.state.caseData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setDescription(caseData.description);
      setNumber(caseData.number);
      setRequesterID(caseData.requesterId);
      setAggrement(caseData.agreement);
      setPaysID(caseData.paysID);
      setDepartmentByPayer(caseData.departmentByPayer);
      setCaseManagerID(caseData.caseManagerID);
      setCaseManagerID(caseData.caseManagerID);
      setStatusID(caseData.statusID);
      // setContactNoMatterID(caseData.contactNoMatterID);
      setContactNoMatter(caseData.contactNoMatter);
      setExternalAttachementNo(caseData.externalAttachmentNo);
      setAccountingStatusID(caseData.accountingStatusID);
      setIsInvoiced(caseData.isInvoiced);
      setContactNoReports(caseData.contactNoReports);
      setOrderedBy(caseData.orderedBy);
      setContactNoWarning(caseData.contactNoWarning);
      setInvoiceText(caseData.invoiceText);
      setOtherDescription(caseData.otherDescription);
      setPlannedInspectionDate(caseData.plannedInspectionDate);
      setWorkDescription(caseData.workDescription);
      setBookkeepingMessage(caseData.bookkeepingMessage);
      setBillingMethodID(caseData.billingMethodID);

      setReportEmail(caseData.reportEmail);
      setTopicsInCase(caseData.topicsInCase);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description === "") {
      setDescriptionError("Description is Required");
    } else {
      setDescriptionError("");
    }
    if (requesterID === 0) {
      setRequesterError("Requester is Required");
    } else {
      setRequesterError("");
    }
    if (caseManagerID === 0) {
      setCaseManagerError("Case Manager is Required");
    } else {
      setCaseManagerError("");

      if (true) {
        const payload = {
          description: description,
          number: number,
          requesterID: requesterID,
          agreement: agreement,
          paysID: paysID,
          departmentByPayer: departmentByPayer,
          caseManagerID: caseManagerID,
          statusID: statusID,
          contactNoMatter: contactNoMatter,

          externalAttachmentNo: externalAttachmentNo,
          accountingStatusID: accountingStatusID,
          isInvoiced,
          contactNoReports: contactNoReports,
          orderedBy: orderedBy,
          contactNoWarning: contactNoWarning,
          invoiceText: invoiceText,
          otherDescription: otherDescription,
          plannedInspectionDate: plannedInspectionDate,
          workDescription: workDescription,
          bookkeepingMessage: bookkeepingMessage,
          reportEmail: reportEmail,
          topicsInCase: topicsInCase,

          billingMethodID: billingMethodID,
        };

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}case/savecase`,
            payload
          )

            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Case Saved Sucessfully", "success");

              navigate(routeNames.CASE);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          payload["caseID"] = location.state.caseData.caseID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}case/savecase`,
            payload
          )

            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Case Updated Sucessfully", "success");
              navigate(routeNames.CASE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Case</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Description
          </label>
          {descriptionError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{descriptionError}
            </p>
          )}
          <input
            required="this field required"
            type="email"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionError("");
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
            Number
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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
            Requester
          </label>
          {requesterError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{requesterError}</p>
          )}
          <Select
            value={requesterID}
            onChange={handleRequesterChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {requesterDropdownData.map((ele) => {
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
            Aggrement with Customer
          </label>
          <input
            type="text"
            value={agreement}
            onChange={(e) => setAggrement(e.target.value)}
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
            Pays
          </label>
          <Select
            value={paysID}
            onChange={handlePaysChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {paysDropdownData.map((ele) => {
              return <MenuItem value={ele.requesterID}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        {/*<div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Department By Payer
          </label>
          <Select
            value={departmentByPayerID}
            onChange={handleDepartmentByPayerChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {departmentByPayerDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
          </div>*/}
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Department By Payer
          </label>
          <input
            type="text"
            value={departmentByPayer}
            onChange={(e) => setDepartmentByPayer(e.target.value)}
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
            Case Manager
          </label>
          {caseManagerError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{caseManagerError}
            </p>
          )}
          <Select
            value={caseManagerID}
            onChange={handleCaseManagerChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {caseMangaerDropdownData.map((ele) => {
              return <MenuItem value={ele.employeeID}>{ele.title}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Status
          </label>
          <Select
            value={statusID}
            onChange={handleStatusChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {statusDropdownData.map((ele) => {
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
            Contact No Matter
          </label>
          <input
            type="text"
            value={contactNoMatter}
            onChange={(e) => setContactNoMatter(e.target.value)}
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
            External Attachment No
          </label>
          <input
            type="text"
            value={externalAttachmentNo}
            onChange={(e) => setExternalAttachementNo(e.target.value)}
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
            Accounting Status
          </label>
          <Select
            value={accountingStatusID}
            onChange={handleAccountingStatusChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {accountingStatusDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            checked={isInvoiced}
            onChange={(e) => handleChange(e)}
            value={isInvoiced}
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            Invoiced
          </label>
        </div>
        {/*<div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact No._Report
          </label>
          <Select
            value={contactNoReportsID}
            onChange={handleContactNoReportsChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {contactNoReportsDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
          </div>*/}
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact No Report
          </label>
          <input
            type="text"
            value={contactNoReports}
            onChange={(e) => setContactNoReports(e.target.value)}
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
            Order By
          </label>
          <input
            type="text"
            value={orderedBy}
            onChange={(e) => setOrderedBy(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        {/*<div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact No Warning
          </label>
          <Select
            value={contactNoWarningID}
            onChange={handleContactNoWarningChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {contactNoWarningDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
          </div>*/}
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Contact No Warning
          </label>
          <input
            type="text"
            value={contactNoWarning}
            onChange={(e) => setContactNoWarning(e.target.value)}
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
            Invoice Text/Serial Number
          </label>
          <input
            type="text"
            value={invoiceText}
            onChange={(e) => setInvoiceText(e.target.value)}
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
            Other Description
          </label>
          <input
            type="text"
            value={otherDescription}
            onChange={(e) => setOtherDescription(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="col-form-label">
            Planned Inspection Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={plannedInspectionDate}
                onChange={(newValue) => {
                  setPlannedInspectionDate(newValue);
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
            Work Description
          </label>
          <input
            type="text"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
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
            Bookkeeping Message
          </label>
          <input
            type="text"
            value={bookkeepingMessage}
            onChange={(e) => setBookkeepingMessage(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
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
            {billingMethodDropdownData.map((ele) => {
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
            Report Email To Customer
          </label>
          <input
            type="text"
            value={reportEmail}
            onChange={(e) => setReportEmail(e.target.value)}
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
            Topics Include Of The Case
          </label>
          <input
            type="email"
            value={topicsInCase}
            onChange={(e) => setTopicsInCase(e.target.value)}
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
        </button>
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.CASE}
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

export default CreateCase;
