import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";

const useAuthStore = defineStore("auth", () => {
    const credentials = reactive({
        email: "",
        password: ""
    })

    const data = reactive({
        id: null,
        name: ""
    })

    const isAuthenticated = computed(() => !!data.id && !!data.name)

    const login = async () => {
        let error = null

        try {
            const response = await axios.get(`http://localhost:5000/companies?credentials.email=${encodeURI(credentials.email)}&credentials.password=${encodeURI(credentials.password)}`)

            if (response.data.length === 0) {
                error = "Invalid credentials"
                throw new Error("Invalid credentials")
            }

            data.id = response.data[0].id
            data.name = response.data[0].name

            credentials.email = ""
        } catch (error) {
            return error
        } finally {
            credentials.password = ""
        }

        return error
    }

    const logout = () => {
        data.id = null
        data.name = ""
    }

    return { credentials, data, isAuthenticated, login, logout }
},
{
    persist: true
})

export default useAuthStore