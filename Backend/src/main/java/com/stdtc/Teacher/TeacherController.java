package com.stdtc.Teacher;

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

@RestController
@RequestMapping("/springToolSuite/api/v4/Teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

	private TeacherService service;

	@Autowired
	public TeacherController(TeacherService service) {
		this.service=service;
	}


	@PostMapping
	public ResponseEntity<Teacher> addTeacher(@RequestBody Teacher teacher){

		if(teacher==null||teacher.getName()==null) {

			//400
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();
		}

		Teacher savedteacher=service.save(teacher);//200

		return ResponseEntity.status(HttpStatus.OK).body(savedteacher);
	}
	
	
	@GetMapping
	public ResponseEntity<List<Teacher>> getAllTeachers(){
		
		List<Teacher> l=service.getAll();
		if(!l.isEmpty()) {
			return ResponseEntity.ok(l);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("All Teachers"," no Teachers are there in table");
		return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
				.headers(headers).build();	
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Teacher> getTeacherById(@PathVariable int id){
		
		Teacher teacher = service.getById(id);
		if(teacher!=null) {
			return ResponseEntity.ok(teacher);//200
		}
		HttpHeaders headers=new HttpHeaders();
		headers.add("Teacher"," no teacher found in table with id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
		
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Teacher> updateTeacher(@PathVariable int id,@RequestBody Teacher updateTeacher){
		
		HttpHeaders headers=new HttpHeaders();
		if(updateTeacher==null||updateTeacher.getName()==null) {
			//400
			headers.add("update info", "data missing");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.build();	
		}
		
		Teacher teacher = service.updateTeacher(id, updateTeacher);
		if(teacher!=null) {
			headers.add("update info", "Teacher updated successfully");
			return ResponseEntity.status(HttpStatus.OK)
								 .headers(headers)
								 .body(teacher);//200
		}
		headers.add("Teacher"," no Teacher found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
	
	}
	
	
	@DeleteMapping("{id}")
	public ResponseEntity deleteById(@PathVariable int id) {
		
		HttpHeaders headers=new HttpHeaders();
		boolean isdeleted=service.deleteTeacher(id);
		if(isdeleted) {
			headers.add("Teacher"," Teacher removed from table having id = "+id);
			return ResponseEntity.status(HttpStatus.NO_CONTENT)//204
					.headers(headers).build();
		}
		headers.add("Teacher"," no Teacher found in table having id = "+id);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)//404
				.headers(headers).build();
	}
	
}
