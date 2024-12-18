import React, { useContext } from "react";
import SeatLayout from "./SeatLayout";
import AppContext from "../../../context/AppContext";
import EmptySeat from "../Modal/EmptySeat";
import Modal from "react-responsive-modal";

const Seats = ({
  filteredShowtimes,
  selectedShowtime,
  cinemas,
  alphabets,
  isSeatBooked,
  handleShowtimeClick,
  selectedSeats,
  handleSeatClick,
}) => {
  const { showEmptySeatModal, setShowEmptySeatModal } = useContext(AppContext);

  return (
    <div className="col-span-2 xl:order-first order-last xl:h-full h-[full] overflow-hidden xl:overflow-auto xl:pb-10 pb-32 ">
      <div className="bg-white px-6 py-4 rounded md:mb-8 w-[100%]">
        <div className="md:col-span-2">
          <label className="md:text-base text-sm font-semibold inline-block mt-2">
            Đổi suất chiếu
          </label>
        </div>
        <div className="col-span-8 flex-row gap-4 flex-wrap items-center md:flex hidden">
          {filteredShowtimes?.map((filterdShowtime) => {
            const isSelected = selectedShowtime === filterdShowtime.startAt;
            return (
              <button
                key={filterdShowtime._id}
                className={`py-2 px-4 border rounded text-sm font-normal text-[#333333]  transition-all duration-500 ease-in-out hover:bg-[#034EA2] hover:text-white ${
                  isSelected ? "bg-[#034EA2] text-white" : ""
                }`}
                onClick={() => handleShowtimeClick(filterdShowtime.startAt)}
              >
                {filterdShowtime.startAt}
              </button>
            );
          })}
        </div>
      </div>
      <div className="bg-white md:px-6 py-4 px-2 rounded md:mb-8 w-full">
        <div className="md:block flex flex-wrap justify-center w-full h-full overflow-auto">
          {cinemas ? (
            <ul className="seat__layout-rows md:mb-8 w-auto grid gird-cols-1 items-center flex-auto text-o">
              {cinemas.seats?.map((rowSeats, rowIndex) => (
                <li
                  key={rowIndex}
                  className="flex justify-between mb-3 md:gap-0 gap-1 flex-nowrap"
                >
                  <div className="text-sm text-[#777777] font-semibold flex-none w-5 text-left ">
                    {alphabets[rowIndex] || ""}
                  </div>
                  <div className="flex md:gap-2 gap-1 grow justify-center min-w-[398px] flex-1">
                    {rowSeats.map((seat, seatIndex) => {
                      const uniqueSeatId = `${rowIndex}-${seatIndex}`;
                      const isSelected = selectedSeats.some(
                        (seat) => seat.uniqueSeatId === uniqueSeatId
                      );
                      const booked = isSeatBooked(
                        alphabets[rowIndex],
                        seatIndex + 1
                      );
                      return (
                        <button
                          key={uniqueSeatId}
                          className={`md:h-5 h-4 border rounded md:text-[12px] text-[10px] transition-all duration-200 ease-in-out text-white md:w-5 w-4 border-[#d0d0d0] ${
                            booked
                              ? "border-[#d0d0d0] bg-[#d0d0d0]"
                              : isSelected
                              ? "bg-[#f26b38] border-[#f26b38]"
                              : " xl:hover:bg-[#f26b38] xl:hover:border-[#f26b38] "
                          }`}
                          onClick={() =>
                            handleSeatClick(
                              alphabets[rowIndex],
                              seatIndex + 1,
                              uniqueSeatId,
                              cinemas.ticketPrice
                            )
                          }
                          disabled={booked}
                        >
                          <span
                            className={`inline-block md:w-5 w-4 text-center ${
                              isSelected ? "text-white" : "text-[#333333]"
                            } `}
                          >
                            {seatIndex + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-sm text-[#777777] font-semibold flex-none w-5 text-right ">
                    {alphabets[rowIndex] || ""}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <SeatLayout></SeatLayout>
        <Modal
          open={showEmptySeatModal}
          showCloseIcon={false}
          closeOnOverlayClick={false}
          classNames={{
            modal: "modal-375 text-center p-10",
          }}
        >
          <EmptySeat setShowEmptySeatModal={setShowEmptySeatModal}></EmptySeat>
        </Modal>
      </div>
    </div>
  );
};

export default Seats;
