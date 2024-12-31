import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Skeleton, Space, Table } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Products = () => {
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const responsive = await axios.get(`http://localhost:3000/products`);
      return responsive.data.map((product, index) => ({
        key: product.id,
        id: index + 1,
        ...product,
      }));
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const responsive = await axios.delete(
        `http://localhost:3000/products/${id}`
      );
      return responsive.data;
    },
    onSuccess: () => {
      messageApi.success("Xóa sản phẩm thành công");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error) => {
      messageApi.error("Xóa sản phẩm thất bại!" + error.message);
    },
  });

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Image", dataIndex: "imageUrl", key: "imageUrl" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      key: "Action",
      render: (_, item) => (
        <div className="w-20">
          <Space width="150">
            <Popconfirm
              title="Xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa không!"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleRemove(item.id)}
            >
              <Button variant="solid" color="danger">
                Delete
              </Button>
            </Popconfirm>
            <Link to={`/admin/products/edit/${item.id}`}>
              <Button variant="solid" color="primary">
                Update
              </Button>
            </Link>
          </Space>
        </div>
      ),
    },
  ];

  const handleRemove = (id) => {
    mutate(id);
  };
  const onClick = () => {
    nav(`/admin/products/add`);
  };
  if (isLoading) return <Skeleton active />;
  return (
    <>
      {contextHolder}
      <h1 className="mb-3">Danh sách sản phẩm </h1>
      <Button
        variant="solid"
        color="primary"
        className="mb-3"
        onClick={onClick}
      >
        Thêm sản phẩm
      </Button>
      <Table columns={columns} dataSource={data}></Table>
    </>
  );
};

export default Products;
