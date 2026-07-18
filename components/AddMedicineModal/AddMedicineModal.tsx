type Props = {
  onClose: () => void
}

export default function AddMedicineModal({ onClose }: Props) {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      {/* форма */}
    </div>
  )
}