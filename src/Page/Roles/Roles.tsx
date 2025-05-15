import { EditableColumnType, IRoles } from "@src/interface/Roles/Roles";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetAllRolesMutation,
  useUpdateRoleMutation,
} from "@src/redux/reducers/api/Roles";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import AddRoleForm from "./AddRoleForm";

function Roles() {
  const [roleData, setroleData] = useState<IRoles[]>([]);
  const [roleForm] = Form.useForm();
  const [addRoleForm] = Form.useForm();
  const [getRoles] = useGetAllRolesMutation();
  const [deleteRole] = useDeleteRoleMutation();
  const [updateRole] = useUpdateRoleMutation();
  const [addRole] = useAddRoleMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingkey, setEditingKey] = useState<string>("");
  const isEditing = (Record: IRoles) => Record.id.toString() === editingkey;

  const NameFilters = useMemo(() => {
    const uniqueNames = Array.from(new Set(roleData.map((item) => item.name)));
    return uniqueNames.map((name) => ({
      text: name,
      value: name,
    }));
  }, [roleData]);

  const descriptionFilters = useMemo(() => {
    const uniqueDescriptions = Array.from(new Set(roleData.map((item) => item.description)));
    return uniqueDescriptions.map((desc) => ({ text: desc, value: desc }));
  }, [roleData]);

  const getRolesAnsyc = async () => {
    try {
      const rolesResponse = await getRoles().unwrap();
      setroleData(rolesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const values = await addRoleForm.validateFields();
      await addRole(values).unwrap();
      setIsModalOpen(false);
      addRoleForm.resetFields();
      getRolesAnsyc(); // Refresh data
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRole(id).unwrap();
      setroleData((prev) => prev.filter((item) => item.id.toString() !== id));
      getRolesAnsyc();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const edit = (record: IRoles) => {
    roleForm.setFieldsValue({ name: "", description: "", ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleUpdate = async (id: string) => {
    try {
      const row = (await roleForm.validateFields()) as IRoles;
      const newData = [...roleData];
      const index = newData.findIndex((item) => item.id.toString() === id);

      if (index > -1) {
        const item = newData[index];
        await updateRole({ id, data: row }).unwrap();
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        getRolesAnsyc();
      }
    } catch (err: any) {
      console.error("Update failed:", err);
    }
  };

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
  const columns: EditableColumnType[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: NameFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.name === value,
      width: "30%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      filters: descriptionFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.description === value,
      width: "30%",
      editable: true,
    },
    {
      title: "Action",
      width: "10%",
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
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!(col as any).editable) return col;
    return {
      ...col,
      onCell: (record: IRoles) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    getRolesAnsyc();
  }, []);

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
        <div className=" text-4xl font-bold ">User Roles</div>
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
      <Modal title="Add Image Type" visible={isModalOpen} onOk={handleAdd} onCancel={() => setIsModalOpen(false)}>
        <AddRoleForm addRoleForm={addRoleForm} />
      </Modal>
      <div>
        {roleData.length > 0 ? (
          <>
            <Form form={roleForm} component={false}>
              <Table<IRoles>
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                rowKey="id"
                bordered
                dataSource={roleData}
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

export default Roles;
