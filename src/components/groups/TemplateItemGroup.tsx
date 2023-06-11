import { useMemo } from "react";
import { Day } from "../../models";
import { MAX_ITEMS_PER_PAGE } from "../../constants";
import { B } from "../atoms/Typography";
import clsx from "clsx";

interface Props {
  templateLength: number;
  paginationIndex: number;
  days: Day[];
}

interface Block {
  isTemplate: boolean;
  length: number;
}

const TemplateItemGroup = ({
  templateLength,
  paginationIndex,
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
      const currentBlockIndex = blocksIndices[paginationIndex + i];
      const lastBlockIndex =
        blocksIndices[Math.max(0, paginationIndex + i - 1)];

      const isRightEdge = i == maxItems;
      const nextBlockFound = currentBlockIndex > lastBlockIndex;
      const isBlockEnd = isRightEdge || nextBlockFound;

      if (isBlockEnd) {
        blocks.push({
          length: lastBlockLength,
          isTemplate: !lastBlockIndex,
        });
        lastBlockLength = 0;
      }
      lastBlockLength++;
    }

    return blocks;
  }, [days, paginationIndex, templateLength]);

  return (
    <div
      className={clsx(
        "flex w-full [&>*:last-child]:-mr-3 [&>*]:mr-3",
        templateLength == 0 ? "opacity-0" : "opacity-100"
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

export default TemplateItemGroup;
