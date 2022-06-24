import axios from 'axios'

export const myIP = () => axios('https://api.ipify.org?format=json')
