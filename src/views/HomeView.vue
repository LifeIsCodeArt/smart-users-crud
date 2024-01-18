<script setup>
  import { useUsersStore } from '../stores/user-store.js'
  import { computed, onMounted, ref } from "vue";

  import ListItem from '../components/list-item.vue'
  import AddNewUser from '../components/new-user-form.vue'
  import UserAdditionalModal from '../components/user-additional-info.vue'

  const store = useUsersStore()
  const usersList = computed(()=>store.users)


  const searchText = ref('')

  const filteredUsers = computed(() => {
    return usersList.value.filter(user => {
      const nameMatches = user.first_name.includes(searchText.value);
      const surnameMatches = user.last_name.includes(searchText.value);
      const emailMatches = user.email.includes(searchText.value);

      return nameMatches || surnameMatches || emailMatches;
    });
  });

  const openModal = ref(false)

  const openAdditionalModal = ref(false)

  const openAdditionalInfo = (user) => {
      currentUser.value = user
      openAdditionalModal.value = true
  }

  const currentUser = ref(null)

  onMounted(() => {
      store.getUsers()
  })
</script>

<template>
<div class="relative">
    <div class="w-[1440px] px-[60px] mx-auto flex flex-col items-center pt-[50px] bg-gray-200 h-[945px]">

        <div class="flex justify-between  w-full mb-3">

            <input type="text" placeholder="Search" v-model="searchText" class="h-[40px] border border-black rounded w-[220px] pl-2">

            <button class="mb-[40px] px-4  text-white bg-[#4174CB] text-[20px] h-[50px] rounded-xl hover:text-black hover:bg-yellow-400 hover:duration-500" @click="openModal = !openModal">
                Create User
            </button>

        </div>

        <AddNewUser v-if="openModal" @close-model="openModal = !openModal"/>

        <UserAdditionalModal v-if="openAdditionalModal" @open-additional-modal="openAdditionalModal = !openAdditionalModal" :user="currentUser"/>

        <ul class="grid grid-cols-3 gap-24 h-[400px]">
            <ListItem
                v-for="item in filteredUsers"
                @open-modal-additional="openAdditionalInfo(item)"
                :item="item"
                :key="item.id"
            />
        </ul>

    </div>
</div>
</template>
