import { getApiData } from '@/mixins/index'
const catApi = {
  methods: {
    async getPhoto(breed = null) {
      return await getApiData(
        `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breed}`
      )
    },

    async getBreeds() {
      return await getApiData('https://api.thecatapi.com/v1/breeds/')
    }
  }
}

export async function getFakeApiInfo(id) {
  return await getApiData(`/api/cat/${id}`)
}

export default catApi
