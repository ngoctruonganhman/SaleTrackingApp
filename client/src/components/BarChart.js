import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const BarChartComponent = ({ data }) => {


const key = Object.keys(data)
const value = Object.values(data)

const initArray = [];
for (const i in data) {
  const array = {name: key, sale: data[i]}
  initArray.push(array)
}



  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={initArray} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3 ' />
        <XAxis dataKey='name' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='sale' fill='#58cbde' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
