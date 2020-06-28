import styled from "styled-components";
import { Container, Fab } from "@material-ui/core";
import { Link } from "next/link";

export const StyledContainer = styled(Container)({
    paddingTop: 64,
    display: "flex",
    flexWrap: "wrap",
  });
  
export const StyledLink = styled(Link)({
    textDecoration: "none",
  });
  
  const StyledFab = styled(Fab)({
    position: "fixed",
    right: 16,
    bottom: 16,
  });
  
  const FormWrapper = styled.div({
    display: "flex",
    flexDirection: "column",
    "> div + div": {
      marginTop: 16,
    },
  });
  