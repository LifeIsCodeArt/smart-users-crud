<script setup>

import { useUsersStore } from '../stores/user-store.js'
import { ref, watch, reactive, computed } from "vue";

const store = useUsersStore()

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const isEmailValid = (value) => {
  return EMAIL_REGEXP.test(value);}

const inputEmailField = ref('');

const inputFirstNameField = ref('');

const inputLastNameField = ref('');

const totalValidation = reactive({
  emailValid:Boolean,
  firstNameValid:Boolean,
  lastNameValid:Boolean
})

const isValid = computed(() =>  inputFirstNameField.value.length && inputLastNameField.value.length && !!(inputEmailField.value.length && totalValidation.emailValid))

const emailCheck =() => {
  totalValidation.emailValid = isEmailValid(inputEmailField.value);
}

const firstNameCheck =() => {
  totalValidation.firstNameValid = inputFirstNameField.value.length
}

const lastNameCheck =() => {
  totalValidation.lastNameValid = inputLastNameField.value.length
}


watch(
    () => inputEmailField.value,
    ()=>{emailCheck()}
)

watch(
    () => inputFirstNameField.value,
    ()=>{firstNameCheck()}
)

watch(
    () => inputLastNameField.value,
    ()=>{lastNameCheck()}
)


defineEmits(['closeModal'])

const signInUser = () =>{
  store.createUser({
    email: inputEmailField.value,
    first_name: inputFirstNameField.value,
    last_name: inputLastNameField.value
  })

}

</script>


<template>
  <div class="absolute top-0 w-full h-full z-5 popUpBackground"></div>

  <form class="absolute top-[20%] left-[40%] w-[400px] z-10 flex flex-col items-center justify-around h-auto py-[30px] bg-[#ffffff] rounded-xl">
    <div class="flex flex-col items-center">

      <div class="flex justify-end items-end absolute right-[15px] top-[15px] z-[11] ">
        <button class=" h-[2rem] w-[2rem] mb-[2rem] bg-[#202020] flex justify-center items-center text-[#999999] z-10 rounded-[50%]"
                @click="$emit('closeModal')">X</button>
      </div>

      <div class="flex flex-col relative">
        <label for="name" class="mb-[20px] font-bold text-[18px]">Enter your name</label>

        <input type="text" id="name" v-model.trim="inputFirstNameField" placeholder="Enter your name..." class=" w-[300px] h-[40px] z-10  px-[8px] pr-[8px] rounded border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none">

        <div v-show="!totalValidation.firstNameValid"
             class="absolute z-10 bg-white w-[10rem] h-[1rem] right-[0.75rem] text-center text-[0.625rem] leading-[1rem] text-[#FD4646] bottom-[-0.4rem]">
          The field must not be empty
        </div>
      </div>

      <div class="mt-[55px] flex flex-col relative">
        <label for="last-name" class=" mb-[20px] font-bold text-[18px]">Enter your last name</label>

        <input type="text" id="last-name" v-model.trim="inputLastNameField" placeholder="Enter your last name..." class=" w-[300px] h-[40px] text-[14px]  px-[8px]  pr-[8px] z-10 rounded  mb-[55px] border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none">

        <div v-show="!totalValidation.lastNameValid"
             class="absolute z-10 bg-white w-[10rem] h-[1rem] right-[0.75rem] text-center text-[0.625rem] leading-[1rem] text-[#FD4646] bottom-[3.1rem]">
          The field must not be empty
        </div>

      </div>
      <div class="flex flex-col relative">
        <label for="email" class="mb-[20px] font-bold text-[18px]">Enter your email</label>

        <input type="email" id="email" v-model.trim="inputEmailField" placeholder="Enter Email..." class=" w-[300px] h-[40px]  px-[8px] pr-[8px] z-10 rounded border-b-2 border-gray-200 focus:text-[18px] focus:duration-1000 focus:outline-none">

        <div v-show="!totalValidation.emailValid"
             class="absolute z-10 bg-white w-[10rem] h-[1rem] right-[0.75rem] text-center text-[0.625rem] leading-[1rem] text-[#FD4646] bottom-[-0.4rem]">
          Provide a valid e-mail address
        </div>

      </div>
    </div>
    <button
        type="submit"
        @click.prevent="signInUser"
        class="text-white  text-[20px] py-3 px-4 mt-[30px] rounded-xl hover:text-black hover:bg-yellow-400 hover:duration-500 hover:font-bold"
        :class="isValid ? 'cursor-allowed pointer-events-auto cursor-pointer bg-[#4174CB]' : 'cursor-not-allowed pointer-events-none bg-gray-200'"
    >
      Add user
    </button>
  </form>

</template>

<style>
.popUpBackground{
  background: rgba(0, 0, 0, 0.70);
  backdrop-filter: blur(0.5rem);
  z-index: 10;
}
</style>

