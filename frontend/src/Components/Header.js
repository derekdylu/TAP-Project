import React from "react";
import Button from '@mui/material/Button';
import { Link, Typography } from "@mui/material";
import { styled } from '@mui/system';
// import styled from "@mui/materials/styles";
import { css } from "@emotion/css";
import theme from '../Themes/Theme';
import { ThemeProvider } from "@emotion/react";

const header = css`
    position: sticky;
    top: 0px;
    padding: 80px 24px 32px 24px;
    background: inherit;
    overflow: hidden;
`;

const link = css`
    display: flex;
    justify-content: left;
    align-items: center;
    text-decoration: none;
    color: inherit;
    width: fit-content;
`;

const arrow = css`
    border: solid #704E27;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px; 
    margin-right: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`;

function Header({_returnText, _returnLink, _titleText, _contentText, _linkColor}) {
  let returnText = "返回";
  let returnLink = "";
  let titleText = null;
  let contentText = null;
  let linkColor = theme.palette.carton[700];

  if (_returnText !== undefined) {
    returnText = _returnText;
  }
  if (_returnLink !== undefined) {
    returnLink = _returnLink;
  }
  if (_titleText !== undefined) {
    titleText = _titleText;
  }
  if (_contentText !== undefined) {
    contentText = _contentText;
  }
  if (_linkColor !== undefined) {
    linkColor = _linkColor
  }

  return (
    <ThemeProvider theme={theme}>
        <div className={`${header}`} id="header">
            <Typography variant="h5" color={linkColor}>
                <a href={ returnLink } className={`${link}`}>
                    <div className={`${arrow}`}/>{ returnText }
                </a>
            </Typography>
            { titleText != null &&
                <Typography variant="h1" color={theme.palette.secondary.contrastText}>
                {_titleText}
                </Typography>
            }
            { contentText != null &&
                <Typography variant="body1" color={theme.palette.secondary.contrastText}>
                {_titleText}
                </Typography>
            }
        </div>
    </ThemeProvider>
  )
}

export default Header;