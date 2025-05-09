//import { useGetAllImageTypeMutation } from "@src/redux/reducers/api/ImageType";
import { useEffect, useState } from "react";

function Users() {
  const [data] = useState<any[]>([]);
  // const [ImageTypeApi, { isLoading }] = useGetAllImageTypeMutation();
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
  }, [data]);

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
          <div className="flex justify-center items-center mt-50">
            <p>No Data Available to Show!!!!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
