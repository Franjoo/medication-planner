import { H1 } from "../components/atoms/Typography";
import DateRangeSelectionGroup from "../components/groups/DateRangeSelectionGroup";
import Divider from "../components/atoms/Divider";
import ObservedWeeklyScheduleContainer from "../components/container/WeeklyScheduleContainer";

const Home = () => {
  // onNavigateToNext: () => void;
  // onNavigateToPrevious: () => void;
  // navigateToNextDisabled: boolean;
  // navigateToPreviousDisabled: boolean;

  const onNavigateToPrevious = () => console.log("bar");
  const onNavigateToNext = () => console.log("foo");
  const navigateToPreviousDisabled = true;
  const navigateToNextDisabled = false;
  const dayRangeCount = 2;

  return (
    <div className="p-12">
      <H1>Create new Medication Plan</H1>
      <DateRangeSelectionGroup
        onNavigateToPrevious={onNavigateToPrevious}
        onNavigateToNext={onNavigateToNext}
        navigateToPreviousDisabled={navigateToPreviousDisabled}
        navigateToNextDisabled={navigateToNextDisabled}
        dayRangeCount={2}
      />

      {/*<DateRangeSelectionGroup*/}
      {/*  {...{*/}
      {/*    onNavigateToPrevious,*/}
      {/*    onNavigateToNext,*/}
      {/*    navigateToPreviousDisabled,*/}
      {/*    navigateToNextDisabled,*/}
      {/*    dayRangeCount,*/}
      {/*  }}*/}
      {/*/>*/}
      <Divider />
      <ObservedWeeklyScheduleContainer />
    </div>
  );
};

export default Home;
