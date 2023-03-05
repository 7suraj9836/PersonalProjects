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

const CreatesubjectType = ({ mode, setCreationState, subjectTypeData }) => {
  const location = useLocation();
  const [pageMode, setPageMode] = useState("create");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [listName, setListname] = useState("");
  const [listNumber, setListnumber] = useState("");

  const [haveUnderSelection, setHaveUnderSelection] = useState(false);
  const [subjectTypeID, setSubjectTypeID] = useState(0);

  const [competenceDropdownData, setCompetenceDropdownData] = useState([]);
  const [competenceRequirementsId, setCompetenceRequirementsId] = useState([]);

  const [relatedAreaDropdownData, setRelatedAreaDropdownData] = useState([]);
  const [relatedAreaId, setRelatedAreaId] = useState(0);

  /* attach file*/

  const [files, setFiles] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    console.log(e.target.files);
  };

  const handleRelatedAreaChange = (event) => {
    setRelatedAreaId(event.target.value);
  };

  useEffect(() => {
    async function GetRelatedArea() {
      let result = await Axios.get(
        `${process.env.REACT_APP_API_BASE_URL}Territory/GetAllTerritories`
      );
      setRelatedAreaDropdownData(result.data);
    }
    GetRelatedArea();

    async function GetAllCompetenceRequirements() {
      let result = await Axios.get(
        "http://122.176.101.76:8081/api/Dropdown/GetAllCompetenceMatrix"
      );
      console.log(result.data);
      let dData = result.data.map((item) => {
        return { ...item, label: item.name, value: item.id };
      });
      console.log(dData, "abc");
      setCompetenceDropdownData(dData);
    }
    GetAllCompetenceRequirements();

    console.log(location);
    mode = location.state.mode;
    subjectTypeData = location.state.subjectTypeData;
    console.log(subjectTypeData);
    if (mode == Modes.edit) {
      console.log(subjectTypeData);
      setSubjectTypeID(subjectTypeData.subjectTypeID);
      setTitle(subjectTypeData.title);
      setDescription(subjectTypeData.description);
      setListname(subjectTypeData.listName);
      setListnumber(subjectTypeData.listNumber);
      setRelatedAreaId(subjectTypeData.relatedAreaID);
      setHaveUnderSelection(subjectTypeData.haveUnderSelection);

      let y = [];
      subjectTypeData.competenceRequirementsData.map((x) => {
        y.push({ id: x.id, name: x.name, label: x.name });
      });
      setCompetenceRequirementsId(y);
      // console.log(y, "crIDS");

      // setCompetenceRequirementsId(
      //   subjectTypeData.competenceRequirementsData.name
      // );
      console.log(subjectTypeData.competenceRequirementsData);
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
        formData.append(`subjectTypeID`, subjectTypeID);
        formData.append(`title`, title);
        formData.append(`description`, description);
        formData.append(`listName`, listName);
        formData.append(`listNumber`, listNumber);
        formData.append(`relatedAreaID`, Number(relatedAreaId));
        formData.append(`haveUnderSelection`, haveUnderSelection);
        competenceRequirementsId.map((x) => {
          formData.append(`competenceRequirements`, x.id);
        });
        console.log(competenceRequirementsId);
        // console.log(
        //   competenceRequirementsId.map((ele) => {
        //     return <p>{ele.name}</p>;
        //   })
        // );

        // formData.append(`competenceRequirements`, competenceRequirements);
        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}SubjectType/SaveSubjectType`,
            formData
          )

            .then((response) => {
              console.log(response);
              Swal.fire("Save", "Subject Type Saved Sucessfully", "success");
              navigate("/subjecttype");
              setCreationState(false);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          formData["subjectTypeID"] =
            location.state.subjectTypeData.subjectTypeID;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}SubjectType/SaveSubjectType`,
            formData
          )
            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "Subject Type Updated Sucessfully", "success");
              navigate(routeNames.SUBJECTTYPE);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
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
  };

  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Subject Type</h1>
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
        <label for="inputEmail3">Description</label>
        <div class="form-floating">
          <textarea
            class="form-control"
            id="floatingTextarea"
            rows="4"
            cols="50"
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
          <label for="inputEmail3" class="form-label">
            ListName
          </label>

          <input
            type="text"
            class="form-control"
            required
            value={listName}
            onChange={(e) => setListname(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label class="col-sm-2 col-form-label" for="inputGroupSelect03">
            Related Area
          </label>
          <Select
            value={relatedAreaId}
            onChange={handleRelatedAreaChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {relatedAreaDropdownData.map((ele) => {
              return <MenuItem value={ele.territoryID}>{ele.title}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            List Number
          </label>

          <input
            type="number"
            class="form-control"
            id="inputEmail3"
            value={listNumber}
            onChange={(e) => setListnumber(e.target.value)}
          />
        </div>
        <div className="form-check">
          <label htmlFor="" className="form-check-label">
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
            isMulti
            value={competenceRequirementsId}
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
            to={routeNames.SUBJECTTYPE}
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

export default CreatesubjectType;
