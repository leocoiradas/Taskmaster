function Button({ buttonName, eventFunction, buttonColor }) {
    return (
        <button onClick={eventFunction} className="px-6 py-4 text-center rounded-md text-white" style={ {backgroundColor:buttonColor} }>{buttonName}</button>
  );
}

export default Button;