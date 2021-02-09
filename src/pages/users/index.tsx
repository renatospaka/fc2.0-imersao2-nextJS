// @flow 
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import * as React from 'react';
import { User } from '../../models/user';

interface UsersLIstProps {
  users: User[]
};

const UsersList: NextPage<UsersLIstProps> = (props) => {
  // const [users, setUsers] = React.useState<User[]>([]);
  // React.useEffect(() => {
    //   axios.get('http://localhost:3001/api/users')
    //     .then(response => {
      //       setUsers(response.data)
      //     })
      // }, [])
      
  const {users} = props
  return (
    <ul>
      {users.map(u => (
        <li>{u.name} - {u.email}</li>
      ))}
    </ul>
  );
};

export default UsersList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {data} = await axios.get('http://app:3000/api/users')
  return {
    props: {
      users: data 
    }
  }
}