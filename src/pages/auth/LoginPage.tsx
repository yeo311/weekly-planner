import { Button, Flex, Form, Input, message, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { auth } from '@/shared';

type FieldType = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return signInWithEmailAndPassword(auth, email, password);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: () => {
      message.error('계정과 패스워드를 확인해주세요.');
    },
  });

  const onFinish = ({ email, password }: FieldType) => {
    if (!email || !password) return;
    mutate({ email, password });
  };

  return (
    <Flex vertical align="center" justify="center" style={{ height: '100vh' }}>
      <Typography.Title level={2}>WEEKLY PLANNER</Typography.Title>
      <Flex vertical style={{ width: '600px', marginTop: '20px' }}>
        <Form<FieldType>
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={isPending}>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>
  );
}
