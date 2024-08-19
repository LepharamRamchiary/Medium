import React from 'react'

const CurrentDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        month: "long",
        day: "numeric"
    })
  return (
    <div>
        {formattedDate}
    </div>
  )
}

export default CurrentDate