package com.stdtc.Teacher;

import java.util.List;


public interface TeacherService {
	
public Teacher save(Teacher teacher);
	
	public List<Teacher> getAll();
	
	public Teacher getById(int id);
	
	public boolean deleteTeacher(int id);

	public Teacher updateTeacher(int id, Teacher updateTeacher);

}
