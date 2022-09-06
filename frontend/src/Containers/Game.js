import React, {useEffect} from 'react'
import Navigation from '../Components/Navigation'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPages, pageChanged } from '../Features/PagesSlice'

import StartPage from '../Components/StartPage'
import Story from '../Components/Story'
import Menu from '../Components/Menu'
import Requirement from '../Components/Requirement'
import Tutorial from '../Components/Tutorial'
import Market from '../Components/Market'
import Cart from '../Components/Cart'
import Score from './Score'

const Game = () => {
  const dispatch = useDispatch()
  const pages = useSelector(selectAllPages)
  let component;

  function handlePageNext(e) {
    console.log("next")
    e.preventDefault()
    dispatch(
      pageChanged(1)
    )
  }

  function handlePageBack(e) {
    console.log("back")
    e.preventDefault()
    dispatch(
      pageChanged(-1)
    )
  }
  
  switch(pages[0].pageIndex){
    case 0:
      component = <StartPage />
      break
    case 1:
      component = <Story id={1}/> // Story1
      break
    case 2:
      component = <Menu type="main"/> // Menu1
      break
    case 3:
      component = <Menu type="side"/> // Menu2
      break
    case 4:
      component = <Story id={2}/> // Story2
      break
    case 5:
      component = <Requirement />
      break
    case 6:
      component = <Tutorial />
      break
    case 7:
      component = <Market />
      break
    case 8:
      component = <Score /> // Score
      break
    case 1000:
      component = <Cart />
      break
    default:
      component = <div>default</div>
      break;
  }

  return (
    <>
      {/* {/* <Navigation /> */}
      {/* <div>{pages[0].pageIndex}</div> */}
      {/* <button onClick={handlePageBack}>back</button> */}
      {/* <button onClick={handlePageNext}>next</button> */}
      {component}
    </>
  )
}

export default Game