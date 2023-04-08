import { useState } from "react"

const useModal = (isDefaultOpen?: boolean) => {
    const [isModalOpen, setIsModalOpen] = useState(isDefaultOpen || false)
    const closeModal = () => setIsModalOpen(false)
    const openModal = () => setIsModalOpen(true)

    return {
        isModalOpen,
        closeModal,
        openModal,
    }
}

export default useModal