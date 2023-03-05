import React, { useEffect, useState } from "react";
import axios from "axios";
import Createterritory from "./createterritory";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateSubjectType({ SubjectTypeID }) {
  const [subjectTypeData, setSubjectTypeData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}SubjectType/GetSubjectTypeByID?subjectTypeID=${SubjectTypeID}`
      )
      .then((response) => {
        // console.log(response.data);
        setSubjectTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <Createterritory
          mode={Modes.edit}
          subjectTypeData={subjectTypeData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
