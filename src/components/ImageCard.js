import React, { useState } from 'react';
import { CardMedia, CardContent, Typography, LinearProgress, Button } from '@mui/material';
import './ProgressImageCard.css';

const ProgressImageCard = ({ course }) => {
  const [isCompleted, setIsCompleted] = useState(course.completed);
  const [progress, setProgress] = useState(course.progress);

  const handleMarkAsComplete = () => {
    if (isCompleted) {
      setProgress(course.progress); // Set to original progress if undoing
      setIsCompleted(false);
    } else {
      setProgress(100);
      setIsCompleted(true);
    }
  };

  return (
    <div className="image-card">
      <div className="course-image-container">
        <CardMedia
          component="img"
          alt={course.name}
          image={course.thumbnail}
          className="course-thumbnail"
        />
      </div>
      <CardContent className="course-info">
        <Typography variant="h6" component="div" className="course-title">
          {course.name}
        </Typography>
        <Typography variant="body2" component="div" className="course-instructor">
          {course.instructor}
        </Typography>
        <div className="course-progress">
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ width: '100%', margin: '10px 0', height: '10px', borderRadius: '5px' }}
          />
          <Typography variant="body2" color="textSecondary" component="p">
            {progress}%
          </Typography>
        </div>
        <Button
          onClick={handleMarkAsComplete}
          variant="contained"
          style={{
            backgroundColor: isCompleted ? 'yellow' : 'blue',
            color: isCompleted ? 'black' : 'white',
          }}
        >
          {isCompleted ? 'Undo' : 'Mark as Completed'}
        </Button>
      </CardContent>
    </div>
  );
};

export default ProgressImageCard;
