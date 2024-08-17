import React from "react";
import JournalForm from "../components/Journal/JournalForm";
import PreviousEntries from "../components/Journal/PreviousEntries";
function AddJournalEntry() {
  return (
    // <Container>
    <>
      <JournalForm />
      <PreviousEntries />
      </>
    // </Container>
  );
}

export default AddJournalEntry;