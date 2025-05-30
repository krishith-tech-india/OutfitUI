import { useEffect, useMemo, useState } from "react";
import {
  useAddImageTypeMutation,
  useGetAllImageTypeMutation,
  useDeleteImageTypeMutation,
  useUpdateImageTypeMutation,
  useImageTypeExistByNameMutation,
} from "@src/redux/reducers/api/ImageType";
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { EditableColumnType, IImageType } from "@src/interface/ImageType/ImageType";
import { Header } from "antd/es/layout/layout";
import { Pagination } from "antd";
import AddImageType from "./AddImageType";

function ImageType() {
  const [deleteImageType] = useDeleteImageTypeMutation();
  const [imagetype, setImageType] = useState<IImageType[]>([]);
  const [ImageTypeApi] = useGetAllImageTypeMutation();
  const [updateImageType] = useUpdateImageTypeMutation();
  const [editingkey, setEditingKey] = useState<string>("");
  const [form] = Form.useForm();
  const isEditing = (Record: IImageType) => Record.id.toString() === editingkey;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addImageType] = useAddImageTypeMutation();
  const [AddImageTypeForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return imagetype.slice(startIndex, startIndex + pageSize);
  }, [imagetype, currentPage]);

  const nameFilters = useMemo(() => {
    const uniqueNames = Array.from(new Set(imagetype.map((item) => item.name)));
    return uniqueNames.map((name) => ({
      text: name,
      value: name,
    }));
  }, [imagetype]);

  const descriptionFilters = useMemo(() => {
    const uniqueDescriptions = Array.from(new Set(imagetype.map((item) => item.description)));
    return uniqueDescriptions.map((desc) => ({ text: desc, value: desc }));
  }, [imagetype]);

  const handleDelete = async (id: string) => {
    try {
      await deleteImageType(id).unwrap();
      setImageType((prev) => prev.filter((item) => item.id.toString() !== id));
      getImageTypeAsync();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const edit = (record: IImageType) => {
    form.setFieldsValue({ name: "", description: "", ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleUpdate = async (id: string) => {
    try {
      const row = (await form.validateFields()) as IImageType;
      const newData = [...imagetype];
      const index = newData.findIndex((item) => item.id.toString() === id);

      if (index > -1) {
        const item = newData[index];
        await updateImageType({ id, data: row }).unwrap();
        newData.splice(index, 1, { ...item, ...row });
        setEditingKey("");
        getImageTypeAsync();
      }
    } catch (err: any) {
      console.error("Update failed:", err);
    }
  };

  const handleAdd = async () => {
    try {
      const values = await AddImageTypeForm.validateFields();
      await addImageType(values).unwrap();
      setIsModalOpen(false);
      AddImageTypeForm.resetFields();
      getImageTypeAsync(); // Refresh data
    } catch (error) {
      console.error("Add failed:", error);
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
      filters: nameFilters, // 🔹 Use dynamic filters here
      filterMode: "tree",
      onFilter: (value, record) => record.name === value,
      editable: true,
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      editable: true,
      filters: descriptionFilters,
      filterMode: "tree",
      onFilter: (value, record) => record.description === value,
      width: "40%",
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
      width: "15%",
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!(col as any).editable) return col;
    return {
      ...col,
      onCell: (record: IImageType) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const getImageTypeAsync = async () => {
    try {
      const response = await ImageTypeApi().unwrap();
      setImageType(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImageTypeAsync();
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
        <div className=" text-4xl font-bold ">Image Type</div>
      </Header>
      <div className="m-5 flex justify-end items-center ">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          style={{ backgroundColor: "gray", color: "white" }}
          variant="solid"
        >
          Add Image Type
        </Button>
      </div>

      <Modal title="Add Image Type" visible={isModalOpen} onOk={handleAdd} onCancel={() => setIsModalOpen(false)}>
        <AddImageType addImagetypeForm={AddImageTypeForm} />
      </Modal>

      <div>
        {imagetype.length > 0 ? (
          <>
            <Form form={form} component={false}>
              <Table<IImageType>
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={paginatedData}
                columns={mergedColumns as any}
                rowClassName="editable-row"
                pagination={false}
                size="large"
              />
              <Pagination
                align="end"
                current={currentPage}
                pageSize={pageSize}
                total={imagetype.length}
                onChange={(page) => setCurrentPage(page)}
                style={{ textAlign: "right", marginTop: 16 }}
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

export default ImageType;
