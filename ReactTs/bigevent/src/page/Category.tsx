import { message, Table } from 'antd';
import { Button } from 'antd/es/radio';
import { useEffect, useState } from 'react';
import AddCategoryModal from '../components/AddCategoryModal';
import http from '../utils/axiosUtils';



function Category() {
  const fetchCategory = async () => {
    const respone = await http.get('/category', {})
    console.log(respone.data.data)
    setCategory(respone.data.data)
  }
  const handAdd = async (value: { categoryName: string; categoryAlias: string }) => {
    setModalLoading(true)
    try {
      await http.post('/category/addcategory', value)
      message.success('新增成功')
      setOpen(false)
      fetchCategory()
    } catch {
      message.error("新增失敗")
    } finally {
      setModalLoading(false)
    }
  }
  const [category, setCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  useEffect(() => {
    fetchCategory()
  }, [])

  const columns = [
    {
      title: '類別名稱',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '別名',
      dataIndex: 'categoryAlias',
      key: 'categoryAlias',
    },
    {
      title: '創建時間',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新時間',
      dataIndex: 'updateTime',
      key: 'updateTime'
    }
  ];

  return (
    <div>
      <Button type='primary' onClick={() => setOpen(true)} style={{ marginBottom: 16 }}>新增分類</Button>
      <Table rowKey="id" dataSource={category} columns={columns} pagination={{ position: ['bottomCenter'] }} />
      <AddCategoryModal open={open} loading={loading} onOk={handAdd} onCancel={() => setOpen(false)} />
    </div>

  )

}

export default Category;
