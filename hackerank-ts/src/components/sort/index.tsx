import React from "react";
import { Button } from "../button";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

type SortType = {
  sortKey: string;
  activeSortKey: string;
  onSort: (sortKey: string) => void;
};

export const Sort = ({
  onSort,
  sortKey,
  activeSortKey,
  children,
  ...props
}: React.PropsWithChildren<SortType>) => (
  <InlineButton
    css={css`
      ${sortKey === activeSortKey
        ? css`
            border-radius: 0;
            border-bottom: 1px solid #38bb6c;
          `
        : ""}
    `}
    onClick={() => onSort(sortKey)}
    {...props}
  >
    {children}
  </InlineButton>
);

const InlineButton = styled(Button)`
  border-width: 0;
  background: transparent;
  color: inherit;
  text-align: inherit;
  -webkit-font-smoothing: inherit;
  padding: 0;
  font-size: inherit;
  cursor: pointer;
`;
