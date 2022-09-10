import React from 'react'
import { useEffect, useState } from 'react';
import { getComments } from '../Utils/Axios';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import pepper from '../Images/IngredientType/甜椒.png'
import bunaShimeji from '../Images/IngredientType/鴻喜菇.png'
import spinach from '../Images/IngredientType/菠菜.png'
import roundEffPlant from '../Images/IngredientType/圓茄子.png'

import woodMedal from '../Images/MedalSmall/Wood.png'
import stoneMedal from '../Images/MedalSmall/Stone.png'
import copperMedal from '../Images/MedalSmall/Copper.png'
import silverMedal from '../Images/MedalSmall/Silver.png'
import goldMedal from '../Images/MedalSmall/Gold.png'

const imgs = {
  0: spinach,
  1: pepper,
  2: bunaShimeji,
  3: roundEffPlant,
}

const medals = {
  0: woodMedal,
  1: stoneMedal,
  2: copperMedal,
  3: silverMedal,
  4: goldMedal,
}

const Comment = ({nickname, profilePhoto, content, score}) => {
  const [img, setImg] = useState(0)
  const [title, setTitle] = useState("人人餵我")
  const [level, setLevel] = useState(0)

  const init = () => {
    if (score > 20 && score <= 40) {
      setTitle("新世紀料理苦手")
      setLevel(1)
    } else if (score > 40 && score <= 60) {
      setTitle("大當鋪，小當家")
      setLevel(2)
    } else if (score > 60 && score <= 80) {
      setTitle("伙力全開")
      setLevel(3)
    } else if (score > 80 && score <= 100) {
      setTitle("天才大主廚")
      setLevel(4)
    }
    switch(profilePhoto){
      case '0':
        setImg(0)
        break
      case '1':
        setImg(1)
        break
      case '2':
        setImg(2)
        break
      case '3':
        setImg(3)
        break
      default:
        setImg(0)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{mb: 1.5}}
      >
        <Grid
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{mr:1.5}}
        >
          <Grid
            style={{width: "24px", height: "24px", background:"#fff", borderRadius: '40px', }}
          >
            {<img src={imgs[img]} alt="" width="24px" />}
          </Grid>
        </Grid>
        <Grid
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{width: "328px", background:"transparent"}}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{pb: 0.5}}
            style={{background:"transparent"}}
          >
            <Typography variant="body2" color="#4C3F08" fontWeight="700">
              {nickname} • 
            </Typography>
            {<img src={medals[level]} alt="" width="24px" />}
            <Typography variant="body2" color="#4C3F08" fontWeight="500" noWrap>
              {score} 分
            </Typography>
          </Grid>
          <Grid
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{background:"#FEF6D1", borderRadius: "4px 16px 16px 16px"}}
            sx={{pt:1, px: 1.5, pb:1}}
          >
            <Typography variant="body1" color="#4C3F08" fontWeight="400">
              {content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Comment