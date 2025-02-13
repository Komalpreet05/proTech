const Card = ({ children }) => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        {children}
      </div>
    );
  };
  
  export default Card;