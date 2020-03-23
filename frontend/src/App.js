import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Register from "./components/auth/Register";
import phyLogin from "./components/auth/phyLogin";
import patientProfile from "./components/profiles/patients";
import PatientData from "./components/profiles/patientsData";
import PhysicianProfile from "./components/profiles/physicians";
import PatientTreatment from "./components/profiles/patientTreatment";
import AdminLogin from "./components/auth/AdminLogin";
import PhyRegisterByAdmin from "./components/auth/phyRegisterbyAdmin";
import AppointPhy from "./components/patientsComponents/appointPhy";
import MeicalRecordDetails from "./components/physiciansComponents/medicalRecordDetails";
import Landing from "./components/layout/Landing";
import AdminPanel from "./components/layout/AdminPanel";
import DeletePhysician from "./components/adminComponents/deletePhysician";
import DeletePatient from "./components/adminComponents/deletePatient";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        {/* Admin Routes */}
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/panel" component={AdminPanel} />
        <Route
          exact
          path="/admin/register/physician"
          component={PhyRegisterByAdmin}
        />
        <Route
          exact
          path="/admin/delete/physician"
          component={DeletePhysician}
        />
        <Route exact path="/admin/delete/patient" component={DeletePatient} />
        {/* Patient Routes */}
        <Route exact path="/patient/login" component={Login} />
        <Route exact path="/patient/register" component={Register} />
        <Route exact path="/patient/profile" component={patientProfile} />
        <Route exact path="/patient/appoint/physician" component={AppointPhy} />
        {/* Physician Routes */}
        <Route exact path="/physician/login" component={phyLogin} />
        <Route exact path="/physician/profile" component={PhysicianProfile} />
        <Route
          exact
          path="/physician/patient/treatment"
          component={PatientTreatment}
        />
        <Route
          exact
          path="/physician/patient/record"
          component={MeicalRecordDetails}
        />

        {/* Both Can see depending on whos login */}
        <Route exact path="/profile/patient/data" component={PatientData} />
      </div>
    </Router>
  );
}

export default App;
