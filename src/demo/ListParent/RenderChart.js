import React, { useState, useEffect } from 'react';
const RenderChart = (props) => {
    const [chartData, setChartData] = useState(null);
    const [count, setCount] = useState(5)
    
    useEffect(() => {
        // 组件初始化时，发起请求，渲染数据
        // xhr、fetch
        // setChartData()
    }, [])

    // 写一个倒计时10秒的定时器，模拟接口数据请求渲染页面
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => {
                if (prevCount <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])
  
    return (
      <div style={{width: '100%',  height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/* chartData ? <Chart data={chartData} /> : 'Loading chart...' */}
        {props.data.name}--{count ? '接口数据请求中，还剩：' + count : '加载完成'}
      </div>
    );
};
export default RenderChart;