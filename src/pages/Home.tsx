import { H1 } from "../components/utilities/Typography";
import DateRangeSelectionGroup from "../components/groups/DateRangeSelectionGroup";
import Divider from "../components/atoms/Divider";

const Home = () => {
  // onNavigateToNext: () => void;
  // onNavigateToPrevious: () => void;
  // navigateToNextDisabled: boolean;
  // navigateToPreviousDisabled: boolean;

  const onNavigateToPrevious = () => console.log("bar");
  const onNavigateToNext = () => console.log("foo");
  const navigateToPreviousDisabled = true;
  const navigateToNextDisabled = false;

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
      <Divider />
    </div>
  );
};

export default Home;
