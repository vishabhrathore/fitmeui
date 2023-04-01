import React, { useEffect, useState } from "react";
import "../component/ui.css"
import { AiOutlineHome } from 'react-icons/ai';
import { CiDumbbell } from 'react-icons/ci';
import { GiOpenedFoodCan } from 'react-icons/gi';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
const Homepage = () => {
    const [isChart, setChart] = useState(true)
    const [weightData, setWeight] = useState({ goal: "", curr: "" })
    const [tableData, setTable] = useState([])
    const [ val , setval] = useState({})
    const [clss, setClass] = useState({over:{name:"b-2 size under", text:"Over Weight"},normal:{name:"b-2 size healthy", text:"Normal"},under:{name:"b-2 size under", text:"Under Weight"},
    s_under:{name:"b-2 size slighty", text:"Under Weight"},s_over:{name:"b-2 size slighty", text:"Under Weight"},
     })

    useEffect(()=>{
        setTable(JSON.parse(localStorage.getItem("peopleData")))
        let date = Date().split(" ")
        const today = `${date[2]} ${date[1]} ${date[3]}`
        tableData.forEach((data, index) => {
            if (data.date == today){
                if(data.curr_weight> data.ideal_weight + 5){
                    setval({name:"b-2 size under", text:"Over Weight"})
                }
                if(data.curr_weight + 5 < data.ideal_weight){
                    setval({name:"b-2 size under", text:"Under Weight"})
                }
                if(data.curr_weight> data.ideal_weight + 1){
                    setval({name:"b-2 size healty", text:"Normal Weight"})
                }
                if(data.curr_weight + 1 < data.ideal_weight){
                    setval({name:"b-2 size healty", text:"Normal Weight"})
                }
                
            }
        })
    },[])

    const handleSave = () => {
        let date = Date().split(" ")
        const today = `${date[2]} ${date[1]} ${date[3]}`
        let temp = JSON.parse(localStorage.getItem("peopleData"))
        const check = ()=>{
        tableData.forEach((data, index) => {
            if (data.date == today)
                return (false)
        })}

        if(!check){
        temp.push({
            date: today,
            ideal_weight: weightData.goal,
            curr_weight: weightData.curr
        })
        localStorage.setItem("peopleData", JSON.stringify(temp))
        console.log(JSON.parse(localStorage.getItem("peopleData")))
       }else{
        window.alert("You Have already entered for today Weight")
       }
    }
    const data = {
        labels: ["1 March", "2 March", "3 March", "4 March", "5 March", "6 March", "7 March"],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgb(214, 255, 255)",
            borderColor: "rgb(0, 163, 163)",
            borderWidth: 1
        },
        {
            label: 'My First Dataset',
            data: [55, 55, 55, 55, 55, 55, 55],
            backgroundColor: "rgb(0, 163, 163)",

            borderWidth: 1
        }
        ]
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtzero: true,
                    }
                }

            ]
        }
    }
    return (
        <div>
            <div>
                <div class="row">
                    <div class="col-2">
                        <div className="sidebar">
                            <div className="companyName fw-bolder fs-3 pt-5 pb-5 text-center">
                                Unlock-Fit
                            </div>

                            <div className="navs">
                                <AiOutlineHome className="icon" />
                                Home
                            </div>
                            <div className="navs">
                                <CiDumbbell className="icon" />
                                Exercise
                            </div>
                            <div className="navs">
                                <GiOpenedFoodCan className="icon" />
                                Food
                            </div>
                            <div className="navs">
                                <TbReportAnalytics className="icon" />
                                My Report
                            </div>
                            <div className="navs">
                                <AiOutlineShoppingCart className="icon" />
                                Shop
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div className="block">
                            <div className="b-1 size">
                                <div className="left-b-1">Hi, Vishabh rathore</div>
                                <div className="right-b1"></div>
                            </div>
                            <div className={val.name}>
                                {val.text}
                            </div>
                        </div>
                        <div className="chart">
                            <div className="form-check form-switch form-check-reverse mb-3">
                                <input onClick={() => { setChart(!isChart) }} className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                                <label className="form-check-label" for="flexSwitchCheckReverse">
                                    {isChart ? "View Table" : "View Chart"}
                                </label>
                            </div>
                            {isChart ?
                                <Bar data={data} options={options} /> :
                                <div>
                                    <table class="table">
                                        <tr className="desgin">
                                            <th className="text-center">Date</th>
                                            <th className="text-center">Ideal Weight</th>
                                            <th className="text-center">Current Weight</th>
                                        </tr>
                                        {
                                            tableData.map((data, index) => {
                                                return (
                                                    <tr className="desgin">
                                                        <td className="text-center">{data.date}</td>
                                                        <td className="text-center">{data.ideal_weight}</td>
                                                        <td className="text-center">{data.curr_weight}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="col-3">
                        <div className="gaol wid">
                            <select class="form-select form-select-md mb-3" aria-label=".form-select-sm example">
                                <option selected>Choose the Unit of weight</option>
                                <option value="1">Kgs</option>
                                <option value="2">Pounds</option>
                            </select>
                            <div class="input-group input-group mb-3">
                                <span className="group-text" id="inputGroup-sizing-sm">Enter Your Goal</span>
                                <input type="number" class="form-control wid bor" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => { setWeight({ ...weightData, goal: e.target.value }) }} />
                            </div>
                            <div class="input-group input-group mb-3">
                                <span className="group-text" id="inputGroup-sizing-sm">Current weight </span>
                                <input type="number" class="form-control wid bor" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e) => { setWeight({ ...weightData, curr: e.target.value }) }} />
                            </div>
                            <div class="d-grid">
                                <button onClick={handleSave} class="btn btn-success" type="button">Save for Today</button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage