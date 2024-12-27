import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
      setData(res);
    })()
  }, [])
  const handleDelete = async (id) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: "delete"
    })
    if (res) {
      alert("xóa thành công")
    }
    const delId = data.filter((item) => item.id !== id);
    setData(delId)
  }
  return (
    <>
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
            {
              data && data.map((item, index) => (
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4" onClick={() => handleDelete(item.id)}>
                    Delete
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
