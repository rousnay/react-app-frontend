import React, { useState } from "react";
import { styled } from "@mui/material";

export const TrackCreationNavStyled = styled("ul")`
  display: flex;
  padding: 0;
  justify-content: space-around;
  flex-wrap: "wrap";
  margin-bottom: 30px;
  li {
    opacity: 0.6;
    list-style: none;
    margin: 8px 4px;
    &:hover {
      opacity: 1;
      span {
        background-color: var(--themeblue);
      }
      a {
        color: var(--themeblue);
        font-weight: bold;
      }
    }
    & > a {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      padding: 8px 15px;
      color: var(--themeblack);
      text-decoration: none;
      span {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 5px;
        text-align: center;
        line-height: 24px;
        color: white;
        background-color: var(--themeblack);
      }
    }
    @media only screen and (max-width: 600px) {
      // background-color: lightblue;
    }
  }
`;

export const TrackInfoFormStyled = styled("form")`
  display: flex;
  width: 100%;
  .gpxFileInfo {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    .pinInfoHeader {
      flex-direction: row;
      justify-content: space-between;
      margin: 15px 0;
    }
    .howTo {
      padding: 15px 30px 30px;
    }
    .pin_list {
      .pin_items {
        list-style: none;
      }
      .pin_item {
        display: flex;
        margin: 10px 0;
        > span {
          height: 20px;
          width: 25px;
          background: white;
          border: 1px solid #ff7a22;
          border-radius: 3px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: enter;
          margin-right: 15px;
          > span {
            font-weight: 700;
            color: #ff7a22;
            font-size: 13px;
          }
        }
        &.selected_pin {
          font-weight: 700;
          > span {
            color: white !important;
            background-color: #ff9128 !important;
            > span {
              color: white !important;
            }
          }
        }
      }
    }
  }
  > div {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
  }
  .trackInformation {
    margin-left: 15px;
    display: flex;
    flex-flow: column;
    > div {
      margin: 10px 0;
    }
    #description {
      height: 150px !important;
    }
    .previewImageUpload {
      margin-top: 0;
    }
  }
  .meta_input_wrapper {
    > div {
      margin: 10px 0;
    }
  }
`;

export const MetaInfoFormStyled = styled("div")`
  display: flex;
  width: 100%;
  .gpxFileInfo {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    .pinInfoHeader {
      flex-direction: row;
      justify-content: space-between;
      margin: 15px 0;
    }
    .howTo {
      padding: 15px 30px 30px;
    }
    .pin_list {
      .pin_items {
        list-style: none;
      }
      .pin_item {
        display: flex;
        margin: 10px 0;
        > span {
          height: 20px;
          width: 25px;
          background: white;
          border: 1px solid #ff7a22;
          border-radius: 3px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: enter;
          margin-right: 15px;
          > span {
            font-weight: 700;
            color: #ff7a22;
            font-size: 13px;
          }
        }
        &.selected_pin {
          font-weight: 700;
          > span {
            color: white !important;
            background-color: #ff9128 !important;
            > span {
              color: white !important;
            }
          }
        }
      }
    }
  }
  > div {
    padding: 15px;
    background-color: white;
    border-radius: 8px;
  }
  .trackInformation {
    margin-left: 15px;
    display: flex;
    flex-flow: column;
    > div {
      margin: 10px 0;
    }
    #description {
      height: 150px !important;
    }
    .previewImageUpload {
      margin-top: 0;
    }
  }
  .meta_input_wrapper {
    > div {
      margin: 10px 0;
    }
  }
`;
