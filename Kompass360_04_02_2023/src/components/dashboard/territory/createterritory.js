import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NewSelect from "react-select";

import { fontSize } from "@mui/system";

const Createterritory = ({ mode, territoryData, setCreationState }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [listName, setListname] = useState("");
  const [listNameError, setListNameError] = useState("");
  const [listNumber, setListnumber] = useState("");
  const [active, setActive] = useState(false);
  const [haveUnderSelection, setHaveUnderSelection] = useState(false);
  const [territoryID, setTerritoryID] = useState(0);
  const [FileAttachmentError, setFileAttachmentError] = useState(null);
  // const [competenceRequirements, setCompetencerequirements] = useState("");

  const [competenceDropdownData, setCompetenceDropdownData] = useState([]);
  const [competenceRequirementsId, setCompetenceRequirementsId] = useState([]);

  /* attach file*/

  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  useEffect(() => {
    console.log(location);
    mode = location.state.mode;
    territoryData = location.state.territoryData;
    console.log(territoryData);
    setPageMode(mode);
    if (mode == Modes.edit) {
      console.log(territoryData);
      setTerritoryID(territoryData.territoryID);
      setTitle(territoryData.title);
      setDescription(territoryData.description);
      setListname(territoryData.listName);
      setListnumber(territoryData.listNumber);
      setActive(territoryData.active);
      setHaveUnderSelection(territoryData.haveUnderSelection);
      let y = [];
      territoryData.competenceRequirementsData.map((x) => {
        y.push({ id: x.id, name: x.name, label: x.name });
      });
      setCompetenceRequirementsId(y);
    }
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (FileAttachmentError === null) {
      setFileAttachmentError("No File Attached");
    } else {
      setFileAttachmentError("");
    }
    if (title === "") {
      setTitleError("Title is Required");
    } else {
      setTitleError("");
    }
    if (listName === "") {
      setListNameError("ListName is Required");
    } else {
      setListNameError("");

      if (true) {
        let formData = new FormData();

        let fileArray = [];
        if (files != null) {
          for (let index = 0; index < files.length; index++) {
            const element = files[index];
            fileArray.push(element);
          }
        }
        formData.append(`attachedFiles`, fileArray);
        formData.append(`territoryID`, territoryID);
        formData.append(`title`, title);
        formData.append(`description`, description);
        formData.append(`listName`, listName);
        formData.append(`listNumber`, listNumber);
        formData.append(`active`, active);
        formData.append(`haveUnderSelection`, haveUnderSelection);
        competenceRequirementsId.map((x) => {
          formData.append(`competenceRequirements`, x.id);
        });
        console.log(competenceRequirementsId);

        // formData.append(`competenceRequirements`, competenceRequirements);
        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Territory/SaveTerritory`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Territory Saved Sucessfully", "success");
              navigate(routeNames.TERRITORY);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          formData["territoryID"] = location.state.territoryData.territoryID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}Territory/SaveTerritory`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Territory Updated Sucessfully", "success");
              navigate(routeNames.TERRITORY);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };

  useEffect(() => {
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
  }, []);

  const handleChange = (e) => {
    setActive(e.target.checked);

    console.log(e.target.checked);
  };

  const handleUnder = (e) => {
    setHaveUnderSelection(e.target.checked);

    console.log(e.target.checked);
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
    setCompetenceRequirementsId(ids);
    // setSelected([...selected, input.id]);
    // for (var i = 0; i < input.length; ++i) output.push(input[i][field]);
  };

  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Territory</h1>
        {/* <form action="" onSubmit={handleSubmit}> */}
        <div className="mb-3 A1">
          <label for="inputEmail3" class="form-label" required>
            Title
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}
          <input
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
        <label for="inputEmail3">Description</label>
        <div class="form-floating">
          <textarea
            class="form-control"
            id="floatingTextarea"
            name="comment"
            form="usrform"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          >
            Enter text here...
          </textarea>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" className="form-label">
            ListName
          </label>
          {listNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{listNameError}</p>
          )}
          <input
            type="text"
            required
            className="form-control"
            value={listName}
            onChange={(e) => {
              setListname(e.target.value);
              setListNameError("");
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            List Number
          </label>

          <input
            type="text"
            class="form-control"
            id="inputEmail3"
            value={listNumber}
            onChange={(e) => setListnumber(e.target.value)}
          />
        </div>
        <div className="form-check">
          <label
            htmlFor=""
            className="form-check-label"
            style={{
              marginLeft: "-18px",
              marginRight: "10px",
              marginBottom: "13px",
            }}
          >
            Active
          </label>
          &nbsp;
          <input
            type="checkbox"
            name=""
            id=""
            checked={active}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-check">
          <label
            htmlFor=""
            className="form-check-label"
            style={{
              marginLeft: "-18px",
              marginRight: "10px",
              marginBottom: "13px",
            }}
          >
            HaveUnderSelection
          </label>
          &nbsp;
          <input
            type="checkbox"
            name=""
            id=""
            checked={haveUnderSelection}
            onChange={(e) => handleUnder(e)}
          />
        </div>
        <div class="mb-3 A1">
          <label class="form-label" for="inputGroupSelect03">
            Competence Requirements
          </label>
          <NewSelect
            value={competenceRequirementsId}
            isMulti
            onChange={handleCompetence}
            options={competenceDropdownData}
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
            to={routeNames.TERRITORY}
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
      {/* </form> */}
    </div>
  );
};

export default Createterritory;
