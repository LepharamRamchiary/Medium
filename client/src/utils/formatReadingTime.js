export const formatReadingTime = ({ hours, minutes, seconds }) => {
    let timeString = '';
  
    if (hours > 0) {
      timeString += `${hours} hr `;
    }
  
    if (minutes > 0) {
      timeString += `${minutes} min `;
    }
  
    if (seconds > 0) {
      timeString += `${seconds} sec `;
    }
  
    return timeString.trim();
  };
  