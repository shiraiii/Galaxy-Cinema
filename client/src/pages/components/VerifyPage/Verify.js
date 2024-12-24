import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppContext from "../../../context/AppContext"; // Assuming you have an AppContext for the user token
import axios from "axios";

const SuccessPayment = () => {
  const { token } = React.useContext(AppContext); // Retrieve the user token from context
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success"); // Get success parameter from URL
  const reservationId = searchParams.get("reservationId"); // Get reservationId from URL
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState(null); // State to store the QR code
  const [reservationDetails, setReservationDetails] = useState(null); // State to store reservation details
  const [loading, setLoading] = useState(true); // State to show loading indicator

  // Function to verify payment and fetch the reservation details
  const verifyPayment = async () => {
    try {
      if (!token) {
        console.error("User token is missing");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/reservation/verifyStripe",
        { reservationId, success },
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );

      if (response.data.success) {
        navigate("/dat-ve-thanh-cong");
        setLoading(false);
      } else {
        console.error("Payment failed");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error verifying payment:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, success, reservationId, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">
        Payment Verification
      </h2>
      {loading ? (
        <div className="text-center text-lg">Verifying your payment...</div>
      ) : (
        <div className="reservation-info space-y-6">
          {success === "true" ? (
            <>
              <h3 className="text-center text-xl font-semibold text-green-600">
                Payment Successful!
              </h3>
              {reservationDetails && (
                <div className="reservation-details space-y-4">
                  <p className="text-lg">
                    <strong>Movie:</strong>{" "}
                    {reservationDetails.movieId.movieName}
                  </p>
                  <p className="text-lg">
                    <strong>Cinema:</strong> {reservationDetails.cinemaId.name}
                  </p>
                  <p className="text-lg">
                    <strong>Date:</strong> {reservationDetails.date}
                  </p>
                  <p className="text-lg">
                    <strong>Seats:</strong>{" "}
                    {reservationDetails.seats
                      .map((seat) => `${seat.rowLetter} ${seat.seatNumber}`)
                      .join(", ")}
                  </p>
                  <p className="text-lg">
                    <strong>Total Price:</strong> {reservationDetails.total}
                  </p>
                </div>
              )}
              <div className="qr-code text-center">
                <h4 className="text-lg font-semibold mt-4">
                  Scan the QR code to confirm your reservation
                </h4>
                {qrCode ? (
                  <img
                    src={qrCode}
                    alt="QR Code"
                    className="mx-auto mt-4 w-48 h-48"
                  />
                ) : (
                  <p>Generating QR Code...</p>
                )}
              </div>
              <button
                onClick={() => navigate("/")}
                className="mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
                Back to Home
              </button>
            </>
          ) : (
            <p className="text-center text-red-600">
              Payment failed. Please try again.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SuccessPayment;
