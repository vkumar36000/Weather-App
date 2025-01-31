import { ForecastData } from '@/Api/Types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import { LineChart } from 'recharts';
import { format } from 'date-fns';

interface HourlyTempreture {
    data:ForecastData
}



function HourlyTempreture({ data }:HourlyTempreture ) {
  const chartData = data.list.slice(0, 8).map((item) =>({
    time:format(new Date(item.dt * 1000), "ha"),
    temp:Math.round(item.main.temp),
    feels_like:Math.round(item.main.feels_like)
  }))
  console.log(chartData);
  
    return (
        <Card className='flex-1'>
        <CardHeader>
          <CardTitle>
            Today,s Tempereture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer height={"100%"} width={"100%"}>
            <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>`${value}º`}
                />
                 <Tooltip content={({active, payload}) => {
                    if (active && payload && payload.length) {
                        return(
                          <div className='rounded-lg border bg-background p-2 shadow-sm'>
                            <div className='grid grid-cols-2 gap-2'>
                                <div className='flex flex-col'>
                                    <span className='text-[0.70rem] uppercase text-muted-foreground'>
                                        Temprature
                                    </span>
                                    <span className='font-bold'>
                                        {payload[0].value}º
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <span className='text-[0.70rem] uppercase text-muted-foreground'>
                                        Feels Like
                                    </span>
                                    <span className='font-bold'>
                                        {payload[1].value}º
                                    </span>
                                </div>
                            </div>
                          </div>  
                        );
                    }
                    return null;
                 }}/>


                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke='#2563eb'
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke='#64748b'
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />

                {/* <Line type="monotone" dataKey="uv" stroke="#8884d8" /> */}
            </LineChart>
             </ResponsiveContainer >
          </div>
        </CardContent>
      </Card>
      
  );
}

export default HourlyTempreture;