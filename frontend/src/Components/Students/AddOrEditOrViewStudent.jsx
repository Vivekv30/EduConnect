import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Students/addOrEditOrViewStudent.css'
import studentService from '../../Service/StudentService';
const AddOrEditOrViewStudent = ({ mode }) => {
    let { sid } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [student, setStudent] = useState({
        id: sid,
        name: '',
        emailId: '',
        mobile: '',
        gender: '',
        address: '',
        avatar: null,
        courses: [],
    });

    useEffect(() => {
        console.log(mode)
        if (sid) {// (mode === 'edit' || mode === 'view')
            setIsLoading(true)
            studentService.getStudentById(sid)
                .then(res => {
                    setIsLoading(false)
                    setStudent(res.data);
                    console.log("student:", res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {// (mode === 'add')
            setStudent({
                name: '',
                emailId: '',
                mobile: '',
                gender: '',
                address: '',
                avatar: null,
                courses: []
            })
        }
    }, [sid, mode]);

    const handleAddStudent = () => {
        const newStudent = { ...student };

        console.log(newStudent);
        const confirmation = window.confirm('do you want to save stduent')
        if (confirmation) {
            setIsLoading(true);
            studentService.addStudent(newStudent)
                .then(res => {
                    setIsLoading(false)
                    window.alert('Student added successfully');
                    navigate(`/students/view/${res.data.id}`);
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Error adding student:', error.response.data);
                    } else {
                        console.error('Error adding student:', error.message);
                    }
                });
        }
    };


    const handleEditStudent = () => {
        const updatedStudent = { ...student };
        console.log(updatedStudent)
        const confirmation = window.confirm('do you want to update stduent')
        if (confirmation) {
            setIsLoading(true)
            studentService.updateStudent(sid, updatedStudent)
                .then(res => {
                    setIsLoading(false)
                    const v = res.data;
                    JSON.stringify(v);
                    window.alert('Student updated successfully ');
                    console.log(v);
                    navigate(`/students/view/${res.data.id}`);
                })
                .catch(error => {
                    console.error('Error updating student', error);
                });
        }
    };

    const handleSubmit = (e) => {//handling submit request based on mode
        e.preventDefault();

        if (mode === 'add') {
            console.log("handel add student is executing")
            handleAddStudent();
        } else if (mode === 'edit') {
            console.log("handel edit student is executing")
            handleEditStudent();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {

                const base64Image = e.target.result; // e.target.result contains the base64-encoded image data
                const imageData = base64Image.replace(/^data:image\/(png|jpeg);base64,/, ''); //remove the base64-encoded image data
                setStudent({ ...student, avatar: imageData });//set image data to avatar
            };

            reader.readAsDataURL(file);
        }
    };
    function cancel() {
        if (mode === 'edit') {
            navigate('/students/view/' + sid)
        } else {
            navigate('/students')
        }
    }

    function joiNewCourse() {
        navigate(`/students/${sid}/courses/`, { state: { studentCoursesIds: student.courses.map(course => course.id) || [] } })
    }
    return (
        <section>
            <div className="container py-5">
                {isLoading && <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
                <h3>{mode === 'add' ? 'Add ' : mode === 'edit' ? 'Edit ' : ''} Student Details</h3>
                <form onSubmit={handleSubmit} method='post'>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src={student.avatar ? `data:image/png;base64,${student.avatar}`
                                            : student.gender === 'Male' ? 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp' : 'https://www.slate.fr/sites/default/files/styles/1060x523/public/teacher-295387_1280_copie.jpg'}
                                        alt="Student Avatar"
                                        className="img-thumbnail"

                                        style={{ maxHeight: '290px', objectFit: 'cover' }}
                                    />
                                    {
                                        mode !== 'view' && (
                                            <>
                                                <hr />
                                                <div className="avatar-upload" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                                    <label htmlFor="profile-pic-input" className="avatar-label border btn px-2 py-2" style={{ boxShadow: '1px 1px 5px #ccc inset' }}>
                                                        <i className="fa-regular fa-images"></i> Choose profile pic
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="profile-pic-input"
                                                        name="avatar"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                    />
                                                    {mode !== 'add' && (<button type='button' className="btn border px-4 py-2" style={{ boxShadow: '1px 1px 5px #ccc inset' }} onClick={() => { setStudent({ ...student, avatar: null }) }}>Remove Profile</button>)}
                                                </div>
                                            </>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="name"
                                            value={student.name == null ? '' : student.name}
                                            onChange={e => setStudent({ ...student, name: e.target.value })}
                                            readOnly={mode === 'view'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className='form-control'
                                            id="email"
                                            value={student.emailId == null ? '' : student.emailId}
                                            onChange={e => setStudent({ ...student, emailId: e.target.value })}
                                            readOnly={mode === 'view'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobile">Mobile</label>
                                        <input
                                            type="text"
                                            className='form-control'
                                            id="mobile"
                                            value={student.mobile == null ? '' : student.mobile}
                                            onChange={e => setStudent({ ...student, mobile: e.target.value })}
                                            readOnly={mode === 'view'}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gender">Gender</label>
                                        <select
                                            className='form-control'
                                            id="gender"
                                            value={student.gender == null ? '' : student.gender}
                                            onChange={e => setStudent({ ...student, gender: e.target.value })}
                                            readOnly={mode === 'view'}
                                        >
                                            {mode === 'view' ? (
                                                <option value={student.gender}>{student.gender}</option>
                                            ) : (
                                                <>
                                                    <option value="null">Select</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <textarea
                                            className='form-control'
                                            id="address"
                                            value={student.address == null ? '' : student.address}
                                            onChange={e => setStudent({ ...student, address: e.target.value })}
                                            readOnly={mode === 'view'}
                                        />
                                    </div><br />
                                    {mode === 'view' ? (
                                        <div className="d-flex justify-content-between mt-3">
                                            <button className="btn btn-warning"
                                                onClick={(e) => { e.preventDefault(); navigate('/students/edit/' + sid) }}> Edit </button>
                                        </div>
                                    ) : (
                                        <div className="d-flex justify-content-between mt-3">
                                            <button type="submit" className="btn btn-primary px-3 py-2">Save</button>
                                            <button className="btn btn-secondary px-3 py-2 ml-2" onClick={cancel}>Cancel</button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="row">
                    {mode === 'view' && (
                        <>
                            <div className="col-lg-11">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex px-4">
                                    <h3 className="navbar-brand flex-grow-1">Enrolled Courses</h3>
                                    <button className="btn btn-info"
                                        onClick={joiNewCourse}
                                        style={{ color: 'white' }}>
                                        Join new course
                                    </button>
                                </nav>
                            </div>

                            {student.courses.map((course) => (
                                <div className="col-lg-3" key={course.id}>
                                    <div className="card" style={{ margin: '1rem', padding: '0px' }}>
                                        <img width='100%' height='100%' src={course.avatar} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <div className='d-flex'>
                                                <h5 className='card-title'>Name :</h5>{course.name ? <p className="px-3">{course.name}</p> : null}
                                            </div>
                                            <div className='d-flex'>
                                                <h5 className="card-title">Trainer : </h5>
                                                <p className="px-3">{course.teacher && course.teacher.name ? course.teacher.name : null}</p>
                                            </div>
                                            <div className='text-justify'>
                                                <h5>Description :</h5>
                                                {course.description ? (<p className="card-text description-limit " style={{ textAlign: 'justify' }}>{course.description}</p>) : null}
                                            </div><br />
                                            {course.link ? (<Link to={course.link} className='btn btn-secondary'> View more </Link>) : ('View more')}
                                        </div>
                                    </div>

                                </div>
                            ))
                            }
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AddOrEditOrViewStudent;