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
import NewSelect from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Createinspectiontype = ({ mode, inspectionTypeData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [inspectionTypeID, setInspectionTypeID] = useState(0);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [specificTopicID, setSpecificTopicID] = useState([]);
  const [specificTopicDropdownData, setSpecificTopicDropdownData] = useState(
    []
  );
  const [relatedReportLibraries, setRelatedReportLibraries] = useState("");

  const [subjectTypeID, setSubjectTypeID] = useState([]);
  const [subjectTypeDropdownData, setSubjecttypeDropdownData] = useState([]);

  const [territoryID, setTerritoryID] = useState(0);

  const [competenceRequirementsID, setCompetenceRequirementsID] = useState([]);
  const [competenceDropdownData, setCompetenceDropdownData] = useState([]);

  const [estimatedTimeConsumption, setEstimatedTimeConsumption] = useState("");
  const [nextPeriodicInspectionDate, setNextPeriodicInspectionDate] =
    useState("");
  const [reportTemplateName, setReportTemplateName] = useState("");
  const [nextInspectionDate, setNextInspectionDate] = useState("");
  const [nextPressureTestDate, setNextPressureTestDate] = useState("");
  const [itemNumberBC, setItemNumberBC] = useState("");
  const [nextVisionTest, setNextVisionTest] = useState("");
  const [nextCalibrationDate, setNextCalibrationDate] = useState("");
  const [nextCertificationDate, setNextCertificationDate] = useState("");
  const [nextSigningDate, setNextSigningDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const [territoryDropdownData, setTerritoryDropdownData] = useState([]);

  //code for file attach
  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  useEffect(() => {
    console.log(specificTopicID, "specificTopicID");
  }, [specificTopicID]);

  const handleTerritoryChange = (event) => {
    setTerritoryID(event.target.value);
  };

  const getAllTerritory = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Territory/GetAllTerritories`
    );
    setTerritoryDropdownData(result.data);
  };

  useEffect(() => {
    // getAllSubjectType();
    getAllTerritory();

    async function GetAllCompetenceRequirements() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllCompetenceMatrix`
      );
      console.log(result.data);
      let dData = result.data.map((item) => {
        return { ...item, label: item.name, value: item.id };
      });
      console.log(dData, "abc");
      setCompetenceDropdownData(dData);
    }
    GetAllCompetenceRequirements();

    async function GetAllSpecificTopic() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}SpecificTopic/GetAllSpecificTopics`
      );
      console.log(result.data);
      let dData = result.data.map((item) => {
        return { ...item, label: item.title, value: item.specificTopicID };
      });
      console.log(dData, "abc");
      setSpecificTopicDropdownData(dData);
    }
    GetAllSpecificTopic();

    async function GetAllSubjectType() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}SubjectType/GetAllSubjectTypes`
      );
      console.log(result.data);
      let dData = result.data.map((item) => {
        return { ...item, label: item.title, value: item.subjectTypeID };
      });
      console.log(dData, "abc");
      setSubjecttypeDropdownData(dData);
    }
    GetAllSubjectType();
  }, []);

  useEffect(() => {
    mode = location.state.mode;
    inspectionTypeData = location.state.inspectionTypeData;
    console.log(inspectionTypeData);
    setPageMode(mode);
    if (mode == Modes.edit) {
      // console.log(inspectionTypeData);
      setInspectionTypeID(inspectionTypeData.inspectionTypeID);
      setTitle(inspectionTypeData.title);
      let y = [];
      inspectionTypeData.specificTopicData.map((x) => {
        y.push({ id: x.id, name: x.name, label: x.name });
      });
      console.log(inspectionTypeData.specificTopicData);
      setSpecificTopicID(y);

      setRelatedReportLibraries(inspectionTypeData.relatedReportLibraries);

      let m = [];
      inspectionTypeData.subjectTypeData.map((x) => {
        m.push({ id: x.id, name: x.name, label: x.name });
        console.log(m, "Ram");
      });
      setSubjectTypeID(m);

      setTerritoryID(inspectionTypeData.territoryID);
      let z = [];
      inspectionTypeData.competenceRequirementsData.map((x) => {
        z.push({ id: x.id, name: x.name, label: x.name });
        console.log(m, "manohar");
      });
      setCompetenceRequirementsID(z);
      setEstimatedTimeConsumption(inspectionTypeData.estimatedTimeConsumption);
      setNextPeriodicInspectionDate(
        inspectionTypeData.nextPeriodicInspectionDate
      );
      setReportTemplateName(inspectionTypeData.reportTemplateName);
      setNextInspectionDate(inspectionTypeData.nextInspectionDate);
      setNextPressureTestDate(inspectionTypeData.nextPressureTestDate);
      setItemNumberBC(inspectionTypeData.itemNumberBC);
      // setCustomerTypeName(inspectionTypeData.customerTypeName);
      setNextVisionTest(inspectionTypeData.nextVisionTest);
      // setTitle(inspectionTypeData.billingMethodName);
      setNextCalibrationDate(inspectionTypeData.nextCalibrationDate);
      setNextCertificationDate(inspectionTypeData.nextCertificationDate);
      setNextSigningDate(inspectionTypeData.nextSigningDate);
      setExpirationDate(inspectionTypeData.expirationDate);

      // setAttachedFiles(inspectionTypeData.attachedFiles);
    }
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
        formData.append(`inspectionTypeID`, inspectionTypeID);
        formData.append(`title`, title);
        console.log(specificTopicID);
        specificTopicID.map((x) => {
          formData.append(`specificTopic`, x.id);
        });
        formData.append(`relatedReportLibraries`, relatedReportLibraries);
        subjectTypeID.map((x) => {
          formData.append(`subjectType`, x.id);
        });
        formData.append(`territoryID`, territoryID);
        competenceRequirementsID.map((x) => {
          formData.append(`competenceRequirements`, x.id);
        });
        formData.append(`estimatedTimeConsumption`, estimatedTimeConsumption);
        formData.append(
          `nextPeriodicInspectionDate`,
          nextPeriodicInspectionDate
        );
        formData.append(`reportTemplateName`, reportTemplateName);
        formData.append(`nextInspectionDate`, nextInspectionDate);
        formData.append(`nextPressureTestDate`, nextPressureTestDate);
        formData.append(`itemNumberBC`, itemNumberBC);
        formData.append(`nextVisionTest`, nextVisionTest);
        formData.append(`nextCalibrationDate`, nextCalibrationDate);
        formData.append(`nextCertificationDate`, nextCertificationDate);
        formData.append(`nextSigningDate`, nextSigningDate);

        formData.append(`expirationDate`, expirationDate);

        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}InspectionType/SaveInspectionType`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Inspection Type Saved Sucessfully", "success");
              navigate(routeNames.INSPECTIONTYPE);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          formData["inspectionTypeID"] =
            location.state.inspectionTypeData.inspectionTypeID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}InspectionType/SaveInspectiontype`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire(
                "Save",
                "Inspection Type Updated Sucessfully",
                "success"
              );
              navigate(routeNames.INSPECTIONTYPE);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  const handleEdit = () => {};
  const handleSpecificTopic = (input, field) => {
    console.log("input", input);
    let ids = [];
    if (Array.isArray(input)) {
      input.map((ele, index) => {
        if (index <= specificTopicID.length - 1) {
          ids.push(ele);
        } else {
          ids.push({
            id: ele.specificTopicID,
            name: ele.title,
            label: ele.title,
          });
        }
      });
    } else {
      ids.push({
        id: input.specificTopicID,
        name: input.title,
        label: input.title,
      });
    }
    setSpecificTopicID(ids);
    // setSelected([...selected, input.id]);
    // for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  };

  const handleCompetence = (input, field) => {
    console.log("input", input);
    let ids = [];
    if (Array.isArray(input)) {
      input.map((ele) => {
        ids.push({ id: ele.id, name: ele.name, label: ele.name });
      });
    } else {
      ids.push({ id: input.id, name: input.name, label: input.name });
    }

    setCompetenceRequirementsID(ids);
  };

  const handleSubjectType = (input, field) => {
    console.log("input", input);
    let ids = [];
    if (Array.isArray(input)) {
      input.map((ele, index) => {
        if (index <= subjectTypeID.length - 1) {
          ids.push(ele);
        } else {
          ids.push({
            id: ele.subjectTypeID,
            name: ele.title,
            label: ele.title,
          });
          console.log(title, ids, "Ram");
        }
      });
    } else {
      ids.push({
        id: input.subjectTypeID,
        name: input.title,
        label: input.title,
      });
    }
    setSubjectTypeID(ids);
    // setSelected([...selected, input.id]);
    // for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  };

  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>
          {pageMode === Modes.create ? "Add New" : "Edit"} Inspection Type
        </h1>
        <div className="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Title
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            required
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Specific Topic
          </label>
          <NewSelect
            isMulti
            value={specificTopicID}
            onChange={handleSpecificTopic}
            options={specificTopicDropdownData}
          />
        </div>
        <label for="inputEmail3">Related Report Libraries</label>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="enter value here"
            id="floatingTextarea"
            name="comment"
            form="usrform"
            value={relatedReportLibraries}
            onChange={(e) => {
              setRelatedReportLibraries(e.target.value);
            }}
          ></textarea>
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Subject Type
          </label>
          <NewSelect
            isMulti
            value={subjectTypeID}
            onChange={handleSubjectType}
            options={subjectTypeDropdownData}
          />
        </div>
        <div class="mb-3 A1">
          <label class="col-sm-2 col-form-label" for="inputGroupSelect03">
            Territory
          </label>
          <Select
            className="form-control"
            value={territoryID}
            onChange={handleTerritoryChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            {territoryDropdownData.map((ele) => {
              return <MenuItem value={ele.territoryID}>{ele.title}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Competence Requirements
          </label>
          <NewSelect
            isMulti
            value={competenceRequirementsID}
            onChange={handleCompetence}
            options={competenceDropdownData}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" className="form-label">
            Estimated Time Consumption(hours)
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            required
            className="form-control"
            value={estimatedTimeConsumption}
            onChange={(e) => setEstimatedTimeConsumption(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Periodic Inspection Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextPeriodicInspectionDate}
                onChange={(newValue) => {
                  setNextPeriodicInspectionDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Report Template Name
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={reportTemplateName}
            onChange={(e) => setReportTemplateName(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Inspection Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextInspectionDate}
                onChange={(newValue) => {
                  setNextInspectionDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Pressure Test Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextPressureTestDate}
                onChange={(newValue) => {
                  setNextPressureTestDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Item Number For BC
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={itemNumberBC}
            onChange={(e) => setItemNumberBC(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Vision Test
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextVisionTest}
                onChange={(newValue) => {
                  setNextVisionTest(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Calibration Test
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextCalibrationDate}
                onChange={(newValue) => {
                  setNextCalibrationDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Certification Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextCertificationDate}
                onChange={(newValue) => {
                  setNextCertificationDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Next Signing Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={nextSigningDate}
                onChange={(newValue) => {
                  setNextSigningDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div class="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Expiration Date
          </label>
          <div class="col-sm-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={expirationDate}
                onChange={(newValue) => {
                  setExpirationDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
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
          &nbsp;
          <Link
            to={routeNames.INSPECTIONTYPE}
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

export default Createinspectiontype;
