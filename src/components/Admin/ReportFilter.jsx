import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { AppContext } from "../../context/appContext";


const ReportFilter = () => {
  // 各種フィルタの値管理用state
  const { reports,reportFilter, setReportFilter,setFilteredReports} = useContext(AppContext);
  // const [idFilter, setIdFilter] = useState("")
  // const [statusFilterNotStarted, setStatusFilterNotStarted] = useState(false)
  // const [statusFilterInProgress, setStatusFilterInProgress] = useState(false)
  // const [statusFilterClosed, setStatusFilterClosed] = useState(false)
  // const [subjectFilter, setSubjectFilter] = useState("")
  // const [createdAtFromFilter, setCreatedAtFromFilter] = useState()
  // const [createdAtToFilter, setCreatedAtToFilter] = useState()
  // const [updatedAtFromFilter, setUpdatedAtFromFilter] = useState()
  // const [updatedAtToFilter, setUpdatedAtToFilter] = useState()

  useEffect(() => {
    // filter初期値セット
    // if(reportFilter.id){
    //   setIdFilter(reportFilter.id)
    // }
    // setStatusFilterNotStarted(reportFilter.statusNotStarted)
    // setStatusFilterInProgress(reportFilter.statusInProgress)
    // setStatusFilterClosed(reportFilter.statusClosed)
    // if(reportFilter.subject){
    //   setSubjectFilter(reportFilter.subject)
    // }
    // if(reportFilter.createdAtFrom){
    //   setCreatedAtFromFilter(reportFilter.createdAtFrom)
    // }
    // if(reportFilter.createdAtTo){
    //   setSubjectFilter(reportFilter.createdAtTo)
    // }
    // if(reportFilter.updatedAtFrom){
    //   setCreatedAtToFilter(reportFilter.updatedAtFrom)
    // }
    // if(reportFilter.updatedAtTo){
    //   setUpdatedAtToFilter(reportFilter.updatedAtTo)
    // }


  }, [])
  

  const setFilter = async (e)=>{


    let filteredRepts = reports

    if(filteredRepts&&reportFilter.id){
      const searchKeywords = reportFilter.id
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);
      filteredRepts=filteredRepts.filter((report) =>
        searchKeywords.every((kw) => report.id.toLowerCase().indexOf(kw) !== -1))
    }
    if(filteredRepts&&(reportFilter.statusNotStarted||reportFilter.statusInProgress||reportFilter.statusClosed)){
      filteredRepts=filteredRepts.filter((report)=>
        reportFilter.statusNotStarted && report.status=="Not started" ||
        reportFilter.statusInProgress && report.status=="In progress" ||
        reportFilter.statusClosed && report.status=="Closed"

      )
    }
    if(filteredRepts&&reportFilter.subject){
      const searchKeywords = reportFilter.subject
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);
      filteredRepts=filteredRepts.filter((report) =>
        searchKeywords.every((kw) => report.subject.toLowerCase().indexOf(kw) !== -1))
    }

    if(filteredRepts&&reportFilter.createdAtFrom&&reportFilter.createdAtTo){
      filteredRepts=filteredRepts.filter((report) =>
        report.createdAt >= reportFilter.createdAtFrom && report.createdAt <= reportFilter.createdAtTo
      )
    }
    if(filteredRepts&&reportFilter.updatedAtFrom&&reportFilter.updatedAtTo){
      filteredRepts=filteredRepts.filter((report) =>
        report.updatedAt >= reportFilter.updatedAtFrom && report.updatedAt <= reportFilter.updatedAtTo
      )
    }

    await setFilteredReports(
      filteredRepts
    )
      return e.preventDefault()
  }

  return (
    <div className='w-1/4 h-100 border border-current absolute z-50 bg-white top-40 right-3'>
     <form className='m-10' onSubmit={(e)=>{setFilter(e)}}>
        <div className="flex flex-row text-lg items-center">
          <div className='mr-3'> ID </div>
          <input key="id" className="rounded border" value={reportFilter.id} onChange={(e)=>{
            setReportFilter({...reportFilter,id:e.target.value})
          }}/>
        </div>

        <div className="flex flex-col">
          
          <div key="status" className='text-lg mt-2'>Status </div>
          {/* <input className="rounded border" /> */}
          <div>
            <div className='flex flex-col flex-wrap grid-rows-2'>

              <div className='flex flex-row items-start'>
                <div className="flex items-center">
                    <input type="checkbox" checked={reportFilter.statusNotStarted} onChange={
                     (e)=>setReportFilter({...reportFilter,statusNotStarted:!reportFilter.statusNotStarted})} className='w-4 h-4 mr-2' />
                    <label 
                      htmlFor="checked-checkbox"
                      className='mr-5'
                    >Not started</label>
                </div>


                <div className='flex  flex-row items-start'>
                  <div className="flex items-center">
                    <input key="inprogress" type="checkbox" checked={reportFilter.statusInProgress} onChange={(e)=>setReportFilter({...reportFilter,statusInProgress:!reportFilter.statusInProgress})} className='w-4 h-4 mr-2'/>
                    <label 
                      htmlFor="checked-checkbox" 
                      className='mr-5'
                    >In Progress</label>
                  </div>
                
                  <div className="flex items-center">
                    <input key="closed" type="checkbox" checked={reportFilter.statusClosed} onChange={(e)=>setReportFilter({...reportFilter,statusClosed:!reportFilter.statusClosed})}  className='w-4 h-4 mr-2'/>
                    <label htmlFor="checked-checkbox">Closed </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className='text-lg mb-2 mt-2'>Subject </div>
          <textarea className="rounded border h-15" value={reportFilter.subject} onChange={(e)=>setReportFilter({...reportFilter,subject:e.target.value})}></textarea>
        </div>

        <div className="flex flex-col ">
          <div className='text-lg mb-2 mt-2'>Created </div>
          <div className='flex flex-row'>
            <input className="rounded border text-center w-3/6" type="date" placeholder='00/00/0000' value={reportFilter.createdAtFrom} onChange={(e)=>setReportFilter({...reportFilter,createdAtFrom:e.target.value})} />
            <div className='m-1'>
              ~ 
            </div>
            <input className='rounded border text-center w-3/6' type="date" placeholder='00/00/0000' value={reportFilter.createdAtTo} onChange={(e)=>setReportFilter({...reportFilter,createdAtTo:e.target.value})} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className='text-lg mb-2'>Updated </div>
          <div className='flex flex-row'>
            <input className="rounded border text-center w-3/6" type="date" placeholder='00/00/0000' value={reportFilter.updatedAtFrom} onChange={(e)=>setReportFilter({...reportFilter,updatedAtFrom:e.target.value})}/>
            <div className='m-1'>
              ~ 
            </div>
            <input className='rounded border text-center w-3/6' type="date" placeholder='00/00/0000' value={reportFilter.updatedAtTo} onChange={(e)=>setReportFilter({...reportFilter,updatedAtTo:e.target.value})} />
          </div>
        </div>
        <div className='flex flex-col items-center m-4 text-sm'>
          <button className="flex justify-center items-center w-20 h-6 bg-gray-scale-3 cursor-pointer">Apply</button>
        </div>
      </form>
    </div>
  )
}

export default ReportFilter
