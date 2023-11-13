package com.stdtc.Course;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stdtc.Student.Student;
import com.stdtc.Student.StudentService;
import com.stdtc.Teacher.Teacher;
import com.stdtc.Teacher.TeacherService;

@RestController
@RequestMapping("/springToolSuite/api/v4/Courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
	
	private CourseService courseService;
	
	private StudentService studentService;
	
	private TeacherService teacherService;

	@Autowired
	public CourseController(CourseService courseService, StudentService studentService,TeacherService teacherService) {
		this.courseService = courseService;
		this.studentService = studentService;
		this.teacherService=teacherService;
	}

	@PostMapping
	public ResponseEntity<Course> addCourse(@RequestBody Course course){

		if(course==null||course.getName()==null||course.getDuration()==null||
						course.getName()==""||course.getDuration()=="") {

			//400
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();
		}

		Course savedCourse=courseService.save(course);//200

		return ResponseEntity.status(HttpStatus.OK).body(savedCourse);
	}

	@GetMapping
	public ResponseEntity<List<Course>> getAllCourses(){
		
		List<Course> l=courseService.getAll();
		if(!l.isEmpty()) {
			return ResponseEntity.ok(l);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("All Courses"," no Courses are there in table");
		return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
				.headers(headers).build();	
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Course> getCourseById(@PathVariable int id){
		
		Course course = courseService.getById(id);
		if(course!=null) {
			return ResponseEntity.ok(course);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("Course"," no Course found in table with id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
		
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Course> updateCourseById(@PathVariable int id,@RequestBody Course updateCourse){
		
		HttpHeaders headers=new HttpHeaders();
		if(updateCourse==null||updateCourse.getName()==null||updateCourse.getDuration()==null||
							   updateCourse.getName()==""||updateCourse.getDuration()=="") {
			//400
			headers.add("update info", "data missing");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();	
		}
			
		Course course = courseService.updateCourse(id, updateCourse);
		if(course!=null) {
			headers.add("update info", "course updated successfully");
			return ResponseEntity.status(HttpStatus.OK)
								 .headers(headers)
								 .body(course);//200
		}
		headers.add("Course"," no Course found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
	
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity deleteCourseById(@PathVariable int id) {
		
		HttpHeaders headers=new HttpHeaders();
		boolean isdeleted=courseService.deleteCourse(id);
		if(isdeleted) {
			headers.add("Course"," Course removed from table having id = "+id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
					.headers(headers).build();
		}
		headers.add("Course"," no Course found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
	}
	
	@PutMapping("/{courseId}/Students/{studentId}")
	public ResponseEntity<Course> enrollStudent(@PathVariable int courseId,@PathVariable int studentId){
		
		HttpHeaders headers=new HttpHeaders();
		Course course=courseService.getById(courseId);
		Student student=studentService.getById(studentId);
		
		if(course==null||student==null) {
			if(course==null)
			headers.add("Course"," no Course found in table");
			else
			headers.add("student"," no student found in table");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
					.headers(headers).build();	
			
		}
		course.enrolledStudents(student);
		Course updatedCourse = courseService.save(course);
		headers.add("info", "student enrolled in "+updatedCourse.getName()+" course successfully");
		return ResponseEntity.status(HttpStatus.OK)
							 .headers(headers)
							 .body(updatedCourse);	
	}
	
	
	@PutMapping("/{courseId}/Teachers/{teacher_Id}")
	public ResponseEntity<Course> assignTeacher(@PathVariable int courseId,@PathVariable int teacher_Id){
		
		HttpHeaders headers=new HttpHeaders();
		Course course=courseService.getById(courseId);
		Teacher teacher=teacherService.getById(teacher_Id);
		
		if(course==null||teacher==null) {
			if(course==null)
			headers.add("Course","Course not found in table");
			else
			headers.add("teacher"," no teacher found in table");
			return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
					.headers(headers).build();	
			
		}
		course.assignTeacher(teacher);
		Course updatedCourse = courseService.save(course);
		headers.add("info", "teacher assigned to "+updatedCourse.getName()+" course successfully");
		return ResponseEntity.status(HttpStatus.OK)
							 .headers(headers)
							 .body(updatedCourse);	
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
