import React from "react";

const ReservationDetail = ({ qrCode, reservationDetail }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-8">
      {qrCode && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Your QR Code
          </h2>
          <div className="flex justify-center">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>
        </div>
      )}
      {reservationDetail && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-4">
            Reservation Details
          </h3>
          <div className="space-y-4">
            <p className="text-lg font-medium">
              <span className="font-semibold">ID: </span>
              {reservationDetail._id}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Movie Name: </span>
              {reservationDetail.movieId?.movieName}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Cinema Name: </span>
              {reservationDetail.cinemaId?.name}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Date: </span>
              {new Date(reservationDetail.date).toLocaleDateString("en-GB")}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Start Time: </span>
              {reservationDetail.startAt}
            </p>
            <p className="text-lg font-medium">
              <span className="font-semibold">Total Price: </span>
              {reservationDetail.total} VND
            </p>
            <div>
              <h4 className="text-lg font-semibold">Seats:</h4>
              <ul className="list-disc pl-5 text-lg">
                {reservationDetail.seats.map((seat, index) => (
                  <li key={index}>
                    Row: {seat.rowLetter}, Seat: {seat.seatNumber}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetail;
