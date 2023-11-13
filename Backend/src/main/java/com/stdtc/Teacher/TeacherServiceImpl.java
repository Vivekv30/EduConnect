package com.stdtc.Teacher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherServiceImpl implements TeacherService {

	private TeacherRepository repository;

	@Autowired
	public TeacherServiceImpl(TeacherRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Teacher save(Teacher teacher) {
		
		return repository.save(teacher);
	}

	@Override
	public List<Teacher> getAll() {
		
		return repository.findAll();
	}

	@Override
	public Teacher getById(int id) {
		
		return repository.findById(id).orElse(null);
	}

	@Override
	public boolean deleteTeacher(int id) {
		
		Teacher teacher=getById(id);
		if(teacher!=null) {
			repository.deleteById(id);
			return true;
		}
		
		return false;
	}

	@Override
	public Teacher updateTeacher(int id, Teacher updateTeacher) {
		
		Teacher existedTeacher = getById(id);
		if(existedTeacher!=null) {
			
			existedTeacher.setName(updateTeacher.getName());
			return repository.save(existedTeacher);
		}
		return null;
	}

}
