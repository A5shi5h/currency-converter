import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from "./hooks/useCurrencyInfo"


function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {

    if(amount > 0){
      setConvertedAmount(amount * currencyInfo[to])   
    }else{
      alert("please enter amount grater than 0")
    }
    
  }
  
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://www.desktopbackground.org/download/o/2010/12/30/134377_desktop-themes-black-currency-money-wallpapers-1792862_2560x1440_h.jpg')`,
            backgroundRepeat: `no-repeat`,
            backgroundSize : `cover`,
            backgroundPosition:`center`
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-sm mx-auto border-2 border-gray-60 rounded-lg p-5 backdrop-blur-0 bg-white/25">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1 border-4 border-blue-500 rounded-xl">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-red-600 hover:bg-blue-500 text-white px-2 py-0.5"
                            onClick={swap}  
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4 border-4 border-blue-500 rounded-xl">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 
                    border-2 border-white rounded-lg hover:bg-red-500 hover:text-black">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default App
