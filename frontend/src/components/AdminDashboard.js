export const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">1,245</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text">$54,230</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text">37</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};