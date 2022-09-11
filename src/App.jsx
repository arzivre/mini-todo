import { Suspense } from "react"
import useSWR from "swr"
import Todos from "./components/Todos"
import { fetcherWithToken } from "./lib/fetcherWithToken"

const BASE_API_URL = 'https://todos-project-api.herokuapp.com/todos'

function App() {
  const { data } = useSWR([BASE_API_URL, import.meta.env.VITE_API_TOKEN],
    fetcherWithToken
  )

  return (
    <>
      <nav className='mb-6 border-b'>
        <h1 className='mx-auto max-w-screen-xl py-[18px] px-5 text-[18px] font-bold leading-7'>
          Product Roadmap
        </h1>
      </nav>
      <main className='mx-auto grid max-w-screen-xl grid-cols-4 gap-4 px-5'>
        <Suspense fallback={`Loading...`}>
          {data?.map((todos) => (
            <Todos key={todos.id} {...todos} />
          ))}
        </Suspense>
      </main>
    </>
  )
}

export default App
