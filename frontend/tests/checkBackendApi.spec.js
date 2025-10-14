import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import checkBackendApi from '../src/components/checkBackendApi.vue'

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'API Hackathon 2025 is running', status: '200' }),
  })
)

describe('checkBackendApi.vue', () => {
  it('affiche le message et le statut', async () => {
    const wrapper = mount(checkBackendApi)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain('Message API : API Hackathon 2025 is running')
    expect(wrapper.text()).toContain('Statut : 200')
  })
})
