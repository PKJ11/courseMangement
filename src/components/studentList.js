import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllCourses } from '../store/studentSlice';

const StudentListPage = () => {
  const dispatch = useDispatch();
  const { allCourses } = useSelector(state => state.students);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  const handleRowClick = (id) => {
    navigate(`/student/${id}`);
  };

  let serialNumber = 1;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', marginTop: '25px' }}>
      <table style={{ width: '80%', backgroundColor: '#1c1c1e', color: 'white', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center',fontSize:'20px' }}>S.No</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center' ,fontSize:'20px'}}>Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center' ,fontSize:'20px'}}>Email</th>
          </tr>
        </thead>
        <tbody>
          {allCourses.map(course =>
            course.students.map(student => (
              <tr
                key={student.id}
                onClick={() => handleRowClick(student.id)}
                style={{ cursor: 'pointer' }}
              >
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center',fontSize:'18px' }}>{serialNumber++}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center' ,fontSize:'18px'}}>{student.name}</td>
                <td style={{ borderBottom: '1px solid #ddd', padding: '8px 25px', textAlign: 'center' ,fontSize:'18px'}}>{student.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;
