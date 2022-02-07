import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const AreaChartComponent = ({ data }) => {
  const key = Object.keys(data)
const value = Object.values(data)

const initArray = [];
for (const i in data) {
  const array = {name: key, sale: data[i]}
  initArray.push(array)
}
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={initArray} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='sale' stroke='#2cb1bc' fill='#bef8fd' />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default AreaChartComponent
