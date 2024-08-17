const Card = ({ data, onClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow" onClick={onClick}>
      <img 
        src={data.sprites.front_default} 
        alt={data.name} 
        className="w-32 h-32 mx-auto"
      />
      <p className="text-center text-lg font-semibold mt-2 capitalize">{data.name}</p>
    </div>
  )
}

export default Card;