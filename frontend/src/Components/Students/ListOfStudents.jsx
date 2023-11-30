import React, { useEffect, useState } from 'react';
import StudentService from '../../Service/StudentService';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ListOfStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')
  useEffect(() => {
    setIsLoading(true)
    StudentService.getStudents()
      .then(res => {
        setIsLoading(false)
        setStudents(res.data);
        setFilterStudents(res.data)
      })
      .catch(error => {
        setIsLoading(false);
        setError('run backend application')
        console.log(error);
      });
  }, []);

  function deleteStudent(id) {

    if (window.confirm("Do you want to delete this student?")) {
      StudentService.deleteStudent(id)
        .then(() => {
          window.alert("Student deleted successfully")
          setStudents(students.filter(student => student.id !== id));
          setFilterStudents(filterStudents.filter(student => student.id !== id))
          navigate('/students'); // Navigate to the students page
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
        });
    }
  }

  function handleSearch(e) {
    const searchText = e.target.value.trim().toLowerCase();
    if (!searchText) {
      // If the search input is empty, display all students
      setStudents(filterStudents);
    } else {
      // Filter students based on the search input
      const filteredStudents = filterStudents.filter(student => {
        return (
          student.name.toLowerCase().includes(searchText) ||
          student.emailId.toLowerCase().includes(searchText) ||
          student.mobile.toLowerCase().includes(searchText) ||
          student.gender.toLowerCase() === searchText
        )
      });
      setStudents(filteredStudents);
    }
  }


  return (
    <div className='container ' style={{ display: 'flex' }}>
      <Helmet>
        <title>Students</title>
      </Helmet>
      <div style={{ flex: '2', marginRight: '5rem' }}>
        {isLoading && <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          {/* <div className="spinner-grow" style={{ width: '3rem;', height: '3rem;' }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div> */}
        </div>}
        {error && error !== '' && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <nav className="navbar ">
          <div className="container-fluid">
            <h3 className="navbar-brand">List of Students</h3>
            <div className="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
            </div>
          </div>
        </nav>
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">gender</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student, index) => (
                <tr key={student.id} style={{ textAlign: 'center' }}>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{index + 1}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.name}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.emailId}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.mobile}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.gender}</td>
                  <td className='d-flex align-items-center justify-content-around'>
                    <button type="button" className="btn btn-danger"
                      onClick={() => deleteStudent(student.id)} > Delete </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOfStudents;
