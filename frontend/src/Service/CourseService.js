import axios from 'axios';

const COURSE_BASE_URL = 'http://localhost:8080/springToolSuite/api/v4/Courses';

class CourseService {
    addCourse(course){
        return axios.post(COURSE_BASE_URL,course);
    }

    updateCourse(id,course){
        return axios.put(COURSE_BASE_URL+'/'+id,course)
    }
    getCourses() {
        return axios.get(COURSE_BASE_URL);
    }

    getCourseById(id) {
        return axios.get(COURSE_BASE_URL + '/' + id);
    }

    deleteCourse(id){
        return axios.delete(COURSE_BASE_URL+'/'+id)
    }
}

const courseService = new CourseService();

export default courseService;