import { Button, Form, Input, Card, Alert } from 'antd';
import useAuth from '../../providers/auth/Auth.hook';
import { useNavigate } from 'react-router';

export default function AuthUi() {
  const {login, error} = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: { Username: string; Password: string }) => {
    await login(values.Username, values.Password);
    navigate('/');
  };

  return (
    <Card title="Iniciar sesión" style={{ width: 300, margin: 'auto', marginTop: '100px' }}>
      {error && <Alert title={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
      <Form onFinish={onFinish}>
        <Form.Item label="Usuario" name="Username" rules={[{ required: true, message: 'Por favor, ingrese su usuario' }]}>
          <Input placeholder="Usuario" />
        </Form.Item>

        <Form.Item label="Contraseña" name="Password" rules={[{ required: true, message: 'Por favor, ingrese su contraseña' }]}>
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Entrar
        </Button>
      </Form>
    </Card>
  );
}
