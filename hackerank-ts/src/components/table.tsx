import React, { MouseEvent } from "react";
import { css } from "@emotion/core";
import { HitType } from "src/app";
import { Button } from "./button";

interface TableProps<T> {
  list: T;
  onDismiss: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Table({ list, onDismiss }: TableProps<HitType[]>) {
  return (
    <div
      css={css`
        margin: 20px 0;
      `}
    >
      {list.map(({ objectID, url, title, author, num_comments, points }) => (
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
            <a href={url}>{title}</a>
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
      ))}
    </div>
  );
}

export { Table };
