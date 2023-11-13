import React, { useEffect, useState } from 'react';
import StudentService from '../../Service/StudentService';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ListOfStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    StudentService.getStudents()
      .then(res => {
        setIsLoading(false)
        setStudents(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function viewCourses(id) {
    navigate('/students/view/' + id)
  }

  function editStudentDetails(sid) {
    navigate(`/students/edit/${sid}`)
  }
  function deleteStudent(id) {
    const confirmation = window.confirm("Do you want to delete this student?");

    if (confirmation) {
      StudentService.deleteStudent(id)
        .then(() => {
          window.alert("Student deleted successfully")
          setStudents(students.filter(student => student.id !== id));
          navigate('/students'); // Navigate to the students page
        })
        .catch((error) => {
          console.error('Error deleting student:', error);
        });
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
        <h3>list of Students</h3>
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Enrolled Courses</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student, index) => (
                <tr key={student.id} style={{ textAlign: 'center' }}>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{index + 1}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.name}</td>
                  <td onClick={() => { navigate('/students/view/' + student.id) }}>{student.emailId}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => viewCourses(student.id)}
                    >
                      View
                    </button>
                  </td>
                  <td className='d-flex align-items-center justify-content-around'>
                    <button type="button" className="btn btn-warning"
                      onClick={() => editStudentDetails(student.id)}> Edit </button>

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
