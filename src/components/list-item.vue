<script setup>
import { useUsersStore } from '../stores/user-store.js'
import { defineProps } from "vue";
    const props = defineProps({
      item: {
        type: Object,
        default: () => {}
      }
    })

    defineEmits(['openModalAdditional'])

</script>


<template>
    <li class="flex w-[375px] h-[170px] relative border-2 border-blue-200 px-[30px] rounded-xl  hover:bg-yellow-50 hover:duration-500 hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">

        <div class="flex justify-end items-end absolute right-0 top-0">
            <button @click="useUsersStore().userDelete(item.id)" class="h-[1.3rem] w-[1.2rem] ml-[10px] font-bold  bg-gray-300 flex justify-center items-center text-[14px] text-[#999999] z-5 rounded-t-r-xl">X</button>
        </div>

        <div class="flex justify-end items-end absolute right-0 top-[10%]">

        </div>

        <div class="pt-[20px]">
            <img :src="item.avatar" alt="" class="rounded-[50%]">
        </div>

        <div class="flex flex-col text-black ml-[20px] pt-[30px] ">

            <div class="flex cursor-pointer" @click="$emit('openModalAdditional')">
            
                <p class="text-center font-bold text-[18px] text-[#333333]">{{item.first_name}} {{item.last_name}}</p>
            
            </div>

            <div class="text-[14px] text-[#4174CB] font-semibold">

                <p class="">{{item.email}}</p>

            </div>

        </div>

    </li>


</template>

<style scoped>

</style>