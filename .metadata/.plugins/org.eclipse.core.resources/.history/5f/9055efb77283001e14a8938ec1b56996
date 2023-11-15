package com.stdtc.Student;

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
import org.springframework.web.multipart.MultipartFile;

import com.stdtc.Course.Course;
import com.stdtc.Course.CourseService;
@RestController
@RequestMapping("/springToolSuite/api/v4/Students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

	private StudentService studentService;

	private CourseService courseService;

	@Autowired
	public StudentController(StudentService studentService,CourseService courseService) {
		this.studentService=studentService;
		this.courseService=courseService;
	}


	@PostMapping
	public ResponseEntity<Student> addStudent(@RequestBody Student student){

		if(student==null||student.getName()==null||student.getEmailId()==null||
				student.getName()==""||student.getEmailId()=="") {
			//400
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();
		}

		Student savedStudent = studentService.save(student);
		return ResponseEntity.status(HttpStatus.OK).body(savedStudent);
	}


	@GetMapping
	public ResponseEntity<List<Student>> getAllStudents(){

		List<Student> l=studentService.getAll();
		if(!l.isEmpty()) {
			return ResponseEntity.ok(l);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("All Students"," no students are there in table");
		return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
				.headers(headers).build();	
	}


	@GetMapping("/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable int id){

		Student student = studentService.getById(id);
		if(student!=null) {
			return ResponseEntity.ok(student);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("Student"," no student found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();

	}


	@PutMapping("{id}")
	public ResponseEntity<Student> updateStudent(@PathVariable int id,@RequestBody Student updateStudent){

		HttpHeaders headers=new HttpHeaders();
		if(updateStudent==null||updateStudent.getName()==null||updateStudent.getEmailId()==null||updateStudent.getGender()==null||updateStudent.getMobile()==null
							  ||updateStudent.getName()==""	 ||updateStudent.getEmailId()==""  ||updateStudent.getGender()==""  ||updateStudent.getMobile()=="") {
			//400
			headers.add("update info", "data missing");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();	
		}

		Student student = studentService.updateStudent(id, updateStudent);
		if(student!=null) {
			headers.add("update info", "course updated successfully");
			return ResponseEntity.status(HttpStatus.OK)
					.headers(headers)
					.body(student);//200
		}
		headers.add("Student"," no Student found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();

	}


	@DeleteMapping("{id}")
	public ResponseEntity deleteById(@PathVariable int id) {

		HttpHeaders headers=new HttpHeaders();
		boolean isdeleted=studentService.deleteStudent(id);
		if(isdeleted) {
			headers.add("Student"," student removed from table having id = "+id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
					.headers(headers).build();
		}
		headers.add("Student"," no student found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
	}


	@PutMapping("/{studentId}/EnrollCourses/{courseId}")
	public ResponseEntity<Student> enrollStudent(@PathVariable int studentId,@PathVariable int courseId){

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
		student.enrollCourse(course);
		Student updatedStudent = studentService.save(student);
		headers.add("info", "student enrolled in "+course.getName()+" course successfully");
		return ResponseEntity.status(HttpStatus.OK)
				.headers(headers)
				.body(updatedStudent);	
	}
	
	@PutMapping("/{studentId}/UnEnrollCourses/{courseId}")
	public ResponseEntity<Student> unEnrollStudent(@PathVariable int studentId,@PathVariable int courseId){

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
		student.unEnrollCourse(course);
		Student updatedStudent = studentService.save(student);
		headers.add("info", "student unenrolled in "+course.getName()+" course successfully");
		return ResponseEntity.status(HttpStatus.OK)
				.headers(headers)
				.body(updatedStudent);	
	}

}
