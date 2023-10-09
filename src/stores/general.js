import { defineStore } from 'pinia'
import catOptions from '../mixins/catOptions'
import catApi from '../mixins/catApi'

export const useGeneralCatStore = defineStore('generalCatStore', {
  state: () => ({
    breeds: [],
    color: [],
    fur: []
  }),
  persist: true,
  actions: {
    getCatOptions() {
      this.color = catOptions.color
      this.fur = catOptions.fur
    },

    async getBreeds() {
      try {
        const breeds = await catApi.methods.getBreeds()

        this.breeds = breeds.map((breed) => ({
          name: breed.name,
          id: breed.id,
          description: breed.description,
          origin: breed.origin,
          image_id: breed.reference_image_id
        }))
      } catch (error) {
        console.log(error)
      }
    }
  }
})
