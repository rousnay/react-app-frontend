===================================
Object.keys(userData).map((key, idx) => <p key={idx}>{userData[key]}</p>);
===================================
const LoginRightContainer = {
  backgroundImage: `url( ${TreadmillBg} )`,
  height: "100%",
  width: "100%",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

====================================
paper: {
  margin: theme.spacing(8, 4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
},
avatar: {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
},
form: {
  width: "100%",
  marginTop: theme.spacing(1),
},
submit: {
  margin: theme.spacing(3, 0, 2),
},
===================================
// get FormData values
for (const value of formData.values()) {
  console.log(value);
}