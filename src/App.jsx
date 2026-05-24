import { useState } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contractInfo'

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);
  
  // New States for the Ticket Scanner
  const [searchId, setSearchId] = useState("");
  const [ticketData, setTicketData] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function handleBuyTicket() {
    if (!window.ethereum) return;
    try {
      setIsPurchasing(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Make sure this is your actual Pinata link!
      const tokenURI = "ipfs://YOUR_PINATA_JSON_CID"; 
      
      const transaction = await contract.buyTicket(tokenURI, {
        value: ethers.parseEther("0.01") 
      });

      await transaction.wait();
      alert("Ticket purchased successfully! Welcome to the match!");
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Transaction failed. Check the console for details.");
    } finally {
      setIsPurchasing(false);
    }
  }

  // --- NEW FUNCTION: Read data from the Blockchain ---
  async function handleCheckTicket() {
    if (!window.ethereum || searchId === "") return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      // We don't need a signer here because reading data is FREE!
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      // Call the getTicketInfo function from your Solidity contract
      const data = await contract.getTicketInfo(searchId);
      
      // Format the raw blockchain data into readable text
      setTicketData({
        buyer: data[0],
        // Convert Wei back to ETH
        price: ethers.formatEther(data[1]), 
        // Convert UNIX timestamp to a normal Date string
        date: new Date(Number(data[2]) * 1000).toLocaleString() 
      });
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Could not find this ticket. Make sure the ID is correct!");
      setTicketData(null);
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Football E-Ticketing</h1>
      
      {walletAddress ? (
        <div>
          <p style={{ color: 'green', fontWeight: 'bold' }}>Connected: {walletAddress}</p>
          
          {/* Buying Section */}
          <div style={{ 
            marginTop: '40px', padding: '30px', border: '1px solid #ccc', 
            borderRadius: '12px', display: 'inline-block', backgroundColor: '#f9f9f9'
          }}>
            <h2>VIP Stadium Ticket</h2>
            <p>Price: <strong>0.01 Sepolia ETH</strong></p>
            <button onClick={handleBuyTicket} disabled={isPurchasing} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              {isPurchasing ? "Processing..." : "Buy Ticket"}
            </button>
          </div>

          <hr style={{ margin: '40px 0' }} />

          {/* --- NEW UI: Ticket Scanner Section --- */}
          <div>
            <h3>Check Ticket Info (Rubric Requirement)</h3>
            <input 
              type="number" 
              placeholder="Enter Ticket ID (e.g. 0)" 
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
            />
            <button onClick={handleCheckTicket} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
              Search
            </button>

            {/* Display the fetched data */}
            {ticketData && (
              <div style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block', border: '1px solid #007bff', padding: '15px', borderRadius: '8px' }}>
                <p><strong>Owner:</strong> {ticketData.buyer}</p>
                <p><strong>Price Paid:</strong> {ticketData.price} ETH</p>
                <p><strong>Time Bought:</strong> {ticketData.date}</p>
              </div>
            )}
          </div>

        </div>
      ) : (
        <button onClick={connectWallet} style={{ padding: '12px 24px', fontSize: '18px', cursor: 'pointer' }}>
          Connect MetaMask
        </button>
      )}
    </div>
  )
}

export default App