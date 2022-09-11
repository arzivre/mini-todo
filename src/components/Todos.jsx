import useSWR from 'swr'
import { fetcherWithToken } from '../lib/fetcherWithToken.js'
import Items from './Items.jsx'
import ModalNewTask from './ModalNewTask.jsx'

const BASE_API_URL = 'https://todos-project-api.herokuapp.com/todos'

const Todos = (todos) => {
  const { data = [] } = useSWR([`${BASE_API_URL}/${todos.id}/items`, import.meta.env.VITE_API_TOKEN],
    fetcherWithToken,
    { refreshInterval: 1000 })

  return (
    <>
      <section
        className={`rounded border p-4
        ${todos.description === 'January - March' && 'bg-primarysurface'}
          ${todos.description === 'April - June' && 'bg-secondarysurface'}
          ${todos.description === 'July - September' && 'bg-dangersurface'}
          ${todos.description === 'October - December' && 'bg-successsurface'}
      `}
      >
        <h2
          className={`inline rounded border  py-[2px] px-2  
          ${todos.description === 'January - March' &&
            'border-primary text-primary'
            }
          ${todos.description === 'April - June' &&
            'border-secondary text-secondary'
            }
          ${todos.description === 'July - September' &&
            'border-danger text-danger'
            }
          ${todos.description === 'October - December' &&
            'border-success text-success'
            }
          `}
        >
          {todos.title}
        </h2>
        <p className='py-2 text-xs font-bold leading-5'>{todos.description}</p>
        {data?.length === 0 ? (
          <article className='rounded border bg-neutral20 p-4 text-percent'>
            <p>No Task</p>
          </article>
        ) : (
          data
            .sort(function (a, b) {
              return Date.parse(b.created_at) - Date.parse(a.created_at)
            })
            .map((items) => <Items key={items.id} {...items} />)
        )}
        <ModalNewTask todoId={todos.id} />
      </section>
    </>
  )
}

export default Todos
