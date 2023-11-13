package com.stdtc.Student;

import java.sql.Blob;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stdtc.Course.Course;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	
	private String emailId;
	
	private String mobile;
	
    private String gender;
    
    private String address;
	
    private byte[] avatar;
//	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name="student_enrolled",
			joinColumns = @JoinColumn(name="course_id"),
			inverseJoinColumns = @JoinColumn(name="student_id")
			)
	private Set<Course> courses=new HashSet<>();


	public void enrollCourse(Course course) {
		
		courses.add(course);	
	}


	public void unEnrollCourse(Course course) {
		courses.remove(course);
		
	}

}
