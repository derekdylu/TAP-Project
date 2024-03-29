import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { getCuisines, getIngredientTypes, getGameById, getIngredients, updateGameById } from '../Utils/Axios';
import { css } from "@emotion/css";
import Header from './Header'
import Footer from './Footer'
import CartItem from './CartItem'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import NativeSelect from '@mui/material/NativeSelect';
import { useSelector } from 'react-redux';
import { selectAllGames, gameCartAdded } from '../Features/GamesSlice'
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import theme from '../Themes/Theme';

import TabBadgeImg from '../Images/tab_badge.png'
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';

import winterMellon from '../Images/IngredientType/冬瓜.png'
import longEffPlant from '../Images/IngredientType/長茄子.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'
import brownEgg from '../Images/IngredientType/土雞蛋.png'
import garlic from '../Images/IngredientType/大蒜.png'
import onion from '../Images/IngredientType/洋蔥.png'
import beef from '../Images/IngredientType/牛肉.png'
import pepper from '../Images/IngredientType/甜椒.png'
import redish from '../Images/IngredientType/白蘿蔔.png'
import carrot from '../Images/IngredientType/紅蘿蔔.png'
import cucumber from '../Images/IngredientType/胡瓜.png'
import spinach from '../Images/IngredientType/菠菜.png'
import egg from '../Images/IngredientType/蛋.png'
import pork from '../Images/IngredientType/豬肉.png'
import greenOnion from '../Images/IngredientType/青蔥.png'
import mushroom from '../Images/IngredientType/香菇.png'
import potato from '../Images/IngredientType/馬鈴薯.png'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'

const img = {
  0: pork,
  1: beef,
  2: potato,
  3: redish,
  4: carrot,
  5: onion,
  6: garlic,
  7: cucumber,
  8: pepper,
  9: winterMellon,
  10: spinach,
  11: longEffPlant,
  12: greenOnion,
  13: egg,
  14: mushroom,
  15: bunaShimeji,
  111: roundEffPlant,
  113: brownEgg,
}

const header = css`
    position: sticky;
    top: 0px;
    padding: 24px 24px 24px 24px;
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Ingredient = ({object, _handleClose}) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [ingredientTypeId, setIngredientTypeId] = useState(object.id.split('_')[0])
  const [loading, setLoading] = useState(false);
  // let ingredientTypeId = parseInt(object.id.split('_')[0])

  const AddItemToCart = async() => {
    setLoading(true)
    const item = {
      id: object.id,
      name: object.name,
      type: object.type
    }
    dispatch(
      gameCartAdded(item)
    )
    _handleClose()
    setLoading(false)
  }

  const handleImage = () => {
    if (object.id === "11_2") {
      setIngredientTypeId(111)
    }
    if (object.id === "13_2") {
      setIngredientTypeId(113)
    }
  }

  useEffect(() => {
    handleImage()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog scroll="body" open={open} onClose={handleClose} TransitionComponent={Transition} PaperProps={{style: { borderRadius: '32px' }}} >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{width: '302px', height: '626px', borderRadius: '32px'}}
          style={{background: "#DAF3E4"}}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{width: '286px', height: '611px', borderRadius: '32px'}}
            style={{background: "#fff"}}
          >
            <Grid container justifyContent="center" alignItems="center" sx={{px: 3, width: '100%'}} >
              <Grid sx={{borderRadius: '100px', width: '80px', height: '24px', mt: 1}} style={{background: "#DAF3E4"}} />
              <Typography variant="h6" color="primary" fontWeight="500" sx={{mt:1.5}}>
                產銷履歷農產品二維條碼認證追溯服務
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="h5">
                履歷資訊
              </Typography>
              <Typography variant="body2" color="primary" fontWeight="400">
                {object && object.info.number}
              </Typography>
              <List>
                <ListItem sx={{px:0}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: '230px'}}
                  >
                    <Typography variant="body2">
                      產品名稱
                    </Typography>
                    <Typography variant="body1">
                      {object.name}
                    </Typography>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem sx={{px:0}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: '230px'}}
                  >
                    <Typography variant="body2">
                      生產者
                    </Typography>
                    <Typography variant="body1">
                      {object && object.info.farmer}
                    </Typography>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem sx={{px:0}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: '230px'}}
                  >
                    <Typography variant="body2">
                      產地
                    </Typography>
                    <Typography variant="body1">
                      {object && object.info.address}
                    </Typography>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem sx={{px:0}}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{width: '230px'}}
                  >
                    <Typography variant="body2">
                      驗證機構
                    </Typography>
                    <Typography variant="body1">
                      {object && object.info.company}
                    </Typography>
                  </Grid>
                </ListItem>
              </List>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{borderRadius: '0 0 10px 10px', px: 3, py: 2, width: '100%'}} style={{background: "#DAF3E4"}} >
                <Grid container justifyContent="center" alignItems="center" sx={{borderRadius: '30px', px: 1, py: 1.25, width: '230px'}} style={{background: "#e9f8ef"}} onClick={handleClose}>
                  <Typography variant="p3" color="primary" fontWeight="500">
                    關閉
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      <Grid container sx={{pb: 3, px: 1}} direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{background: "#FCD219", minHeight: '100vh'}}
      >
      <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
      >
        <div className={`${header}`} id="header">
          <Typography variant="h5" color="#704E27">
            <a className={`${link}`} onClick={_handleClose}>
                <div className={`${arrow}`}/>返回
            </a>
          </Typography>
        </div>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{px:2, py:4}}
        style={{background: "#ffffff", borderRadius: '32px', }}
      >
        <img src={img[ingredientTypeId]} alt="Badge" width="256px" />
        <Typography variant="h3" color="#2D3748" fontWeight="700" sx={{mb: 2}}>
          {object.name}
        </Typography>
        {
          object.tap ?
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{p:2}}
              style={{background: "#DAF3E4", borderRadius: '32px', }}
            >
              <img src={TabBadgeImg} alt="Badge" width="144px" />
              <Typography variant="h6" color="#143A24" sx={{mt:1}} fontWeight="700">
                咦？包裝上有張貼紙
              </Typography>
              <Typography variant="body2" color="#2C7D4D" sx={{mb:3}}>
              「TAP產銷履歷農產品」的貼紙上會提供農產生產的重要資訊與相關紀錄。
              </Typography>
              <Button variant="secondary2" style={{ width: '65%'}} onClick={handleClickOpen}>
                獲取農產資訊 <QrCodeScannerRoundedIcon sx={{ml: 1, mt: 0.25}} />
              </Button>
            </Grid>
          :
            <></>
        }
        <Grid container direction="row" alignItems="center" justifyContent="center" sx={{ mt:2 }}>
          <ErrorOutlineRoundedIcon style={{ width: '16px' }} />
          <Typography variant="body3" color="#4A5568" fontWeight="700" sx={{ml: 0.5}}>
            同類食材只能加入一項喔
          </Typography>
        </Grid>
        <Button variant="primary" style={{ width: '100%'}} sx={{mt:1}} onClick={AddItemToCart}>
          {loading ?
          (<CircularProgress
            size={24}
            sx={{
            color: theme.palette.primary[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
            }}
          />)
          :
          (
            <>加入購物車 <AddRoundedIcon sx={{ml: 1, mt: 0.25}} /></>
          )}
        </Button>
      </Grid>
    </Grid>
    </div>
  )
}

export default Ingredient