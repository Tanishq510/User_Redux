import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { Table, Input, Col, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import { addUser } from './store/userSlice';

export default function App() {
  const APIURL = 'https://randomuser.me/api/?results=40';
  const { Search } = Input;
  const [users, setUsers] = useState([]);
  const [tableUsers, setTableUsers] = useState([]);
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers();
  }, []);

  /**
   * function to fetch users and store in redux store
   */
  const fetchUsers = async () => {
    try {
      const response = await axios.get(APIURL);
      if (response.status === 200) {
        let usersData = response.data.results;
        let newUsers = usersData.map((user, index) => {
          user.key = index;
          return user;
        });
        setUsers(newUsers);
        setTableUsers(newUsers);
        //dispatch(addUser)
      }
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * function to handle search
   */
  const handleSearch = (searchKey) => {
    if (searchKey) {
      let filteredUser = users.filter((user) => {
        return user.name.first.toLowerCase().includes(searchKey.trim());
      });
      setTableUsers(filteredUser);
    }
  };
  const columns = [
    {
      title: 'Profile Image',
      dataIndex: 'picture',
      key: 'name',
      render: (text) => <img src={text.medium} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <a>
          {text.first} {text.middle} {text.last}
        </a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      dataIndex: 'location',
      key: 'city',
      render: (text) => <span>{text.city}</span>,
    },
    {
      title: 'State',
      dataIndex: 'location',
      key: 'state',
      render: (text) => <span>{text.state}</span>,
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <Search
            placeholder="Search User"
            onSearch={handleSearch}
            disabled={!users.length}
          />
        </Col>
        <Col>
          <Table columns={columns} dataSource={tableUsers} />
        </Col>
      </Row>
    </>
  );
}
