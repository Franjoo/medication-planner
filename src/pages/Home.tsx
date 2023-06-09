import WeeklyScheduleContainer from "../components/container/WeeklyScheduleContainer";
import DateRangeSelectionContainer from "../components/container/DateRangeSelectionContainer";
import Page from "../components/groups/Page";
import React from "react";
import ScheduleActionContainer from "../components/container/ScheduleActionContainer";
import DialogContainer from "../components/container/DialogContainer";

const Home = () => {
  return (
    <Page title="Create new Medication Plan">
      <DateRangeSelectionContainer />
      <WeeklyScheduleContainer />
      <ScheduleActionContainer />
      <DialogContainer />
    </Page>
  );
};

export default Home;
