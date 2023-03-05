import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateInstallationAddress from "./createinstallationaddress";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateInstallationAddress({ InstallationAddressID }) {
  const [installationAddressData, setInstallationAddressData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}InstallationAddress/GetInstallationAddressByID?InstallationAddressID=${InstallationAddressID}`
      )
      .then((response) => {
        // console.log(response.data);
        setInstallationAddressData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <CreateInstallationAddress
          mode={Modes.edit}
          territoryData={installationAddressData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
