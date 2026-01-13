import React, { useState, useEffect } from "react";
import { Button, Card, Form, Input, List, Upload, message, Image, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/lib/upload";
import http from "../utils/axiosUtils";

const { TextArea } = Input;

type Comment = {
  id: number;
  text: string;
};

type PostItem = {
  id: number;
  text: string;
  image?: string; // base64
  comments: Comment[];
};

function getBase64(file: RcFile): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

const Post: React.FC = () => {
  const [form] = Form.useForm();
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [uploadingFile, setUploadingFile] = useState<RcFile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 取得後端貼文列表，若失敗則保留本地空列表
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const resp = await http.post('/article/list', {});
        if (resp?.data?.code === 1 && Array.isArray(resp.data.data)) {
          // 假設後端回傳陣列格式，每項至少包含 id,text,image,comments
          const serverPosts: PostItem[] = resp.data.data.map((p: any) => ({
            id: p.id || Date.now(),
            text: p.text || p.content || '',
            image: p.image || p.imageUrl || undefined,
            comments: Array.isArray(p.comments) ? p.comments.map((c: any) => ({ id: c.id || Date.now(), text: c.text || c })) : []
          }));
          setPosts(serverPosts);
        }
      } catch (e) {
        console.error('fetch posts failed', e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const onFinish = async (values: any) => {
    // 優先嘗試上傳到後端（使用 FormData），若後端失敗則 fallback to local
    try {
      const formData = new FormData();
      formData.append('text', values.text || '');
      if (uploadingFile) {
        formData.append('image', uploadingFile);
      }

      const resp = await http.post('/article/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (resp?.data?.code === 1) {
        // 若後端回傳新貼文物件，使用回傳的資料更新列表
        const p = resp.data.data;
        const serverPost: PostItem = {
          id: p.id || Date.now(),
          text: p.text || p.content || values.text || '',
          image: p.image || p.imageUrl || undefined,
          comments: Array.isArray(p.comments) ? p.comments.map((c: any) => ({ id: c.id || Date.now(), text: c.text || c })) : [],
        };
        setPosts((prev) => [serverPost, ...prev]);
        form.resetFields();
        setUploadingFile(null);
        setModalVisible(false);
        message.success('發佈成功');
        return;
      }
    } catch (e) {
      console.warn('上傳到後端失敗，改用本地儲存', e);
    }

    // fallback: local
    let imgBase64: string | undefined;
    if (uploadingFile) {
      try {
        imgBase64 = await getBase64(uploadingFile);
      } catch (e) {
        message.error('圖片讀取失敗');
        return;
      }
    }

    const newPost: PostItem = {
      id: Date.now(),
      text: values.text || '',
      image: imgBase64,
      comments: [],
    };

    setPosts((p) => [newPost, ...p]);
    form.resetFields();
    setUploadingFile(null);
    setModalVisible(false);
    message.success('發佈成功');
  };

  const handleBeforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("只能上傳圖片檔案");
      return Upload.LIST_IGNORE as any;
    }
    // 驗證大小 5MB
    if (file.size / 1024 / 1024 > 5) {
      message.error("圖片不能超過 5MB");
      return Upload.LIST_IGNORE as any;
    }
    setUploadingFile(file);
    // prevent auto upload
    return Upload.LIST_IGNORE as any;
  };

  const addComment = (postId: number, text: string) => {
    if (!text || !text.trim()) return;
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, { id: Date.now(), text }] } : p))
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "24px auto" }}>
      <div style={{ textAlign: "right", marginBottom: 12 }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          發表貼文
        </Button>
      </div>

      <Modal
        title="發佈動態"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setUploadingFile(null);
        }}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="text" label="內容">
            <TextArea rows={4} placeholder="輸入想分享的內容..." />
          </Form.Item>

          <Form.Item label="圖片">
            <Upload beforeUpload={handleBeforeUpload} showUploadList={false} accept="image/*">
              <Button icon={<UploadOutlined />}>選擇圖片 (可不選)</Button>
            </Upload>
            {uploadingFile && (
              <div style={{ marginTop: 12 }}>
                <Image src={URL.createObjectURL(uploadingFile)} alt="preview" width={160} />
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              發布
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <List
        dataSource={posts}
        locale={{ emptyText: "尚無貼文" }}
        renderItem={(item) => (
          <List.Item key={item.id} style={{ width: "100%" }}>
            <Card style={{ width: "100%" }}>
              <div style={{ whiteSpace: "pre-wrap", marginBottom: 12 }}>{item.text}</div>
              {item.image && (
                <div style={{ marginBottom: 12 }}>
                  <Image src={item.image} alt="post" style={{ maxWidth: "100%" }} />
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <List
                  dataSource={item.comments}
                  size="small"
                  header={<b>留言</b>}
                  locale={{ emptyText: "還沒有留言，搶先留言吧！" }}
                  renderItem={(c) => <List.Item key={c.id}>{c.text}</List.Item>}
                />

                <Form
                  onFinish={(values) => {
                    addComment(item.id, values.comment);
                  }}
                  style={{ marginTop: 12 }}
                >
                  <Form.Item name="comment">
                    <Input placeholder="留言..." />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" size="small">
                      發送
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Post;
