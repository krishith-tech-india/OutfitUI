import { Form, Input, Select } from "antd";
import { useUserExistByEmailMutation, useUserExistByPhNoMutation } from "@src/redux/reducers/api/User";
import { useGetAllRolesMutation } from "@src/redux/reducers/api/Roles";
import { useEffect, useState } from "react";
import { IRoles } from "@src/interface/Roles/Roles";

function AddUser({ addform }) {
  const [EmailExist] = useUserExistByEmailMutation();
  const [PhNoExist] = useUserExistByPhNoMutation();
  const [getRoles] = useGetAllRolesMutation();
  const [roleData, setRoleData] = useState<IRoles[]>([]);

  const getRolesasync = async () => {
    try {
      const RolesData = await getRoles().unwrap();
      setRoleData(RolesData.data);
      console.log(RolesData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRolesasync();
  }, []);

  return (
    <>
      <Form form={addform} layout="vertical">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please Enter Your Name" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please Enter Your Email" },
            () => ({
              async validator(_, value) {
                try {
                  const result = await EmailExist(value).unwrap();
                  if (result.data === false) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("The Email is Alredy Exist!!");
                  }
                } catch (err) {
                  return Promise.reject("The Email is Alredy Exist!!");
                }
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phNo"
          label="Phone-No"
          rules={[
            { required: true, message: "Please Enter Your Phone-No" },
            () => ({
              async validator(_, value) {
                try {
                  const result = await PhNoExist(value).unwrap();
                  if (result.data === false) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("The Phone-No is Alredy Exist!!");
                  }
                } catch (err) {
                  return Promise.reject("The Phone-No is Alredy Exist!!");
                }
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="roleId" label="RoleId" rules={[{ required: true, message: "Please Select Any one Role" }]}>
          <Select defaultValue="Select any one Role">
            {roleData?.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddUser;
