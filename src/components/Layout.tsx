export default function Layout({ children }): JSX.Element {
  return (
    <div className="fixed grid h-full min-h-full w-full grid-cols-1 grid-rows-1 flex-row overflow-hidden">
      <main className="theme-light">{children}</main>
    </div>
  );
}
