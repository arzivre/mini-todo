import useSWR from 'swr'
import { fetcherWithToken } from '../lib/fetcherWithToken.js'

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
        {JSON.stringify(data)}

      </section>
    </>
  )
}

export default Todos
