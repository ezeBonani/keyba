import "./loadingIndicator.scss";

export default function LoadingIndicator() {
  return (
    <div className="loadingIndicator">
      <p>Cargando...</p>
      <span className="loader"></span>
    </div>
  );
}
