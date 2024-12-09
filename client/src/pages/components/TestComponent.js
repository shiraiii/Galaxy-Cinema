import React, { useContext } from "react";
import { Modal } from "react-responsive-modal";
import AppContext from "../../context/AppContext";
import LoginModal from "./Modal/loginModal";

const TestComponent = () => {
  const { showLoginModal, setShowLoginModal } = useContext(AppContext);

  return (
    <>
      <button onClick={() => setShowLoginModal(true)}>Open Modal</button>
      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginModal></LoginModal>
      </Modal>
    </>
  );
};

export default TestComponent;
