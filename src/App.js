import React, {useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import StudentList from "./componets/StudentList";

function App() {
  //Define state variables
  const [studentList,setStudentList] = useState([{}]); //Default state is an empty array of objects
  const [studentId,setStudentId] = useState('');
  const [studentName,setStudentName] = useState('');
  const [studentEmail,setStudentEmail] = useState('');
  const [studentPhone,setStudentPhone] = useState('');

  //FAST API call to Get all student date
  useEffect(()=>{
    getAllStudents();
    },[])// el brakct al final es para que haga solo cuando reload el useEffect
  //FAST API call to add a new student

  const getAllStudents = () => {
    axios.get('http://127.0.0.1:8000/students')
    .then(
      response => {
        console.log(response.data);
        setStudentList(response.data); // to set the data in the state variables
      }
    )//resolve the promise object
    .catch(
      (err)=>{
        console.log(err);
      }
    )

  }

  const addNewStudent = (student) =>{
    axios.post('http://127.0.0.1:8000/students',student)
    .then(
      response=>{
        getAllStudents();
        alert("Student added successfully");
      }
      )
    .catch((err)=>{console.log(err);})
  }

  const updateStudent = (student) =>{
    axios.put(`http://127.0.0.1:8000/students/${studentId}`,student)
    .then(
      response=>{
        getAllStudents();
        alert("Student updated successfully");
      }
      )
    .catch((err)=>{console.log(err);})
  }

  const addUpdateStudent = () => {
    //the object to past to the post method
    const student = {
      'student_name' : studentName,
      'student_email' : studentEmail,
      'student_phone' : studentPhone
    }
    //debugger;
    if(studentId !== ''){
      updateStudent(student)
    }else{
      addNewStudent(student)
    }
    clearImputs();
  }

  const clearImputs = () => {
    setStudentId('');
    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
  }

  return (
    <div className='container'>
      <div 
      className="text-center mt-3 list-group-item justify-content-center aling-items-center mx-auto"
      style={{"width":"80vw","backgroundColor":"#ffffff"}}>
        <h2 className='card text-white bg-primary mb-1 pb-2'>Scholl Managment System</h2>
      <h6 className='card text-white bg-primary mb-1 pb-1'>
        Manage Your Students
      </h6>
      <div className='card-body'>
        <h5 className='card text-white bg-dark'>Add Your Student</h5>
        <span className='card-text'>
          <input value={studentName} onChange={event => setStudentName(event.target.value)} className='form-control stud-name mb-2' placeholder='Enter name' />
          <input value={studentEmail} onChange={event => setStudentEmail(event.target.value)} className='form-control stud-emal mb-2' placeholder='Enter emal'/>
          <input value={studentPhone} onChange={event => setStudentPhone(event.target.value)} className='form-control stud-phone mb-2' placeholder='Enter phone'/>
          <button onClick={addUpdateStudent} className='btn btn-outline-primary' style={{'fontWeight': "bold"}}>Add Student</button>
        </span>
        <h5 className='card text-white bg-dark mt-4'>Your Student</h5>
        <div >

            <StudentList 
            getAllStudents = {getAllStudents}
            setStudentId = {setStudentId}
            setStudentName = {setStudentName}
            setStudentEmail = {setStudentEmail}
            setStudentPhone = {setStudentPhone}
            studentListVar = {studentList}/>
        </div>
      </div>
      <h6 className='card text-dark bg-warning dy-1'>All right reserved &copy; 2023</h6>
      </div>
    </div>
  );
}

export default App;
