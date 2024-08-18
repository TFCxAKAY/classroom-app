import React, { useState, useEffect } from 'react';

export default function AssignStudent() {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [message, setMessage] = useState('');

   
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getAllUsers?role=Student');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getAllUsers?role=Teacher');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchStudents();
        fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedStudent || !selectedTeacher) {
            setMessage('Please select both a student and a teacher.');
            return;
        }

        const assignmentData = {
            student_id: selectedStudent,
            teacher_id: selectedTeacher,
        };

        try {
            const response = await fetch('http://localhost:3000/api/assign-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignmentData),
            });

            if (!response.ok) {
                throw new Error('Failed to assign student');
            }

            const data = await response.json();
            setMessage('Student assigned successfully!');
            console.log('Assignment successful:', data);

            // Clear the selections
            setSelectedStudent('');
            setSelectedTeacher('');

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error assigning student. Please try again.');
        }
    };

    return (
        <div className="assign-student">
            <h2>Assign Student to Teacher</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    required
                >
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student._id} value={student._id}>
                            {student.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    required
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher._id}>
                            {teacher.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign Student</button>
            </form>
        </div>
    );
}
