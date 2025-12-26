export default function SecretList({ secrets, onDelete }) {
  return (
    <div className="secrets-showing-container">
      <ul>
        <h2>
          {" "}
          {secrets?.length > 0 ? "All your secrets" : "No secrets added"}{" "}
        </h2>

        {secrets?.map((secret) => (
          <li key={secret.id} className="secret-card">
            <div className="secret-row">
              <span className="label">Name:</span>
              <span className="value">{secret?.name}</span>
            </div>
            <div className="secret-row">
              <span className="label">Username:</span>
              <span className="value">{secret?.username}</span>
            </div>
            <div className="secret-row">
              <span className="label">Password:</span>
              <span className="value truncate">{secret?.password}</span>
            </div>
            <div className="secret-row">
              <span className="label">Notes:</span>
              <span className="value truncate">{secret?.notes}</span>
            </div>
            <button className="delete-btn" onClick={() => onDelete(secret.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
