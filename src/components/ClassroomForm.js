import React, { useState } from 'react';

export default function ClassroomForm() {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const classroomData = {
            name,
            start_time: startTime,
            end_time: endTime,
            days: days.split(',').map(day => day.trim()), 
        };
        console.log(classroomData);

        try {
            const response = await fetch('http://localhost:3000/api/classrooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classroomData),
            });

            // if (!response.ok) {
            //     throw new Error('Failed to create classroom');
            // }

            const data = await response.json();
            setMessage('Classroom created successfully!');
            console.log('Classroom created:', data);

            // Clear the form
            setName('');
            setStartTime('');
            setEndTime('');
            setDays('');

        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating classroom. Please try again.');
        }
    };

    return (
        <div className="classroom-form">
            <h2>Create Classroom</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Classroom Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Start Time (e.g., 12:00 PM)"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="End Time (e.g., 6:00 PM)"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Days (e.g., Monday, Tuesday, Wednesday)"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    required
                />
                <button type="submit">Create Classroom</button>
            </form>
        </div>
    );
}
