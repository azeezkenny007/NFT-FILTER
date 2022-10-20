import React from 'react'

function NftCard({nft}) {
  return (
    <div className='flex flex-col w-52 text-white bg-sky-800 shadow-2xl hover:scale-105 rounded' style={{"transition":"all 1s"}}>

      <div className='w-full rounded-none object-contain'>
          <img src={nft.media[0].gateway} alt="" />
      </div>

      <div className='flex pt-2 flex-col items-center justify-center w-full' >
        <h2>{nft.contractMetadata.name}</h2>
        <p>Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
        <p>{`${nft.contract.address.substr(0, 4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}</p>
      </div>
      
      
        <div className=" mt-2 pb-2 text-sm max-w-[200px]" >
                <p className="text-white px-1 text-ellipsis break-words text-center" >{nft.description?.substr(0, 150)}</p>
        </div>

            <div className="flex justify-center">
                <a style={{"transition":"all 1s"}} className="flex justify-center hover:bg-white hover:text-black font-bold  items-center py-2 cursor-pointer rounded bg-black mb-2 w-44" target={"_blank"} href={`https://etherscan.io/token/${nft.contract.address}`} >View on Etherscan</a>
            </div>
    </div>
  )
}

export default NftCard