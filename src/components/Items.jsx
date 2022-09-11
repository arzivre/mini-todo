import checklistIcon from '../assets/checklist.svg'
import ModalItemMenus from './ModalItemMenus'

const Items = (items) => {
  return (
    <>
      <article className='mb-4 rounded border bg-neutral20 p-4'>
        <header className=''>
          <h3>{items.name}</h3>
        </header>
        <hr className='my-2 border-0 border-b-2 border-dashed text-dash' />
        <div className='grid grid-cols-[1fr_auto_auto] justify-between gap-2'>
          <div className='my-2 h-2.5 w-full rounded-full bg-gray-200'>
            <div
              className={`h-2.5 rounded-full ${items.progress_percentage === 100 ? 'bg-success' : 'bg-primary'
                }`}
              style={{ width: `${items.progress_percentage}%` }}
            />
          </div>
          <div>
            {items.progress_percentage == 100 ? (
              <picture>
                <img
                  src={checklistIcon}
                  alt='checklist icon'
                  className='my-1'
                />
              </picture>
            ) : (
              <p className='font-inter text-base text-percent'>
                {items.progress_percentage}%
              </p>
            )}
          </div>
          <div>
            <ModalItemMenus
              name={items.name}
              todoId={items.todo_id}
              id={items.id}
              progress_percentage={items.progress_percentage.toString()}
            />
          </div>
        </div>
      </article>
    </>
  )
}

export default Items
