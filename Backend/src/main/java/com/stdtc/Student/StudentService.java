package com.stdtc.Student;

import java.util.List;

public interface StudentService {
	
	public Student save(Student student);
	
	public List<Student> getAll();
	
	public Student getById(int id);
	
	public boolean deleteStudent(int id);

	public Student updateStudent(int id, Student updateStudent);
}
