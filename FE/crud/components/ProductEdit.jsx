import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, message, Skeleton } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductAdd = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ["products, id"],
    queryFn: async () => {
      const responsive = await axios.get(
        `http://localhost:3000/products/${id}`
      );
      return responsive.data;
    },
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      console.log("test", data);
    }
  }, [data]);
  const { mutate, isPending } = useMutation({
    mutationFn: async (product) => {
      await axios.put(`http://localhost:3000/products/${id}`, product);
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Update sản phẩm thành công",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      setTimeout(() => {
        nav(`/admin`);
      }, 2000);
    },
    onError: (errors) => {
      messageApi.open({
        type: "error",
        content: "Update sản phẩm thất bại" + errors.message,
      });
    },
  });
  const onFinish = (values) => {
    mutate({ ...values });
  };

  if (isLoading) return <Skeleton active />;
  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        disabled={isPending}
        onFinish={onFinish}
        initialValues={data}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Trường này là bắt buộc " },
            { min: 3, message: "Không dưới 3 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true, message: "Trường này là bắt buộc " },
            { type: "number", min: 0, message: "Không nhập giá trị âm" },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button variant="solid" color="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProductAdd;
