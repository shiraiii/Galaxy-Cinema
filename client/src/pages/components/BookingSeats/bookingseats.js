import React from "react"
import BookingSeatProgress from "./bookingseats-progress"
import SeatsSection from "./SeatsSection"

const BookingSeats = () => {
  return (
    <div className="booking__wrapper bg-[#f9f9f9] md:pb-0">
      <BookingSeatProgress></BookingSeatProgress>
      <SeatsSection></SeatsSection>
    </div>
  )
}

export default BookingSeats
