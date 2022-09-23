import { Box, Typography, AppBar, Toolbar } from "@mui/material";

const ManageCommentOptions = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: `var(--themeBackground)`,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: `var(--themeBlack)`,
                fontWeight: "bold",
              }}
            >
              Manage Comments
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default ManageCommentOptions;
