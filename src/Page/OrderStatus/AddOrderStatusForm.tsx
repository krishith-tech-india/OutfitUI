import { Form, Input } from "antd";

function AddOrderStatusForm({ addOrderStatusForm }) {
  return (
    <>
      <Form form={addOrderStatusForm} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please Enter Your Name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please Enter Your description" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}

export default AddOrderStatusForm;
