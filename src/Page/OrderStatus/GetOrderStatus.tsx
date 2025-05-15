import { EditableColumnTypeOrder, IOrderStatus } from "@src/interface/OrderStatus/OrderStatus";
import {
  useAddOrderStatusMutation,
  useDeleteOrderStatusMutation,
  useGetAllOrderStatusMutation,
  useUpdateOrderStatusMutation,
} from "@src/redux/reducers/api/OrderStatus";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import AddOrderStatusForm from "./AddOrderStatusForm";

function GetOrderStatus() {
  const [OrderData, setOrderData] = useState<IOrderStatus[]>([]);
  const [getOrderStatus] = useGetAllOrderStatusMutation();
  const [addOrderStatus] = useAddOrderStatusMutation();
  const [DeleteOrderStatus] = useDeleteOrderStatusMutation();
  const [UpdateOrderstatus] = useUpdateOrderStatusMutation();
  const [orderForm] = Form.useForm();
  const [addOrderForm] = Form.useForm();
  const [editingkey, setEditingKey] = useState<string>("");
  const isEditing = (Record: IOrderStatus) => Record.id.toString() === editingkey;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOrderStatusAnsyc = async () => {
    try {
      const rolesResponse = await getOrderStatus().unwrap();
      setOrderData(rolesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      const values = await addOrderForm.validateFields();
      await addOrderStatus(values).unwrap();
      setIsModalOpen(false);
      addOrderForm.resetFields();
      getOrderStatusAnsyc(); // Refresh data
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await DeleteOrderStatus(id).unwrap();
      setOrderData((prev) => prev.filter((item) => item.id.toString() !== id));
      getOrderStatusAnsyc();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  const edit = (record: IOrderStatus) => {
    orderForm.setFieldsValue({ name: "", description: "", ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleUpdate = async (id: string) => {
    try {
      const row = (await orderForm.validateFields()) as IOrderStatus;
      const newData = [...OrderData];
      const index = newData.findIndex((item) => item.id.toString() === id);

      if (index > -1) {
        const item = newData[index];
        await UpdateOrderstatus({ id, data: row }).unwrap();
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        getOrderStatusAnsyc();
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

  const columns: EditableColumnTypeOrder[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      onCell: (record: IOrderStatus) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  useEffect(() => {
    getOrderStatusAnsyc();
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
        <div className=" text-4xl font-bold ">Order Status List</div>
      </Header>
      <div className="m-5 flex justify-end items-center ">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "gray", color: "white" }}
          variant="solid"
        >
          Add Oder Status
        </Button>
      </div>
      <Modal title="Add Image Type" visible={isModalOpen} onOk={handleAdd} onCancel={() => setIsModalOpen(false)}>
        <AddOrderStatusForm addOrderStatusForm={addOrderForm} />
      </Modal>
      <div>
        {OrderData.length > 0 ? (
          <>
            <Form form={orderForm} component={false}>
              <Table<IOrderStatus>
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                rowKey="id"
                bordered
                dataSource={OrderData}
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

export default GetOrderStatus;
