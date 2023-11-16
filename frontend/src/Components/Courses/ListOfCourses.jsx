import React, { useEffect, useState } from 'react'
import courseService from '../../Service/CourseService'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import studentService from '../../Service/StudentService';
import { Helmet } from 'react-helmet';

const ListOfCourses = () => {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading,setIsLoading] = useState(false)
  const studentCoursesIds = location.state && location.state.studentCoursesIds;

  const { sid } = useParams();

  useEffect(
    () => {
      setIsLoading(true)
      courseService.getCourses()
        .then(res => {
          setIsLoading(false)
          setCourses(res.data)

        })
        .catch(error => console.log('error :' + error))
    }, [])

  function editCourseDetails(cid) {
    navigate('/courses/' + cid)

  }
  function deleteCourse(id) {

    if (window.confirm("Do you want to delete this student?")) {
      courseService.deleteCourse(id)
        .then(() => {
          window.alert("Course deleted successfully")
          setCourses(courses.filter(course => course.id !== id));
          navigate('/courses');// Navigate to the courses page
        })
        .catch((error) => {
          console.error('Error deleting course:', error);
        });
    }

  }

  function enrollOrUnenroll(sid, cid) {
    if (studentCoursesIds && studentCoursesIds.includes(cid)) {//unenroll
      if (window.confirm("do you want to unenroll this course?")) {
        setIsLoading(true)
        studentService.unenrollCourse(sid, cid)
          .then(res => {
            setIsLoading(false)
            window.alert("course unenrolled successfully")
            navigate('/students/view/' + sid);// Navigate to the perticular student page
          })
          .catch(error => console.log('error :' + error));
      }
    } else if (window.confirm("do you want to enroll this course")) {//enroll
      setIsLoading(true)
      studentService.enrollCourse(sid, cid)
        .then(res => {
          setIsLoading(false)
          window.alert("course enrolled successfully")
          navigate('/students/view/' + sid);
        })
        .catch(error => console.log('error :' + error));
    }
  }

  return (
    <div className='container' style={{ display: 'flex' }}>
      <Helmet>
        <title>Courses</title>
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
        <h3>list of Courses</h3>
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
              <th scope="col">Trainer</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              courses.map((course, index) => (
                <tr key={course.id} style={{ textAlign: 'center' }}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.duration}</td>
                  <td>{course.teacher ? course.teacher.name : ''}</td>
                  <td className='d-flex align-items-center justify-content-around'>
                    {
                      sid ? (
                        <button type="button" className="btn btn-warning"
                          onClick={() => enrollOrUnenroll(sid, course.id)}>
                          {studentCoursesIds && studentCoursesIds.includes(course.id) ? 'Unenroll' : 'Enroll'}
                        </button>
                      )
                        :
                        (
                          <>
                            <button type="button" className="btn btn-warning" onClick={() => editCourseDetails(course.id)}>
                              Edit
                            </button>
                            <button type="button" className="btn btn-danger" onClick={() => deleteCourse(course.id)}>
                              Delete
                            </button>
                          </>
                        )
                    }
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

export default ListOfCourses
