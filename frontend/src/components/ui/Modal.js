const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg w-1/3">
          <button className="text-red-500 float-right" onClick={onClose}>
            ✖
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
  