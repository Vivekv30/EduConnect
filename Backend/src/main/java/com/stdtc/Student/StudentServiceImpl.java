package com.stdtc.Student;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService{
	
	private StudentRepository repository;

	@Autowired
	public StudentServiceImpl(StudentRepository repository) {

		this.repository = repository;
	}

	@Override
	public Student save(Student student) {
		
		return repository.save(student);
	}

	@Override
	public List<Student> getAll() {
		
		return repository.findAll();
	}

	@Override
	public Student getById(int id) {
		
		return repository.findById(id).orElse(null);
	}

	@Override
	public boolean deleteStudent(int id) {
		
		Student student=getById(id);
		if(student!=null) {
			repository.deleteById(id);
			return true;
		}
		
		return false;
	}

	@Override
	public Student updateStudent(int id, Student updateStudent) {
		Student existedStudent=getById(id);
		if(existedStudent!=null) {
			existedStudent.setName(updateStudent.getName());
			existedStudent.setEmailId(updateStudent.getEmailId());
			existedStudent.setMobile(updateStudent.getMobile());
			existedStudent.setGender(updateStudent.getGender());
			existedStudent.setAvatar(updateStudent.getAvatar());
			existedStudent.setAddress(updateStudent.getAddress()!=""?updateStudent.getAddress()
																	:existedStudent.getAddress());
			return repository.save(existedStudent);
		}
		return null;
	}

}
