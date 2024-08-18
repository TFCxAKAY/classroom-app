

import React, { useState, useEffect } from 'react';
import TeacherList from './TeacherList';
import StudentList from './StudentList';
import ClassroomForm from './ClassroomForm';
import AssignClassroom from './AssignClassroom';
import AssignStudent from './AssignStudent';

export default function PrincipalView() {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    
   
    useEffect(() => {
       
        fetch('http://localhost:3000/api/getAllUsers?role=Teacher')
            .then(res => res.json())
            .then(data => setTeachers(data))
            .catch(err => console.error(err));

        fetch('http://localhost:3000/api/getAllUsers?role=Student')
            .then(res => res.json())
            .then(data => setStudents(data))
            .catch(err => console.error(err));
    }, []);

    const handleTeacherUpdate = (updatedTeacher) => {
        
    };

    const handleTeacherDelete = (teacherId) => {
      
    };

    const handleStudentUpdate = (updatedStudent) => {
       
    };

    const handleStudentDelete = (studentId) => {
    }

    return (
        <div className="principal-view">
            <h1>Principal Dashboard</h1>
            <TeacherList
                teachers={teachers}
                onUpdate={handleTeacherUpdate}
                onDelete={handleTeacherDelete}
            />
            <StudentList
                students={students}
                onUpdate={handleStudentUpdate}
                onDelete={handleStudentDelete}
            />
            <ClassroomForm />
            <AssignClassroom teachers={teachers} />
            <AssignStudent/>
        </div>
    );
}
