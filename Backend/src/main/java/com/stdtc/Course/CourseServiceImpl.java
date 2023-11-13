package com.stdtc.Course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {
	
	private CourseRepository repository;

	@Autowired
	public CourseServiceImpl(CourseRepository repository) {

		this.repository = repository;
	}

	@Override
	public Course save(Course course) {
		
		return repository.save(course);
	}

	@Override
	public List<Course> getAll() {
		
		return repository.findAll();
	}

	@Override
	public Course getById(int id) {
		
		return repository.findById(id).orElse(null);
	}

	@Override
	public boolean deleteCourse(int id) {
		
		Course course=getById(id);
		if(course!=null) {
			repository.deleteById(id);
			return true;
		}
		
		return false;
	}

	@Override
	public Course updateCourse(int id, Course course) {
		
		Course existedCourse=getById(id);
		if(existedCourse!=null) {
			 existedCourse.setName(course.getName());
			 existedCourse.setDuration(course.getDuration());
			 existedCourse.setLink(course.getLink());
			 existedCourse.setAvatar(course.getAvatar());
			 existedCourse.setDescription(course.getDescription());
			 return repository.save(existedCourse);
		}
		return null;
	}

}
