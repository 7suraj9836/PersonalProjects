import React, { useEffect, useState } from "react";
import axios from "axios";
import Createthesubject from "./createthesubject";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateTheSubject({ subjectID }) {
  const [thesubjectData, setSubjectData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Subject/GetSubjectByID?SubjectID=${subjectID}`
      )
      .then((response) => {
        // console.log(response.data);
        setSubjectData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <createthesubject
          mode={Modes.edit}
          thesubjectData={thesubjectData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
