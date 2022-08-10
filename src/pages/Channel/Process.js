import React from "react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYWY0ZWJiLTk1NWEtNDY1ZS05YzJjLTFiYWFlYzdjNjkzNSIsImVtYWlsIjoibXIucm91c25heUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6InVzZXIiLCJkZXZpY2VUeXBlIjoiaW9zIiwiZGV2aWNlVG9rZW4iOiJzdHJpbmciLCJpYXQiOjE2NTkzNjY4ODYsImV4cCI6MTY1OTM2Njk0Nn0.mAJadfoBmtF_rvFf4u7D_omcAAw6gz2n9Mkp-WmCtYA";

const setServer = {
  //   url: "http://13.124.197.107:3000",
  instantUpload: false,
  process: (
    fieldName,
    file,
    metadata,
    load,
    error,
    progress,
    abort,
    transfer,
    options
  ) => {
    // fieldName is the name of the input field
    // file is the actual file object to send
    const formData = new FormData();
    console.log(file);
    formData.append(fieldName, file, file.name);

    formData.append("id", "aaafb550-6ef9-45cf-a8a1-2cf853410577");
    formData.append("name", "Modified Channel");
    formData.append("description", "Modified Desc");

    const request = new XMLHttpRequest();

    request.open("PUT", "http://13.124.197.107:3000/channel");
    request.setRequestHeader("Authorization", "Bearer " + userToken);
    // Should call the progress method to update the progress to 100% before calling load
    // Setting computable to false switches the loading indicator to infinite mode
    request.upload.onprogress = (e) => {
      progress(e.lengthComputable, e.loaded, e.total);
    };

    // Should call the load method when done and pass the returned server file id
    // this server file id is then used later on when reverting or restoring a file
    // so your server knows which file to return without exposing that info to the client
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        // the load method accepts either a string (id) or an object
        load(request.responseText);
      } else {
        // Can call the error method if something is wrong, should exit after
        error("oh no");
      }
    };

    request.send(formData);

    console.log(formData);
    for (const value of formData.values()) {
      console.log(value);
    }

    // Should expose an abort method so the request can be cancelled
    return {
      abort: () => {
        // This function is entered if the user has tapped the cancel button
        request.abort();

        // Let FilePond know the request has been cancelled
        abort();
      },
    };
  },
  revert: "./channel/Revert",
  restore: "./restore/",
  load: "./load/",
  fetch: "./fetch/",
};

export default function Process(props) {
  return (
    <>
      <FilePond
        files={props.files}
        onupdatefiles={props.onupdatefiles}
        acceptedFileTypes={["image/png"]}
        allowMultiple={false}
        maxFiles={1}
        allowProcess="false"
        server={setServer}
        name={props.name}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </>
  );
}
