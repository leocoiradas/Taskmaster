import Button from "./Button";

function Assignment(title, description, status, creationDate, expires) {
    return (
        <article className="w-[18dvw] h-[27dvh] flex flex-col p-2 gap-3">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{status}</p>
            <div className="flex justify-around items-center">
                <p>{creationDate}</p>
                <p>{expires}</p>
            </div>
            <Button buttonName = "Edit" buttonColor="blue"/>
            <Button buttonName="Delete" buttonColor="Red" />
      </article>
  );
}

export default Assignment;