import React from 'react'
import s from './AuthForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootReducerType } from '../../../../../redux/store'
import { login } from '../../../../../redux/accounts-reducer'
import { AuthAppType } from '../../../../../types/app-types'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import MyTextField from '../../../../common/MyTextField'
import Snackbars from './Snackbars'
import StaticFields from './StaticFields'
import AddButton from './AddButton/AddButton'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

function AuthForm () {
  const codeIsRequired = useSelector((state: RootReducerType) => state.accountsReducer.authWorkflow.codeIsRequired)
  const isSuccessLogin = useSelector((state: RootReducerType) => state.accountsReducer.authWorkflow.isSuccessLogin)
  const dispatch = useDispatch()

  return (
    <Formik
      initialValues={{
        app: 'windows' as AuthAppType,
        login: '',
        password: '',
        code: undefined,
      }}

      validationSchema={yup.object({
        login: yup.string().required('Введите логин'),
        password: yup.string().required('Введите пароль'),
      })}

      onSubmit={(values, { setValues }) => {
        const { app, login, password, code } = values
        // @ts-ignore
        dispatch(login(app, login, password, code)).then(() => {
          setValues({
            app: isSuccessLogin ? 'windows' : app,
            login: isSuccessLogin ? '' : login,
            password: isSuccessLogin ? '' : password,
            code: undefined,
          })
        })
      }}
    >
      <Form>
        <div className={s.col}>
          <StaticFields/>
          {
            codeIsRequired &&
            <MyTextField
              fullWidth
              error
              name="code"
              label="Требуется подтверждение"
              type="text"
              variant="filled"
              helperText="Введите проверочный код отправленный Вам по смс"
            />
          }
          <AddButton/>
          <div className={s.backLink}>
            <Button
              component={NavLink}
              to="/"
              fullWidth
              variant="contained"
              color="primary"
            >
              Вернуться в спамер
            </Button>
          </div>
          <Snackbars/>
        </div>
      </Form>
    </Formik>
  )
}

export default AuthForm
