import { useRef } from 'react'
import { mutate } from 'swr'
import { Dialog, Transition } from '@headlessui/react'
import plusIcon from '../assets/u_plus-circle.svg'
import { Fragment, useState } from 'react'

const BASE_API_URL = 'https://todos-project-api.herokuapp.com/todos'


const ModalNewTask = ({ todoId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    progress_percentage: '21',
  })

  const formRef = useRef()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: formData.name,
      progress_percentage: Number(formData.progress_percentage),
    }

    await fetch(`${BASE_API_URL}/${todoId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(data),
    })

    mutate(`${BASE_API_URL}/${todoId}/items`)
    closeModal()
  }

  return (
    <>
      <button onClick={openModal} className='mt-4 flex gap-2'>
        <picture>
          <img src={plusIcon} alt='plus icon as svg' />
        </picture>
        New Task
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='mb-4 flex justify-start font-bold'
                  >
                    <p>Create Task</p>
                  </Dialog.Title>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='grid grid-cols-1 gap-y-8'
                  >
                    <label className=''>
                      <span className='mb-2 block text-sm font-semibold'>
                        Task Name
                      </span>
                      <input
                        type='text'
                        placeholder='Tambahkan nama list item'
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className='w-full rounded-lg border-2 border-gray-200'
                      />
                    </label>
                    <label className=''>
                      <span className='mb-2 block text-sm font-semibold'>
                        Progress
                      </span>
                      <input
                        type='string'
                        placeholder='Tambahkan nama list item'
                        value={formData.progress_percentage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            progress_percentage: e.target.value,
                          })
                        }
                        maxLength={3}
                        className='w-full rounded-lg border-2 border-gray-200'
                      />
                    </label>

                    <div className='mt-4 flex justify-end gap-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-[#F4F4F4]  px-4 py-2 
                      text-base  font-semibold text-[#4A4A4A]  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </button>

                      <button
                        type='submit'
                        className='rounded bg-primary px-3 text-white shadow'
                      >
                        Save Task
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ModalNewTask
