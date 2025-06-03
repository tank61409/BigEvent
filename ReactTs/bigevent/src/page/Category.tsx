import { Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import http from '../utils/axiosUtils';



function Category() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const respone = await http.get('http://localhost:8080/category', {})
      setCategory(respone.data.data)
    }
    fetchCategory()
  },[])

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
      <Table dataSource={category} columns={columns} pagination={{ position: ['bottomCenter'] }} />
    </div>

  )

}

export default Category;
