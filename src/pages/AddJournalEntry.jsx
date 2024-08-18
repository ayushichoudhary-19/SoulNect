import React from "react";
import JournalForm from "../components/Journal/JournalForm";
import PreviousEntries from "../components/Journal/PreviousEntries";
import Streak from "../components/Journal/JournalSreak";
import JournalEntryMessage from "../components/Journal/JournalEntryMessage";

function AddJournalEntry() {
  return (
    <>
      <Streak />
      <JournalEntryMessage  />
      <div className="flex flex-col md:flex-row md:justify-between mb-10">
        <div className="md:w-6/10 lg:w-6/10 px-10">
          <JournalForm />
        </div>
        <div className=" bg-[#E7F5E9] rounded-lg p-4 md:w-4/10 lg:w-4/10 mb-4 md:mb-0">
          <PreviousEntries />
        </div>
      </div>
    </>
  );
}

export default AddJournalEntry;
