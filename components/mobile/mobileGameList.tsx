import React, { useEffect, useState } from "react";
import {
  AccordionProps,
  AccordionSummaryProps,
  Box,
  Container,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { useGetGamesData } from "../../hooks/reactQuerys/games";
import { GAMETYPE } from "../types";
import { checkedGameName } from "../../hooks/utils";
import MobileReserve from "./mobileReserve";
import { GameType } from "../../types/game";

type PropsType = {};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

function ArrowForwardIosSharpIcon(props: { sx: { fontSize: string } }) {
  return null;
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function MobileGameList(props: PropsType) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [games, setGames] = useState<GameType[]>();
  const { data, status, isFetching } = useGetGamesData();
  useEffect(() => {
    if (status === "success") setGames(data);
  }, [isFetching]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const changeMode = () => {
    console.log(theme.palette.mode);
    theme.palette.mode = theme.palette.mode === "dark" ? "light" : "dark";
  };
  // const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <>
      {/*<Box*/}
      {/*	sx={{*/}
      {/*		display: 'flex',*/}
      {/*		width: '100%',*/}
      {/*		alignItems: 'center',*/}
      {/*		justifyContent: 'center',*/}
      {/*		backgroundColor: 'background.default',*/}
      {/*		color: 'text.primary',*/}
      {/*		borderRadius: 1,*/}
      {/*		p: 3,*/}

      {/*	}}*/}
      {/*>*/}
      {/*	{theme.palette.mode} mode*/}
      {/*	<IconButton sx={{ml: 1}} onClick={() => changeMode()} color="inherit">*/}
      {/*		{theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}*/}
      {/*	</IconButton>*/}
      {/*</Box>*/}
      <Box sx={{ gap: 2 }}>
        {/* {games ? (
          <div>
            {games.map((item, i) => (
              <Accordion
                expanded={expanded === `panel${i + 1}`}
                onChange={handleChange(`panel${i + 1}`)}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography align="center" sx={{ width: 1 }}>
                    {item.id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Container>
                    {checkedGameName(item.id) ? (
                      <div>
                        <MobileReserve games={item} />
                      </div>
                    ) : (
                      <div>hi2</div>
                    )}
                  </Container>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        ) : ( */}
        <div>로딩중 ...</div>
        {/* )} */}
      </Box>
    </>
  );
}

export default MobileGameList;
