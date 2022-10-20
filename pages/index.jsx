import Head from 'next/head'
import Image from 'next/image'
import { useState} from 'react'
import NftCard from '../components/NftCard'


const Home= () => {
  const [walletAddress,setWalletAddress] = useState("")
  const [collection,setCollectionAddress] = useState("")
  const [NFTS,setNFTs]= useState([])
  const [fetchForCollection, setFetchForCollection]=useState(false)

  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const api_key = "xb8hKzOXPd0SNPvNxV1sLY170gyXFQpe"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    var requestOptions = {
        method: 'GET'
      };
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${walletAddress}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }

  }

  
  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center   py-2 bg-black ">
      <marquee behavior="scroll" direction="left" className="bg-sky-800 text-white font-bold py-2  m-0">Welcome To Okhamena Azeez Nft Marketplace Find All Kinds of Nft of Your Choice , we have Nfts of different collection, All promos last till December . 20 . 2022</marquee>
      <div className='flex flex-col w-[300px] sm:w-[500px] md:w-[700px] gap-y-3 justify-center my-10 bg-sky-800 border-white border-3 shadow-white hover:bg-sky-700 pb-2 pt-5 px-3 rounded shadow-md  transition-all '>
        <div className="flex flex-col md:flex-row gap-x-2 items-center">
          <p className="flex-[2] font-mono font-bold text-white ">Enter you wallet address</p>
        <input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} type="text" placeholder='Add your wallet address' value={walletAddress} className="flex-[3] py-2 focus:outline-white bg-black font-mono border-2 disabled:bg-slate-700 disabled:text-slate-50 border-white rounded text-white"/>
        </div>

        <div className='flex gap-x-2  flex-col md:flex-row items-center'>
          <p className="flex-[2] font-mono font-bold text-white">Enter your contract address</p>
           <input type="text" placeholder='Add the collection address' onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} className="flex-[3] py-2   focus:outline-white bg-black text-white font-mono border-2 border-white rounded"/>
        </div>
        <label className="flex justify-center "><input onChange={(e)=>{setFetchForCollection( e.target.checked)}} type={'checkbox'} ></input><span className="font-mono text-white">Fetch for collection</span> </label>
        <div className="flex items-center justify-center">
        <button className='flex items-center font-bold justify-center px-5 py-2 bg-black hover:bg-white w-24 rounded-md font-mono text-white hover:text-black transition-all '  onClick={()=>{
          if(fetchForCollection){
            fetchNFTsForCollection()
          }else{
            fetchNFTs()
          }
         
          }}>Submit</button>
          </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
             {NFTS.length && NFTS.map((nft,index)=>(
                <NftCard key={index} nft={nft}/>
             ))}
          </div>
    </div>
  )
}

export default Home
