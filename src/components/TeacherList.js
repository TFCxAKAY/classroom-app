import React from 'react';

export default function TeacherList({ teachers, onUpdate, onDelete }) {
    return (
        <div className="teacher-list">
            <h2>Teachers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td>{teacher.name}</td>
                            <td>{teacher.email}</td>
                            <td>
                                <button onClick={() => onUpdate(teacher)}>Edit</button>
                                <button onClick={() => onDelete(teacher.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
