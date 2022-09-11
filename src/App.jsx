import useSWR from "swr"
import { fetcherWithToken } from "./lib/fetcherWithToken"

function App() {
  const { data } = useSWR(
    ['https://todos-project-api.herokuapp.com/todos', import.meta.env.VITE_API_TOKEN],
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
        {JSON.stringify(data)}
      </main>
    </>
  )
}

export default App
