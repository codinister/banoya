
const ErrorWarning = ({err}: {err: string | undefined}) => {
  return (
    <div className="error-warning">{err}</div>
  )
}

export default ErrorWarning