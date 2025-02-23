import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-alice-carousel";

export default function Footer() {
  return (
    <footer className="mb-0">
      <div>
        <Grid
          container
          className="bg-[#0a1535] mb-0 text-white text-center  space-y-6 md:space-y-0"
          sx={{ color: "white", py: 3 }}
        >
          {/* 1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-1 md:pb-3 lg:pb-5" variant="h6">
              Company
            </Typography>
            <div className="flex flex-col space-y-[-12px]">
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                About
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Blog
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Jobs
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Press
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Patners
              </Button>
            </div>
          </Grid>
          {/* 2 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-1 md:pb-3 lg:pb-5" variant="h6">
              Solutions
            </Typography>
            <div className="flex flex-col space-y-[-12px]">
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Marketing
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Analytics
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Commerce
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Insights
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Support
              </Button>
            </div>
          </Grid>

          {/* 3 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-1 md:pb-3 lg:pb-5" variant="h6">
              Documentation
            </Typography>
            <div className="flex flex-col space-y-[-12px]">
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Guides
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                API Status
              </Button>
            </div>
          </Grid>
          {/* 4 */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography className="pb-1 md:pb-3 lg:pb-5" variant="h6">
              Legal
            </Typography>
            <div className="flex flex-col space-y-[-12px]">
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Claim
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Privacy
              </Button>
              <Button sx={{ textTransform: "capitalize", color: "white" }}>
                Terms
              </Button>
            </div>
          </Grid>

          {/* Last */}
          <Grid className="pt-10 md:pt-20 pb-1 md-pb-0 space-y-1" item xs={12} >
            <Typography variant="body2" component="p" align="center">
              &copy; 2023 My Company. All rights reserved.
            </Typography>

            <Typography variant="body2" component="p" align="center">
              Made with love by Me.
            </Typography>

            <Typography variant="body2" component="p" align="center">
              {" "}
               Icons made by{" "}
              <Link
                href="https://www.freepik.com"
                color="inherit"
                underline="always"
              >
                 Freepik
              </Link>{" "}
              from{" "}
              <Link
                href="https://www.flaticon.com/"
                color="inherit"
                underline="always"
              >
                www. flaticon.com
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}
