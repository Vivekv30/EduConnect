import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>Welcome to Your Learning Portal</h1>
          <p className="lead">
            Explore a wide range of courses and manage student information with ease. This platform
            provides a seamless experience for both students and administrators.
          </p>
          <img
                src={`${process.env.PUBLIC_URL}/educonnectlogo2.png`}
                alt="Learning Portal Illustration"
            className="img-fluid"
            style={{margin:'-40px',width:'600px'}}
          />
          {/* <img
            src="https://images.pexels.com/photos/4778621/pexels-photo-4778621.jpeg"
            alt="Learning Portal Illustration"
            className="img-fluid mt-4 mb-4"
          /> */}
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Manage Students</h5>
                  <p className="card-text">
                    Add, edit, and view student details. Keep track of enrolled courses and easily
                    manage student information.
                  </p>
                  <Link to="/students" className="btn btn-primary">
                    View Students
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Explore Courses</h5>
                  <p className="card-text">
                    Discover a variety of courses offered. View details, enroll, and manage courses
                    effortlessly.
                  </p>
                  <Link to="/courses" className="btn btn-secondary">
                    View Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p>
              This Learning Portal is designed to streamline educational management. It provides
              comprehensive features for both students and administrators, ensuring a user-friendly
              and efficient experience.
            </p>
            <p>
              Get started by exploring students or courses, or use the navigation links above to
              access specific sections.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
