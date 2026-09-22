import Header from "./_components/Header"

const Layout = ({ children }) => {
  return (
    <div>

      <Header />

      {children}
      
    </div>
  )
}

export default Layout
