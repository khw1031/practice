import React, { MouseEvent, useState } from "react";
import { sortBy } from "lodash";
import { css } from "@emotion/core";
import { HitType } from "../app";
import { Button } from "./button";
import { Sort } from "./sort";

interface TableProps<T> {
  list: T;
  onDismiss: (e: MouseEvent<HTMLButtonElement>) => void;
}

type SortType = {
  [key: string]: (list: HitType[]) => HitType[];
};

const SORTS: SortType = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse(),
};

function Table({ list, onDismiss }: TableProps<HitType[]>) {
  const [sortKey, setSortKey] = useState<Readonly<string>>("NONE");
  const [isSortReverse, setIsSortReverse] = useState<Readonly<boolean>>(false);

  const onSort = (currentSortKey: string) => {
    const isReverse = sortKey === currentSortKey && !isSortReverse;
    setSortKey(currentSortKey);
    setIsSortReverse(isReverse);
  };

  const sortedList = SORTS[sortKey](list);
  const reversibleSortedList = isSortReverse
    ? sortedList.reverse()
    : sortedList;

  return (
    <div
      css={css`
        margin: 20px 0;
      `}
    >
      <div
        css={css`
          display: flex;
          line-height: 24px;
          font-size: 16px;
          padding: 0 10px;
          justify-content: space-between;
        `}
      >
        <span
          css={css`
            width: 40%;
          `}
        >
          <Sort sortKey={"TITLE"} onSort={onSort} activeSortKey={sortKey}>
            Title
          </Sort>
        </span>
        <span
          css={css`
            width: 30%;
          `}
        >
          <Sort sortKey={"AUTHOR"} onSort={onSort} activeSortKey={sortKey}>
            Author
          </Sort>
        </span>
        <span
          css={css`
            width: 10%;
          `}
        >
          <Sort sortKey={"COMMENTS"} onSort={onSort} activeSortKey={sortKey}>
            Comments
          </Sort>
        </span>
        <span
          css={css`
            width: 10%;
          `}
        >
          <Sort sortKey={"POINTS"} onSort={onSort} activeSortKey={sortKey}>
            Points
          </Sort>
        </span>
        <span
          css={css`
            width: 10%;
          `}
        >
          Archive
        </span>
      </div>
      {reversibleSortedList.map(
        ({ objectID, url, title, author, num_comments, points }) => (
          <div
            key={objectID}
            css={css`
              display: flex;
              line-height: 24px;
              white-space: nowrap;
              margin: 10px 0;
              padding: 10px;
              background: #ffffff;
              border: 1px solid #e3e3e3;
              span {
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 5px;
                &:nth-of-type(1) {
                  flex-basis: 40%;
                }
                &:nth-of-type(2) {
                  flex-basis: 30%;
                }
                &:nth-of-type(3),
                &:nth-of-type(4) {
                  flex-basis: 10%;
                }
              }
            `}
          >
            <span>
              <a target="_blank" href={url}>
                {title}
              </a>
            </span>
            <span>{author}</span>
            <span>{num_comments}</span>
            <span>{points}</span>
            <Button
              css={css`
                flex-basis: 10%;
                border-width: 0;
                background: transparent;
                color: inherit;
                text-align: inherit;
                -webkit-font-smoothing: inherit;
                padding: 0;
                font-size: inherit;
                cursor: pointer;
              `}
              data-id={objectID}
              type="button"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
          </div>
        )
      )}
    </div>
  );
}

export { Table };
