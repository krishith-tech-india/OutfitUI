import { Form, Input } from "antd";

function AddRoleForm({ addRoleForm }) {
  return (
    <>
      <Form form={addRoleForm} layout="vertical">
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

export default AddRoleForm;
