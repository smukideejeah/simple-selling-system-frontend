import { Button, Form, Input, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from './Auth.hook';

export default function AuthUi() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { Username: string; Password: string }) => {
    await auth?.login(values.Username, values.Password);
    navigate('/');
  };

  return (
    <Card title="Iniciar sesión" style={{ width: 300, margin: 'auto' }}>
      <Form onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input placeholder="Usuario" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Entrar
        </Button>
      </Form>
    </Card>
  );
}
