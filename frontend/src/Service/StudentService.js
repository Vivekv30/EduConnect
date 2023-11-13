import axios from 'axios';

const STUDENT_BASE_URL = 'http://localhost:8080/springToolSuite/api/v4/Students';

class StudentService {
    
    addStudent(student){
        return axios.post(STUDENT_BASE_URL,student);
    }
    updateStudent(id,student){
        return axios.put(STUDENT_BASE_URL+'/'+id,student);
    }

    getStudents() {
        return axios.get(STUDENT_BASE_URL);
    }

    getStudentById(id) {
        return axios.get(STUDENT_BASE_URL + '/' + id);
    }
    deleteStudent(id) {
        return axios.delete(STUDENT_BASE_URL+'/'+id);
    }

    enrollCourse(sid,cid){
        return axios.put(STUDENT_BASE_URL+'/'+sid+'/EnrollCourses/'+cid);
    }

    unenrollCourse(sid,cid){
        return axios.put(STUDENT_BASE_URL+'/'+sid+'/UnEnrollCourses/'+cid)
    }
}

const studentService = new StudentService();

export default studentService;