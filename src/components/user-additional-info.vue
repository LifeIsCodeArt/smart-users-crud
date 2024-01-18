<script setup>
import { cloneDeep } from 'lodash'

import { onMounted, ref } from "vue";
import { useUsersStore } from "@/stores/user-store.js";

const props = defineProps({
  user:{
    type: Object,
    default: () => {}
  }

})

  const emit = defineEmits(['openAdditionalModal'])

  const allowEdit = ref(false)

  const userData = ref({})

  const cancelUpdate = () =>{
    if (allowEdit.value){
      userData.value = cloneDeep(props.user)
    }
    allowEdit.value = !allowEdit.value
  }

  const updateUser = () => {
  try {
    useUsersStore().updateUser(userData.value)
  }

  catch (err){
    console.log(err)
  }

  finally {
    emit('openAdditionalModal')
  }

}

  onMounted(()=>{
    userData.value = cloneDeep(props.user)
  })
</script>


<template>
  <div class="absolute top-0 w-full h-full z-5 popUpBackground "></div>
    <div class="absolute top-[10%] left-[40%] w-[400px] z-10 flex flex-col items-center justify-center h-auto bg-gray-200 rounded-xl py-[30px]">
      <div class="flex justify-end items-end absolute right-[1rem] top-3 z-[11]">
          <button class=" h-[2rem] w-[2rem] mb-[2rem] bg-[#202020] flex justify-center items-center text-[#999999] z-10 rounded-[50%]"
              @click="emit('openAdditionalModal')">X</button>
      </div>


    <div class="flex flex-col items-center gap-y-[15px]">

      <img :src="user.avatar" alt="" class="rounded-3xl">


      <div class=" flex flex-col relative">
        <label for="email" class=" mb-[10px] font-bold text-[18px]">Email</label>

        <input type="email" id="email" v-model="userData.email"   placeholder="Enter your Email..."
               class=" w-[300px] h-[40px] text-[14px]  px-[8px]  pr-[8px] z-10 rounded  border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none"
               :class="!allowEdit ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-black font-semibold':'cursor-auto'">

      </div>

      <div class="flex flex-col relative">
          <label for="first_name"  class="mb-[10px] font-bold  text-[18px]">Name</label>

          <input type="text"  id="first_name" v-model="userData.first_name"   placeholder="Enter your name"
                 class=" w-[300px] h-[40px] z-10  px-[8px] pr-[8px] rounded border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none"
                 :class="!allowEdit ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-black font-semibold':'cursor-auto'">

      </div>


      <div class="flex flex-col relative">

        <label for="last_name"  class="mb-[10px] font-bold  text-[18px]">Surname</label>

        <input type="text"  id="last_name" v-model="userData.last_name"  placeholder="Enter your last name"
               class=" w-[300px] h-[40px] z-10  px-[8px] pr-[8px] rounded border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none"
               :class="!allowEdit ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-black font-semibold':'cursor-auto'">

      </div>

      <div class=" flex flex-col relative">
          <label for="address" class=" mb-[10px] font-bold text-[18px] ">Address</label>

          <input type="text" id="address" v-model="userData.address"  placeholder="Enter your address..."
                 class=" w-[300px] h-[40px] text-[14px]  px-[8px]  pr-[8px] z-10 rounded  border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none"
                 :class="!allowEdit ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-black font-semibold':'cursor-auto'">


      </div>

      <div class="flex flex-col relative">
        <label for="phone" class=" mb-[10px] font-bold text-[18px]">Phone</label>

        <input type="tel" id="phone" v-model="userData.phone" placeholder="Enter your phone... +380"
               class=" w-[300px] h-[40px] text-[14px]  px-[8px]  pr-[8px] z-10 rounded  mb-[55px] border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none"
               :class="!allowEdit ? 'cursor-not-allowed pointer-events-none bg-gray-300 text-black font-semibold':'cursor-auto'">

      </div>

    </div>

      <div class="flex justify-around w-full">

          <button
              type="button"
              @click.prevent="cancelUpdate"
              :class="allowEdit ? 'text-white bg-red-400 text-[20px] h-[50px] px-[30px] rounded-xl hover:text-white hover:bg-red-500 hover:duration-500' : 'text-white bg-black  text-[20px] h-[50px] px-[30px] rounded-xl hover:text-black hover:bg-[#4174CB] hover:duration-500'">
              {{ allowEdit ? 'Cancel' : 'Edit'}}
          </button>

          <button v-show="allowEdit"
                type="submit"
                @click.prevent="updateUser"
                class="text-white bg-green-400 text-[20px] h-[50px] px-[30px] rounded-xl hover:text-white hover:bg-green-500 hover:duration-500">
                Save
          </button>
      </div>
  </div>

</template>

<style>
.popUpBackground{
  background: rgba(0, 0, 0, 0.70);
  backdrop-filter: blur(0.5rem);
  z-index: 10;
}
</style>