
import JournalForm from "../components/Journal/JournalForm";
import PreviousEntries from "../components/Journal/PreviousEntries";
import Streak from "../components/Journal/JournalSreak";
import JournalEntryMessage from "../components/Journal/JournalEntryMessage";

function AddJournalEntry() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Streak />
      
      <div className="flex justify-center mb-3">
        <JournalEntryMessage />
      </div>
      
      <p className="text-xs sm:text-sm text-gray-600 text-center mb-6">
        You can only make one entry per day, but you can keep updating it throughout the day
      </p>
      
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <div className="w-full lg:w-3/5">
          <JournalForm />
        </div>
        
        <div className="w-full lg:w-2/5 bg-green-50 rounded-xl shadow-sm p-4">
          <PreviousEntries />
        </div>
      </div>
    </div>
  );
}

export default AddJournalEntry;
