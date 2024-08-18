import React, { useState, useEffect } from 'react';

export default function AssignClassroom() {
    const [teachers, setTeachers] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [message, setMessage] = useState('');

   
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getAllUsers?role=Teacher');
                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        const fetchClassrooms = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/getclassroom');
                const data = await response.json();
                setClassrooms(data);
            } catch (error) {
                console.error('Error fetching classrooms:', error);
            }
        };

        fetchTeachers();
        fetchClassrooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTeacher || !selectedClassroom) {
            setMessage('Please select both a teacher and a classroom.');
            return;
        }

        const assignmentData = {
            teacher_id: selectedTeacher,
            classroom_id: selectedClassroom,
        };

        try {
            const response = await fetch('http://localhost:3000/api/assign-teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(assignmentData),
            });

            if (!response.ok) {
                throw new Error('Failed to assign classroom');
            }

            const data = await response.json();
            setMessage('Classroom assigned successfully!');
            console.log('Assignment successful:', data);

            
            setSelectedTeacher('');
            setSelectedClassroom('');

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error assigning classroom. Please try again.');
        }
    };

    return (
        <div className="assign-classroom">
            <h2>Assign Classroom to Teacher</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
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
                <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    required
                >
                    <option value="">Select Classroom</option>
                    {classrooms.map(classroom => (
                        <option key={classroom._id} value={classroom._id}>
                            {classroom.name}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign Classroom</button>
            </form>
        </div>
    );
}
