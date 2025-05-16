import React from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input } from 'antd'

const Auth = () => {
  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center'>
      <div className='bg-[#1E1E1E] p-10 rounded-xl'>
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#1f1f1f',
              colorText: 'rgba(255, 255, 255, 0.85)',
              colorBorder: '#434343',
              colorPrimary: '#000',
              colorTextPlaceholder: 'rgba(255, 255, 255, 0.3)',
            },
            components: {
              Form: {
                labelColor: 'rgba(255, 255, 255, 0.85)',
              },
              Input: {
                colorIcon: '#ffffff',
                colorIconHover: '#ffffff',
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
            },
          }}
        >
          <Form>
            <Form.Item label='Логин'>
              <Input />
            </Form.Item>

            <Form.Item label='Пароль'>
              <Input.Password
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' block>
                Войти
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default Auth
