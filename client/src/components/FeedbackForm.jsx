import { Form, Input, Button } from "antd";

const FeedbackForm = () => {
  const onFinish = (values) => {
    console.log("Форма отправлена:", values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="name" rules={[{ required: true, message: "Введите имя" }]}>
        <Input placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item name="phone" rules={[{ required: true, message: "Введите телефон" }]}>
        <Input placeholder="Телефон" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Отправить</Button>
    </Form>
  );
};

export default FeedbackForm;
