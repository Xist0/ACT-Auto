import { Form, Input, Button } from "antd";
import "../styles/contacts.scss";

const Contacts = () => {
  return (
    <div className="contacts">
      <h2>Свяжитесь с нами</h2>
      <Form>
        <Form.Item name="name">
          <Input placeholder="Ваше имя" />
        </Form.Item>
        <Form.Item name="email">
          <Input placeholder="Ваш email" />
        </Form.Item>
        <Form.Item name="message">
          <Input.TextArea placeholder="Ваше сообщение" />
        </Form.Item>
        <Button type="primary">Отправить</Button>
      </Form>
    </div>
  );
};

export default Contacts;
