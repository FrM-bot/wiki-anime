import { ReactElement, useState, MouseEvent } from 'react'

const IdToClose = 'close'

export const useModal = () => {
  const [isShow, setIsShow] = useState(false)
  const handlerShowModal = () => {
    setIsShow(prevValue => !prevValue)
  }
  const handlerCloseModal = (e: MouseEvent<HTMLDivElement> & { target: { id: string } }) => {
    e?.target?.id === IdToClose && setIsShow(false)
  }
  const Modal = ({ children }: { children: ReactElement }) => {
    return isShow
      ? (

        <div id={IdToClose} className='fixed top-0 left-0 w-screen h-screen z-20 bg-tertiary/80 backdrop-blur-[3px] grid place-content-center overflow-hidden' onClick={handlerCloseModal}>
          {children}
        </div>
        )
      : null
  }
  return {
    Modal,
    handlerShowModal,
    isShow
  }
}
