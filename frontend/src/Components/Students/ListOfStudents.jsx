import React, { useEffect, useState } from 'react';
import StudentService from '../../Service/StudentService';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../Students/listOfStudents.css'
const ListOfStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  // filter states for students
  const [filteredStudentIds, setFilteredStudentIds] = useState([]); // New state for storing filtered IDs
  const [uSearch, setUSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [mailSearch, setMailSearch] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const [genderSearch, setGenderSearch] = useState('');
  const [attrName, setAttrName] = useState('');
  const [attrValue, setAttrValue] = useState('');
  //--------------------------
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  //sorting students
  const [sortByContent,setSortByContent] = useState('');
  // const [sortByName, setSortByName] = useState(''); // 'asc', 'desc', or 'default'
  // const [sortByMobile, setSortByMobile] = useState(''); // 'lowToHigh', 'highToLow', or 'default'
  // const [sortByRecent, setSortByRecent] = useState(''); // 'first', 'last', or 'default'

  //useeffect for fetching students
  useEffect(() => {
    setIsLoading(true)
    StudentService.getStudents()
      .then(res => {
        setIsLoading(false)
        setStudents(res.data);
        setFilteredStudentIds(res.data.map(student => student.id)); // Set filteredStudentIds with all student IDs initially
      })
      .catch(error => {
        setIsLoading(false);
        setError('run backend application and refresh the page')
        console.log(error);
      });
  }, []);

  //useeffect for filter the students based on the dependecies which we specified
  useEffect(() => {
    let filteredStudents = students.map(student => student.id);
    if (uSearch !== '') { //filter the students when uSearch has a value
      filteredStudents = students.filter(student => {
        const lowerCaseUSearch = uSearch.toLowerCase();
        return (
          student.name.toLowerCase().includes(lowerCaseUSearch) ||
          student.emailId.toLowerCase().includes(lowerCaseUSearch) ||
          student.mobile.toLowerCase().includes(lowerCaseUSearch) ||
          student.gender.toLowerCase() === lowerCaseUSearch
        );
      });

      if (nameSearch !== '') {
        filteredStudents = filteredStudents.filter(student =>
          student.name.toLowerCase().includes(nameSearch.toLowerCase())
        );
      }

      if (mailSearch !== '') {
        filteredStudents = filteredStudents.filter(student =>
          student.emailId.toLowerCase().includes(mailSearch.toLowerCase())
        );
      }

      if (mobileSearch !== '') {
        filteredStudents = filteredStudents.filter(student =>
          student.mobile.toLowerCase().includes(mobileSearch.toLowerCase())
        );
      }

      if (genderSearch !== '') {
        filteredStudents = filteredStudents.filter(
          student => student.gender.toLowerCase() === genderSearch.toLowerCase()
        );
      }

      setFilteredStudentIds(filteredStudents.map(student => student.id));
    } else if (attrName !== '' && attrValue !== '') {
      // If uSearch is empty but not any one of the search then filter students based on that search into filteredStudentIds 
      //or for uniquely search or filter students based on that search if name it will filter students based on name
      if (genderSearch !== '') {
        filteredStudents = students
          .filter(student =>
            student[attrName].toLowerCase() === attrValue.toLowerCase()
          );
      } else {
        filteredStudents = students
          .filter(student =>
            student[attrName].toLowerCase().includes(attrValue.toLowerCase())
          )
      }
      setFilteredStudentIds(filteredStudents.map(student => student.id))
    }
    else {
      // If uSearch is empty, set filteredStudentIds to include all student IDs and make remaining as empty or ''
      setNameSearch('');
      setMailSearch('');
      setMobileSearch('');
      setGenderSearch('');
      setFilteredStudentIds(students.map(student => student.id))
    }
  }, [uSearch, nameSearch, mailSearch, mobileSearch, genderSearch, students, attrName, attrValue]);

  //useeffect for sort students based on the dependecies which we specified
  useEffect(() => {
    let sortedStudents = [...students];
    // Sorting by name
    if (sortByContent === 'name_asc') {
      sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortByContent === 'name_desc') {
      sortedStudents.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Sorting by mobile
    if (sortByContent === 'Mobile_lowToHigh') {
      sortedStudents.sort((a, b) => a.mobile.localeCompare(b.mobile));
    } else if (sortByContent === 'Mobile_highToLow') {
      sortedStudents.sort((a, b) => b.mobile.localeCompare(a.mobile));
    }

    // Sorting by recent
    if (sortByContent === 'Recent_first') {
      sortedStudents = [...students]
      sortedStudents.reverse(); // Reverse the order to show recent first
    }
    // else{
    //   sortedStudents = [...students];
    // }
    console.log(sortedStudents)
    setFilteredStudentIds(sortedStudents.map(student => student.id));
  }, [students, sortByContent])

  //delete student based on id
  function deleteStudent(id) {

    if (window.confirm("Do you want to delete this student?")) {
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

  //set the name and value of targeted tag into specific search
  function ChangeHandler(e) {

    if (e.target.getAttribute('name') === 'gender') {
      const name = e.target.getAttribute('name'); // Get the 'name' attribute
      const value = e.target.getAttribute('value'); // Get the 'value' attribute 
      if (uSearch === '') {
        setAttrName(name)
        setAttrValue(value)
        setNameSearch('');
        setMailSearch('');
        setMobileSearch('');
        setGenderSearch('');
      }
      setGenderSearch(value.toLowerCase());
    } else {
      const { name, value } = e.target;
      // console.log(name + "      " + value)
      switch (name) {
        case 'uSearch':
          setUSearch(value.toLowerCase());
          break;
        case 'name':
          if (uSearch === '') {
            setAttrName(name)
            setAttrValue(value)
            setMailSearch('');
            setMobileSearch('');
            setGenderSearch('')
          }
          setNameSearch(value.toLowerCase());
          break;
        case 'emailId':
          if (uSearch === '') {
            setAttrName(name)
            setAttrValue(value)
            setNameSearch('');
            setMobileSearch('');
            setGenderSearch('');
          }
          setMailSearch(value.toLowerCase());
          break;
        case 'mobile':
          if (uSearch === '') {
            setAttrName(name)
            setAttrValue(value)
            setNameSearch('');
            setMailSearch('');
            setGenderSearch('');
          }
          setMobileSearch(value.toLowerCase());
          break;
        default:
          break;
      }
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
              <div className="dropdown-center">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort By
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={() => setSortByContent('last')}>Default</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortByContent('name_asc')}>Name (A-Z)</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortByContent('name_desc')}>Name (Z-A)</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortByContent('Mobile_lowToHigh')}>Mobile (Low to High)</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortByContent('Mobile_highToLow')}>Mobile (High to Low)</button></li>
                  <li><button className="dropdown-item" onClick={() => setSortByContent('Recent_first')}>Recent First</button></li>
                </ul>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search by name, email, mobile, or gender"
                  name='uSearch'
                  value={uSearch}
                  onChange={ChangeHandler}
                />
              </div>
            </div>
          </div>
        </nav>
        <table className="table table-striped">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Gender</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <input className="form-control me-2 w-100" type="search" name="name" placeholder="search by name" value={nameSearch} onChange={ChangeHandler} />
              </td>
              <td>
                <input className="form-control me-2" type="search" name="emailId" placeholder="search by Email" value={mailSearch} onChange={ChangeHandler} />
              </td>
              <td>
                <div className="">
                  <input className="form-control me-2 w-100" type="search" name="mobile" placeholder="search by mobile no." value={mobileSearch} onChange={ChangeHandler} />
                </div>
              </td>
              <td>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {attrName === 'gender' ? attrValue !== '' ? attrValue : 'Default' : 'Default'}
                    {console.log(attrValue)}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li className="dropdown-item" name='gender' value='' onClick={ChangeHandler}>default</li>
                    <li className="dropdown-item" name='gender' value='male' onClick={ChangeHandler}>Male</li>
                    <li className="dropdown-item" name='gender' value='female' onClick={ChangeHandler} >Female</li>
                  </ul>
                </div>
              </td>
              <td></td>
            </tr>
            {
              filteredStudentIds.map((studentId, index) => {
                const student = students.find(student => student.id === studentId);
                if (student) {
                  return (
                    <tr key={student.id} style={{ textAlign: 'center' }}>
                      <td onClick={() => navigate('/students/view/' + student.id)}>{index + 1}</td>
                      <td onClick={() => navigate('/students/view/' + student.id)}>{student.name}</td>
                      <td onClick={() => navigate('/students/view/' + student.id)}>{student.emailId}</td>
                      <td onClick={() => navigate('/students/view/' + student.id)}>{student.mobile}</td>
                      <td onClick={() => navigate('/students/view/' + student.id)}>{student.gender}</td>
                      <td className='d-flex align-items-center justify-content-around'>
                        <button type="button" className="btn btn-danger" onClick={() => deleteStudent(student.id)}> Delete </button>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}
export default ListOfStudents;