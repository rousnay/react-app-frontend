import { styled } from "@mui/material";

export const CommentsStyled = styled("div")`
  ul.MuiList-root {
    svg {
      font-size: 20px;
      color: red;
      margin-left: 10px;
    }
  }

  .comments-accordion {
    margin: 10px 0;
    background-color: white;
    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    &.Mui-expanded {
      border: 2px solid #4caff6;
    }
  }

  .trackInfo,
  .commentInfo {
    width: 50%;
  }

  .ReplyOptions {
    display: flex;
    .cr-counter svg {
      color: var(--themeRed) !important;
    }
  }

  .cr-counter {
    span {
      display: inline-flex;
      margin-right: 2.8em;
      svg {
        margin-right: 10px;
      }
      &:first-of-type svg {
        color: var(--themeRed);
      }
      &:last-of-type svg {
        color: var(--themeBlue);
      }
    }
  }

  .comments-summary {
    &:hover,
    &.Mui-expanded {
      background-color: #edf7fe;
    }
  }

  .commentMeta {
    h4 {
      margin: 0;
    }
    p {
      margin: 0;
      font-size: 12px;
    }
  }
  img.trackImage,
  img.pinImage {
    display: inline-flex;
    width: 176px;
    max-width: 50%;
    margin-right: 15px;
    border-radius: 5px;
  }
  .trackText {
    width: 50%;
    display: inline-block;
    padding: 0 15px;
    h4 {
      margin: 0;
    }
    p {
      margin: 0;
      font-size: 12px;
    }
  }

  .comments-list-sub {
    list-style: none;
    textarea {
      width: 100% !important;
      min-height: 50px !important;
      background: #f0f4f8;
      border: none;
      border-radius: 3px;
      padding: 10px;
      &:focus-visible {
        outline: 1px solid #dadee3;
      }
    }
    li {
      padding: 0 15px;
      > div {
        padding: 25px 0;
        border-bottom: 1px solid #e9edf5;
      }
    }
  }
`;
