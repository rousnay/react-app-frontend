import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import FilePondPluginFileEncode from "filepond-plugin-file-encode";

// import * as MyFilePond from "filepond";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  //   FilePondPluginFileEncode,
  FilePondPluginMediaPreview

  //   FilePondPluginImageResize,

  //   FilePondPluginFileValidateType,
  //   FilePondPluginFileValidateSize,
);

export default function Uploader(props) {
  return (
    <>
      <FilePond
        files={props.files}
        name={props.name}
        onUpdateFiles={props.onUpdateFiles}
        allowMultiple={false}
        maxFiles={1}
        // acceptedFileTypes={["image/png", "xml/gpx"]}
        labelIdle={props.labelIdle}
      />
    </>
  );
}
