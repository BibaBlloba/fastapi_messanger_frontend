import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Input, notification, Tabs } from 'antd'
import axios from 'axios'
import { useUser } from '../context/UserContext'

const Auth = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [api, contextHolder] = notification.useNotification({
    threshold: 1,
    maxCount: 1,
  });
  const { user, isAuthenticated, login, logout, register } = useUser();

  if (isAuthenticated) {
    window.location.href = '/home'
  }

  const openNotificationError = message => {
    api.error({
      message: message,
      showProgress: true,
      pauseOnHover: false,
      placement: 'top',
      duration: 3,
    });
  };

  const openNotificationSuccess = message => {
    api.success({
      message: message,
      showProgress: true,
      pauseOnHover: false,
      placement: 'top',
      duration: 3,
    });
  };

  const registerFinish = async (values) => {
    try {
      const register_status = await register({
        username: values.login,
        password: values.password
      });

      if (register_status.success === false) {
        openNotificationError('Пользователь уже существует');
      } else {
        openNotificationSuccess('Регистрация прошла успешно!');
      }
    } catch (error) {
      openNotificationError('Ошибка при регистрации');
    }
  }

  const loginFinish = async (values) => {
    try {
      const login_status = await login({ username: values.login, password: values.password })
      console.log(login_status.data.success)
    } catch (error) {
      console.log(error)
      openNotificationError('Неверный логин ли пароль')
    }
  }

  const LoginForm = () => {
    return (
      <Form onFinish={loginFinish}>
        <Form.Item label='Логин' name='login' rules={[{ required: true }]}>
          <Input placeholder='login' />
        </Form.Item>

        <Form.Item label='Пароль' name='password' rules={[{ required: true }]}>
          <Input.Password
            placeholder="password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const RegisterForm = () => {
    return (
      <Form onFinish={registerFinish}>
        <Form.Item label='Логин' name='login' rules={[{ required: true }]}>
          <Input
            placeholder="login"
          />
        </Form.Item>

        <Form.Item label='Пароль' name='password' rules={[{ required: true }]}>
          <Input.Password
            placeholder="password"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' block>
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    )
  }

  const tabs_items = [
    {
      key: '1',
      label: 'Логин',
      children: <LoginForm />
    },
    {
      key: '2',
      label: 'Регистрация',
      children: <RegisterForm />
    }
  ]

  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center'>
      <div className='bg-[#1E1E1E] p-10 rounded-xl shadow-xl'>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#1f1f1f',
              colorBorder: '#434343',
              colorPrimary: '#000',
              colorTextPlaceholder: 'rgba(255, 255, 255, 0.3)',
            },
            components: {
              Notification: {
                colorPrimary: '#5a189a',
                colorBgElevated: '#383838', // Фон уведомления
                colorText: '#fff', // Цвет текста
                colorTextHeading: '#fff', // Цвет заголовка
                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.24)',
              },
              Form: {
                labelColor: 'rgba(255, 255, 255, 0.85)',
              },
              Input: {
                colorIcon: '#ffffff',
                colorIconHover: '#ffffff',
                colorText: 'rgba(255, 255, 255, 0.85)',
                activeBorderColor: '#5a189a',
                hoverBorderColor: '#5a189a',
              },
              Button: {
                colorPrimary: '#fff',       // Основной цвет
                colorPrimaryHover: '#5a189a',  // Цвет при наведении
                colorPrimaryActive: '#7b2cbf', // Цвет при нажатии
                colorText: '#ffffff',
                borderRadius: 4,
              },
              Tabs: {
                // Основные настройки
                colorPrimary: '#5a189a', // Активный цвет
                itemColor: '#fff', // Цвет неактивных вкладок
                itemSelectedColor: '#5a189a', // Цвет активной вкладки
                itemHoverColor: '#5a189a', // Цвет при наведении
                inkBarColor: '#5a189a', // Цвет индикатора
                titleFontSize: 16, // Размер шрифта
                horizontalMargin: '0 0 24px 0', // Отступы
                horizontalItemGutter: 32, // Расстояние между вкладками
                horizontalItemPadding: '12px 16px', // Отступы внутри вкладки

                // Для темной темы
                itemBg: '#1f1f1f', // Фон вкладок
                cardBg: '#141414', // Фон контента
                cardPadding: '12px', // Отступы контента
              },
            },
          }}
        >
          {contextHolder}
          <Tabs defaultActiveKey='1' items={tabs_items} centered />
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Auth
