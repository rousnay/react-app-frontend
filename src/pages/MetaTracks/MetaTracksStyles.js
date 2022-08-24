import React, { useState } from "react";
import { styled } from "@mui/material";

export const TrackCreationNavStyled = styled("ul")`
  display: flex;
  padding: 0;
  justify-content: space-around;
  flex-wrap: "wrap";
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
    .howTo {
      padding: 15px 30px 30px;
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
`;
