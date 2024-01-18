import { ref } from 'vue'
import { defineStore } from 'pinia'

import Users from "../services/api/users/users.js";


export const useUsersStore = defineStore('usersStore', () => {
  const users = ref([])
  const getUsers = async () => {
    try {
      const res = await Users.getAll()
      users.value = res.data.data

    }
    catch (err) {
      console.log(err)
    }
  }

  const createUser = async (data) => {
    try {
      await Users.create(data)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      await getUsers()
    }
  }

  const updateUser = async (data) => {
    try {
      await Users.update(data)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      await getUsers()
    }
  }

  const userDelete = async (id) => {
    try {
      await Users.delete(id)
    }
    catch (err) {
      console.log(err)
    }
    finally {
      await getUsers()
    }
  }

  return {users, getUsers, userDelete, createUser, updateUser}
})
