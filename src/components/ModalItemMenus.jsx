import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import useSWR, { mutate } from 'swr'
import dangerIcon from '../assets/Exclamation.svg'
import menuIcon from '../assets/menu.svg'
import moveleftIcon from '../assets/u_arrow-left.svg'
import moveRightIcon from '../assets/u_arrow-right.svg'
import editIcon from '../assets/u_edit-alt.svg'
import trashIcon from '../assets/u_trash-alt.svg'
import { fetcherWithToken } from '../lib/fetcherWithToken.js'

const BASE_API_URL = 'https://todos-project-api.herokuapp.com/todos'


const ModalItemMenus = ({
  name,
  todoId,
  id,
  progress_percentage,
}) => {
  const { data, } = useSWR(
    [BASE_API_URL, import.meta.env.VITE_API_TOKEN],
    fetcherWithToken
  )

  const leftLimit = data?.[0].id
  const rightLimit = data?.[data?.length - 1].id

  const [isOpenDeleteMenu, setIsOpenDeleteMenu] = useState(false)
  const [isOpenEditMenu, setIsOpenEditMenu] = useState(false)

  const [formData, setFormData] = useState({
    name: name ?? '',
    progress_percentage: progress_percentage ?? '21',
  })

  const formRef = useRef()

  function openModalDeleteMenu(id) {
    setIsOpenDeleteMenu(true)
  }

  function closeModalDeleteMenu() {
    setIsOpenDeleteMenu(false)
  }

  function openModalEditMenu(id) {
    setIsOpenEditMenu(true)
  }

  function closeModalEditMenu() {
    setIsOpenEditMenu(false)
  }

  async function handleEdit(e
  ) {
    e.preventDefault()
    const data = {
      target_todo_id: todoId,
      name: formData.name,
      progress_percentage: Number(formData.progress_percentage),
    }

    await fetch(`${BASE_API_URL}/${todoId}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(data),
    })

    mutate(`${BASE_API_URL}/${todoId}/items`)
    closeModalEditMenu()
  }

  async function handleDelete() {
    await fetch(`${BASE_API_URL}/${todoId}/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      },
    })

    mutate(`${BASE_API_URL}/${todoId}/items`)
    closeModalDeleteMenu()
  }

  async function handleMoveRight(name) {
    const data = {
      target_todo_id: todoId + 1,
      name,
    }
    await fetch(`${BASE_API_URL}/${todoId}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(data),
    })

    mutate(`${BASE_API_URL}/${todoId}/items`)
  }

  async function handleMoveLeft(name) {
    const data = {
      target_todo_id: todoId - 1,
      name,
    }
    await fetch(`${BASE_API_URL}/${todoId}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      },
      body: JSON.stringify(data),
    })

    mutate(`${BASE_API_URL}/${todoId}/items`)
  }

  return (
    <div>
      <Menu>
        <Menu.Button>
          <picture>
            <img src={menuIcon} alt='sort arrow' />
          </picture>
        </Menu.Button>
        <Menu.Items
          className={`absolute m-2 mt-2 grid w-80 grid-cols-1 
        justify-start rounded bg-white text-left shadow-lg
        ${todoId === rightLimit ? 'right-0' : 'right-30'}`}
        >
          {todoId === leftLimit ? null : (
            <Menu.Item>
              <button
                onClick={() => handleMoveLeft(name)}
                className='flex gap-x-4 p-2 text-left font-bold hover:text-primary'
              >
                <picture>
                  <img src={moveleftIcon} alt='sort' />
                </picture>
                Move Left
              </button>
            </Menu.Item>
          )}
          {todoId === rightLimit ? null : (
            <Menu.Item>
              <button
                onClick={() => handleMoveRight(name)}
                className='flex gap-x-4 p-2 text-left font-bold hover:text-primary'
              >
                <picture>
                  <img src={moveRightIcon} alt='sort' />
                </picture>
                Move Right
              </button>
            </Menu.Item>
          )}
          <Menu.Item>
            <button
              onClick={() => openModalEditMenu(id.toString())}
              className='flex gap-x-4 p-2 text-left font-bold hover:text-primary'
            >
              <picture>
                <img src={editIcon} alt='edit icon svg' />
              </picture>
              Edit
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={() => openModalDeleteMenu(id.toString())}
              className='flex gap-x-4 p-2 text-left font-bold hover:text-danger'
            >
              <picture>
                <img src={trashIcon} alt='sort' />
              </picture>
              Delete
            </button>
          </Menu.Item>
        </Menu.Items>
      </Menu>

      <Transition appear show={isOpenDeleteMenu} as={Fragment}>
        <Dialog
          unmount
          as='div'
          className='relative z-10'
          onClose={closeModalDeleteMenu}
        >
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
                  <Dialog.Title as='h3' className='flex justify-start gap-2'>
                    <picture>
                      <img src={dangerIcon} alt='danger icon svg' />
                    </picture>
                    <p className='font-bold'>Delete Task</p>
                  </Dialog.Title>
                  <div className='my-10'>
                    <p className='text-center text-base font-semibold'>
                      Are you sure want to delete this task? your action can’t
                      be reverted.
                    </p>
                  </div>

                  <div className='mt-4 flex justify-between'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-[#F4F4F4]  px-4 py-2 
                      text-base  font-semibold text-[#4A4A4A]  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={() => closeModalDeleteMenu()}
                    >
                      Batal
                    </button>

                    <button
                      type='button'
                      onClick={handleDelete}
                      className='inline-flex justify-center rounded-md border border-transparent 
                      bg-[#ED4C5C] px-4 py-2 text-base font-semibold text-red-50 hover:bg-red-200 
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    >
                      confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpenEditMenu} as={Fragment}>
        <Dialog
          unmount
          as='div'
          className='relative z-10'
          onClose={closeModalEditMenu}
        >
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
                    <p>Edit Task</p>
                  </Dialog.Title>
                  <form
                    ref={formRef}
                    onSubmit={handleEdit}
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
                        onClick={() => closeModalEditMenu()}
                      >
                        Cancel
                      </button>

                      <button
                        type='submit'
                        className='rounded bg-primary px-3 text-white shadow'
                      >
                        Edit Task
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ModalItemMenus
