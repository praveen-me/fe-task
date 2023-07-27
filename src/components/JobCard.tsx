import React from "react";

export default function JobCard() {
  return (
    <div className="display-inline rounded-lg	 overflow-hidden">
      <div className="flex flex-row display-inline py-4 px-6 bg-white">
        <div>
          <img src={require("../images/logo.png")} alt="" />
        </div>
        <div className="ml-2">
          <h2 className="text-2xl font-normal">UX UI Designer</h2>
          <h3 className="text-base font-normal">
            Great Vibes - Information Technology
          </h3>
          <h4 className="text-base font-normal job_card_location">
            Chennai, Tamilnadu, India (In-office)
          </h4>

          <div className="my-6">
            <p className="mb-2 font-normal">Part-Time (9:00am - 5:00pm IST)</p>
            <p className="mb-2 font-normal">Part-Time (9:00am - 5:00pm IST)</p>
            <p className="mb-2 font-normal">Part-Time (9:00am - 5:00pm IST)</p>
            <p className="mb-2 font-normal">Part-Time (9:00am - 5:00pm IST)</p>
          </div>

          <div>
            <button
              type="button"
              className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800 job_card_apply_button mt-0 "
              // onClick={handleSubmitStep}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
