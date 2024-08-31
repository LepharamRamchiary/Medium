export const calculateReadingTime = (text) => {
    const wordsPerMinute = 150; // Average reading speed
    const words = text.split(/\s+/).length;
    const minutes = Math.floor(words / wordsPerMinute);
    const seconds = Math.floor((words % wordsPerMinute) * 60 / wordsPerMinute);
    const hours = Math.floor(minutes / 60);
    return { hours, minutes, seconds };
  };
  