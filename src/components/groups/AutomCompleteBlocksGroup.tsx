import { useMemo } from "react";
import { Day } from "../../models";
import { MAX_ITEMS_PER_PAGE } from "../../constants";
import { B } from "../atoms/Typography";
import clsx from "clsx";

interface Props {
  showAutoCompletes: boolean;
  templateLength: number;
  firstItemIndex: number;
  days: Day[];
}

interface Block {
  isTemplate: boolean;
  length: number;
}

const AutomCompleteBlocksGroup = ({
  showAutoCompletes,
  templateLength,
  firstItemIndex,
  days,
}: Props) => {
  const itemWidth = 160;
  const itemPadding = 12;

  const blocks = useMemo(() => {
    const blocksIndices = days.map((_, index) =>
      Math.trunc(index / templateLength)
    );
    const blocks: Block[] = [];
    const maxItems = Math.min(days.length, MAX_ITEMS_PER_PAGE);
    let lastBlockLength = 0;
    for (let i = 0; i <= maxItems; i++) {
      const currentBlockIndex = blocksIndices[firstItemIndex + i];
      const lastBlockIndex = blocksIndices[Math.max(0, firstItemIndex + i - 1)];
      const isRightEdge = i === maxItems;
      const nextBlockFound = currentBlockIndex > lastBlockIndex;
      const isBlockEnd = isRightEdge || nextBlockFound;
      if (isBlockEnd && lastBlockLength) {
        blocks.push({ length: lastBlockLength, isTemplate: !lastBlockIndex });
        lastBlockLength = 0;
      }
      lastBlockLength++;
    }
    return blocks;
  }, [days, firstItemIndex, templateLength]);

  return (
    <div
      className={clsx(
        "flex w-full [&>*:last-child]:-mr-3 [&>*]:mr-3",
        showAutoCompletes ? "opacity-100" : "opacity-0"
      )}
    >
      {blocks.map((block, index) => (
        <div className="mr-3" key={index}>
          <span
            className="block h-[3px] bg-pink"
            style={{
              width:
                block.length * itemWidth + (block.length - 1) * itemPadding,
            }}
          />
          <B className="text-center text-pink">
            {block.isTemplate ? "Template" : "Copy"}
          </B>
        </div>
      ))}
    </div>
  );
};

export default AutomCompleteBlocksGroup;
