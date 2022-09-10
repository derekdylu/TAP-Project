import React from 'react'
import Navigation from "../Components/Navigation";
import { useEffect, useState } from 'react';
import { getComments } from '../Utils/Axios';
import { css } from "@emotion/css";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Comment from '../Components/Comment'
import Stack from '@mui/material/Stack';

const Feeds = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('')
  // highest, lowest, latest

  const handleFilter = (newValue) => {
    setFilter(newValue)
    sortComments(newValue)
  }

  const fetchComments = async() => {
    const fetchedComments = await getComments()
    setComments(fetchedComments)
  }

  const sortComments = (rule) => {
    if (rule === "排名最高") {
      const _comments = comments.sort((a,b) => b.score - a.score);
      setComments(_comments)
      return
    }
    if (rule === "排名最低") {
      const _comments = comments.sort((a,b) => a.score - b.score);
      setComments(_comments)
      return
    }
    // if (rule === "最新") {
      
    // }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div>
      <Navigation />
      <Grid
        container sx={{pb: 19}}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        style={{background: "#FCD219",}}
      >
        <Grid
          container
          sx={{mt:13, pl:3}}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          style={{}}
        >
          <Typography variant="h1" color="#4a341a">
            留言板
          </Typography>
          <Typography variant="body1" color="#704E27">
            在這裡可以看到大家的發言與得分
          </Typography>
          <Stack direction="row" spacing={1} sx={{mt:1.5}}>
            <Chip label="排名最高" style={{background: filter === "排名最高" ? "#FEF6D1" : "#FDE475"}} onClick={() => handleFilter("排名最高")} />
            <Chip label="排名最低" style={{background: filter === "排名最低" ? "#FEF6D1" : "#FDE475"}} onClick={() => handleFilter("排名最低")} />
            <Chip label="最新" style={{background: filter === "最新" ? "#FEF6D1" : "#FDE475"}} onClick={() => handleFilter("最新")} />
          </Stack>
        </Grid>
      
        <Grid
            container sx={{mt:2.5}}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            style={{}}
        >
          {comments.map(c => 
            <Comment nickname={c.nickname} profilePhoto={c.profile_photo} content={c.content} score={c.score} />
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Feeds