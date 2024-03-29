import { styled } from "@mui/material";

export const ChannelStyles = styled("ul")`
  .channelTextInput > div {
    margin-top: 50px;
  }
  .channelTextInput textarea#description {
    height: 150px !important;
  }
  .channelImageUpload {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
  .channelImageUpload > div {
    margin: 0 30px 70px;
  }
  .thumImageUpload {
    width: 100%;
    max-width: 188px;
  }
  .bannerImageUpload {
    width: 100%;
    max-width: 377px;
    margin-right: 0 !important;
  }

  .thumImageUpload .filepond--wrapper > div {
    height: 188px;
  }

  .thumImageUpload .filepond--wrapper > div,
  .bannerImageUpload .filepond--wrapper > div {
    height: 188px;
  }
  .channelSubmit {
    width: 100%;
    max-width: 345px;
  }

  .filepond--file {
    padding: 5px !important;
  }
`;
