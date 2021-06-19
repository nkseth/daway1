//import logo from './logo.svg';
import './App.css';
import ErrorBoundary from "./errorboundary";
import Homepage from './screen/home/homepage'
import Dashboard from './dashboard/dashboard'
import Udashboard from './userdash/dashboarduser'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from "react-router-dom"
import Loginpage from './loginsystem/loginpage'
import Signuppage from './loginsystem/Signuppage';
import Signupascompany from './loginsystem/signupascompany';
import { AuthProvider } from "./Auth"
import PrivateRoute from "./privateroute"
import Loginusertype from './loginsystem/loginusertype'
import { Jobcategory } from "./context/jobcategory"
import { RecoilRoot } from "recoil"
import { Preferprovider } from './context/userpreferences'
import { Viewjobprovider } from './context/viewjob'
import { Appliedjobs } from './context/appliedjobs'
import { Company } from './context/companycontext'
import Forgotpass from './loginsystem/forgotpass'
import Cdash from './companydashboard/dashboard'
import Mycourse from "./userdash/mycourses/mycourse"


function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <BrowserRouter>


          <div>
            <RecoilRoot>

              <Company>
                <PrivateRoute path="/cdashboard" exact component={Dashboard} />
              </Company>


              < Jobcategory>
                <Preferprovider>
                  <Viewjobprovider>
                    < Appliedjobs>
                      <PrivateRoute path="/sdashboard" exact component={Udashboard} />
                      <PrivateRoute path="/mycourses" exact component={Mycourse} />
                    </ Appliedjobs>
                  </Viewjobprovider>
                </Preferprovider>
              </Jobcategory>




              <PrivateRoute path='/loginusertype' exact component={Loginusertype} />


            </RecoilRoot>
            <Switch>


              <Route path="/Loginpage" exact component={Loginpage} />
              <Route path="/forgotpass" exact component={Forgotpass} />
              <Route path="/Signuppage" exact component={Signuppage} />
              <Route path="/signupascompany" exact component={Signupascompany} />

              <Route path="/" exact component={Homepage} />

            </Switch>
          </div>

        </BrowserRouter>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
