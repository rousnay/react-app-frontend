import { styled } from "@mui/material";

export const ManageTrackStyled = styled("div")`
  ul.MuiList-root {
    svg {
      font-size: 20px;
      color: red;
      margin-left: 10px;
    }
  }
  table {
    border-spacing: 0;
    margin-top: 15px;
    thead {
      background-color: #e9edf3;

      th {
        padding: 15px 10px;
      }
    }
    tbody {
      background-color: white;

      td {
        padding: 20px 0;
        border-bottom: 1px solid #e9edf5;
      }
    }
  }

  .trackInfo {
    // width: fit-content;
  }
  img.trackImg {
    width: 176px;
    max-width: 50%;
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
`;

export const ManageCommentsStyled = styled("div")`
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

  .cr-counter {
    span {
      display: inline-flex;
      margin-right: 3em;
      svg {
        margin-right: 10px;
      }
      &:first-of-type svg {
        color: var(--themered);
      }
      &:last-of-type svg {
        color: var(--themeblue);
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
  img.trackImg {
    width: 176px;
    max-width: 50%;
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
