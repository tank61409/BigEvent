import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

export interface CategoryForm {
    id?: number;
    categoryName: string;
    categoryAlias: string;
}
interface Props {
    open: boolean;
    loading: boolean;
    record?: CategoryForm
    onOk: (value: CategoryForm) => void;
    onCancel: () => void;
}

function AddCategoryModal(props: Props) {

    const { open, loading, onOk, onCancel, record } = props
    const [form] = Form.useForm()
    useEffect(() => {
        console.log(record)
        if (record) form.setFieldsValue(record)
        else form.resetFields()

    }, [open, record, form])

    const handleVaild = async () => {
        try {
            const values = await form.validateFields();
            onOk(record ? { ...record, ...values } : values)
        } catch (_) {

        }
    }

    return (
        <Modal open={open} title="新增分類" okText="送出" cancelText="取消" confirmLoading={loading} onOk={handleVaild} onCancel={onCancel} destroyOnHidden>
            <Form form={form} layout="vertical" >
                <Form.Item name="categoryName" label="分類名稱" rules={[{ required: true, message: "請輸入分類名稱" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="categoryAlias" label="分類別名" rules={[{ required: true, message: "請輸入分類別名" }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default AddCategoryModal