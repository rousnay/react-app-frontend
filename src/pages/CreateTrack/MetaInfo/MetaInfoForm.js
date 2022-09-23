import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Uploader from "../../../components/Uploader";
import swal from "sweetalert";
import { RequestApi } from "../../../components/RequestApi";

export default function MetaInfoForm(props) {
  // Dynamic input setup ==================
  const [formValues, setFormValues] = useState(props.localFormValues);
  const newFormSubmit = (pin_id, pin_name, pin_save) => {
    let newValues = {
      id: pin_id,
      name: pin_name,
      save: pin_save,
    };
    setFormValues([...formValues, newValues]);
  };

  useEffect(() => {
    localStorage.setItem("formValuesLocal", JSON.stringify(formValues));
  }, [formValues]);

  const foundIndex = formValues.findIndex((x) => x.id === props.pinId);

  // Setting form variables ===================
  useEffect(() => {
    setPinName(props.pinName);
  }, [props.pinName]);

  const [name, setPinName] = useState(" ");
  const [text, setPinText] = useState(" ");
  const [sound, setPinSound] = useState([]);
  const [image, setPinImage] = useState([]);

  var formData = new FormData();
  formData.append("id", props.pinId);
  formData.append("lon", props.pinLon);
  formData.append("lat", props.pinLat);
  formData.append("distanceInKm", props.distanceInKm);
  formData.append("feature", props.feature);
  formData.append("name", name);
  formData.append("text", text);
  formData.append("sound", sound[0]);
  formData.append("image", image[0]);

  const formValueSet = [props.pinId, name, "saved"];

  // MetaInfo (PIN) submission handler  ==================
  const submitMetaInfo = async (e) => {
    e.preventDefault();
    const [response] = await RequestApi(
      "POST",
      `track/${props.trackId}/pin-point`,
      props.token,
      formData
    );
    if (response.message === "Success") {
      swal("Success", "Pin has been add", "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        if (foundIndex === -1) {
          newFormSubmit(...formValueSet);
        } else {
          console.log("This pin was saved before");
          formValues[foundIndex].id = props.pinId;
          formValues[foundIndex].name = name;
          localStorage.setItem("formValuesLocal", JSON.stringify(formValues));
        }
      });
    } else {
      swal("Oops!", response.error, "error", {
        buttons: true,
      }).then((value) => {});
    }
  };

  // Setting PIN files for upload  ==================
  function setPinSoundFile(fileItems) {
    const _pinSoundFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinSound(_pinSoundFileItem);
  }

  function setPinImageFile(fileItems) {
    const _pinImageFileItem = fileItems.map((fileItem) => {
      return fileItem.file;
    });
    setPinImage(_pinImageFileItem);
  }

  return (
    <>
      <form noValidate onSubmit={submitMetaInfo} style={props.formVisibility}>
        <h4>Metadata</h4>
        <div className="meta_input_wrapper">
          <TextField
            variant="outlined"
            label="Name"
            value={name}
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            onChange={(e) => setPinName(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Distance"
            value={`${props.distanceInKm} km from pin 1`}
            margin="normal"
            required
            fullWidth
            id="pinDistance"
            name="pinDistance"
          />
          <TextField
            variant="outlined"
            label="Text"
            value={text}
            multiline
            fullWidth
            id="pinText"
            name="pinText"
            maxRows={4}
            onChange={(e) => setPinText(e.target.value)}
          />
          <div className="pinSoundUpload">
            <Uploader
              files={sound}
              name={"sound"}
              onUpdateFiles={(soundFileItems) =>
                setPinSoundFile(soundFileItems)
              }
              labelIdle='Drop Sound for pin or <span class="filepond--label-action">Browse</span>'
            />
          </div>
          <div className="pinImageUpload">
            <Uploader
              files={image}
              name={"image"}
              onUpdateFiles={(imageFileItems) =>
                setPinImageFile(imageFileItems)
              }
              labelIdle='Drop Image for pin or <span class="filepond--label-action">Browse</span>'
            />
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          size="small"
          variant="contained"
          color="logoBlue"
          className="pinInfoSubmit"
        >
          Save Pin {props.selectedPinIndex + 1}
        </Button>
      </form>
    </>
  );
}
