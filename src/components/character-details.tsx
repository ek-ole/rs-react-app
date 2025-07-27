import { useParams } from 'react-router-dom';

export function CharacterDetails() {
  const { id } = useParams();
  return (
    <div className="border-foreground border-l-2 p-4">
      <h2>Character Details</h2>
      <p>ID: {id}</p>
    </div>
  );
}
