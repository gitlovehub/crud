import React from "react";
import { useParams } from "react-router-dom";
const Edit = () => {
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    (async () => {
      const res = await (
        await fetch("http://localhost:3000/user/" + id)
      ).json();
      setData(res);
    })();
  }, []);
  return (
    <div>
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
      <button onClick={() => handleAdd()}>Edit</button>
    </div>
  );
};

export default Edit;
