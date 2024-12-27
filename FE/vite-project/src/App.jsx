import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
function App() {
  const [data, setData] = useState([]);
  const [form, setFormData] = useState({});
  useEffect(() => {
    (async () => {
      const res = await (await fetch("http://localhost:3000/user")).json();
      setData(res);
    })();
  }, []);
  const handleDelete = async (id) => {
    const res = await fetch("http://localhost:3000/user/" + id, {
      method: "delete",
    });
    if (res) {
      alert("xóa thành công");
    }
    const delId = data.filter((item) => item.id !== id);
    setData(delId);
  };
  const handleAdd = async () => {
    const res = await fetch("http://localhost:3000/user/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(form),
    });
    console.log(form);
  };
  return (
    <>
      <div>name</div>
      <input
        placeholder="name"
        onChange={(e) =>
          setFormData({
            ...form,
            name: e.target.value,
          })
        }
      />
      <button onClick={() => handleAdd()}>Add</button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">
                    <Link
                      to={`/edit/${item.id}`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                  <td
                    className="px-6 py-4"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
