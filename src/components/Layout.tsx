export default function Layout({ children }): JSX.Element {
  return (
    <div>
      <main className="theme-light">{children}</main>
    </div>
  );
}
