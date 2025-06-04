import { Form, Input, Modal } from "antd";
import { useEffect } from "react";

interface Props {
    open: boolean;
    loading: boolean;
    onOk: (value: { categoryName: string; categoryAlias: string; }) => void;
    onCancel: () => void;
}

function AddCategoryModal(props: Props) {
    const { open, loading, onOk, onCancel } = props
    const [form] = Form.useForm()
    useEffect(() => {
        if (open) form.resetFields()
    }, [open, form])

    const handleVaild = async () => {
        try{
            const values = await form.validateFields();
            onOk(values)
        }catch(_){
            
        }
    }

    return(
        <Modal open={open} title="新增分類" okText="送出" cancelText="取消" confirmLoading={loading} onOk={handleVaild} onCancel={onCancel} destroyOnHidden>
            <Form form={form} layout="vertical" >
                <Form.Item name="categoryName" label="分類名稱" rules={[{required: true,message:"請輸入分類名稱"}]}>
                    <Input/>
                </Form.Item>

                <Form.Item name="categoryAlias" label="分類別名" rules={[{required: true,message:"請輸入分類別名"}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    )
} 
export default AddCategoryModal