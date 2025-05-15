import { useImageTypeExistByNameMutation } from "@src/redux/reducers/api/ImageType";
import { Form, Input } from "antd";

function AddImageType({ addImagetypeForm }) {
  const [NameExist] = useImageTypeExistByNameMutation();

  return (
    <>
      <Form form={addImagetypeForm} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter name" },
            () => ({
              async validator(_, value) {
                try {
                  const result = await NameExist(value).unwrap();
                  if (result.data === false) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("The Name is Alredy Exist!!");
                  }
                } catch (err) {
                  return Promise.reject("The Name is Alredy Exist!!");
                }
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
}
export default AddImageType;
