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

  .trackInfo {
    width: 35%;
  }
  .commentInfo {
    width: 45%;
    margin-left: 45px;
  }

  .ReplyOptions {
    display: flex;
    .cr-counter svg {
      color: var(--themeRed) !important;
    }
  }

  .commentCounts,
  .cr-counter {
    display: flex;
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

  .commentCounts {
    span {
      margin-right: 1.8em;
    }
  }

  .commentPagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    justify-content: end;
    li {
      margin: 3px;
      border-radius: 4px;
      &.selected {
        background-color: rgba(0, 0, 0, 0.08);
        a{
          font-weight: 700;
        }
      }
      &.disabled{
        pointer-events: none;
        border-color: #dee2e6;
        svg{
          color: #abb4bb;
        }
      }
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        background-color: transparent;
        cursor: pointer;
        vertical-align: middle;
        text-decoration: none;
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        text-align: center;
        box-sizing: border-box;
        min-width: 32px;
        height: 32px;
        color: rgba(0, 0, 0, 0.87);
        outline: 0;
        margin: 0;
        padding: 0;
        border-radius: 4px;
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
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
    border-radius: 5px;
    // margin: 0 !important;
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
