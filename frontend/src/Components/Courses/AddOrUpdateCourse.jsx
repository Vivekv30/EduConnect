import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../Service/CourseService';

const AddOrUpdateCourse = () => {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        name: '',
        duration: '',
        description: '',
        teacher: '',
        avatar: '',
        link: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (cid !== '_add') {
            // If you have an ID then it will edit course data and course data will be fetched
            courseService
                .getCourseById(cid)
                .then((res) => {
                    if (res.data === null) {
                        // If data is null based on id then display a popup message and navigate to courses page
                        window.alert('No course found with this ID.');
                        navigate('/courses');
                    } else {
                        setCourse(res.data);
                    }
                })
                .catch((error) => {
                    // Handle errors, e.g., display an error message to the user
                    setError('Error fetching course data.');
                    console.error('Error fetching course:', error);
                });
        } else {
            setCourse({
                name: '',
                duration: '',
                description: '',
                avatar: '',
                link: ''
            })
        }
    }, [cid, navigate]);

    function ChangeHandler(e) {// this is one of simple way to add value in respective variable of the object
        const {name, value} = e.target;
        setCourse({ ...course, [name]: value });
    }
    
    const cancel = () => {
        navigate('/courses');
    };

    const addOrModifyCourse = () => {
        if (cid === '_add') {// for add course

            const newCourse = { ...course };
            if (window.confirm('do you want to add this course?')) {
                courseService
                    .addCourse(newCourse)
                    .then((res) => {
                        console.log(res.data)
                        window.alert('Course added successfully');
                        navigate('/courses');
                    })
                    .catch((error) => {
                        setError('Error adding the course.');
                        console.error('Error adding course:', error);
                    });
            }
        } else {

            const updatedCourse = { ...course };
            console.log(updatedCourse);
            const confirmation = window.confirm('Do you want to update this course?');
            if (confirmation) {
                courseService
                    .updateCourse(cid, updatedCourse)
                    .then((res) => {
                        window.alert('Course updated successfully');
                        console.log(res.data)
                        navigate('/courses');
                    })
                    .catch((error) => {
                        setError('data should not be empty.');
                        console.error('Error updating course:', error);
                    });
            }
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h3 className="card-header text-center">
                                    {cid === '_add' || cid === undefined ? 'Add ' : 'Edit '}Course
                                </h3>
                                {error && error !== '' && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Course name"
                                            name="name"
                                            value={course.name == null ? '' : course.name}
                                            onChange={(e) => ChangeHandler(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="duration">Duration (hh:mm:ss):</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="duration"
                                            name="duration"
                                            pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                                            placeholder="hh:mm:ss"
                                            value={course.duration == null ? '' : course.duration}
                                            onChange={(e) => ChangeHandler(e)}
                                            required
                                        />
                                        <small>e.g., 04:30:00</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Link to Course:</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Course link"
                                            name="link"
                                            value={course.link == null ? '' : course.link}
                                            onChange={(e) => ChangeHandler(e)}
                                        />
                                    </div>
                                    <div className="form-group mt-2 mb-2">
                                        <label>Avatar Image:</label><br />
                                        <input
                                            type="text"
                                            placeholder='Avatar Link'
                                            className="form-control"
                                            name="avatar"
                                            value={course.avatar == null ? '' : course.avatar}
                                            onChange={(e) => ChangeHandler(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter a description"
                                            name="description"
                                            id="description"
                                            value={course.description == null ? '' : course.description}
                                            onChange={(e) => ChangeHandler(e)}
                                        />
                                    </div>



                                    <div className="form-group mt-2 d-flex justify-content-evenly">
                                        <button
                                            type="button"
                                            className="btn btn-primary px-3 py-2"
                                            onClick={addOrModifyCourse}
                                        >
                                            {cid === '_add' || cid === undefined ? 'Add ' : 'Modify '} Course
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary px-3 py-2"
                                            onClick={cancel}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrUpdateCourse;
