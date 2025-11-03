type User = {
  _id: string;
  firstname: string;
  email: string;
};

export default function UserOverview({ users }: { users: User[] }) {
  if (!users?.length) return <p>Keine Nutzer gefunden.</p>;
  return (
    <section>
      <h2 className="mb-3 text-xl">Benutzerübersicht:</h2>
      <ul>
        {users?.map((user: any) => (
          <li key={user._id} className=" m-3">
            <div className="grid sm:grid-cols-5 gap-3 border p-2">
              <div className="">{user.firstName}</div>
              <div className="">{user.lastName}</div>
              <div className="">{user.street}</div>
              <div className="overflow-auto">{user.city}</div>
              <div className="text-right">
                <button className="btn btn-primary">Bearbeiten</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
