import Dashboard from "./Dashboard";
import AddSP from "./AddSP";
import Sidebar from "./sidebar";

import "./admin.css";

function Admin() {
  return (
    <div className="wrapper">
      <div className="main mt-6 grid">
        <main className="p-0 m-0 mt-3 content">
          <div className="container-fluid p-0 m-0">
            <div class="row">
              <div class="col-lg-2 col-md-4 col-sm-12">
                <div className="fixed">
                  <Sidebar />
                </div>
              </div>

              <div class="col-lg-9 col-md-8 col-sm-12">
                <Dashboard />
                <AddSP />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
export default Admin;
