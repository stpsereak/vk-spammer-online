import React from 'react'
import s from './Buttons.module.css'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import ClearIcon from '@material-ui/icons/Clear'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { clearLog } from '../../../../../../redux/spamer-reducer'
import { rootReducerType } from '../../../../../../redux/store'
import Spamer from '../../../../../../utils/Spamer'
import ResumeButton from './ResumeButton'
import PauseButton from './PauseButton'

function Buttons () {
  const buttonWidth = 200
  const spamIsRun = useSelector((state: rootReducerType) => state.spamerReducer.spamOnRun)
  const spamOnPause = useSelector((state: rootReducerType) => state.spamerReducer.spamOnPause)
  const dispatch = useDispatch()

  return (
    <div className={s.buttons}>
      <Box width={buttonWidth}>
        {
          spamIsRun ? (
            spamOnPause ? <ResumeButton/> : <PauseButton/>
          ) : (
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon/>}
            >
              Начать спам
            </Button>
          )
        }
      </Box>

      <Box width={buttonWidth}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<StopIcon/>}
          disabled={!spamIsRun}
          onClick={() => {Spamer.stop('Рассылка прекращена', 'info')}}
        >
          Прервать спам
        </Button>
      </Box>

      <Box width={buttonWidth}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ClearIcon/>}
          onClick={() => {dispatch(clearLog())}}
        >
          Очистить лог
        </Button>
      </Box>
    </div>
  )
}

export default Buttons
