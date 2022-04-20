import React , { useState } from 'react'
import dynamic from "next/dynamic";
import axios  from 'axios';
const PDFViewer = dynamic(() => import("../components/pdf-viewer.js"), {
  ssr: false
});



export default function PDF() {

  const [file,setFile ] = useState('')
  const test = () => {
// let xhr = new XMLHttpRequest(); 
// xhr.onreadystatechange = function() { 
//  if (xhr.readyState == 4) { 
//    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) { 
     
//      console.log(xhr.responseText)

//      var blob = new Blob([xhr.responseText], {type: 'application/pdf'}); // 传入一个合适的 MIME 类型
// var url = URL.createObjectURL(blob);
//    console.log(url)
//  } else { 
//  alert("Request was unsuccessful: " + xhr.status); 
//  } 
//  } 
// }; 
// xhr.open("get", "/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf", true); 
   
// xhr.setRequestHeader('Origin','*')    
// xhr.send(null);

    // GET request for remote image

    // const servicer = axios.create({
    //   timeout, 
    //   headers: {
    //     'Access-Control-Allow-Origin':'*'
    //   }
    // })

axios({
  method:'get',
  url:'/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf',
  responseType: 'blob',
  headers: {
    'Access-Control-Allow-Origin': '*',
      }
})
  .then(res => {
    console.log(res)
    const pdfFile =  new Blob( [res.data] , {type: 'application/pdf'} )
    const fileUrl = URL.createObjectURL(pdfFile)
    setFile(fileUrl)
        
  });
    
    

  }

  const download = (res) => {
   console.log('下载了~')
 }
  
  return (
    
    <>
      {/* <a href='https://ebus.csot.tcl.com/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf' download="愚蠢的地球人">点击下载</a>
      <iframe src={file}></iframe>*/}
      <button onClick={test}>测试</button> 
     <PDFViewer  url={file} />;
    {/*  <iframe allow="payment" src='https://ebus.csot.tcl.com/csotfastfile-web-test/file/group1/M00/00/93/CmwHlmJdKGWAD8y6AAIcBbd5Rmw580.pdf'></iframe> */}
    </>
  )
}
