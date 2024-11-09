const ErrorAlert = ({ message }: { message: string }) => {
  return (
    <div className="toast">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
};

const SuccessAlert = ({ message }: { message: string }) => {
  return (
    <div className="toast">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
    </div>
  );
};

export { ErrorAlert, SuccessAlert };
