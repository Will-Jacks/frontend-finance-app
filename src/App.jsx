
import BillCreator from './components/billCreator/BillCreator'
import Header from './components/header/Header'
import RenderBill from './components/renderBill/RenderBill'
import SumBills from './components/sumBills/SumBills'

function App() {

  return (
    <>
      <Header />
      <BillCreator />
      <SumBills />
      <RenderBill />
    </>
  )
}

export default App
