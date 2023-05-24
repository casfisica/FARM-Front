import React from "react";
import axios from "axios";

function Student(props){

    const deleteStudent = (studentId)=>{
        axios.delete(`http://127.0.0.1:8000/students/${studentId}`)
        .then(
            response =>{
                alert("Student delete successfully Id: " + response.data.id);
                props.getAllStudents()
            })
        .catch(
            (err)=>{
              console.log(err);
            }
          )
    }

    const editStudent = (student) => {
        props.setStudentId(student.id);
        props.setStudentName(student.name);
        props.setStudentEmail(student.email);
        props.setStudentPhone(student.phone)
    }

    return(
        <div>
            <p>
                <samp className="fw-bold mx-2">
                    {props.student.name} : {props.student.email} : {props.student.phone}
                </samp>
                <button onClick={() => editStudent(props.student)} className="btn btn-warning mx-1">Edit</button>
                <button onClick={() => deleteStudent(props.student.id)} className="btn btn-danger mx-1">X</button>
            </p>

        </div>
    )
}

export default Student;