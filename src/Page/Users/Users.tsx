import { useGetAllImageTypeMutation } from "@src/redux/reducers/api/ImageType";
import { useEffect, useState } from "react";
import { Spin } from "antd";

function Users() {
  const [data, setData] = useState<any[]>([]);
  const [ImageTypeApi, { isLoading }] = useGetAllImageTypeMutation();
  const getUserAsync = async () => {
    try {
      //const response = await ImageTypeApi().unwrap();
      // setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserAsync();
  }, []);

  return (
    <>
      <div>
        {data.length > 0 ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{JSON.stringify(item)}</li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center h-[700px]">
            <Spin size="large" />
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
