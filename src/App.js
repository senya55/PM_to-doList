import logo from './logo.svg';
import './App.css';
import MainHeader from './components/header/mainHeader';
import MainDeal from './components/deal/mainDeal';
import MainListOfDeal from './components/listOfDeals/mainListOfDeals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DealsProvider } from './dealsContext';

function App() {


  return (

    <BrowserRouter>
      <DealsProvider>
        <div className="App">
          <MainHeader />
          <Routes>
            <Route path='' Component={MainListOfDeal} />
            <Route path='/info/:id' Component={MainDeal} />
          </Routes>
          {/* <MainListOfDeal /> */}
          {/* <MainDeal /> */}

        </div>
      </DealsProvider>
    </BrowserRouter>

  );
}

export default App;
