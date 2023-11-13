package com.stdtc.Course;

import java.util.List;

public interface CourseService {

	public Course save(Course course);

	public List<Course> getAll();

	public Course getById(int id);

	public boolean deleteCourse(int id);
	
	public Course updateCourse(int id,Course course);

}
