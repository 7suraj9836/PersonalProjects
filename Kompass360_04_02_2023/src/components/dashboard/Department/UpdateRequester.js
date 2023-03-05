import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modes } from "../../common/Constants/Modes";
import CreateRequesterDepartment from "./CreateRequesterDepartment";

export default function UpdateRequesterDepartment({ departmentID }) {
  const [departmentData, setDepartmentData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}RequesterDepartment/GetRequesterDepartmentByID?DepartmentID=${departmentID}`
      )
      .then((response) => {
        console.log(response.data);
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <CreateRequesterDepartment
          mode={Modes.edit}
          departmentData={departmentData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
