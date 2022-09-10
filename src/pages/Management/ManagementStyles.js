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

export const ManageCommentsStyled = styled("div")``;
