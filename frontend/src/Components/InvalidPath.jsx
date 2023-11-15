import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom'; // Make sure you have react-router-dom installed

const InvalidPath = () => {
  return (
    <div className="container mt-5">
        <Helmet>
        <title>Page Not Found - EduConnect</title>
      </Helmet>
      <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="text-center">
              <img
                src={`${process.env.PUBLIC_URL}/shutterstock_774749455.jpg`}
                alt="404"
                className="img-fluid mb-4"
                width='550px'
              />
              <h1 className="card-title">Site Not Found</h1>
              <p className="card-text">The page you are looking for does not exist.</p>
              <Link to="/" className="btn btn-primary">Go to Home Page</Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InvalidPath;
