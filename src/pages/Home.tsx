import WeeklyScheduleContainer from "../components/container/WeeklyScheduleContainer";
import DateRangeSelectionContainer from "../components/container/DateRangeSelectionContainer";
import Page from "../components/groups/Page";

const Home = () => {
  return (
    <Page title="Create new Medication Plan">
      <DateRangeSelectionContainer />
      <WeeklyScheduleContainer />
      {/*<ScheduleActionContainer />*/}
    </Page>
  );
};

export default Home;
