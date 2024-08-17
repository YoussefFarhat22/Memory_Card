

const Score = ({ currentScore, bestScore }) => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
      <p className="text-lg font-semibold">Score: <span className="text-blue-600">{currentScore}</span></p>
      <p className="text-lg font-semibold">Best Score: <span className="text-green-600">{bestScore}</span></p>
    </div>
  )
}

export default Score;