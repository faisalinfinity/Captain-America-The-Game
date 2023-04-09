import { useState } from "react";

function Modal(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to open the modal */}
      <button onClick={toggleModal}>Open Modal</button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed z-10 inset-0 justify-center overflow-y-auto  ">
          <div className="flex  items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity " aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-30 "></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen " aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom     rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
             
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 pt-5 pb-4 sm:p-60 sm:pb-10">
                {/* Modal content */}
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Modal Title</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Modal content goes here.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-40 py-10 sm:px-10  bg-gradient-to-r from-purple-500 to-pink-500">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-20 sm:w-60 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
