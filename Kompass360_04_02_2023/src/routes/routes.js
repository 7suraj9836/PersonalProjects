import { Route, Routes } from "react-router-dom";
import Case from "../components/dashboard/case/case";
import Territory from "../components/dashboard/territory/territory";
import Master from "../components/common/Layout/Layout";
import routeNames from "./routeName";
import Requester from "../components/dashboard/requester/requester";
import Createcase from "../components/dashboard/case/createcase";
import Createrequester from "../components/dashboard/requester/createrequester";
import Createterritory from "../components/dashboard/territory/createterritory";
import Login from "../components/dashboard/Login/login";

import InstallationAddress from "../components/dashboard/InstallationAddress/installationaddress";
import Subjecttype from "../components/dashboard/subjecttype/subjectType";
import CreateInstallationAddress from "../components/dashboard/InstallationAddress/createinstallationaddress";
import InspectionType from "../components/dashboard/InspectionType/InspectionType";
import CreatesubjectType from "../components/dashboard/subjecttype/createsubjecttype";
import ProtectedRotes from "./protectedRoutes";
import TheSubject from "../components/dashboard/theSubject/Thesubject";
import { CreateTheSubject } from "../components/dashboard/theSubject/CreateTheSubject";
import Inspection from "../components/dashboard/Inspection/Inspection";
import CreateInspection from "../components/dashboard/Inspection/CreateInspection";
import Createinspectiontype from "../components/dashboard/InspectionType/createinspectiontype";
import Dashboard from "../components/dashboard";
import SpecificTopic from "../components/dashboard/Specific Topic/specificTopic";
import CreateSpecificTopic from "../components/dashboard/Specific Topic/createSpecificTopic";
import { ForgotPassword } from "../components/dashboard/UserResetPassword/ForgotPassword";
import ResetPassword from "../components/dashboard/UserResetPassword/ResetPassword";

import CreateEmployee from "../components/dashboard/Employee/createEmployee";
import Employee from "../components/dashboard/Employee/Employee";
import CreateContact from "../components/dashboard/Contact/createContact";
import Contact from "../components/dashboard/Contact/Contact";

import inspectionCertificate from "../components/dashboard/InspectionCertificate/inspectionCertificate";
import RequesterDepartment from "../components/dashboard/Department/RequesterDepartment";
import CreateRequesterDepartment from "../components/dashboard/Department/CreateRequesterDepartment";
import Usermodule from "../components/dashboard/UserModule/Usermodule";

export default function Router() {
  return (
    <Routes>
      <Route path={routeNames.LOGIN} element={<Login />} />
      <Route
        path={routeNames.RESETPASSWORD + `/:userId/:resetKey`}
        element={<ResetPassword />}
      />

      <Route path={routeNames.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route
        path={routeNames.DASHBOARD}
        element={
          //<ProtectedRotes>
          <Master />
          // </ProtectedRotes>
        }
      >
        <Route path={routeNames.DASHBOARD} element={<Dashboard />} />
        <Route path={routeNames.CASE} element={<Case />} />
        <Route path={routeNames.CREATECASE} element={<Createcase />} />
        <Route path={routeNames.EDITCASE} element={<Createcase />} />
        <Route path={routeNames.SUBJECT} element={<TheSubject />} />
        <Route
          path={routeNames.CREATETHESUBJECT}
          element={<CreateTheSubject />}
        />
        <Route path={routeNames.TERRITORY} element={<Territory />} />
        <Route path={routeNames.REQUESTER} element={<Requester />} />
        <Route
          path={routeNames.CREATEREQUESTER}
          element={<Createrequester />}
        />

        <Route
          path={routeNames.CREATEINSTALLATIONADDRESS}
          element={<CreateInstallationAddress />}
        />

        <Route
          path={routeNames.CREATETERRITORY}
          element={<Createterritory />}
        />

        <Route
          path={routeNames.INSTALLATIONADDRESS}
          element={<InstallationAddress />}
        />

        <Route path={routeNames.INSPECTIONTYPE} element={<InspectionType />} />
        <Route
          path={routeNames.CREATEINSPECTIONTYPE}
          element={<Createinspectiontype />}
        />
        <Route
          path={routeNames.CREATESUBJECTTYPE}
          element={<CreatesubjectType />}
        />
        <Route
          path={routeNames.CREATEINSPECTION}
          element={<CreateInspection />}
        />
        <Route
          path={routeNames.EDITINSPECTION}
          element={<CreateInspection />}
        />
        <Route path={routeNames.EDITTERRITORY} element={<Createterritory />} />
        <Route path={routeNames.INSPECTION} element={<Inspection />} />
        <Route path={routeNames.SUBJECTTYPE} element={<Subjecttype />} />
        <Route path={routeNames.SPECIFICTOPIC} element={<SpecificTopic />} />
        <Route path={routeNames.EMPLOYEE} element={<Employee />} />
        <Route path={routeNames.CREATEEMPLOYEE} element={<CreateEmployee />} />
        <Route path={routeNames.CREATECONTACT} element={<CreateContact />} />
        <Route path={routeNames.CONTACT} element={<Contact />} />
        <Route
          path={routeNames.CREATESPECIFICTOPIC}
          element={<CreateSpecificTopic />}
        />
        <Route
          path={routeNames.INSPECTIONCERTIFICATE}
          element={<inspectionCertificate />}
        />
        <Route
          path={routeNames.REQUESTERDEPARTMENT}
          element={<RequesterDepartment />}
        />
        <Route
          path={routeNames.CREATEREQUESTERDEPARTMENT}
          element={<CreateRequesterDepartment />}
        />
        <Route path={routeNames.USERMODULE} element={<Usermodule />} />
      </Route>
    </Routes>
  );
}
