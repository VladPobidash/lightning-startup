import axios from 'axios'
import axiosRetry from 'axios-retry'

// see https://github.com/softonic/axios-retry#usage
axiosRetry(axios, { retries: 1 })
