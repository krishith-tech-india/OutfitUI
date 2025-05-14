import { EditableColumnTypeUser, IUser } from "@src/interface/User/User";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetAllUserMutation,
  useUpdateUserMutation,
} from "@src/redux/reducers/api/User";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import { useEffect, useMemo, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import AddUser from "./AddUser";

function Users() {
  const [data, setData] = useState<IUser[]>([]);
  const [Users] = useGetAllUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingkey, setEditingKey] = useState<string>("");
  const isEditing = (Record: IUser) => Record.id.toString() === editingkey;
  const [form] = Form.useForm();
  const [addform] = Form.useForm();
  const [DeleteUser] = useDeleteUserMutation();
  const [UpdateUser] = useUpdateUserMutation();
  const [AddUSer] = useAddUserMutation();

  const nameFilters = useMemo(() => {
    const uniqueNames = Array.from(new Set(data.map((item) => item.name)));
    return uniqueNames.map((name) => ({
      text: name,
      value: name,
    }));
  }, [data]);

  const emailFilters = useMemo(() => {
    const uniqueEmail = Array.from(new Set(data.map((item) => item.email)));
    return uniqueEmail.map((email) => ({
      text: email,
      value: email,
    }));
  }, [data]);

  const PhNoFilters = useMemo(() => {
    const uniquePhNo = Array.from(new Set(data.map((item) => item.phNo)));
    return uniquePhNo.map((phNo) => ({
      text: phNo,
      value: phNo,
    }));
  }, [data]);

  const handleAdd = async (User: IUser) => {
    try {
      console.log(User);
      await AddUSer(User).unwrap();
      setIsModalOpen(false);
      addform.resetFields();
      await getUserAsync();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      await DeleteUser(id).unwrap();
      setData((prev) => prev.filter((item) => item.id.toString() !== id));
      getUserAsync();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const edit = (record: IUser) => {
    form.setFieldsValue({ name: "", email: "", phNo: "", roleId: 1, ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleUpdate = async (id: string) => {
    try {
      const row = (await form.validateFields()) as IUser;
      console.log(row);

      const newData = [...data];
      //console.log(newData);
      const index = newData.findIndex((item) => item.id.toString() === id);
      if (index > -1) {
        const item = { ...newData[index], ...row };
        await UpdateUser({ id, data: item }).unwrap();
        getUserAsync();
        setEditingKey("");
      }
    } catch (err: any) {
      console.error("Update failed:", err);
    }
  };

  const getUserAsync = async () => {
    try {
      const response = await Users().unwrap();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserAsync();
  }, []);

  const EditableCell: React.FC<any> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[{ required: true, message: `Please Input ${title}!` }]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns: EditableColumnTypeUser[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: nameFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.name === value,
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filters: emailFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.email === value,
      width: "20%",
      editable: true,
    },
    {
      title: "Phone-No",
      dataIndex: "phNo",
      key: "phNo",
      filters: PhNoFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.phNo === value,
      width: "20%",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => handleUpdate(record.id.toString())} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className="lg:flex justify-start items-center  sm:block ">
            <div className="text-blue-400 cursor-pointer mx-3">
              <EditFilled onClick={() => edit(record)} />
            </div>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id.toString())}>
              <div className="text-red-400 cursor-pointer mx-3">
                <DeleteFilled />
              </div>
            </Popconfirm>
          </div>
        );
      },
      width: "10%",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!(col as any).editable) return col;
    return {
      ...col,
      onCell: (record: IUser) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          color: "chocolate",
          backgroundColor: "transparent",
          marginLeft: "-35px",
        }}
      >
        <div className=" text-4xl font-bold ">Users</div>
      </Header>
      <div className="m-5 flex justify-end items-center ">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "gray", color: "white" }}
          variant="solid"
        >
          Add User
        </Button>
      </div>
      <Modal
        title="Add User"
        visible={isModalOpen}
        onOk={async () => handleAdd((await addform.validateFields()) as IUser)}
        onCancel={() => setIsModalOpen(false)}
      >
        <AddUser addform={addform} />
      </Modal>
      <div>
        {data.length > 0 ? (
          <>
            <Form form={form} component={false}>
              <Table<IUser>
                rowKey="id"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns as any}
                rowClassName="editable-row"
                pagination={false}
                size="large"
              />
            </Form>
          </>
        ) : (
          <div className="flex justify-center items-center mt-50">
            <p>No Data Available to Show!!!!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
