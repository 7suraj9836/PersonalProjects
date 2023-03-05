import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Modes } from "../../common/Constants/Modes";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { useLocation } from "react-router-dom";
import { MenuItem, Select, TextField } from "@mui/material";
import NewSelect from "react-select";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
const CreateEmployee = ({ mode, setCreationState, employeeData }) => {
  const [pageMode, setPageMode] = useState("create");
  const location = useLocation();
  const [employeeID, setEmployeeID] = useState(0);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [initials, setInitials] = useState("");
  const [bCNumber, setBCNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bCResourceNumber, setBCResourceNumber] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  // const [competenceMatrix, setCompetenceMatrix] = useState("");
  const [techniques, setTechniques] = useState("");
  const [linkToUrlSubjectMapNDT, setLinkToUrlSubjectMapNDT] = useState("");
  const [link1, setLink1] = useState("");
  const [linkToUrlSubjectMapWeldingN3, setLinkToUrlSubjectMapWeldingN3] =
    useState("");
  const [url, setUrl] = useState("");
  const [
    linkToUrlTopicMapWeldingN2UpperRoom,
    setLinkToUrlTopicMapWeldingN2UpperRoom,
  ] = useState("");
  const [
    linkToUrlTopicCardWeldingN2Issuance,
    setLinkToUrlTopicCardWeldingN2Issuance,
  ] = useState("");
  const [url1, setURL1] = useState("");
  const [employmentStatusID, setEmploymentStatusID] = useState(0);
  const [files, setFiles] = useState(null);

  const [employementStatusDropdownData, setEmployementStatusDropdownData] =
    useState([]);

  const [competenceDropdownData, setCompetenceDropdownData] = useState([]);
  const [competenceMatrixId, setCompetenceMatrixId] = useState([]);

  const navigate = useNavigate();
  const handleEmployStatusChange = (event) => {
    setEmploymentStatusID(event.target.value);
  };
  const getAllEmploymentStatus = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Dropdown/GetAllEmploymentStatus`
    );
    setEmployementStatusDropdownData(result.data);
  };
  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  useEffect(() => {
    async function GetAllCompetenceMatrix() {
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
    GetAllCompetenceMatrix();
  }, []);
  useEffect(() => {
    getAllEmploymentStatus();
  }, []);
  useEffect(() => {
    console.log(location);
    mode = location.state.mode;
    setPageMode(mode);
    employeeData = location.state.employeeData;
    if (mode === Modes.edit) {
      console.log(employeeData);
      setEmployeeID(employeeData.employeeID);
      setTitle(employeeData.title);
      setInitials(employeeData.initials);
      setBCNumber(employeeData.bCNumber);
      setFirstName(employeeData.firstName);
      setLastName(employeeData.lastName);
      setEmploymentStatusID(employeeData.employmentStatusID);
      setBCResourceNumber(employeeData.bCResourceNumber);
      setTelephone(employeeData.telephone);
      setEmail(employeeData.email);
      // setCompetenceMatrixId(employeeData.competenceMatrixData);
      setTechniques(employeeData.techniques);
      setLinkToUrlSubjectMapNDT(employeeData.linkToUrlSubjectMapNDT);
      setLink1(employeeData.link1);
      setLinkToUrlSubjectMapWeldingN3(
        employeeData.linkToUrlSubjectMapWeldingN3
      );
      setUrl(employeeData.url);
      setLinkToUrlTopicMapWeldingN2UpperRoom(
        employeeData.linkToUrlTopicMapWeldingN2UpperRoom
      );
      setLinkToUrlTopicCardWeldingN2Issuance(
        employeeData.linkToUrlTopicCardWeldingN2Issuance
      );
      setURL1(employeeData.url1);
      let y = [];
      employeeData.competenceMatrixData.map((x) => {
        y.push({ id: x.id, name: x.name, label: x.name });
      });
      setCompetenceMatrixId(y);
      // setEmployementStatusDropdownData(employeeData.employementStatusDropdownData);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      setTitleError("Title is required");
    } else {
      setTitleError("");

      let formData = new FormData();

      let fileArray = [];
      if (files)
        if (files !== null) {
          for (let index = 0; index < files.length; index++) {
            const element = files[index];
            fileArray.push(element);
          }
        }
      formData.append(`attachedFiles`, fileArray);
      formData.append(`employeeID`, employeeID);
      formData.append(`title`, title);
      formData.append(`initials`, initials);
      formData.append(`bCNumber`, bCNumber);
      formData.append(`firstName`, firstName);
      formData.append(`lastName`, lastName);
      formData.append(`bCResourceNumber`, bCResourceNumber);
      formData.append(`telephone`, telephone);
      formData.append(`email`, email);
      competenceMatrixId.map((x) => {
        formData.append(`competenceMatrix`, x.id);
      });
      console.log(competenceMatrixId);
      // formData.append(`competenceMatrixData`, competenceMatrixData);
      formData.append(`techniques`, techniques);
      formData.append(`linkToUrlSubjectMapNDT`, linkToUrlSubjectMapNDT);
      formData.append(
        `linkToUrlSubjectMapWeldingN3`,
        linkToUrlSubjectMapWeldingN3
      );
      formData.append(`url`, url);
      formData.append(
        `linkToUrlTopicMapWeldingN2UpperRoom`,
        linkToUrlTopicMapWeldingN2UpperRoom
      );
      formData.append(
        `linkToUrlTopicCardWeldingN2Issuance`,
        linkToUrlTopicCardWeldingN2Issuance
      );
      formData.append(`url1`, url1);
      formData.append(`employmentStatusID`, employmentStatusID);
      formData.append(`files`, files);

      console.log("submit ran", "mode", mode);
      if (pageMode === Modes.create) {
        Axios.post(
          ` ${process.env.REACT_APP_API_BASE_URL}Employee/SaveEmployee`,
          formData
        )

          .then((response) => {
            console.log(response);
            Swal.fire("Save", "Employee Saved Sucessfully", "success");
            navigate(routeNames.EMPLOYEE);
            setCreationState(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        formData["employeeID"] = location.state.employeeData.employeeID;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Employee/SaveEmployee`,
          formData
        )
          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Employee Updated Sucessfully", "success");
            navigate(routeNames.EMPLOYEE);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
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
    setCompetenceMatrixId(ids);
  };
  const handleEdit = () => {};
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Employee</h1>
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
            BcNumber
          </label>
          <input
            type="number"
            value={bCNumber}
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
            FirstName
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            LastName
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            BCResourceNumber
          </label>
          <input
            type="number"
            value={bCResourceNumber}
            onChange={(e) => setBCResourceNumber(e.target.value)}
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
            type="number"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
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
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Initials
          </label>
          <input
            type="email"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Competence Matrix
          </label>
          <NewSelect
            isMulti
            value={competenceMatrixId}
            onChange={handleCompetence}
            options={competenceDropdownData}
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            techniques
          </label>
          <input
            type="text"
            value={techniques}
            onChange={(e) => setTechniques(e.target.value)}
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
            Link to URL subject map NDT
          </label>
          <input
            type="link"
            value={linkToUrlSubjectMapNDT}
            onChange={(e) => setLinkToUrlSubjectMapNDT(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter a URL address"
          />{" "}
          <br />
          <input
            type="email"
            value={link1}
            onChange={(e) => setLink1(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Alternative text"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Link to URL topic map Welding N-3
          </label>
          <input
            type="email"
            value={linkToUrlSubjectMapWeldingN3}
            onChange={(e) => setLinkToUrlSubjectMapWeldingN3(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter a URL address"
          />{" "}
          <br />
          <input
            type="email"
            value={url1}
            onChange={(e) => setURL1(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Alternative text"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Link to URL workpiece map Welding Certification N2-Presence
          </label>
          <input
            type="email"
            value={linkToUrlTopicMapWeldingN2UpperRoom}
            onChange={(e) =>
              setLinkToUrlTopicMapWeldingN2UpperRoom(e.target.value)
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter a URL address"
          />{" "}
          <br />
          <input
            type="email"
            value={url1}
            onChange={(e) => setURL1(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Alternative text"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Link to URL workpiece map Welding Certification N2-Issue
          </label>
          <input
            type="email"
            value={linkToUrlTopicCardWeldingN2Issuance}
            onChange={(e) =>
              setLinkToUrlTopicCardWeldingN2Issuance(e.target.value)
            }
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter a URL address"
          />{" "}
          <br />
          <input
            type="email"
            value={url1}
            onChange={(e) => setURL1(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Alternative text"
          />
        </div>
        <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
            Employeement status
          </label>
          <Select
            value={employmentStatusID}
            onChange={handleEmployStatusChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {employementStatusDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
            })}
          </Select>
        </div>
        {/* <div className="mb-3 A1">
          <label
            aria-required
            for="exampleFormControlInput1"
            className="form-label"
          >
           Employeement status
          </label>
          <Select
            value={employmentStatusName}
            onChange={handleEmployStatusChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            className="form-control"
          >
            {employeeStatusDropdownData.map((ele) => {
              return <MenuItem value={ele.id}>{ele.name}</MenuItem>
            })}
          </Select>
        </div> */}
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
            to={routeNames.EMPLOYEE}
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
export default CreateEmployee;
