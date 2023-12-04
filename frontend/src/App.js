import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ListOfStudents from './Components/Students/ListOfStudents';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AddOrUpdateStudent from './Components/Students/AddOrUpdateStudent';
import Navbar from './Components/Header/Navbar';
import ListOfCourses from './Components/Courses/ListOfCourses';
import AddOrEditOrViewStudent from './Components/Students/AddOrEditOrViewStudent';
import AddOrUpdateCourse from './Components/Courses/AddOrUpdateCourse';
import Home from './Components/Home/Home';
import InvalidPath from './Components/InvalidPath';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/students" element={<ListOfStudents />} />
          <Route path="/students/add" element={<AddOrEditOrViewStudent mode={'add'} />} />
          <Route path="/students/edit/:sid" element={<AddOrEditOrViewStudent mode={'edit'}/>}/>
          <Route path="/students/view/:sid" element={<AddOrEditOrViewStudent mode={'view'} />} />

          <Route path="/students/:sid/courses" element={<ListOfCourses/>}/>
      
          <Route path="/courses" element={<ListOfCourses/>}/>
          <Route path="/courses/:cid" element={<AddOrUpdateCourse/>}/>
          <Route path='*' element={<InvalidPath/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
