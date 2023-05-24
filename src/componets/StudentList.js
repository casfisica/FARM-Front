import React from "react";
import Student from "./Student";

function StudentList(props){
    return(
        <div>
            <ul>
                {
                    props.studentListVar.map(
                        (stud,index) =>{
                            return(<Student 
                                getAllStudents = {props.getAllStudents}
                                setStudentId = {props.setStudentId}
                                setStudentName = {props.setStudentName}
                                setStudentEmail = {props.setStudentEmail}
                                setStudentPhone = {props.setStudentPhone}
                                student = {stud} key={index}/>)
                        }
                    )
                }
            </ul>
        </div>
    )
}
export default StudentList;